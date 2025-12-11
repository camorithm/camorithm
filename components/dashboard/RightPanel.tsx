'use client';

import React from 'react';
import { Lock } from 'lucide-react';

export const RightPanel = () => {
return (
  <aside className="hidden xl:flex w-[280px] flex-col border-l border-slate-200 dark:border-white/10 bg-white dark:bg-[#050505] h-full fixed right-0 top-20 bottom-0 overflow-y-auto p-4 z-30 transition-colors duration-300">
    
    <div className="mb-6">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Risk Monitor</h3>
      
      {/* Daily Loss Gauge */}
      <div className="bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 p-4 rounded-xl mb-4 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Daily Loss Limit</span>
              <span className="text-xs font-mono text-red-500 dark:text-red-400">-$2,500</span>
          </div>
          <div className="flex justify-between items-end mb-2">
              <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">-$120.50</span>
              <span className="text-xs text-slate-500">4.8% Remaining</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[5%]"></div>
          </div>
      </div>

      {/* Max Drawdown Gauge */}
      <div className="bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 p-4 rounded-xl relative overflow-hidden">
           <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Max Trailing Loss</span>
              <span className="text-xs font-mono text-red-500 dark:text-red-400">-$5,000</span>
          </div>
          <div className="flex justify-between items-end mb-2">
              <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">-$120.50</span>
              <span className="text-xs text-slate-500">9.2% Remaining</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[2%]"></div>
          </div>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Objectives</h3>
      <ObjectiveRow label="Min Trading Days" current="2" target="5" done={false} />
      <ObjectiveRow label="Profit Target" current="$4,250" target="$10k" done={false} />
      <ObjectiveRow label="No Hedging" current="Pass" target="Pass" done={true} />
    </div>

    <div className="mt-auto bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 p-4 rounded-xl">
      <div className="flex items-start gap-3">
          <Lock size={16} className="text-blue-600 dark:text-blue-500 mt-0.5" />
          <div>
              <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400">Payout Locked</h4>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/60 mt-1 leading-relaxed">
                  Trade 3 more days to unlock your first payout of <span className="text-slate-900 dark:text-white font-mono font-bold">$3,400.00</span>.
              </p>
          </div>
      </div>
    </div>

  </aside>
);
};

const ObjectiveRow = ({ label, current, target, done }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/5">
      <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${done ? 'bg-green-500' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
          <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
      </div>
      <div className="text-xs font-mono">
          <span className={done ? 'text-green-600 dark:text-green-500 font-bold' : 'text-slate-900 dark:text-white'}>{current}</span>
          <span className="text-slate-500 dark:text-slate-600"> / {target}</span>
      </div>
  </div>
);