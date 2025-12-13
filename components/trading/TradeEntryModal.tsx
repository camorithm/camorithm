'use client';

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, AlertCircle, Check } from 'lucide-react';

interface TradeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol?: string;
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  type?: string;
  step?: string;
  suffix?: string;
  helper?: string;
  helperColor?: 'red' | 'green';
}

export const TradeEntryModal: React.FC<TradeEntryModalProps> = ({ 
  isOpen, 
  onClose, 
  symbol = 'EURUSD' 
}) => {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy');
  const [lotSize, setLotSize] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(1.0824);
  const [stopLoss, setStopLoss] = useState<number>(1.0774);
  const [takeProfit1, setTakeProfit1] = useState<number>(1.0874);
  const [takeProfit2, setTakeProfit2] = useState<number>(1.0924);
  const [useTrailingStop, setUseTrailingStop] = useState<boolean>(false);
  const [trailingDistance, setTrailingDistance] = useState<number>(20);

  // Calculated values
  const pipsToSL = Math.abs(entryPrice - stopLoss) * 10000;
  const pipsToTP1 = Math.abs(takeProfit1 - entryPrice) * 10000;
  const pipValue = 10; // Standard lot
  const riskAmount = pipsToSL * pipValue * lotSize;
  const rewardAmount = pipsToTP1 * pipValue * lotSize;
  const rrRatio = pipsToTP1 / pipsToSL;

  const handleSubmit = () => {
    // In real app, this would send order to broker API
    console.log('Trade submitted:', {
      symbol,
      orderType,
      direction,
      lotSize,
      entryPrice,
      stopLoss,
      takeProfit1,
      takeProfit2,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-2xl z-50">
        
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#0f1115] border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">New Trade</h2>
            <p className="text-sm text-slate-500 mt-0.5">{symbol} • Live Market</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Direction & Order Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Direction
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection('buy')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    direction === 'buy'
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <TrendingUp size={18} /> Buy
                </button>
                <button
                  onClick={() => setDirection('sell')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    direction === 'sell'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <TrendingDown size={18} /> Sell
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Order Type
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as 'market' | 'limit' | 'stop')}
                className="w-full px-3 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white"
              >
                <option value="market">Market Order</option>
                <option value="limit">Limit Order</option>
                <option value="stop">Stop Order</option>
              </select>
            </div>
          </div>

          {/* Entry Details */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Lot Size"
              value={lotSize}
              onChange={setLotSize}
              type="number"
              step="0.01"
              suffix="lots"
            />
            <InputField
              label={orderType === 'market' ? 'Market Price' : 'Entry Price'}
              value={entryPrice}
              onChange={setEntryPrice}
              type="number"
              step="0.0001"
            />
          </div>

          {/* Stop Loss & Take Profit */}
          <div className="space-y-4">
            <InputField
              label="Stop Loss"
              value={stopLoss}
              onChange={setStopLoss}
              type="number"
              step="0.0001"
              helper={`${pipsToSL.toFixed(1)} pips • -$${riskAmount.toFixed(2)}`}
              helperColor="red"
            />

            <InputField
              label="Take Profit 1 (50%)"
              value={takeProfit1}
              onChange={setTakeProfit1}
              type="number"
              step="0.0001"
              helper={`${pipsToTP1.toFixed(1)} pips • +$${rewardAmount.toFixed(2)}`}
              helperColor="green"
            />

            <InputField
              label="Take Profit 2 (50%)"
              value={takeProfit2}
              onChange={setTakeProfit2}
              type="number"
              step="0.0001"
              helper={`${((takeProfit2 - entryPrice) * 10000).toFixed(1)} pips`}
              helperColor="green"
            />
          </div>

          {/* Trailing Stop */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-lg">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={useTrailingStop}
                  onChange={(e) => setUseTrailingStop(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Use Trailing Stop
              </label>
              <p className="text-xs text-slate-500 ml-6 mt-0.5">
                Automatically adjust stop loss as price moves in your favor
              </p>
            </div>
            {useTrailingStop && (
              <input
                type="number"
                value={trailingDistance}
                onChange={(e) => setTrailingDistance(parseFloat(e.target.value) || 20)}
                className="w-20 px-3 py-1.5 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded text-sm font-mono text-slate-900 dark:text-white"
                placeholder="Pips"
              />
            )}
          </div>

          {/* Risk Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Risk</div>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                ${riskAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Reward</div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                ${rewardAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">R:R Ratio</div>
              <div className={`text-lg font-bold ${
                rrRatio >= 2 ? 'text-green-600 dark:text-green-400' : 
                rrRatio >= 1.5 ? 'text-orange-600 dark:text-orange-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                1:{rrRatio.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Trade Quality Indicator */}
          {rrRatio < 1.5 && (
            <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-lg">
              <AlertCircle size={18} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-orange-700 dark:text-orange-400">
                  Low Risk:Reward Ratio
                </div>
                <div className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">
                  Consider adjusting your take profit or stop loss to improve the R:R ratio to at least 1.5
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`flex-1 py-3 font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                direction === 'buy'
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20'
              }`}
            >
              <Check size={18} />
              {direction === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper Component with proper types
const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  step, 
  suffix, 
  helper, 
  helperColor 
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        className={`w-full pl-3 ${suffix ? 'pr-16' : 'pr-3'} py-2.5 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
          {suffix}
        </span>
      )}
    </div>
    {helper && (
      <div className={`text-xs mt-1.5 font-mono ${
        helperColor === 'red' ? 'text-red-600 dark:text-red-400' : 
        helperColor === 'green' ? 'text-green-600 dark:text-green-400' : 
        'text-slate-500'
      }`}>
        {helper}
      </div>
    )}
  </div>
);