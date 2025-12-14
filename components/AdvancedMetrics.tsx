'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap, Award, AlertTriangle } from 'lucide-react';

interface MetricsData {
  sharpeRatio: number;
  expectancy: number;
  maxDrawdown: number;
  recoveryTime: number;
  bestDay: number;
  worstDay: number;
  winStreak: number;
  lossStreak: number;
  avgWin: number;
  avgLoss: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number;
  riskRewardRatio: number;
}

interface AdvancedMetricsProps {
  data?: MetricsData;
}

export const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ data }) => {
  // Mock data for demonstration
  const defaultData: MetricsData = {
    sharpeRatio: 2.3,
    expectancy: 145,
    maxDrawdown: -1200,
    recoveryTime: 3,
    bestDay: 850,
    worstDay: -320,
    winStreak: 7,
    lossStreak: 2,
    avgWin: 280,
    avgLoss: -150,
    largestWin: 1250,
    largestLoss: -420,
    profitFactor: 2.4,
    riskRewardRatio: 2.1,
  };

  const metrics = data || defaultData;

  // Helper to get color based on value
  const getSharpeColor = (value: number): string => {
    if (value >= 2) return 'text-green-600 dark:text-green-400';
    if (value >= 1) return 'text-blue-600 dark:text-blue-400';
    if (value >= 0) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProfitFactorColor = (value: number): string => {
    if (value >= 2) return 'text-green-600 dark:text-green-400';
    if (value >= 1.5) return 'text-blue-600 dark:text-blue-400';
    if (value >= 1) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sharpe Ratio */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sharpe Ratio</div>
          </div>
          <div className={`text-3xl font-bold ${getSharpeColor(metrics.sharpeRatio)}`}>
            {metrics.sharpeRatio.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {metrics.sharpeRatio >= 2 ? 'Excellent' : metrics.sharpeRatio >= 1 ? 'Good' : 'Needs work'}
          </div>
        </div>

        {/* Expectancy */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Expectancy</div>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            ${metrics.expectancy}
          </div>
          <div className="text-xs text-slate-500 mt-2">Per trade average</div>
        </div>

        {/* Profit Factor */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Profit Factor</div>
          </div>
          <div className={`text-3xl font-bold ${getProfitFactorColor(metrics.profitFactor)}`}>
            {metrics.profitFactor.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            ${metrics.avgWin} avg win / ${Math.abs(metrics.avgLoss)} avg loss
          </div>
        </div>

        {/* Max Drawdown */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-5 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Max Drawdown</div>
          </div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            ${Math.abs(metrics.maxDrawdown).toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Recovered in {metrics.recoveryTime} days
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Performance Extremes */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Performance Extremes</h3>
          <div className="space-y-4">
            <StatRow
              label="Best Trading Day"
              value={`+$${metrics.bestDay.toLocaleString()}`}
              icon={<TrendingUp size={16} />}
              color="green"
            />
            <StatRow
              label="Worst Trading Day"
              value={`-$${Math.abs(metrics.worstDay).toLocaleString()}`}
              icon={<TrendingDown size={16} />}
              color="red"
            />
            <StatRow
              label="Largest Win"
              value={`+$${metrics.largestWin.toLocaleString()}`}
              color="green"
            />
            <StatRow
              label="Largest Loss"
              value={`-$${Math.abs(metrics.largestLoss).toLocaleString()}`}
              color="red"
            />
          </div>
        </div>

        {/* Consistency Metrics */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Consistency Metrics</h3>
          <div className="space-y-4">
            <StatRow
              label="Longest Win Streak"
              value={`${metrics.winStreak} trades`}
              icon={<TrendingUp size={16} />}
              color="green"
            />
            <StatRow
              label="Longest Loss Streak"
              value={`${metrics.lossStreak} trades`}
              icon={<TrendingDown size={16} />}
              color="red"
            />
            <StatRow
              label="Average Win"
              value={`$${metrics.avgWin.toLocaleString()}`}
              color="green"
            />
            <StatRow
              label="Average Loss"
              value={`$${Math.abs(metrics.avgLoss).toLocaleString()}`}
              color="red"
            />
            <StatRow
              label="Risk:Reward Ratio"
              value={`1:${metrics.riskRewardRatio.toFixed(2)}`}
              color={metrics.riskRewardRatio >= 2 ? 'green' : 'blue'}
            />
          </div>
        </div>
      </div>

      {/* Performance Gauge */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Trading Quality Score</h3>
        <div className="space-y-4">
          
          {/* Sharpe Ratio Progress */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Sharpe Ratio</span>
              <span>{metrics.sharpeRatio.toFixed(2)} / 3.0</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, (metrics.sharpeRatio / 3) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Profit Factor Progress */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Profit Factor</span>
              <span>{metrics.profitFactor.toFixed(2)} / 3.0</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, (metrics.profitFactor / 3) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* R:R Ratio Progress */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Risk:Reward Ratio</span>
              <span>1:{metrics.riskRewardRatio.toFixed(2)} / 1:3.0</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, (metrics.riskRewardRatio / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 mb-1">Overall Trading Score</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {calculateScore(metrics)}/100
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 mb-1">Grade</div>
              <div className={`text-2xl font-bold ${getGradeColor(calculateScore(metrics))}`}>
                {getGrade(calculateScore(metrics))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatRow: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: 'green' | 'red' | 'blue';
}> = ({ label, value, icon, color }) => {
  const getColor = () => {
    if (color === 'green') return 'text-green-600 dark:text-green-400';
    if (color === 'red') return 'text-red-600 dark:text-red-400';
    if (color === 'blue') return 'text-blue-600 dark:text-blue-400';
    return 'text-slate-900 dark:text-white';
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        {icon && <span className={getColor()}>{icon}</span>}
        {label}
      </div>
      <div className={`text-sm font-bold font-mono ${getColor()}`}>
        {value}
      </div>
    </div>
  );
};

// Calculate overall trading score (0-100)
const calculateScore = (metrics: MetricsData): number => {
  let score = 0;
  
  // Sharpe Ratio (0-30 points)
  score += Math.min(30, (metrics.sharpeRatio / 3) * 30);
  
  // Profit Factor (0-25 points)
  score += Math.min(25, (metrics.profitFactor / 3) * 25);
  
  // R:R Ratio (0-20 points)
  score += Math.min(20, (metrics.riskRewardRatio / 3) * 20);
  
  // Win Streak vs Loss Streak (0-15 points)
  const streakRatio = metrics.winStreak / Math.max(1, metrics.lossStreak);
  score += Math.min(15, (streakRatio / 5) * 15);
  
  // Drawdown recovery (0-10 points)
  score += Math.min(10, (10 - Math.min(10, metrics.recoveryTime)));
  
  return Math.round(score);
};

const getGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

const getGradeColor = (score: number): string => {
  if (score >= 80) return 'text-green-600 dark:text-green-400';
  if (score >= 70) return 'text-blue-600 dark:text-blue-400';
  if (score >= 60) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};