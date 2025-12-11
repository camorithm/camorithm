'use client';

import React from 'react';
import { 
Trophy, 
Timer, 
TrendingUp, 
Users, 
Medal, 
ArrowUpRight,
Search,
Globe
} from 'lucide-react';

// --- MOCK DATA ---
const leaderboard = [
{ rank: 1, name: 'AlexTradez', country: 'GB', profit: 42500, return: 42.5, equity: [10, 12, 15, 25, 30, 42] },
{ rank: 2, name: 'ForexKing99', country: 'DE', profit: 38200, return: 38.2, equity: [5, 8, 12, 20, 35, 38] },
{ rank: 3, name: 'JapansFinest', country: 'JP', profit: 31050, return: 31.0, equity: [2, 5, 8, 15, 20, 31] },
{ rank: 4, name: 'US_Sniper', country: 'US', profit: 28400, return: 28.4, equity: [10, 11, 12, 15, 20, 28] },
{ rank: 5, name: 'CryptoWhale', country: 'AE', profit: 25100, return: 25.1, equity: [5, 15, 10, 20, 22, 25] },
{ rank: 6, name: 'BrazilTrader', country: 'BR', profit: 21000, return: 21.0, equity: [2, 4, 6, 8, 15, 21] },
{ rank: 7, name: 'AussiePip', country: 'AU', profit: 18500, return: 18.5, equity: [5, 6, 8, 10, 12, 18] },
];

export default function CompetitionsPage() {
return (
  <div className="max-w-7xl mx-auto pb-20">
    
    {/* HEADER WITH TIMER */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
         <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Live Competition
         </div>
         <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">December Trading Cup</h1>
         <p className="text-slate-500 text-sm max-w-lg">
            Compete against 12,500 traders for a chance to win a $200k Challenge Account. 
            Highest ROI wins.
         </p>
      </div>

      {/* Countdown Card */}
      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl p-4 flex items-center gap-6 shadow-xl shadow-blue-900/20">
         <div>
            <div className="text-[10px] uppercase opacity-70 font-bold mb-1">Time Remaining</div>
            <div className="flex items-center gap-2 font-mono text-xl font-bold">
               <Timer size={20} className="text-blue-500" />
               14d : 06h : 42m
            </div>
         </div>
         <div className="h-8 w-px bg-white/20 dark:bg-black/10"></div>
         <div>
            <div className="text-[10px] uppercase opacity-70 font-bold mb-1">Prize Pool</div>
            <div className="text-xl font-bold text-green-400 dark:text-green-600">$50,000</div>
         </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
       
       {/* LEFT COLUMN: LEADERBOARD (3 Cols Wide) */}
       <div className="lg:col-span-3 space-y-8">
          
          {/* 1. THE PODIUM (Top 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <PodiumCard rank={2} data={leaderboard[1]} color="from-slate-300 to-slate-400" />
             <PodiumCard rank={1} data={leaderboard[0]} color="from-yellow-300 to-yellow-500" isFirst />
             <PodiumCard rank={3} data={leaderboard[2]} color="from-orange-300 to-orange-400" />
          </div>

          {/* 2. THE LIST (Rank 4+) */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
             {/* Table Controls */}
             <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Global Ranking</h3>
                <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input 
                      type="text" 
                      placeholder="Search trader..." 
                      className="pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-48"
                   />
                </div>
             </div>

             {/* Table Header */}
             <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-white/[0.02] text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Trader</div>
                <div className="col-span-3 text-right">Return</div>
                <div className="col-span-4 text-right">Profit</div>
             </div>

             {/* Table Rows */}
             <div className="divide-y divide-slate-100 dark:divide-white/5">
                {leaderboard.slice(3).map((trader) => (
                   <div key={trader.rank} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                      <div className="col-span-1 font-mono font-bold text-slate-400">#{trader.rank}</div>
                      <div className="col-span-4 flex items-center gap-3">
                         <img 
                            src={`https://flagcdn.com/${trader.country.toLowerCase()}.svg`} 
                            alt={trader.country} 
                            className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
                         />
                         <span className="font-medium text-slate-700 dark:text-slate-200">{trader.name}</span>
                      </div>
                      <div className="col-span-3 text-right font-bold text-green-500">
                         +{trader.return}%
                      </div>
                      <div className="col-span-4 text-right font-mono text-slate-600 dark:text-slate-400">
                         ${trader.profit.toLocaleString()}
                      </div>
                   </div>
                ))}
             </div>
             
             <div className="p-4 border-t border-slate-200 dark:border-white/5 text-center">
                <button className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                   View Top 100
                </button>
             </div>
          </div>
       </div>

       {/* RIGHT COLUMN: MY STATS (1 Col Wide) */}
       <div className="space-y-6">
          
          {/* My Rank Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-2 opacity-80 text-xs font-medium uppercase mb-4">
                   <Users size={14} /> My Standing
                </div>
                <div className="text-4xl font-bold mb-1">#1,204</div>
                <div className="text-sm opacity-80 mb-6">Top 15% of traders</div>

                <div className="space-y-3">
                   <StatRow label="Return" value="+4.2%" />
                   <StatRow label="Profit" value="$4,200" />
                   <StatRow label="Trades" value="42" />
                </div>
             </div>
          </div>

          {/* Rules Card */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Competition Rules</h3>
             <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                   Max Drawdown: 10%
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                   Max Daily Loss: 5%
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                   Min Trading Days: 5
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                   No HFT / Arbitrage
                </li>
             </ul>
          </div>

       </div>

    </div>
  </div>
);
}

// --- HELPER COMPONENTS ---

const PodiumCard = ({ rank, data, color, isFirst }: any) => (
 <div className={`relative overflow-hidden rounded-2xl p-6 border border-slate-200 dark:border-white/5 ${
    isFirst ? 'bg-white dark:bg-[#0f1115] md:-mt-8 shadow-xl z-10' : 'bg-slate-50 dark:bg-white/[0.02]'
 }`}>
    {/* Medal Icon */}
    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold shadow-lg`}>
       {rank}
    </div>

    <div className="flex flex-col items-center text-center mt-4">
       <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/10 mb-4 overflow-hidden border-2 border-slate-100 dark:border-white/5">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} alt="avatar" />
       </div>
       
       <div className="flex items-center gap-2 mb-1">
          <img src={`https://flagcdn.com/${data.country.toLowerCase()}.svg`} alt="flag" className="w-4 h-3 rounded-[2px]" />
          <h3 className="font-bold text-slate-900 dark:text-white">{data.name}</h3>
       </div>

       <div className="text-3xl font-bold text-green-500 my-2">
          {data.return}%
       </div>
       
       <div className="text-xs font-mono text-slate-500">
          ${data.profit.toLocaleString()} Profit
       </div>
    </div>

    {/* Mini Sparkline (Equity Curve) */}
    <div className="mt-6 h-12 flex items-end gap-1 justify-center opacity-30">
       {data.equity.map((val: number, i: number) => (
          <div key={i} style={{ height: `${val * 2}px` }} className="w-2 bg-slate-900 dark:bg-white rounded-t-sm"></div>
       ))}
    </div>
 </div>
);

const StatRow = ({ label, value }: any) => (
 <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
    <span className="opacity-70 text-sm">{label}</span>
    <span className="font-bold font-mono">{value}</span>
 </div>
);