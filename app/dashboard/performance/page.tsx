'use client';

import React from 'react';
import { CalendarHeatmap } from '../../../components/CalendarHeatmap';
import { AdvancedMetrics } from '../../../components/AdvancedMetrics';
import { LivePriceFeed } from '../../../components/LivePriceFeed';
import { LiveTicker } from '../../../components/LiveTicker';

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Live Ticker at top */}
      <div className="-mx-8 -mt-8 mb-2">
        <LiveTicker speed="normal" />
      </div>

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Performance Analysis</h1>
        <p className="text-slate-500">Comprehensive view of your trading performance and live market data</p>
      </div>

      {/* Calendar Heatmap */}
      <CalendarHeatmap />

      {/* Advanced Metrics */}
      <AdvancedMetrics />

      {/* Live Market Prices */}
      <LivePriceFeed 
        symbols={['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD', 'US30', 'NAS100']}
        updateInterval={1000}
      />
    </div>
  );
}