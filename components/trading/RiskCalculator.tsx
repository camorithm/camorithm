'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';

// Properly typed interfaces
interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: string) => void;
  prefix?: string;
  suffix?: string;
  type?: string;
  step?: string;
}

interface ResultRowProps {
  label: string;
  value: string;
  color?: 'red' | 'green' | 'yellow';
  bold?: boolean;
}

export const RiskCalculator = () => {
  // State
  const [accountSize, setAccountSize] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(1.0800);
  const [stopLoss, setStopLoss] = useState<number>(1.0750);
  const [takeProfit, setTakeProfit] = useState<number>(1.0900);
  const [pipValue, setPipValue] = useState<number>(10); // Standard lot

  // Calculated values
  const [positionSize, setPositionSize] = useState<number>(0);
  const [riskAmount, setRiskAmount] = useState<number>(0);
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  const [riskRewardRatio, setRiskRewardRatio] = useState<number>(0);
  const [pipsToSL, setPipsToSL] = useState<number>(0);
  const [pipsToTP, setPipsToTP] = useState<number>(0);

  useEffect(() => {
    calculate();
  }, [accountSize, riskPercent, entryPrice, stopLoss, takeProfit, pipValue]);

  const calculate = () => {
    // Calculate pips
    const slPips = Math.abs(entryPrice - stopLoss) * 10000;
    const tpPips = Math.abs(takeProfit - entryPrice) * 10000;
    
    setPipsToSL(slPips);
    setPipsToTP(tpPips);

    // Calculate risk amount in dollars
    const risk = accountSize * (riskPercent / 100);
    setRiskAmount(risk);

    // Calculate position size
    const lotSize = risk / (slPips * pipValue);
    setPositionSize(lotSize);

    // Calculate potential reward
    const reward = tpPips * pipValue * lotSize;
    setRewardAmount(reward);

    // Calculate R:R
    const rr = tpPips / slPips;
    setRiskRewardRatio(rr);
  };

  const isValidTrade = riskRewardRatio >= 1.5 && riskPercent <= 2;

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Risk Calculator</h3>
          <p className="text-xs text-slate-500">Calculate position size & risk/reward</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <InputField
          label="Account Size"
          value={accountSize}
          onChange={(val: string) => setAccountSize(parseFloat(val) || 0)}
          prefix="$"
          type="number"
        />
        
        <InputField
          label="Risk Per Trade"
          value={riskPercent}
          onChange={(val: string) => setRiskPercent(parseFloat(val) || 0)}
          suffix="%"
          type="number"
          step="0.1"
        />

        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Entry Price"
            value={entryPrice}
            onChange={(val: string) => setEntryPrice(parseFloat(val) || 0)}
            type="number"
            step="0.0001"
          />
          <InputField
            label="Pip Value"
            value={pipValue}
            onChange={(val: string) => setPipValue(parseFloat(val) || 0)}
            prefix="$"
            type="number"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Stop Loss"
            value={stopLoss}
            onChange={(val: string) => setStopLoss(parseFloat(val) || 0)}
            type="number"
            step="0.0001"
          />
          <InputField
            label="Take Profit"
            value={takeProfit}
            onChange={(val: string) => setTakeProfit(parseFloat(val) || 0)}
            type="number"
            step="0.0001"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/5">
        <ResultRow label="Position Size" value={`${positionSize.toFixed(2)} lots`} />
        <ResultRow label="Risk Amount" value={`$${riskAmount.toFixed(2)}`} color="red" />
        <ResultRow label="Reward Amount" value={`$${rewardAmount.toFixed(2)}`} color="green" />
        <ResultRow label="Pips to SL" value={pipsToSL.toFixed(1)} />
        <ResultRow label="Pips to TP" value={pipsToTP.toFixed(1)} />
        <ResultRow 
          label="Risk:Reward" 
          value={`1:${riskRewardRatio.toFixed(2)}`}
          color={riskRewardRatio >= 2 ? 'green' : riskRewardRatio >= 1.5 ? 'yellow' : 'red'}
          bold
        />
      </div>

      {/* Trade Quality Indicator */}
      <div className={`mt-6 p-4 rounded-lg border ${
        isValidTrade 
          ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20' 
          : 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
      }`}>
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className={isValidTrade ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'} />
          <div>
            <div className={`text-sm font-bold ${isValidTrade ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {isValidTrade ? 'Good Trade Setup' : 'Review Trade Setup'}
            </div>
            <div className={`text-xs mt-1 ${isValidTrade ? 'text-green-600/80 dark:text-green-400/80' : 'text-orange-600/80 dark:text-orange-400/80'}`}>
              {isValidTrade 
                ? 'Risk/reward ratio is favorable and risk is within limits'
                : 'Consider improving R:R ratio or reducing risk percentage'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-2">
        <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Place Trade
        </button>
        <button 
          onClick={calculate}
          className="px-4 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Helper Components with proper types
const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  prefix, 
  suffix, 
  type = 'text', 
  step 
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        className={`w-full ${prefix ? 'pl-8' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const ResultRow: React.FC<ResultRowProps> = ({ label, value, color, bold }) => {
  const getColor = () => {
    if (color === 'red') return 'text-red-600 dark:text-red-400';
    if (color === 'green') return 'text-green-600 dark:text-green-400';
    if (color === 'yellow') return 'text-orange-600 dark:text-orange-400';
    return 'text-slate-900 dark:text-white';
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <span className={`text-sm font-mono ${bold ? 'font-bold text-base' : ''} ${getColor()}`}>
        {value}
      </span>
    </div>
  );
};