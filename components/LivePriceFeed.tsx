'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface PriceData {
  symbol: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  lastUpdate: Date;
}

interface LivePriceFeedProps {
  symbols?: string[];
  updateInterval?: number;
}

export const LivePriceFeed: React.FC<LivePriceFeedProps> = ({ 
  symbols = ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD', 'US30'],
  updateInterval = 1000 
}) => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [isConnected, setIsConnected] = useState(false);

  // Initialize prices
  const initializePrices = useCallback(() => {
    const initialPrices: Record<string, PriceData> = {};
    
    const basePrices: Record<string, number> = {
      'EURUSD': 1.0824,
      'GBPUSD': 1.2640,
      'XAUUSD': 2042.50,
      'BTCUSD': 42105.00,
      'US30': 36200.50,
      'NAS100': 16400.20,
      'USDJPY': 148.50,
    };

    symbols.forEach(symbol => {
      const basePrice = basePrices[symbol] || 100;
      const spread = basePrice * 0.0001; // 1 pip spread
      
      initialPrices[symbol] = {
        symbol,
        bid: basePrice,
        ask: basePrice + spread,
        change: 0,
        changePercent: 0,
        high: basePrice * 1.001,
        low: basePrice * 0.999,
        volume: Math.floor(Math.random() * 10000) + 1000,
        lastUpdate: new Date(),
      };
    });

    return initialPrices;
  }, [symbols]);

  // Simulate price updates
  useEffect(() => {
    setPrices(initializePrices());
    setIsConnected(true);

    const interval = setInterval(() => {
      setPrices(prevPrices => {
        const newPrices = { ...prevPrices };

        Object.keys(newPrices).forEach(symbol => {
          const currentPrice = newPrices[symbol];
          
          // Random price movement (-0.05% to +0.05%)
          const changePercent = (Math.random() - 0.5) * 0.1;
          const priceChange = currentPrice.bid * (changePercent / 100);
          const newBid = currentPrice.bid + priceChange;
          
          // Update spread
          const spread = newBid * 0.0001;
          const newAsk = newBid + spread;

          // Update high/low
          const newHigh = Math.max(currentPrice.high, newBid);
          const newLow = Math.min(currentPrice.low, newBid);

          // Calculate cumulative change
          const initialPrice = initializePrices()[symbol].bid;
          const totalChange = newBid - initialPrice;
          const totalChangePercent = (totalChange / initialPrice) * 100;

          newPrices[symbol] = {
            ...currentPrice,
            bid: newBid,
            ask: newAsk,
            change: totalChange,
            changePercent: totalChangePercent,
            high: newHigh,
            low: newLow,
            volume: currentPrice.volume + Math.floor(Math.random() * 100),
            lastUpdate: new Date(),
          };
        });

        return newPrices;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [initializePrices, updateInterval]);

  // Format price based on symbol
  const formatPrice = (symbol: string, price: number): string => {
    if (symbol.includes('JPY')) return price.toFixed(3);
    if (symbol.includes('XAU') || symbol.includes('BTC') || symbol.includes('US30') || symbol.includes('NAS')) {
      return price.toFixed(2);
    }
    return price.toFixed(5);
  };

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-900 dark:text-white">Live Market Prices</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-slate-500 font-mono">
            {isConnected ? 'LIVE' : 'DISCONNECTED'}
          </span>
        </div>
      </div>

      {/* Price Grid */}
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {Object.values(prices).map((price) => (
          <PriceRow key={price.symbol} price={price} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  );
};

// Individual Price Row Component
const PriceRow: React.FC<{
  price: PriceData;
  formatPrice: (symbol: string, price: number) => string;
}> = ({ price, formatPrice }) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const [prevBid, setPrevBid] = useState(price.bid);

  useEffect(() => {
    if (price.bid > prevBid) {
      setFlash('up');
      setTimeout(() => setFlash(null), 300);
    } else if (price.bid < prevBid) {
      setFlash('down');
      setTimeout(() => setFlash(null), 300);
    }
    setPrevBid(price.bid);
  }, [price.bid, prevBid]);

  const isPositive = price.change >= 0;

  return (
    <div 
      className={`px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all ${
        flash === 'up' ? 'bg-green-50 dark:bg-green-500/10' : 
        flash === 'down' ? 'bg-red-50 dark:bg-red-500/10' : ''
      }`}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        
        {/* Symbol */}
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">
              {price.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{price.symbol}</div>
            </div>
          </div>
        </div>

        {/* Bid Price */}
        <div className="col-span-2">
          <div className="text-xs text-slate-500 mb-1">Bid</div>
          <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
            {formatPrice(price.symbol, price.bid)}
          </div>
        </div>

        {/* Ask Price */}
        <div className="col-span-2">
          <div className="text-xs text-slate-500 mb-1">Ask</div>
          <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
            {formatPrice(price.symbol, price.ask)}
          </div>
        </div>

        {/* Change */}
        <div className="col-span-2">
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
            )}
            <div className={`text-sm font-bold font-mono ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* High/Low */}
        <div className="col-span-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">H:</span>
              <span className="text-xs font-mono text-green-600 dark:text-green-400">
                {formatPrice(price.symbol, price.high)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">L:</span>
              <span className="text-xs font-mono text-red-600 dark:text-red-400">
                {formatPrice(price.symbol, price.low)}
              </span>
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className="col-span-2 text-right">
          <div className="text-xs text-slate-500 mb-1">Volume</div>
          <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
            {price.volume.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export hook for using price data in other components
export const useLivePrices = (symbols: string[], updateInterval = 1000) => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});

  useEffect(() => {
    // Initialize prices (same logic as component)
    const initialPrices: Record<string, PriceData> = {};
    const basePrices: Record<string, number> = {
      'EURUSD': 1.0824,
      'GBPUSD': 1.2640,
      'XAUUSD': 2042.50,
      'BTCUSD': 42105.00,
      'US30': 36200.50,
    };

    symbols.forEach(symbol => {
      const basePrice = basePrices[symbol] || 100;
      initialPrices[symbol] = {
        symbol,
        bid: basePrice,
        ask: basePrice + basePrice * 0.0001,
        change: 0,
        changePercent: 0,
        high: basePrice * 1.001,
        low: basePrice * 0.999,
        volume: Math.floor(Math.random() * 10000) + 1000,
        lastUpdate: new Date(),
      };
    });

    setPrices(initialPrices);

    const interval = setInterval(() => {
      setPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const changePercent = (Math.random() - 0.5) * 0.1;
          const priceChange = updated[symbol].bid * (changePercent / 100);
          updated[symbol] = {
            ...updated[symbol],
            bid: updated[symbol].bid + priceChange,
            ask: updated[symbol].bid + priceChange + updated[symbol].bid * 0.0001,
            lastUpdate: new Date(),
          };
        });
        return updated;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [symbols, updateInterval]);

  return prices;
};