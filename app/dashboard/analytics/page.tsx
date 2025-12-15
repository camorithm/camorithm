'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Calendar, Clock, Award, DollarSign } from 'lucide-react';
import { useTrades } from '../../../hooks/useTrades';

export default function AnalyticsPage() {
  const { trades, loading } = useTrades();

  // Calculate all analytics
  const analytics = useMemo(() => {
    if (!trades || trades.length === 0) return null;

    const winTrades = trades.filter(t => t.status === 'win');
    const lossTrades = trades.filter(t => t.status === 'loss');
    
    // 1. Win Rate by Symbol
    const symbolStats = trades.reduce((acc: any, trade) => {
      if (!acc[trade.symbol]) {
        acc[trade.symbol] = { wins: 0, losses: 0, total: 0, profit: 0 };
      }
      acc[trade.symbol].total++;
      // Use camelCase for TypeScript
      acc[trade.symbol].profit += (trade as any).netProfit || 0;
      if (trade.status === 'win') acc[trade.symbol].wins++;
      if (trade.status === 'loss') acc[trade.symbol].losses++;
      return acc;
    }, {});

    const winRateBySymbol = Object.entries(symbolStats).map(([symbol, stats]: [string, any]) => ({
      symbol,
      winRate: (stats.wins / stats.total) * 100,
      trades: stats.total,
      profit: stats.profit,
    })).sort((a, b) => b.winRate - a.winRate);

    // 2. Win Rate by Time of Day (24 hours)
    const hourStats = Array.from({ length: 24 }, (_, hour) => {
      const hourTrades = trades.filter(t => {
        // Handle both camelCase and snake_case
        const openTime = (t as any).openTime || (t as any).open_time;
        const tradeHour = new Date(openTime).getHours();
        return tradeHour === hour;
      });
      const wins = hourTrades.filter(t => t.status === 'win').length;
      return {
        hour: `${hour.toString().padStart(2, '0')}:00`,
        winRate: hourTrades.length > 0 ? (wins / hourTrades.length) * 100 : 0,
        trades: hourTrades.length,
      };
    });

    // 3. Win Rate by Day of Week
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayStats = Array.from({ length: 7 }, (_, day) => {
      const dayTrades = trades.filter(t => {
        const openTime = (t as any).openTime || (t as any).open_time;
        return new Date(openTime).getDay() === day;
      });
      const wins = dayTrades.filter(t => t.status === 'win').length;
      return {
        day: dayNames[day],
        winRate: dayTrades.length > 0 ? (wins / dayTrades.length) * 100 : 0,
        trades: dayTrades.length,
      };
    }).filter(d => d.trades > 0);

    // 4. R-Multiple Distribution (simplified - using profit ranges)
    const rMultiples = trades.map(t => {
      const profit = (t as any).netProfit || 0;
      if (profit > 2000) return '3R+';
      if (profit > 1000) return '2R-3R';
      if (profit > 500) return '1R-2R';
      if (profit > 0) return '0-1R';
      if (profit > -500) return '-1R-0';
      if (profit > -1000) return '-2R--1R';
      return '-3R-';
    });

    const rMultipleDistribution = ['3R+', '2R-3R', '1R-2R', '0-1R', '-1R-0', '-2R--1R', '-3R-'].map(range => ({
      range,
      count: rMultiples.filter(r => r === range).length,
    }));

    // 5. Monthly Performance
    const monthlyStats = trades.reduce((acc: any, trade) => {
      const openTime = (trade as any).openTime || (trade as any).open_time;
      const month = new Date(openTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!acc[month]) {
        acc[month] = { month, profit: 0, trades: 0, wins: 0 };
      }
      acc[month].profit += (trade as any).netProfit || 0;
      acc[month].trades++;
      if (trade.status === 'win') acc[month].wins++;
      return acc;
    }, {});

    const monthlyPerformance = Object.values(monthlyStats)
      .sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // 6. Equity Curve
    const sortedTrades = [...trades].sort((a, b) => {
      const aTime = (a as any).closeTime || (a as any).close_time || (a as any).openTime || (a as any).open_time;
      const bTime = (b as any).closeTime || (b as any).close_time || (b as any).openTime || (b as any).open_time;
      return new Date(aTime).getTime() - new Date(bTime).getTime();
    });

    let runningEquity = 100000; // Starting balance
    const equityCurve = sortedTrades.map((trade, index) => {
      runningEquity += (trade as any).netProfit || 0;
      const closeTime = (trade as any).closeTime || (trade as any).close_time || (trade as any).openTime || (trade as any).open_time;
      return {
        trade: index + 1,
        equity: runningEquity,
        date: new Date(closeTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
    });

    // Calculate max drawdown
    let peak = 100000;
    let maxDrawdown = 0;
    equityCurve.forEach(point => {
      if (point.equity > peak) peak = point.equity;
      const drawdown = ((peak - point.equity) / peak) * 100;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    // 7. Overall Stats
    const totalProfit = trades.reduce((sum, t) => sum + ((t as any).netProfit || 0), 0);
    const totalWinProfit = winTrades.reduce((sum, t) => sum + ((t as any).netProfit || 0), 0);
    const totalLossProfit = Math.abs(lossTrades.reduce((sum, t) => sum + ((t as any).netProfit || 0), 0));
    const profitFactor = totalLossProfit > 0 ? totalWinProfit / totalLossProfit : 0;
    const avgWin = winTrades.length > 0 ? totalWinProfit / winTrades.length : 0;
    const avgLoss = lossTrades.length > 0 ? totalLossProfit / lossTrades.length : 0;

    return {
      winRateBySymbol,
      hourStats,
      dayStats,
      rMultipleDistribution,
      monthlyPerformance,
      equityCurve,
      overallStats: {
        totalTrades: trades.length,
        winRate: (winTrades.length / trades.length) * 100,
        profitFactor,
        totalProfit,
        maxDrawdown,
        avgWin,
        avgLoss,
        expectancy: (avgWin * (winTrades.length / trades.length)) - (avgLoss * (lossTrades.length / trades.length)),
      },
    };
  }, [trades]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <TrendingUp className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Trades Yet</h3>
        <p className="text-slate-500">Start trading to see your analytics!</p>
      </div>
    );
  }

  const { overallStats } = analytics;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Trading Analytics</h1>
        <p className="text-slate-500">Deep insights into your trading performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Win Rate"
          value={`${overallStats.winRate.toFixed(1)}%`}
          trend={overallStats.winRate >= 50 ? 'up' : 'down'}
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Profit Factor"
          value={overallStats.profitFactor.toFixed(2)}
          trend={overallStats.profitFactor >= 1.5 ? 'up' : 'down'}
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Expectancy"
          value={`$${overallStats.expectancy.toFixed(2)}`}
          trend={overallStats.expectancy > 0 ? 'up' : 'down'}
        />
        <StatCard
          icon={<TrendingDown className="w-5 h-5" />}
          label="Max Drawdown"
          value={`${overallStats.maxDrawdown.toFixed(1)}%`}
          trend="neutral"
        />
      </div>

      {/* Win Rate by Symbol */}
      <ChartCard title="Win Rate by Symbol" icon={<Target />}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.winRateBySymbol}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="symbol" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
              formatter={(value: any, name: string) => [
                name === 'winRate' ? `${value.toFixed(1)}%` : value,
                name === 'winRate' ? 'Win Rate' : name
              ]}
            />
            <Bar dataKey="winRate" radius={[8, 8, 0, 0]}>
              {analytics.winRateBySymbol.map((entry, index) => (
                <Cell key={index} fill={entry.winRate >= 50 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Win Rate by Time of Day */}
        <ChartCard title="Win Rate by Time of Day" icon={<Clock />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.hourStats.filter(h => h.trades > 0)}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                formatter={(value: any) => `${value.toFixed(1)}%`}
              />
              <Bar dataKey="winRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Win Rate by Day of Week */}
        <ChartCard title="Win Rate by Day of Week" icon={<Calendar />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.dayStats}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                formatter={(value: any) => `${value.toFixed(1)}%`}
              />
              <Bar dataKey="winRate" radius={[8, 8, 0, 0]}>
                {analytics.dayStats.map((entry, index) => (
                  <Cell key={index} fill={entry.winRate >= 50 ? '#10b981' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* R-Multiple Distribution */}
      <ChartCard title="R-Multiple Distribution" icon={<Award />}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.rMultipleDistribution}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="range" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Performance */}
      <ChartCard title="Monthly Performance" icon={<TrendingUp />}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.monthlyPerformance}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
              formatter={(value: any, name: string) => [
                name === 'profit' ? `$${value.toFixed(2)}` : value,
                name === 'profit' ? 'Profit' : name
              ]}
            />
            <Bar dataKey="profit" radius={[8, 8, 0, 0]}>
              {analytics.monthlyPerformance.map((entry: any, index) => (
                <Cell key={index} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Equity Curve with Drawdown */}
      <ChartCard title="Equity Curve" icon={<DollarSign />}>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={analytics.equityCurve}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
              formatter={(value: any) => [`$${value.toFixed(2)}`, 'Equity']}
            />
            <Area type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={2} fill="url(#equityGradient)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-slate-600 dark:text-slate-400">
            Starting: <span className="font-mono font-bold text-slate-900 dark:text-white">$100,000</span>
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            Current: <span className="font-mono font-bold text-green-600">
              ${analytics.equityCurve[analytics.equityCurve.length - 1]?.equity.toFixed(2)}
            </span>
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            Max DD: <span className="font-mono font-bold text-red-600">{overallStats.maxDrawdown.toFixed(1)}%</span>
          </div>
        </div>
      </ChartCard>

    </div>
  );
}

// Helper Components
const StatCard = ({ icon, label, value, trend }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg ${
        trend === 'up' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400' :
        trend === 'down' ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
        'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
      }`}>
        {icon}
      </div>
      {trend !== 'neutral' && (
        trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" /> :
        <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
      )}
    </div>
    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</div>
    <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
  </div>
);

const ChartCard = ({ title, icon, children }: any) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    </div>
    {children}
  </div>
);