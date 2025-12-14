'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface LiveTickerProps {
  symbols?: string[];
  updateInterval?: number;
  speed?: 'slow' | 'normal' | 'fast';
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ 
  symbols = ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD', 'US30', 'NAS100', 'USDJPY', 'EURJPY'],
  updateInterval = 2000,
  speed = 'normal'
}) => {
  const [prices, setPrices] = useState<TickerPrice[]>([]);

  // Initialize prices
  useEffect(() => {
    const basePrices: Record<string, number> = {
      'EURUSD': 1.0824,
      'GBPUSD': 1.2640,
      'XAUUSD': 2042.50,
      'BTCUSD': 42105.00,
      'US30': 36200.50,
      'NAS100': 16400.20,
      'USDJPY': 148.50,
      'EURJPY': 161.25,
    };

    const initialPrices = symbols.map(symbol => ({
      symbol,
      price: basePrices[symbol] || 100,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 2,
    }));

    setPrices(initialPrices);

    // Update prices periodically
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.price + (Math.random() - 0.5) * p.price * 0.0001,
        change: p.change + (Math.random() - 0.5) * 0.5,
        changePercent: p.changePercent + (Math.random() - 0.5) * 0.05,
      })));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [symbols, updateInterval]);

  const formatPrice = (symbol: string, price: number): string => {
    if (symbol.includes('JPY')) return price.toFixed(3);
    if (symbol.includes('XAU') || symbol.includes('BTC') || symbol.includes('US30') || symbol.includes('NAS')) {
      return price.toFixed(2);
    }
    return price.toFixed(5);
  };

  const getAnimationSpeed = () => {
    if (speed === 'slow') return '60s';
    if (speed === 'fast') return '20s';
    return '40s';
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] border-b border-slate-200 dark:border-white/5 h-12 flex items-center overflow-hidden relative">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling content - duplicated for seamless loop */}
      <div 
        className="flex gap-8"
        style={{
          animation: `scroll-ticker ${getAnimationSpeed()} linear infinite`,
        }}
      >
        {[...prices, ...prices].map((price, index) => (
          <TickerItem 
            key={`${price.symbol}-${index}`} 
            data={price} 
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {/* Global style for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}} />
    </div>
  );
};

const TickerItem: React.FC<{
  data: TickerPrice;
  formatPrice: (symbol: string, price: number) => string;
}> = ({ data, formatPrice }) => {
  const isPositive = data.changePercent >= 0;

  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{data.symbol}</span>
        <span className="text-slate-900 dark:text-white font-bold text-sm font-mono">
          {formatPrice(data.symbol, data.price)}
        </span>
        <div className={`flex items-center gap-1 text-xs font-bold ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
        </div>
      </div>
      <span className="text-slate-300 dark:text-slate-700">|</span>
    </div>
  );
};