'use client';

import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Calendar, Target, Percent, 
  DollarSign, ArrowUpRight, ArrowDownRight, Activity,
  Filter, Download, Calendar as CalendarIcon
} from 'lucide-react';

// --- MOCK DATA ---
const equityData = [
  { date: 'Week 1', equity: 100000, balance: 100000, drawdown: 0 },
  { date: 'Week 2', equity: 102500, balance: 101800, drawdown: -500 },
  { date: 'Week 3', equity: 101800, balance: 101200, drawdown: -1200 },
  { date: 'Week 4', equity: 104200, balance: 103500, drawdown: -300 },
  { date: 'Week 5', equity: 106800, balance: 105900, drawdown: 0 },
  { date: 'Week 6', equity: 105200, balance: 104800, drawdown: -1600 },
  { date: 'Week 7', equity: 108500, balance: 107200, drawdown: -200 },
  { date: 'Week 8', equity: 110300, balance: 109500, drawdown: 0 },
];

const winRateData = [
  { name: 'Wins', value: 68, color: '#10b981' },
  { name: 'Losses', value: 32, color: '#ef4444' },
];

const profitBySymbol = [
  { symbol: 'EURUSD', profit: 4250, trades: 45, winRate: 71 },
  { symbol: 'GBPUSD', profit: 2800, trades: 32, winRate: 65 },
  { symbol: 'XAUUSD', profit: 3200, trades: 28, winRate: 75 },
  { symbol: 'BTCUSD', profit: 1900, trades: 15, winRate: 60 },
  { symbol: 'US30', profit: 1600, trades: 22, winRate: 68 },
];

const timeOfDayData = [
  { hour: '00-04', profit: 320, trades: 5 },
  { hour: '04-08', profit: -180, trades: 8 },
  { hour: '08-12', profit: 2400, trades: 42 },
  { hour: '12-16', profit: 3100, trades: 38 },
  { hour: '16-20', profit: 2800, trades: 35 },
  { hour: '20-24', profit: 880, trades: 12 },
];

const dailyPnL = [
  { day: 'Mon', pnl: 850 },
  { day: 'Tue', pnl: -320 },
  { day: 'Wed', pnl: 1200 },
  { day: 'Thu', pnl: 640 },
  { day: 'Fri', pnl: 1420 },
  { day: 'Sat', pnl: 0 },
  { day: 'Sun', pnl: 0 },
];

const drawdownHistory = [
  { date: 'W1', drawdown: 0 },
  { date: 'W2', drawdown: -500 },
  { date: 'W3', drawdown: -1200 },
  { date: 'W4', drawdown: -300 },
  { date: 'W5', drawdown: 0 },
  { date: 'W6', drawdown: -1600 },
  { date: 'W7', drawdown: -200 },
  { date: 'W8', drawdown: 0 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('1M');

  return (
    <div className="space-y-6">
      
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Performance Analytics</h1>
          <p className="text-sm text-slate-500">Deep dive into your trading metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-lg p-1">
            {['1W', '1M', '3M', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Profit"
          value="$10,320"
          change="+23.5%"
          trend="up"
          icon={<DollarSign size={18} />}
        />
        <MetricCard
          label="Win Rate"
          value="68.5%"
          change="+2.3%"
          trend="up"
          icon={<Target size={18} />}
        />
        <MetricCard
          label="Profit Factor"
          value="2.4"
          change="+0.3"
          trend="up"
          icon={<Activity size={18} />}
        />
        <MetricCard
          label="Avg R:R"
          value="1:2.4"
          change="+0.2"
          trend="up"
          icon={<Percent size={18} />}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Equity Curve - 2/3 width */}
        <div className="lg:col-span-2">
          <ChartCard title="Equity Curve" subtitle="Account growth over time">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#equityGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Win Rate Pie - 1/3 width */}
        <div className="lg:col-span-1">
          <ChartCard title="Win/Loss Ratio" subtitle="Overall success rate">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {winRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Wins (68%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Losses (32%)</span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Time of Day Performance */}
        <ChartCard title="Performance by Time" subtitle="Best trading hours">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeOfDayData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value: any) => [`$${value}`, 'Profit']}
              />
              <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Drawdown Chart */}
        <ChartCard title="Drawdown History" subtitle="Risk exposure over time">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={drawdownHistory}>
              <defs>
                <linearGradient id="ddGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value: any) => [`$${value}`, 'Drawdown']}
              />
              <Area type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#ddGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Profit by Symbol Table */}
      <ChartCard title="Performance by Symbol" subtitle="Top performing instruments">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-white/5">
              <tr className="text-left text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold text-right">Profit</th>
                <th className="pb-3 font-semibold text-right">Trades</th>
                <th className="pb-3 font-semibold text-right">Win Rate</th>
                <th className="pb-3 font-semibold text-right">Avg Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {profitBySymbol.map((row) => (
                <tr key={row.symbol} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">
                        {row.symbol[0]}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{row.symbol}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      +${row.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    {row.trades}
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${row.winRate}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{row.winRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    ${Math.round(row.profit / row.trades)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Daily P&L Bar Chart */}
      <ChartCard title="Daily P&L" subtitle="Weekly performance breakdown">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyPnL}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value: any) => [`$${value}`, 'P&L']}
            />
            <Bar 
              dataKey="pnl" 
              radius={[4, 4, 0, 0]}
              fill="#3b82f6"
            >
              {dailyPnL.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}

// --- SUB-COMPONENTS ---

const MetricCard = ({ label, value, change, trend, icon }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${
        trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</div>
    <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
  </div>
);

const ChartCard = ({ title, subtitle, children }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
    {children}
  </div>
);