// File: app/api/mt4/sync/route.ts
// API endpoint to receive trades from MT4/MT5 Expert Advisor

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Pass cookies as an async function (Supabase expects Promise)
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();

    // Verify API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    // Get user by API key (stored in profiles table)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, mt4_api_key')
      .eq('mt4_api_key', apiKey)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Parse trade data from MT4/MT5
    const {
      ticket,
      symbol,
      type, // 0=buy, 1=sell
      lots,
      open_price,
      close_price,
      open_time,
      close_time,
      profit,
      commission,
      swap,
      comment,
      magic_number,
    } = body;

    // Calculate net profit (profit - commission - swap)
    const netProfit = (profit || 0) - Math.abs(commission || 0) - Math.abs(swap || 0);

    // Determine trade status
    let status = 'open';
    if (close_price && close_time) {
      status = netProfit >= 0 ? 'win' : 'loss';
    }

    // Check if trade already exists
    const { data: existingTrade } = await supabase
      .from('trades')
      .select('id, status')
      .eq('user_id', profile.id)
      .eq('mt4_ticket', ticket)
      .single();

    if (existingTrade) {
      // Update existing trade
      const { error: updateError } = await supabase
        .from('trades')
        .update({
          exit_price: close_price,
          exit_time: close_time,
          profit_loss: netProfit,
          status: status,
          notes: comment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingTrade.id);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: 'Trade updated',
        trade_id: existingTrade.id,
      });
    } else {
      // Insert new trade
      const { data: newTrade, error: insertError } = await supabase
        .from('trades')
        .insert({
          user_id: profile.id,
          mt4_ticket: ticket,
          symbol: symbol,
          trade_type: type === 0 ? 'buy' : 'sell',
          entry_price: open_price,
          exit_price: close_price || null,
          lot_size: lots,
          profit_loss: status !== 'open' ? netProfit : null,
          status: status,
          entry_time: open_time,
          exit_time: close_time || null,
          notes: comment,
          tags: magic_number ? [`EA-${magic_number}`] : null,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      return NextResponse.json({
        success: true,
        message: 'Trade synced',
        trade_id: newTrade.id,
      });
    }
  } catch (error: any) {
    console.error('MT4 sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync trade', details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to check connection
export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key required' }, { status: 401 });
  }

  // Pass cookies as an async function (Supabase expects Promise)
  const supabase = createRouteHandlerClient({ cookies });

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('mt4_api_key', apiKey)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: 'Connection verified',
    user: {
      id: profile.id,
      email: profile.email,
      name: profile.full_name,
    },
  });
}