// app/api/prices/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'EURUSD';
  
  try {
    // Example with a free forex API
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${symbol.substring(0,3)}&symbols=${symbol.substring(3,6)}`
    );
    const data = await response.json();
    
    // Transform to your format
    const rate = data.rates[symbol.substring(3,6)];
    
    return NextResponse.json({
      symbol,
      bid: rate - 0.0002, // Spread
      ask: rate + 0.0002,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}