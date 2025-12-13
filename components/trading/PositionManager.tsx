'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, X, Edit2, Target, MoreVertical } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  direction: 'buy' | 'sell';
  lotSize: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  openTime: string;
  pnl: number;
  pips: number;
}

export const PositionManager = () => {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'EURUSD',
      direction: 'buy',
      lotSize: 2.0,
      entryPrice: 1.0800,
      currentPrice: 1.0824,
      stopLoss: 1.0750,
      takeProfit: 1.0900,
      openTime: '10:42 AM',
      pnl: 480,
      pips: 24,
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      direction: 'sell',
      lotSize: 1.5,
      entryPrice: 1.2650,
      currentPrice: 1.2640,
      stopLoss: 1.2700,
      takeProfit: 1.2550,
      openTime: '09:15 AM',
      pnl: 150,
      pips: 10,
    },
    {
      id: '3',
      symbol: 'XAUUSD',
      direction: 'buy',
      lotSize: 0.5,
      entryPrice: 2042.50,
      currentPrice: 2045.20,
      stopLoss: 2035.00,
      takeProfit: 2055.00,
      openTime: '08:30 AM',
      pnl: 135,
      pips: 2.7,
    },
  ]);

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalPositions = positions.length;
  const winningPositions = positions.filter(p => p.pnl > 0).length;

  const closePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const closeAll = () => {
    if (confirm(`Close all ${positions.length} positions?`)) {
      setPositions([]);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Open Positions</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {totalPositions} active • {winningPositions} winning
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Total P&L Badge */}
          <div className={`px-4 py-2 rounded-lg font-bold font-mono text-sm ${
            totalPnL >= 0 
              ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
          }`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </div>

          {positions.length > 0 && (
            <button
              onClick={closeAll}
              className="px-4 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg transition-colors"
            >
              Close All
            </button>
          )}
        </div>
      </div>

      {/* Positions List */}
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {positions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">No open positions</p>
            <p className="text-xs text-slate-400 mt-1">Your active trades will appear here</p>
          </div>
        ) : (
          positions.map((position) => (
            <PositionRow
              key={position.id}
              position={position}
              onClose={() => closePosition(position.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Position Row Component
const PositionRow = ({ position, onClose }: { position: Position; onClose: () => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const isProfitable = position.pnl >= 0;
  const isBuy = position.direction === 'buy';
  
  // Calculate distance to SL/TP in pips
  const distanceToSL = Math.abs(position.currentPrice - position.stopLoss) * 10000;
  const distanceToTP = Math.abs(position.takeProfit - position.currentPrice) * 10000;

  return (
    <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
      <div className="flex items-center justify-between">
        
        {/* Left: Symbol & Direction */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isBuy 
                ? 'bg-green-50 dark:bg-green-500/10' 
                : 'bg-red-50 dark:bg-red-500/10'
            }`}>
              {isBuy ? (
                <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown size={20} className="text-red-600 dark:text-red-400" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">{position.symbol}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  isBuy
                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  {position.direction.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-mono">{position.lotSize} lots</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">
                Entry: {position.entryPrice} • Opened {position.openTime}
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Price & Levels */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">Current</div>
            <div className="text-sm font-mono font-bold text-slate-900 dark:text-white">
              {position.currentPrice}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-red-600 dark:text-red-400 mb-1">SL</div>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
              {position.stopLoss}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {distanceToSL.toFixed(0)} pips
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-green-600 dark:text-green-400 mb-1">TP</div>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
              {position.takeProfit}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {distanceToTP.toFixed(0)} pips
            </div>
          </div>
        </div>

        {/* Right: P&L & Actions */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-xl font-mono font-bold ${
              isProfitable 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {isProfitable ? '+' : ''}${position.pnl.toFixed(2)}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {isProfitable ? '+' : ''}{position.pips.toFixed(1)} pips
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
              <Edit2 size={16} className="text-slate-400" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <X size={16} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar (SL to TP) */}
      <div className="mt-3 relative">
        <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isProfitable ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ 
              width: `${Math.min(100, Math.max(0, ((position.currentPrice - position.stopLoss) / (position.takeProfit - position.stopLoss)) * 100))}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};