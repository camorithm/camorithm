// File: hooks/useTrades.ts
// Custom hook to fetch and manage trades

'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Trade {
  id: string;
  user_id: string;
  symbol: string;
  trade_type: 'buy' | 'sell';
  entry_price: number;
  exit_price: number | null;
  lot_size: number;
  profit_loss: number | null;
  status: 'open' | 'closed' | 'win' | 'loss';
  tags: string[] | null;
  notes: string | null;
  entry_time: string;
  exit_time: string | null;
  created_at: string;
  updated_at: string;
}

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchTrades() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch trades from database
        const { data, error } = await supabase
          .from('trades')
          .select('*')
          .eq('user_id', user.id)
          .order('entry_time', { ascending: false });

        if (error) throw error;

        setTrades(data as Trade[]);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching trades:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('trades_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trades'
        },
        (payload) => {
          console.log('Trade changed:', payload);
          fetchTrades(); // Refetch when trades change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Calculate equity curve data for chart
  const equityData = trades
    .filter(t => t.status !== 'open')
    .sort((a, b) => new Date(a.exit_time || a.entry_time).getTime() - new Date(b.exit_time || b.entry_time).getTime())
    .reduce((acc, trade, index) => {
      const prevEquity = index === 0 ? 100000 : acc[index - 1].value;
      const newEquity = prevEquity + (trade.profit_loss || 0);
      
      acc.push({
        date: new Date(trade.exit_time || trade.entry_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: newEquity
      });
      
      return acc;
    }, [] as { date: string; value: number }[]);

  // Add starting point if no trades
  if (equityData.length === 0) {
    equityData.push({ date: 'Start', value: 100000 });
  }

  return {
    trades,
    equityData,
    loading,
    error,
  };
}