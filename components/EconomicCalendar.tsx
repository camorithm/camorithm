'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, Filter, Bell, ChevronDown } from 'lucide-react';

// Types
interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast?: string;
  previous?: string;
  actual?: string;
  timestamp: Date;
}

interface EconomicCalendarProps {
  showFilters?: boolean;
  maxEvents?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

// Mock data generator
const generateMockEvents = (): EconomicEvent[] => {
  const now = new Date();
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
  const impacts: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
  
  const eventNames = {
    High: [
      'Non-Farm Payrolls',
      'Interest Rate Decision',
      'CPI (Consumer Price Index)',
      'GDP Growth Rate',
      'FOMC Statement',
      'ECB Press Conference',
    ],
    Medium: [
      'Unemployment Rate',
      'Retail Sales',
      'Industrial Production',
      'Trade Balance',
      'PMI Manufacturing',
      'Consumer Confidence',
    ],
    Low: [
      'Building Permits',
      'Crude Oil Inventories',
      'Treasury Statement',
      'Housing Starts',
      'Factory Orders',
      'Jobless Claims',
    ],
  };

  const events: EconomicEvent[] = [];
  
  for (let i = 0; i < 20; i++) {
    const hoursOffset = Math.floor(Math.random() * 48) - 12; // -12 to +36 hours
    const timestamp = new Date(now.getTime() + hoursOffset * 60 * 60 * 1000);
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    const eventList = eventNames[impact];
    
    events.push({
      id: `event-${i}`,
      time: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      event: eventList[Math.floor(Math.random() * eventList.length)],
      impact,
      forecast: Math.random() > 0.5 ? `${(Math.random() * 5).toFixed(1)}%` : undefined,
      previous: `${(Math.random() * 5).toFixed(1)}%`,
      actual: timestamp < now && Math.random() > 0.5 ? `${(Math.random() * 5).toFixed(1)}%` : undefined,
      timestamp,
    });
  }

  return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const EconomicCalendar: React.FC<EconomicCalendarProps> = ({
  showFilters = true,
  maxEvents = 10,
  autoRefresh = true,
  refreshInterval = 60000, // 1 minute
}) => {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('All');
  const [selectedImpact, setSelectedImpact] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'today' | 'week'>('today');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setEvents(generateMockEvents());
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setEvents(generateMockEvents());
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // Update current time every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter events
  const filteredEvents = events.filter(event => {
    const now = new Date();
    const matchesCurrency = selectedCurrency === 'All' || event.currency === selectedCurrency;
    const matchesImpact = selectedImpact === 'All' || event.impact === selectedImpact;
    
    let matchesTime = true;
    if (timeFilter === 'upcoming') {
      matchesTime = event.timestamp > now;
    } else if (timeFilter === 'today') {
      const isToday = event.timestamp.toDateString() === now.toDateString();
      matchesTime = isToday;
    } else if (timeFilter === 'week') {
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      matchesTime = event.timestamp <= weekFromNow;
    }

    return matchesCurrency && matchesImpact && matchesTime;
  }).slice(0, maxEvents);

  // Get next event
  const nextEvent = events.find(e => e.timestamp > new Date());

  // Calculate time until next event
  const getTimeUntil = (timestamp: Date) => {
    const diff = timestamp.getTime() - currentTime.getTime();
    if (diff < 0) return 'LIVE';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'Medium': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'Low': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const getImpactDot = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Economic Calendar</h3>
              <p className="text-xs text-slate-500">High-impact news events</p>
            </div>
          </div>
          
          {nextEvent && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Next Event</div>
                  <div className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                    {getTimeUntil(nextEvent.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {/* Time Filter */}
            <div className="flex gap-1 bg-white dark:bg-[#0f1115] rounded-lg p-1 border border-slate-200 dark:border-white/5">
              {['upcoming', 'today', 'week'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter as any)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    timeFilter === filter
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Currency Filter */}
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Currencies</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
            </select>

            {/* Impact Filter */}
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Impact</option>
              <option value="High">High Impact</option>
              <option value="Medium">Medium Impact</option>
              <option value="Low">Low Impact</option>
            </select>
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {filteredEvents.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No events match your filters</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isPast = event.timestamp < new Date();
            const isLive = Math.abs(event.timestamp.getTime() - new Date().getTime()) < 5 * 60 * 1000; // Within 5 minutes

            return (
              <div
                key={event.id}
                className={`px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors ${
                  isLive ? 'bg-blue-50/50 dark:bg-blue-500/5 border-l-4 border-l-blue-500' : ''
                } ${isPast ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Time & Currency */}
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
                      {event.time}
                    </div>
                    <div className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded font-bold text-xs text-slate-700 dark:text-slate-300">
                      {event.currency}
                    </div>
                  </div>

                  {/* Event Name */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {isLive && (
                        <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          LIVE
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {event.event}
                      </span>
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${getImpactColor(event.impact)}`}>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${getImpactDot(event.impact)}`}></div>
                      {event.impact.toUpperCase()}
                    </div>
                  </div>

                  {/* Data */}
                  <div className="flex items-center gap-4 min-w-[200px] justify-end text-xs font-mono">
                    {event.actual && (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400">Actual</span>
                        <span className="font-bold text-slate-900 dark:text-white">{event.actual}</span>
                      </div>
                    )}
                    {event.forecast && (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400">Forecast</span>
                        <span className="text-slate-600 dark:text-slate-400">{event.forecast}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-400">Previous</span>
                      <span className="text-slate-500">{event.previous}</span>
                    </div>
                  </div>

                  {/* Countdown/Alert */}
                  {!isPast && (
                    <div className="min-w-[80px] text-right">
                      <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        {getTimeUntil(event.timestamp)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Showing {filteredEvents.length} of {events.length} events
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
          View Full Calendar
        </button>
      </div>
    </div>
  );
};

export default EconomicCalendar;