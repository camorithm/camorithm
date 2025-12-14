'use client';

import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface DayData {
  date: string;
  pnl: number;
  trades: number;
}

interface CalendarHeatmapProps {
  data?: DayData[];
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ data }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate mock data for demonstration
  const generateMockData = (): DayData[] => {
    const days: DayData[] = [];
    const today = new Date();
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Random P&L with bias towards positive
      const pnl = Math.random() > 0.35 
        ? Math.floor(Math.random() * 1000) + 50 
        : -Math.floor(Math.random() * 500);
      
      const trades = Math.floor(Math.random() * 8) + 1;
      
      days.push({
        date: date.toISOString().split('T')[0],
        pnl,
        trades,
      });
    }
    
    return days;
  };

  const dayData = data || generateMockData();

  // Get color based on P&L
  const getColor = (pnl: number): string => {
    if (pnl === 0) return 'bg-slate-100 dark:bg-white/5';
    if (pnl > 0 && pnl < 200) return 'bg-green-200 dark:bg-green-500/30';
    if (pnl >= 200 && pnl < 500) return 'bg-green-400 dark:bg-green-500/50';
    if (pnl >= 500 && pnl < 800) return 'bg-green-600 dark:bg-green-500/70';
    if (pnl >= 800) return 'bg-green-700 dark:bg-green-500/90';
    if (pnl > -200) return 'bg-red-200 dark:bg-red-500/30';
    if (pnl > -500) return 'bg-red-400 dark:bg-red-500/50';
    return 'bg-red-600 dark:bg-red-500/70';
  };

  // Get intensity label
  const getIntensity = (pnl: number): string => {
    if (pnl === 0) return 'No trades';
    if (Math.abs(pnl) < 200) return 'Low';
    if (Math.abs(pnl) < 500) return 'Medium';
    return 'High';
  };

  // Generate calendar grid
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (DayData | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const dayInfo = dayData.find(d => d.date === dateStr);
      
      if (dayInfo) {
        days.push(dayInfo);
      } else {
        days.push({
          date: dateStr,
          pnl: 0,
          trades: 0,
        });
      }
    }

    return days;
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const totalPnL = dayData.reduce((sum, day) => sum + day.pnl, 0);
  const totalTrades = dayData.reduce((sum, day) => sum + day.trades, 0);
  const winningDays = dayData.filter(d => d.pnl > 0).length;
  const losingDays = dayData.filter(d => d.pnl < 0).length;
  const winRate = totalTrades > 0 ? ((winningDays / (winningDays + losingDays)) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Performance Calendar</h3>
            <p className="text-xs text-slate-500">Daily P&L heatmap</p>
          </div>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button 
            onClick={previousMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} className="text-slate-400" />
          </button>
          <div className="text-sm font-bold text-slate-900 dark:text-white min-w-[120px] text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowRight size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="text-xs text-slate-500 mb-1">Total P&L</div>
          <div className={`text-lg font-bold font-mono ${totalPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
          </div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="text-xs text-slate-500 mb-1">Win Rate</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{winRate}%</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="text-xs text-slate-500 mb-1">Trading Days</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{dayData.length}</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
          <div className="text-xs text-slate-500 mb-1">Total Trades</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{totalTrades}</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return (
                <div 
                  key={`empty-${index}`} 
                  className="aspect-square rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5"
                ></div>
              );
            }

            const dayNumber = new Date(day.date).getDate();
            const isToday = day.date === new Date().toISOString().split('T')[0];

            return (
              <div
                key={day.date}
                className={`aspect-square rounded-lg ${getColor(day.pnl)} border ${
                  isToday 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-transparent'
                } relative group cursor-pointer transition-transform hover:scale-110 hover:z-10`}
              >
                {/* Day number */}
                <div className="absolute top-1 left-1 text-[10px] font-bold opacity-70">
                  {dayNumber}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap shadow-xl">
                  <div className="font-bold">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <div className={`font-mono ${day.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {day.pnl >= 0 ? '+' : ''}${day.pnl.toLocaleString()}
                  </div>
                  <div className="text-slate-400">{day.trades} trades</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
        <div className="text-xs text-slate-500">Less</div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-slate-100 dark:bg-white/5"></div>
          <div className="w-4 h-4 rounded bg-red-200 dark:bg-red-500/30"></div>
          <div className="w-4 h-4 rounded bg-red-400 dark:bg-red-500/50"></div>
          <div className="w-4 h-4 rounded bg-red-600 dark:bg-red-500/70"></div>
          <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-500/30"></div>
          <div className="w-4 h-4 rounded bg-green-400 dark:bg-green-500/50"></div>
          <div className="w-4 h-4 rounded bg-green-600 dark:bg-green-500/70"></div>
          <div className="w-4 h-4 rounded bg-green-700 dark:bg-green-500/90"></div>
        </div>
        <div className="text-xs text-slate-500">More</div>
      </div>
    </div>
  );
};