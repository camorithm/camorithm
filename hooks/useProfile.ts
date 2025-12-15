// File: hooks/useProfile.ts
// Custom hook to fetch and manage user profile data

'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  
  // Trading Account
  account_size: number;
  balance: number;
  equity: number;
  total_profit: number;
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  
  // Account Status
  account_type: string;
  phase: string;
  kyc_status: string;
  
  // Risk Metrics
  daily_loss_limit: number;
  max_drawdown: number;
  current_daily_loss: number;
  current_drawdown: number;
  
  // Progress
  trading_days: number;
  min_trading_days: number;
  profit_target: number;
  
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch profile from database
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data as Profile);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [supabase]);

  // Calculate derived stats
  const stats = profile ? {
    winRate: profile.total_trades > 0 
      ? (profile.winning_trades / profile.total_trades) * 100 
      : 0,
    avgRR: profile.losing_trades > 0
      ? Math.abs(profile.winning_trades / profile.losing_trades)
      : 0,
    profitFactor: profile.total_trades > 0
      ? (profile.total_profit / profile.account_size) * 100
      : 0,
    dailyLossRemaining: profile.daily_loss_limit - profile.current_daily_loss,
    drawdownRemaining: profile.max_drawdown - profile.current_drawdown,
  } : null;

  return {
    profile,
    stats,
    loading,
    error,
  };
}