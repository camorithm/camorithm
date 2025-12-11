'use client';

import React, { useState } from 'react';
import { CreditCard, Shield } from 'lucide-react';

export default function ShopPage() {
const [size, setSize] = useState('100k');
const [platform, setPlatform] = useState('cTrader');
const prices: any = { '10k': 99, '25k': 199, '50k': 299, '100k': 499, '200k': 979 };
const price = prices[size];

return (
  <div className="max-w-6xl mx-auto space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center">1</span> Select Capital
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['10k', '25k', '50k', '100k', '200k'].map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`py-4 rounded-xl border text-sm font-bold transition-all ${ size === s ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10' }`}>${s.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center">2</span> Trading Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['Match-Trader', 'cTrader', 'DXtrade'].map((p) => (
              <button key={p} onClick={() => setPlatform(p)} className={`px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between ${ platform === p ? 'bg-white dark:bg-[#1a1d24] border-blue-500 ring-1 ring-blue-500' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-white/20' }`}>
                <span className={`font-semibold text-sm ${platform === p ? 'text-blue-600 dark:text-white' : 'text-slate-500'}`}>{p}</span>
                {platform === p && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <SummaryRow label="Account Size" value={`$${size.toUpperCase()}`} />
              <SummaryRow label="Platform" value={platform} />
              <SummaryRow label="Refundable Fee" value="Yes" textGreen />
            </div>
            <div className="flex items-center justify-between mb-6 border-t border-slate-100 dark:border-white/5 pt-4">
              <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-3xl text-slate-900 dark:text-white">${price}<span className="text-lg text-slate-400">.00</span></span>
            </div>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"><CreditCard size={18} /> Proceed to Payment</button>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400"><Shield size={10} /> Secure SSL Encrypted</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

const SummaryRow = ({ label, value, textGreen }: any) => (
<div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{label}</span><span className={`font-semibold text-sm ${textGreen ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>{value}</span></div>
);