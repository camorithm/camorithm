'use client';

import React from 'react';
import { 
MoreHorizontal, 
ArrowUpRight, 
ArrowDownRight, 
Download,
Calendar,
Filter
} from 'lucide-react';

export default function DashboardPage() {
return (
  <div className="max-w-6xl mx-auto">
    {/* Page Controls */}
    <div className="flex items-center justify-between mb-8">
       <div className="flex items-center gap-4">
          <SelectDropdown label="Last 7 Days" />
          <span className="text-slate-300 text-sm">vs.</span>
          <SelectDropdown label="Previous Period" />
       </div>
       
       <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
             <Filter size={14} />
             Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
             <Download size={14} />
             Export
          </button>
       </div>
    </div>

    <div className="mb-6">
       <h1 className="text-2xl font-bold mb-1">Account Equity</h1>
       <p className="text-slate-500 text-sm">Real-time performance of your $100k Challenge.</p>
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
       {/* CHART CARD (2 Columns) */}
       <div className="lg:col-span-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-8">
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <h2 className="text-sm font-medium text-slate-500">Current Equity</h2>
                   <HelpIcon />
                </div>
                <div className="flex items-end gap-3">
                   <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">$104,250.00</span>
                   <span className="flex items-center text-sm font-bold text-green-500 mb-1.5 bg-green-500/10 px-1.5 py-0.5 rounded">
                      <ArrowUpRight size={14} className="mr-1" />
                      4.25%
                   </span>
                </div>
             </div>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-400">
                <MoreHorizontal size={20} />
             </button>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="h-[300px] w-full relative">
             {/* Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
                {[105000, 104000, 103000, 102000, 101000].map((val, i) => (
                   <div key={i} className="flex items-center w-full">
                      <span className="w-12 text-right pr-3 opacity-50">${val/1000}k</span>
                      <div className="flex-1 h-px bg-slate-100 dark:bg-white/5 border-t border-dashed border-slate-200 dark:border-white/5"></div>
                   </div>
                ))}
             </div>
             
             {/* The Line */}
             <svg className="absolute inset-0 w-full h-full pl-12 pt-3 pb-3 overflow-visible">
                <path 
                   d="M0 250 C 50 240, 100 245, 150 200 S 250 150, 350 160 S 500 80, 600 50" 
                   fill="none" 
                   stroke="#2563eb" 
                   strokeWidth="3" 
                   vectorEffect="non-scaling-stroke"
                   className="drop-shadow-lg"
                />
                {/* Area under curve */}
                <path 
                   d="M0 250 C 50 240, 100 245, 150 200 S 250 150, 350 160 S 500 80, 600 50 V 300 H 0 Z" 
                   fill="url(#blueGradient)" 
                   opacity="0.2"
                />
                <defs>
                   <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                   </linearGradient>
                </defs>
             </svg>
          </div>
          
          <div className="flex justify-between pl-12 pt-4 text-xs font-medium text-slate-400">
             <span>Nov 26</span>
             <span>Nov 28</span>
             <span>Nov 30</span>
             <span>Dec 02</span>
             <span>Dec 04</span>
          </div>
       </div>

       {/* RANK / LIST CARD (1 Column) */}
       <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Top Pairs</h3>
                <HelpIcon />
             </div>
             <button className="text-xs font-medium text-slate-400 hover:text-blue-500">View All</button>
          </div>

          <div className="space-y-6">
             <ListItem pair="EURUSD" value="$1,240" percent="+2.4%" isPositive />
             <ListItem pair="GBPUSD" value="$850" percent="+1.1%" isPositive />
             <ListItem pair="XAUUSD" value="-$320" percent="-0.4%" isPositive={false} />
             <ListItem pair="USDCAD" value="$120" percent="+0.1%" isPositive />
             <ListItem pair="BTCUSD" value="-$890" percent="-1.2%" isPositive={false} />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
             <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Win Rate</span>
                <span className="font-bold">68%</span>
             </div>
             <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-blue-600 rounded-full"></div>
             </div>
          </div>
       </div>
    </div>
    
    {/* Recent Trades Table (Clean Style) */}
    <div className="mt-6 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
       <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Recent Trades</h3>
          <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400">
             <MoreHorizontal size={16} />
          </button>
       </div>
       <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 font-medium border-b border-slate-200 dark:border-white/5">
             <tr>
                <th className="px-6 py-3">Symbol</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Volume</th>
                <th className="px-6 py-3">Open Price</th>
                <th className="px-6 py-3">Profit/Loss</th>
                <th className="px-6 py-3 text-right">Status</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
             <TradeRow symbol="EURUSD" type="Buy" vol="5.0" open="1.0850" pl="+$450.00" status="Closed" />
             <TradeRow symbol="GBPUSD" type="Sell" vol="2.5" open="1.2400" pl="+$120.50" status="Closed" />
             <TradeRow symbol="XAUUSD" type="Buy" vol="1.0" open="2045.50" pl="-$45.00" status="Open" isLoss />
          </tbody>
       </table>
    </div>
  </div>
);
}

// --- Helper Components ---

const SelectDropdown = ({ label }: { label: string }) => (
 <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors">
    {label}
    <ChevronDown size={14} className="text-slate-400" />
 </button>
);

const HelpIcon = () => (
 <span className="text-slate-300 hover:text-slate-500 cursor-help">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
 </span>
);

const ListItem = ({ pair, value, percent, isPositive }: any) => (
 <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-500">
          {pair.substring(0,3)}
       </div>
       <span className="font-medium text-sm text-slate-700 dark:text-slate-200">{pair}</span>
    </div>
    <div className="text-right">
       <div className="text-sm font-bold text-slate-900 dark:text-white">{value}</div>
       <div className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{percent}</div>
    </div>
 </div>
);

const TradeRow = ({ symbol, type, vol, open, pl, status, isLoss }: any) => (
 <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{symbol}</td>
    <td className={`px-6 py-4 ${type === 'Buy' ? 'text-blue-500' : 'text-orange-500'}`}>{type}</td>
    <td className="px-6 py-4 text-slate-500">{vol}</td>
    <td className="px-6 py-4 text-slate-500">{open}</td>
    <td className={`px-6 py-4 font-medium ${isLoss ? 'text-red-500' : 'text-green-500'}`}>{pl}</td>
    <td className="px-6 py-4 text-right">
       <span className={`text-xs font-bold px-2 py-1 rounded-full ${status === 'Open' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400'}`}>
          {status}
       </span>
    </td>
 </tr>
);

// Import ChevronDown for local usage
import { ChevronDown } from 'lucide-react';