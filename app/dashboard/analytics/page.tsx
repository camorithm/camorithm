'use client';

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award,
  Calendar,
  DollarSign,
  Percent,
  Activity
} from 'lucide-react';

// --- MOCK DATA ---
const equityCurveData = [
  { date: 'Jan 1', equity: 100000, balance: 100000 },
  { date: 'Jan 8', equity: 102500, balance: 102000 },
  { date: 'Jan 15', equity: 101800, balance: 101500 },
  { date: 'Jan 22', equity: 104200, balance: 103800 },
  { date: 'Jan 29', equity: 103500, balance: 103200 },
  { date: 'Feb 5', equity: 105800, balance: 105200 },
  { date: 'Feb 12', equity: 107200, balance: 106800 },
  { date: 'Feb 19', equity: 106500, balance: 106200 },
  { date: 'Feb 26', equity: 109100, balance: 108500 },
  { date: 'Mar 5', equity: 108200, balance: 107800 },
  { date: 'Mar 12', equity: 110500, balance: 109800 },
  { date: 'Mar 19', equity: 109800, balance: 109200 },
  { date: 'Mar 26', equity: 112400, balance: 111600 },
  { date: 'Apr 2', equity: 111200, balance: 110800 },
  { date: 'Today', equity: 114250, balance: 113800 },
];

const monthlyPLData = [
  { month: 'Jan', profit: 3800, loss: -1200 },
  { month: 'Feb', profit: 5200, loss: -800 },
  { month: 'Mar', profit: 4600, loss: -1400 },
  { month: 'Apr', profit: 2800, loss: -600 },
];

const pairPerformanceData = [
  { pair: 'EURUSD', profit: 8420, trades: 45, winRate: 71 },
  { pair: 'GBPUSD', profit: 5280, trades: 32, winRate: 68 },
  { pair: 'XAUUSD', profit: 4150, trades: 28, winRate: 64 },
  { pair: 'BTCUSD', profit: 3890, trades: 18, winRate: 61 },
  { pair: 'US30', profit: 2140, trades: 24, winRate: 58 },
  { pair: 'EURJPY', profit: -820, trades: 15, winRate: 47 },
];

const winLossData = [
  { name: 'Wins', value: 82, color: '#10b981' },
  { name: 'Losses', value: 38, color: '#ef4444' },
];

const tradingTimeHeatmap = [
  { hour: '00:00', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
  { hour: '02:00', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
  { hour: '04:00', mon: 0, tue: 1, wed: 0, thu: 0, fri: 1 },
  { hour: '06:00', mon: 2, tue: 3, wed: 2, thu: 3, fri: 2 },
  { hour: '08:00', mon: 5, tue: 4, wed: 6, thu: 5, fri: 4 },
  { hour: '10:00', mon: 8, tue: 7, wed: 9, thu: 8, fri: 7 },
  { hour: '12:00', mon: 6, tue: 5, wed: 7, thu: 6, fri: 5 },
  { hour: '14:00', mon: 9, tue: 8, wed: 10, thu: 9, fri: 8 },
  { hour: '16:00', mon: 7, tue: 6, wed: 8, thu: 7, fri: 6 },
  { hour: '18:00', mon: 4, tue: 3, wed: 5, thu: 4, fri: 3 },
  { hour: '20:00', mon: 2, tue: 1, wed: 3, thu: 2, fri: 1 },
  { hour: '22:00', mon: 0, tue: 0, wed: 1, thu: 0, fri: 0 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('all');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      
      {/* HEADER WITH TIME SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Performance Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track your trading performance and identify patterns</p>
        </div>
        
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', 'All'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeframe === period.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white dark:bg-[#0f1115] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-blue-500/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KEY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign className="text-green-500" />}
          label="Total Profit"
          value="$14,250"
          change="+14.25%"
          isPositive
        />
        <MetricCard
          icon={<Percent className="text-blue-500" />}
          label="Win Rate"
          value="68.3%"
          change="+2.3%"
          isPositive
        />
        <MetricCard
          icon={<Target className="text-purple-500" />}
          label="Profit Factor"
          value="2.45"
          change="+0.12"
          isPositive
        />
        <MetricCard
          icon={<Award className="text-orange-500" />}
          label="Best Day"
          value="$2,840"
          change="Mar 12"
          isPositive
        />
      </div>

      {/* EQUITY CURVE */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Equity Curve</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Account growth over time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Equity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Balance</span>
            </div>
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equityCurveData}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                orientation="right"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 17, 21, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="equity" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#equityGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#94a3b8" 
                strokeWidth={1}
                strokeDasharray="5 5"
                fillOpacity={0} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MONTHLY P&L + WIN/LOSS DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly P&L */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Monthly Performance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Profit and loss by month</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPLData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.1} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 17, 21, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="loss" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win/Loss Donut */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Win/Loss Ratio</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Total trades: 120</p>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">68.3%</div>
              <div className="text-xs text-slate-500">Win Rate</div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">82 Wins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">38 Losses</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAIR PERFORMANCE */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Performance by Pair</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Best and worst performing instruments</p>
        <div className="space-y-4">
          {pairPerformanceData.map((item) => (
            <div key={item.pair} className="flex items-center gap-4">
              <div className="w-20 font-mono font-bold text-sm text-slate-700 dark:text-slate-300">
                {item.pair}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.profit > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.abs(item.profit) / 100}%` }}
                    ></div>
                  </div>
                  <div className={`font-mono font-bold text-sm w-24 text-right ${item.profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.profit > 0 ? '+' : ''}${item.profit.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>{item.trades} trades</span>
                  <span>•</span>
                  <span>{item.winRate}% win rate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRADING TIME HEATMAP */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-blue-500" size={20} />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trading Activity Heatmap</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Number of trades by time and day</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 p-2"></th>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                  <th key={day} className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 p-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tradingTimeHeatmap.map((row) => (
                <tr key={row.hour}>
                  <td className="text-xs font-mono text-slate-500 dark:text-slate-400 p-1 pr-4">
                    {row.hour}
                  </td>
                  {['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => {
                    const value = row[day as keyof typeof row] as number;
                    const intensity = value === 0 ? 0 : Math.min(value / 10, 1);
                    return (
                      <td key={day} className="p-1">
                        <div 
                          className="w-12 h-8 rounded flex items-center justify-center text-xs font-mono transition-all hover:scale-110 cursor-pointer"
                          style={{ 
                            backgroundColor: value === 0 
                              ? 'rgba(148, 163, 184, 0.1)' 
                              : `rgba(59, 130, 246, ${0.2 + intensity * 0.8})`,
                            color: value > 5 ? '#fff' : '#94a3b8'
                          }}
                          title={`${value} trades`}
                        >
                          {value > 0 ? value : ''}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4 text-xs text-slate-500">
          <span>Less</span>
          {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
            <div 
              key={opacity}
              className="w-6 h-4 rounded"
              style={{ backgroundColor: `rgba(59, 130, 246, ${opacity})` }}
            ></div>
          ))}
          <span>More</span>
        </div>
      </div>

      {/* RISK METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskMetricCard
          label="Sharpe Ratio"
          value="2.45"
          description="Risk-adjusted return measure"
          icon="📊"
        />
        <RiskMetricCard
          label="Max Drawdown"
          value="8.2%"
          description="Largest peak-to-trough decline"
          icon="📉"
          isNegative
        />
        <RiskMetricCard
          label="Recovery Factor"
          value="3.12"
          description="Net profit / max drawdown"
          icon="🔄"
        />
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const MetricCard = ({ icon, label, value, change, isPositive }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </div>
    </div>
    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</div>
    <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
  </div>
);

const RiskMetricCard = ({ label, value, description, icon, isNegative }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
    <div className="text-3xl mb-3">{icon}</div>
    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{label}</div>
    <div className={`text-3xl font-bold mb-2 ${isNegative ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
      {value}
    </div>
    <div className="text-xs text-slate-400 dark:text-slate-500">{description}</div>
  </div>
);