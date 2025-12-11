'use client';

import React, { useState } from 'react';
import { 
AreaChart, 
Area, 
XAxis, 
YAxis, 
CartesianGrid, 
Tooltip, 
ResponsiveContainer,
BarChart,
Bar,
ReferenceLine
} from 'recharts';
import { 
MoreHorizontal, 
ArrowUpRight, 
Download,
Filter,
TrendingUp,
Activity
} from 'lucide-react';

// --- MOCK DATA ---
const equityData = [
{ date: 'Nov 01', value: 100000 },
{ date: 'Nov 05', value: 101200 },
{ date: 'Nov 10', value: 100800 },
{ date: 'Nov 15', value: 102500 },
{ date: 'Nov 20', value: 101900 },
{ date: 'Nov 25', value: 103400 },
{ date: 'Nov 30', value: 104250 },
];

const volumeData = [
{ day: 'Mon', buy: 40, sell: 24 },
{ day: 'Tue', buy: 30, sell: 13 },
{ day: 'Wed', buy: 20, sell: 58 },
{ day: 'Thu', buy: 27, sell: 39 },
{ day: 'Fri', buy: 18, sell: 48 },
];

// --- CUSTOM TOOLTIP COMPONENT ---
const CustomTooltip = ({ active, payload, label }: any) => {
if (active && payload && payload.length) {
  return (
    <div className="bg-white/90 dark:bg-[#13151a]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl">
      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-900 dark:text-white">
        ${payload[0].value.toLocaleString()}
      </p>
      <div className="flex items-center gap-1 mt-1 text-xs font-bold text-green-500">
        <TrendingUp size={12} />
        <span>+{(payload[0].value - 100000) / 1000}% Growth</span>
      </div>
    </div>
  );
}
return null;
};

export default function DashboardPage() {
return (
  <div className="max-w-6xl mx-auto pb-20">
    {/* Header Controls */}
    <div className="flex items-center justify-between mb-8">
       <div className="flex items-center gap-4">
          <SelectDropdown label="Last 30 Days" />
          <span className="text-slate-300 text-sm">vs.</span>
          <SelectDropdown label="Previous Period" />
       </div>
       
       <div className="flex items-center gap-3">
          <ActionBtn icon={<Filter size={14} />} label="Filters" />
          <ActionBtn icon={<Download size={14} />} label="Export Report" />
       </div>
    </div>

    <div className="mb-6">
       <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">Account Performance</h1>
       <p className="text-slate-500 text-sm">Real-time analysis of your $100k Challenge.</p>
    </div>

    {/* --- GRID LAYOUT --- */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
       
       {/* CHART 1: MAIN EQUITY CURVE */}
       <div className="lg:col-span-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-start justify-between mb-2">
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <h2 className="text-sm font-medium text-slate-500">Equity Curve</h2>
                </div>
                <div className="flex items-end gap-3">
                   <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">$104,250.00</span>
                   <span className="flex items-center text-sm font-bold text-green-500 mb-1.5 bg-green-500/10 px-2 py-0.5 rounded-md">
                      <ArrowUpRight size={14} className="mr-1" />
                      4.25%
                   </span>
                </div>
             </div>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-400">
                <MoreHorizontal size={20} />
             </button>
          </div>

          {/* RECHARTS AREA */}
          <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                   <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                   <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      dy={10}
                   />
                   <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(value) => `$${value/1000}k`}
                   />
                   <Tooltip content={<CustomTooltip />} />
                   <ReferenceLine y={110000} label="Target" stroke="green" strokeDasharray="3 3" />
                   <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      animationDuration={1500}
                   />
                </AreaChart>
             </ResponsiveContainer>
          </div>
       </div>

       {/* CHART 2: VOLUME & STATS */}
       <div className="flex flex-col gap-6">
          
          {/* Volume Bar Chart */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex-1">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200">Volume Analysis</h3>
                <Activity size={16} className="text-slate-400" />
             </div>
             <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip 
                         cursor={{fill: 'transparent'}}
                         contentStyle={{ borderRadius: '8px', border: 'none', background: '#1e293b', color: '#fff' }}
                      />
                      <Bar dataKey="buy" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" />
                      <Bar dataKey="sell" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
                   </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="text-slate-500">Longs (54%)</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <span className="text-slate-500">Shorts (46%)</span>
                </div>
             </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
             <StatCard label="Avg Win" value="$450.00" color="text-green-500" />
             <StatCard label="Avg Loss" value="-$120.50" color="text-red-500" />
          </div>
       </div>
    </div>

    {/* --- RECENT TRADES TABLE --- */}
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
       <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200">Recent Trades</h3>
          <button className="text-xs text-blue-500 font-medium hover:underline">View All Journal</button>
       </div>
       <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 font-medium border-b border-slate-200 dark:border-white/5">
             <tr>
                <th className="px-6 py-3 font-medium">Symbol</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Volume</th>
                <th className="px-6 py-3 font-medium">Open Price</th>
                <th className="px-6 py-3 font-medium">P/L</th>
                <th className="px-6 py-3 text-right font-medium">Status</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
             <TradeRow symbol="EURUSD" type="Buy" vol="5.0" open="1.0850" pl="+$450.00" status="Closed" />
             <TradeRow symbol="GBPUSD" type="Sell" vol="2.5" open="1.2400" pl="+$120.50" status="Closed" />
             <TradeRow symbol="XAUUSD" type="Buy" vol="1.0" open="2045.50" pl="-$45.00" status="Open" isLoss />
             <TradeRow symbol="USDCAD" type="Sell" vol="3.0" open="1.3500" pl="+$210.00" status="Closed" />
          </tbody>
       </table>
    </div>
  </div>
);
}

// --- HELPER COMPONENTS ---

const ActionBtn = ({ icon, label }: any) => (
 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
    {icon}
    {label}
 </button>
);

const SelectDropdown = ({ label }: { label: string }) => (
 <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors">
    {label}
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </button>
);

const StatCard = ({ label, value, color }: any) => (
 <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 p-4 rounded-xl shadow-sm">
    <div className="text-xs text-slate-400 font-medium mb-1">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
 </div>
);

const TradeRow = ({ symbol, type, vol, open, pl, status, isLoss }: any) => (
 <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
       <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></div>
       {symbol}
    </td>
    <td className={`px-6 py-4 font-medium ${type === 'Buy' ? 'text-blue-500' : 'text-orange-500'}`}>{type}</td>
    <td className="px-6 py-4 text-slate-500">{vol}</td>
    <td className="px-6 py-4 text-slate-500">{open}</td>
    <td className={`px-6 py-4 font-bold ${isLoss ? 'text-red-500' : 'text-green-500'}`}>{pl}</td>
    <td className="px-6 py-4 text-right">
       <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${status === 'Open' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'}`}>
          {status}
       </span>
    </td>
 </tr>
);