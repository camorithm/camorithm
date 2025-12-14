'use client';
import React from 'react';

export const MarketTicker = () => {
  return (
      <div className="w-full bg-white dark:bg-[#050505] border-b border-slate-200 dark:border-white/5 h-10 flex items-center overflow-hidden whitespace-nowrap px-4 transition-colors duration-300">
          <div className="flex items-center gap-8 text-xs font-mono animate-ticker">
              <TickerItem symbol="EURUSD" price="1.0824" change="+0.12%" up />
              <TickerItem symbol="GBPUSD" price="1.2640" change="-0.05%" up={false} />
              <TickerItem symbol="XAUUSD" price="2,042.10" change="+1.4%" up />
              <TickerItem symbol="BTCUSD" price="42,105.00" change="+2.1%" up />
              <TickerItem symbol="US30" price="36,200.50" change="-0.4%" up={false} />
              <TickerItem symbol="NAS100" price="16,400.20" change="+0.8%" up />
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 font-bold">NEXT NEWS: CPI DATA (USD) - 14:00 GMT</span>
              
              {/* Duplicate for seamless loop */}
              <TickerItem symbol="EURUSD" price="1.0824" change="+0.12%" up />
              <TickerItem symbol="GBPUSD" price="1.2640" change="-0.05%" up={false} />
              <TickerItem symbol="XAUUSD" price="2,042.10" change="+1.4%" up />
              <TickerItem symbol="BTCUSD" price="42,105.00" change="+2.1%" up />
              <TickerItem symbol="US30" price="36,200.50" change="-0.4%" up={false} />
              <TickerItem symbol="NAS100" price="16,400.20" change="+0.8%" up />
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 font-bold">NEXT NEWS: CPI DATA (USD) - 14:00 GMT</span>
          </div>
      </div>
  )
}

const TickerItem = ({ symbol, price, change, up }: any) => (
  <div className="flex items-center gap-2">
      <span className="font-bold text-slate-600 dark:text-slate-400">{symbol}</span>
      <span className="text-slate-900 dark:text-white font-bold">{price}</span>
      <span className={up ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}>{change}</span>
  </div>
)