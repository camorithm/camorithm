'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Clock, Calendar, TrendingUp, TrendingDown, RefreshCw, Download, AlertTriangle } from 'lucide-react';
import { MarketTicker } from '../../components/dashboard/MarketTicker';

// --- ENHANCED DATA STRUCTURE ---
interface Trade {
  id: string;
  pair: string;
  side: 'BUY' | 'SELL';
  size: number;
  time: string;
  pl: number;
  status: 'open' | 'closed';
}

interface AccountStats {
  equity: number;
  balance: number;
  floatingPL: number;
  dailyChange: number;
  dailyChangePercent: number;
  winRate: number;
  avgRR: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
}

// --- MOCK DATA GENERATORS ---
const generateEquityData = (days: number = 30) => {
  const data = [];
  let value = 100000;
  for (let i = 0; i < days; i++) {
    value += (Math.random() - 0.45) * 500; // Slight upward bias
    data.push({
      date: i < 10 ? `0${i}` : `${i}`,
      value: Math.round(value)
    });
  }
  return data;
};

const generateTrades = (): Trade[] => {
  const pairs = ['EURUSD', 'GBPUSD', 'XAUUSD', 'US30', 'BTCUSD', 'NAS100', 'EURJPY', 'USDCAD'];
  const trades: Trade[] = [];
  
  for (let i = 0; i < 12; i++) {
    const isWin = Math.random() > 0.35;
    trades.push({
      id: `TRD-${1000 + i}`,
      pair: pairs[Math.floor(Math.random() * pairs.length)],
      side: Math.random() > 0.5 ? 'BUY' : 'SELL',
      size: parseFloat((Math.random() * 5).toFixed(2)),
      time: `${String(Math.floor(Math.random() * 12)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      pl: isWin ? Math.floor(Math.random() * 800 + 50) : -Math.floor(Math.random() * 400 + 30),
      status: Math.random() > 0.7 ? 'open' : 'closed'
    });
  }
  
  return trades.sort((a, b) => {
    const timeA = parseInt(a.time.replace(':', ''));
    const timeB = parseInt(b.time.replace(':', ''));
    return timeB - timeA;
  });
};

const newsEvents: NewsEvent[] = [
  { time: '14:00', currency: 'USD', event: 'Core CPI m/m', impact: 'High' },
  { time: '14:30', currency: 'USD', event: 'Unemployment Claims', impact: 'Med' },
  { time: '16:00', currency: 'USD', event: 'Crude Oil Inventories', impact: 'Low' },
  { time: '18:30', currency: 'EUR', event: 'ECB Press Conference', impact: 'High' },
];

// Component prop types
interface TerminalCardProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface NewsEvent {
  time: string;
  currency: string;
  event: string;
  impact: 'High' | 'Med' | 'Low';
}

interface Session {
  city: string;
  status: 'Open' | 'Closed';
  color: string;
}

interface QuickStatProps {
  label: string;
  value: string;
}

export default function EnhancedDashboardPage() {
  const [equityData, setEquityData] = useState(generateEquityData());
  const [trades, setTrades] = useState<Trade[]>(generateTrades());
  const [stats, setStats] = useState<AccountStats>({
    equity: 104250.00,
    balance: 103800.00,
    floatingPL: 450.00,
    dailyChange: 4250.00,
    dailyChangePercent: 4.25,
    winRate: 68.5,
    avgRR: 2.4,
    totalTrades: 147,
    winningTrades: 98,
    losingTrades: 49
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | 'ALL'>('1M');
  const [showRiskAlert, setShowRiskAlert] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        equity: prev.equity + (Math.random() - 0.48) * 50,
        floatingPL: prev.floatingPL + (Math.random() - 0.5) * 20
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTrades(generateTrades());
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    // Simulate export
    alert('Exporting data... (CSV download would trigger here)');
  };

  // Calculate win/loss distribution for pie chart
  const winLossData = [
    { name: 'Wins', value: stats.winningTrades, color: '#10b981' },
    { name: 'Losses', value: stats.losingTrades, color: '#ef4444' }
  ];

  return (
    <div className="flex flex-col gap-6 -mt-2">
      
      {/* 1. Market Ticker */}
      <div className="-mx-8 -mt-6 mb-2">
        <MarketTicker />
      </div>

      {/* 2. Risk Alert Banner */}
      {showRiskAlert && (
        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-bold text-sm text-orange-700 dark:text-orange-400">Daily Loss Limit Warning</h3>
              <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">You've used 15% of your daily loss limit. Trade carefully.</p>
            </div>
          </div>
          <button onClick={() => setShowRiskAlert(false)} className="text-orange-400 hover:text-orange-600">
            <span className="text-xl">×</span>
          </button>
        </div>
      )}

      {/* 3. Account Header with Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Account Overview</h2>
          <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
            Phase 1 - Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* 4. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TerminalCard 
          label="ACCOUNT EQUITY"
          icon={<TrendingUp size={16} className="text-blue-500" />}
        >
          <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white tracking-tight">
            ${stats.equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-mono px-1.5 py-0.5 rounded">
              +{stats.dailyChangePercent.toFixed(2)}%
            </span>
            <span className="text-xs text-slate-500">+${stats.dailyChange.toLocaleString()}</span>
          </div>
        </TerminalCard>
        
        <TerminalCard 
          label="BALANCE"
          icon={<Activity size={16} className="text-slate-400" />}
        >
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">
            ${stats.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Floating P/L: <span className={`font-bold ${stats.floatingPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stats.floatingPL >= 0 ? '+' : ''}${stats.floatingPL.toFixed(2)}
            </span>
          </div>
        </TerminalCard>

        <TerminalCard 
          label="WIN RATE"
          icon={<TrendingUp size={16} className="text-green-500" />}
        >
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">
            {stats.winRate.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 mt-3 rounded-full overflow-hidden">
            <div className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300" style={{ width: `${stats.winRate}%` }}></div>
          </div>
          <div className="text-xs text-slate-500 mt-2">{stats.winningTrades}W / {stats.losingTrades}L</div>
        </TerminalCard>

        <TerminalCard 
          label="AVG R:R"
          icon={<Activity size={16} className="text-purple-500" />}
        >
          <div className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300">
            1 : {stats.avgRR.toFixed(1)}
          </div>
          <div className="text-xs text-slate-500 mt-2">Risk $100 to make ${(stats.avgRR * 100).toFixed(0)}</div>
        </TerminalCard>
      </div>

      {/* 5. Main Chart & Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Equity Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Equity Curve</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                LIVE
              </div>
            </div>
            <div className="flex gap-1">
              {(['1D', '1W', '1M', 'ALL'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                  dy={10} 
                />
                <YAxis 
                  orientation="right" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                  tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderColor: '#e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Equity']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#chartGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win/Loss Pie + Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Win/Loss Distribution</h3>
            <div className="h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Wins ({stats.winningTrades})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Losses ({stats.losingTrades})</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <QuickStat label="Total Trades" value={stats.totalTrades.toString()} />
              <QuickStat label="Best Trade" value="+$1,245" />
              <QuickStat label="Worst Trade" value="-$420" />
              <QuickStat label="Avg Trade" value="+$28.91" />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Trade Log & News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Log */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Recent Trades</span>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded">
                {trades.filter(t => t.status === 'open').length} Open
              </span>
            </div>
            <Activity size={14} className="text-slate-400" />
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-xs font-mono">
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {trades.map((trade) => (
                  <TapeRow key={trade.id} {...trade} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* News & Sessions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Calendar size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Economic Calendar</span>
            </div>
            <div className="space-y-3">
              {newsEvents.map((event, i) => (
                <NewsRow key={i} {...event} />
              ))}
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
    </div>
  );
}

// --- SUB COMPONENTS ---

const TerminalCard = ({ label, icon, children }: TerminalCardProps) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 p-5 rounded-xl hover:border-blue-500/30 dark:hover:border-white/10 transition-all group shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-slate-400">
        {label}
      </div>
      {icon}
    </div>
    {children}
  </div>
);

const TapeRow = ({ id, pair, side, size, time, pl, status }: Trade) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-slate-700 dark:text-slate-300 font-bold">{pair}</span>
        {status === 'open' && (
          <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded">
            OPEN
          </span>
        )}
      </div>
    </td>
    <td className={`px-2 py-3 ${side === 'BUY' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'}`}>
      {side}
    </td>
    <td className="px-2 py-3 text-slate-500">{size.toFixed(2)}</td>
    <td className="px-2 py-3 text-slate-600">{time}</td>
    <td className={`px-4 py-3 text-right font-bold ${pl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-500'}`}>
      {pl >= 0 ? '+' : ''}${Math.abs(pl)}
    </td>
  </tr>
);

const NewsRow = ({ time, currency, event, impact }: NewsEvent) => (
  <div className="flex items-center justify-between text-xs font-mono border-l-2 border-slate-200 dark:border-white/10 pl-3 hover:border-blue-500 dark:hover:border-blue-500/50 transition-colors">
    <div className="flex items-center gap-3">
      <span className="text-slate-500">{time}</span>
      <span className="font-bold text-slate-700 dark:text-slate-300">{currency}</span>
      <span className="text-slate-600 dark:text-slate-400 max-w-[200px] truncate">{event}</span>
    </div>
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold shrink-0 ${
      impact === 'High' ? 'bg-red-500/10 text-red-500' : 
      impact === 'Med' ? 'bg-orange-500/10 text-orange-500' : 
      'bg-slate-500/10 text-slate-500'
    }`}>
      {impact}
    </span>
  </div>
);

const SessionRow = ({ city, status, color }: Session) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-700 dark:text-slate-300">{city}</span>
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
      <span className={`text-xs font-mono ${color}`}>{status}</span>
    </div>
  </div>
);

const QuickStat = ({ label, value }: QuickStatProps) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{value}</span>
  </div>
);