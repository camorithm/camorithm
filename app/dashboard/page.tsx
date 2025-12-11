'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Calendar } from 'lucide-react';
import { MarketTicker } from '../../components/dashboard/MarketTicker';

// --- MOCK DATA ---
const equityData = [
{ date: '01', value: 100000 }, { date: '05', value: 101200 },
{ date: '10', value: 100800 }, { date: '15', value: 102500 },
{ date: '20', value: 101900 }, { date: '25', value: 103400 },
{ date: '30', value: 104250 },
];

export default function DashboardPage() {
return (
  <div className="flex flex-col gap-6 -mt-2">
    
    {/* 1. Market Ticker */}
    <div className="-mx-8 -mt-6 mb-2">
      <MarketTicker />
    </div>

    {/* 2. Account Header */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TerminalCard label="ACCOUNT EQUITY">
          <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white tracking-tight">$104,250.00</div>
          <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-mono px-1.5 py-0.5 rounded">+4.25%</span>
              <span className="text-xs text-slate-500">+$4,250.00</span>
          </div>
      </TerminalCard>
      
      <TerminalCard label="BALANCE">
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">$103,800.00</div>
          <div className="text-xs text-slate-500 mt-2">Floating P/L: <span className="text-green-600 dark:text-green-400 font-bold">+$450.00</span></div>
      </TerminalCard>

      <TerminalCard label="WIN RATE">
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">68.5%</div>
          <div className="w-full bg-slate-200 dark:bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-blue-600 dark:bg-blue-500 h-full w-[68%]"></div>
          </div>
      </TerminalCard>

      <TerminalCard label="AVG R:R">
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">1 : 2.4</div>
          <div className="text-xs text-slate-500 mt-2">Risk $100 to make $240</div>
      </TerminalCard>
    </div>

    {/* 3. Main Chart & Tape */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
      <div className="xl:col-span-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-1 relative group shadow-sm flex flex-col">
          <div className="absolute top-4 left-4 z-10 flex gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  LIVE EXECUTION
              </div>
          </div>
          <div className="flex-1 w-full bg-slate-50/50 dark:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] dark:opacity-100">
              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                  <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} dy={10} />
                  <YAxis orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e2e8f0', borderRadius: '8px', color: '#000' }}
                      itemStyle={{ color: '#0f172a', fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#chartGradient)" />
              </AreaChart>
              </ResponsiveContainer>
          </div>
      </div>

      {/* Trade Log */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trade Log</span>
              <Activity size={14} className="text-slate-400" />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-xs font-mono">
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      <TapeRow pair="EURUSD" side="BUY" size="5.00" time="10:42" pl="+$420" />
                      <TapeRow pair="GBPUSD" side="SELL" size="2.50" time="09:15" pl="+$120" />
                      <TapeRow pair="XAUUSD" side="BUY" size="1.00" time="08:30" pl="-$45" loss />
                      <TapeRow pair="US30" side="SELL" size="0.50" time="08:15" pl="+$210" />
                      <TapeRow pair="BTCUSD" side="BUY" size="0.10" time="07:45" pl="+$850" />
                      <TapeRow pair="NAS100" side="SELL" size="1.00" time="06:20" pl="-$110" loss />
                       <TapeRow pair="EURJPY" side="BUY" size="3.00" time="05:10" pl="+$330" />
                       <TapeRow pair="USDCAD" side="SELL" size="2.00" time="04:45" pl="+$150" />
                       <TapeRow pair="USDJPY" side="BUY" size="1.50" time="03:20" pl="-$80" loss />
                  </tbody>
              </table>
          </div>
      </div>
    </div>

    {/* 4. Bottom Widgets */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Calendar size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Upcoming News</span>
          </div>
          <div className="space-y-3">
              <NewsRow time="14:00" currency="USD" event="Core CPI m/m" impact="High" />
              <NewsRow time="14:30" currency="USD" event="Unemployment Claims" impact="Med" />
              <NewsRow time="16:00" currency="USD" event="Crude Oil Inventories" impact="Low" />
          </div>
      </div>

        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Market Sessions</span>
          </div>
          <div className="space-y-4">
              <SessionRow city="London" status="Open" color="text-green-500" />
              <SessionRow city="New York" status="Open" color="text-green-500" />
              <SessionRow city="Tokyo" status="Closed" color="text-slate-400" />
              <SessionRow city="Sydney" status="Closed" color="text-slate-400" />
          </div>
      </div>
    </div>
  </div>
);
}

// --- SUB COMPONENTS ---

const TerminalCard = ({ label, children }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 p-5 rounded-xl hover:border-blue-500/30 dark:hover:border-white/10 transition-colors group shadow-sm">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 group-hover:text-blue-600 dark:group-hover:text-slate-400">{label}</div>
      {children}
  </div>
);

const TapeRow = ({ pair, side, size, time, pl, loss }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-bold">{pair}</td>
      <td className={`px-2 py-3 ${side === 'BUY' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'}`}>{side}</td>
      <td className="px-2 py-3 text-slate-500">{size}</td>
      <td className="px-2 py-3 text-slate-600">{time}</td>
      <td className={`px-4 py-3 text-right font-bold ${loss ? 'text-red-500' : 'text-green-600 dark:text-green-500'}`}>{pl}</td>
  </tr>
);

const NewsRow = ({ time, currency, event, impact }: any) => (
  <div className="flex items-center justify-between text-xs font-mono border-l-2 border-slate-200 dark:border-white/10 pl-3">
      <div className="flex items-center gap-3">
          <span className="text-slate-500">{time}</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{currency}</span>
          <span className="text-slate-600 dark:text-slate-400">{event}</span>
      </div>
      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
          impact === 'High' ? 'bg-red-500/10 text-red-500' : impact === 'Med' ? 'bg-orange-500/10 text-orange-500' : 'bg-slate-500/10 text-slate-500'
      }`}>{impact}</span>
  </div>
);

const SessionRow = ({ city, status, color }: any) => (
  <div className="flex items-center justify-between">
      <span className="text-sm text-slate-700 dark:text-slate-300">{city}</span>
      <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
          <span className={`text-xs font-mono ${color}`}>{status}</span>
      </div>
  </div>
);