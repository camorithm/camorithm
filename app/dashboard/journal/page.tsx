'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, Tag } from 'lucide-react';

const initialTrades = [
{ id: 'ORD-001', date: 'Dec 11, 10:42 AM', symbol: 'EURUSD', type: 'Buy', lots: 5.0, entry: 1.0780, exit: 1.0820, pl: 2000, status: 'Win', tags: ['Strategy A'] },
{ id: 'ORD-002', date: 'Dec 11, 09:15 AM', symbol: 'GBPUSD', type: 'Sell', lots: 2.5, entry: 1.2550, exit: 1.2580, pl: -750, status: 'Loss', tags: ['News'] },
{ id: 'ORD-003', date: 'Dec 10, 02:30 PM', symbol: 'XAUUSD', type: 'Buy', lots: 1.0, entry: 1980.50, exit: 1995.00, pl: 1450, status: 'Win', tags: ['Scalp'] },
{ id: 'ORD-004', date: 'Dec 10, 11:00 AM', symbol: 'US30', type: 'Sell', lots: 0.5, entry: 36200, exit: 36150, lots_closed: 0.5, pl: 250, status: 'Win', tags: [] },
{ id: 'ORD-005', date: 'Dec 09, 08:45 AM', symbol: 'EURJPY', type: 'Buy', lots: 3.0, entry: 155.20, exit: 154.90, pl: -820, status: 'Loss', tags: ['Impulse'] },
];

export default function JournalPage() {
const [trades] = useState(initialTrades);
const [activeFilter, setActiveFilter] = useState('All');

return (
  <div className="max-w-7xl mx-auto space-y-6">
    
    {/* FILTER BAR */}
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        <FilterChip label="All Trades" active={activeFilter === 'All'} onClick={() => setActiveFilter('All')} />
        <FilterChip label="Winners" active={activeFilter === 'Winners'} onClick={() => setActiveFilter('Winners')} count={4} />
        <FilterChip label="Losers" active={activeFilter === 'Losers'} onClick={() => setActiveFilter('Losers')} count={2} />
        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 px-2 transition-colors">
          <Filter size={14} /> <span>Advanced Filters</span>
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search symbol or tag..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64 transition-all" />
      </div>
    </div>

    {/* DATA GRID */}
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 font-semibold border-b border-slate-200 dark:border-white/5">
            <tr>
              <th className="px-6 py-4 w-[50px]"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
              <th className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"><div className="flex items-center gap-1">Date <ChevronDown size={14} /></div></th>
              <th className="px-6 py-4">Symbol</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Volume</th>
              <th className="px-6 py-4 text-right">Entry / Exit</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4 text-right">Profit</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /></td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{trade.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                    <div className="w-6 h-6 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] text-slate-500">{trade.symbol[0]}</div>
                    {trade.symbol}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${ trade.type === 'Buy' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400' }`}>
                    {trade.type === 'Buy' ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {trade.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-600 dark:text-slate-400">{trade.lots.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-slate-700 dark:text-white">{trade.entry}</span>
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1"><span className="text-slate-300">→</span> {trade.exit}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {trade.tags.length > 0 ? trade.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">{tag}</span>
                    )) : (
                      <button className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><Tag size={12} /> Add</button>
                    )}
                  </div>
                </td>
                <td className={`px-6 py-4 text-right font-bold font-mono ${ trade.pl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }`}>
                  {trade.pl > 0 ? '+' : ''}${trade.pl.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

const FilterChip = ({ label, active, onClick, count }: any) => (
<button onClick={onClick} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${ active ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5' }`}>
  {label} {count && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${ active ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400' }`}>{count}</span>}
</button>
);