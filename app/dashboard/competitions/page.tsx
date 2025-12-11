'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Users, Search, TrendingUp, Award, Calendar, DollarSign, X, Check, CreditCard, Lock, ChevronRight, Medal, Sparkles, Crown } from 'lucide-react';

// Types
interface Trader {
  rank: number;
  name: string;
  country: string;
  profit: number;
  return: number;
  equity: number[];
  avatar?: string;
  trades: number;
}

interface Competition {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  prize: number;
  entryFee: number;
  participants: number;
  status: 'active' | 'upcoming' | 'ended';
  rules: string[];
}

interface UserStats {
  rank: number;
  profit: number;
  return: number;
  trades: number;
  winRate: number;
}

// Component Props
interface PodiumCardProps {
  rank: number;
  data: Trader;
  color: string;
  isFirst?: boolean;
}

interface LeaderboardRowProps {
  trader: Trader;
  isCurrentUser?: boolean;
}

interface StatRowProps {
  label: string;
  value: string;
}

interface PrizeRowProps {
  place: string;
  prize: string;
  highlight?: boolean;
}

// Mock Data
const mockCompetition: Competition = {
  id: 'dec-2024',
  title: 'December Trading Cup',
  startDate: '2024-12-01',
  endDate: '2024-12-31',
  prize: 50000,
  entryFee: 0,
  participants: 12547,
  status: 'active',
  rules: [
    'Minimum 10 trades required',
    'Maximum 5% daily loss limit',
    'No hedging or arbitrage strategies',
    'Accounts must pass verification',
    'Competition runs for full calendar month'
  ]
};

const mockLeaderboard: Trader[] = [
  { rank: 1, name: 'AlexTradez', country: 'GB', profit: 42500, return: 42.5, equity: [10, 12, 15, 25, 30, 42], trades: 156, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { rank: 2, name: 'ForexKing99', country: 'DE', profit: 38200, return: 38.2, equity: [5, 8, 12, 20, 35, 38], trades: 203, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=King' },
  { rank: 3, name: 'JapansFinest', country: 'JP', profit: 31050, return: 31.0, equity: [2, 5, 8, 15, 20, 31], trades: 89, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Japan' },
  { rank: 4, name: 'US_Sniper', country: 'US', profit: 28400, return: 28.4, equity: [10, 11, 12, 15, 20, 28], trades: 134 },
  { rank: 5, name: 'CryptoWhale', country: 'AE', profit: 25100, return: 25.1, equity: [5, 15, 10, 20, 22, 25], trades: 176 },
  { rank: 6, name: 'BrazilTrader', country: 'BR', profit: 21000, return: 21.0, equity: [2, 4, 6, 8, 15, 21], trades: 98 },
  { rank: 7, name: 'AussiePip', country: 'AU', profit: 18500, return: 18.5, equity: [5, 6, 8, 10, 12, 18], trades: 167 },
  { rank: 8, name: 'SingaporeShark', country: 'SG', profit: 16200, return: 16.2, equity: [3, 7, 10, 13, 15, 16], trades: 145 },
  { rank: 9, name: 'CanadianBull', country: 'CA', profit: 14800, return: 14.8, equity: [5, 8, 11, 13, 14, 14], trades: 112 },
  { rank: 10, name: 'FrenchFX', country: 'FR', profit: 13500, return: 13.5, equity: [2, 5, 8, 10, 12, 13], trades: 189 },
];

const prizeStructure = [
  { place: '1st Place', prize: '$25,000', percentage: '50%' },
  { place: '2nd Place', prize: '$12,500', percentage: '25%' },
  { place: '3rd Place', prize: '$7,500', percentage: '15%' },
  { place: '4th-10th', prize: '$714 each', percentage: '10%' },
];

export default function EnhancedCompetitionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isEntered, setIsEntered] = useState(true); // User is already in competition
  const [timeRemaining, setTimeRemaining] = useState({ days: 14, hours: 6, minutes: 42, seconds: 15 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // My stats (user is rank 1204)
  const myStats: UserStats = {
    rank: 1204,
    profit: 4200,
    return: 4.2,
    trades: 42,
    winRate: 64.3
  };

  // Filter leaderboard
  const filteredLeaderboard = mockLeaderboard.filter(trader => {
    const matchesSearch = trader.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = filterCountry === 'all' || trader.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const topCountries = ['GB', 'DE', 'JP', 'US', 'AE', 'BR', 'AU'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Competition
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{mockCompetition.title}</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Compete against {mockCompetition.participants.toLocaleString()} traders for a chance to win ${mockCompetition.prize.toLocaleString()}. Highest ROI wins.
          </p>
        </div>

        {/* Countdown Card */}
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl p-5 flex items-center gap-6 shadow-xl shadow-blue-900/20">
          <div>
            <div className="text-[10px] uppercase opacity-70 font-bold mb-1">Time Remaining</div>
            <div className="flex items-center gap-2 font-mono text-xl font-bold">
              <Timer size={20} className="text-blue-500" />
              {timeRemaining.days}d : {String(timeRemaining.hours).padStart(2, '0')}h : {String(timeRemaining.minutes).padStart(2, '0')}m
            </div>
          </div>
          <div className="h-10 w-px bg-white/20 dark:bg-black/10"></div>
          <div>
            <div className="text-[10px] uppercase opacity-70 font-bold mb-1">Prize Pool</div>
            <div className="text-xl font-bold text-green-400 dark:text-green-600">${mockCompetition.prize.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        {!isEntered ? (
          <button
            onClick={() => setShowEntryModal(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Trophy size={18} />
            Enter Competition
          </button>
        ) : (
          <div className="px-6 py-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 font-semibold rounded-xl flex items-center gap-2">
            <Check size={18} />
            You're Competing
          </div>
        )}
        <button
          onClick={() => setShowRulesModal(true)}
          className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          View Rules
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: LEADERBOARD */}
        <div className="lg:col-span-3 space-y-6">
          {/* THE PODIUM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PodiumCard rank={2} data={filteredLeaderboard[1]} color="from-slate-300 to-slate-400" />
            <PodiumCard rank={1} data={filteredLeaderboard[0]} color="from-yellow-300 to-yellow-500" isFirst />
            <PodiumCard rank={3} data={filteredLeaderboard[2]} color="from-orange-300 to-orange-400" />
          </div>

          {/* SEARCH & FILTERS */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search trader..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Countries</option>
                {topCountries.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* LEADERBOARD TABLE */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
              <h3 className="font-bold text-slate-900 dark:text-white">Global Ranking</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users size={14} />
                {mockCompetition.participants.toLocaleString()} traders
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[600px] overflow-y-auto">
              {filteredLeaderboard.slice(3).map((trader) => (
                <LeaderboardRow key={trader.rank} trader={trader} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MY STATS & PRIZES */}
        <div className="space-y-6">
          {/* MY STANDING */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 opacity-80 text-xs font-medium uppercase mb-4">
                <Trophy size={14} />
                My Standing
              </div>
              <div className="text-5xl font-bold mb-1">#{myStats.rank.toLocaleString()}</div>
              <div className="text-sm opacity-80 mb-6">
                Top {((myStats.rank / mockCompetition.participants) * 100).toFixed(1)}% of traders
              </div>
              <div className="space-y-3">
                <StatRow label="Return" value={`+${myStats.return}%`} />
                <StatRow label="Profit" value={`$${myStats.profit.toLocaleString()}`} />
                <StatRow label="Trades" value={myStats.trades.toString()} />
                <StatRow label="Win Rate" value={`${myStats.winRate}%`} />
              </div>
              <button className="w-full mt-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* PRIZE BREAKDOWN */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-yellow-500" size={18} />
              <h3 className="font-bold text-slate-900 dark:text-white">Prize Pool</h3>
            </div>
            <div className="space-y-2">
              {prizeStructure.map((item, i) => (
                <PrizeRow key={i} place={item.place} prize={item.prize} highlight={i === 0} />
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Competition Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Participants</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{mockCompetition.participants.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entry Fee</span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Return</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">+8.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Top Return</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">+{mockLeaderboard[0].return}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ENTRY MODAL */}
      {showEntryModal && (
        <Modal onClose={() => setShowEntryModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Enter Competition</h2>
              <button onClick={() => setShowEntryModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="text-blue-600 dark:text-blue-400 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400">Free Entry!</h3>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                    This competition is free to enter. Simply select an account and start trading!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Trading Account
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Challenge Account #100243 - $100,000</option>
                  <option>Challenge Account #100156 - $50,000</option>
                </select>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Account Size</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">$100,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Entry Fee</span>
                  <span className="font-mono font-bold text-green-600 dark:text-green-400">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                  <span className="text-slate-600 dark:text-slate-400">Total</span>
                  <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">$0.00</span>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  I agree to the competition rules and understand that all trades will be tracked for the leaderboard
                </span>
              </label>
            </div>

            <button
              onClick={() => {
                setIsEntered(true);
                setShowEntryModal(false);
              }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              Confirm Entry
            </button>
          </div>
        </Modal>
      )}

      {/* RULES MODAL */}
      {showRulesModal && (
        <Modal onClose={() => setShowRulesModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Competition Rules</h2>
              <button onClick={() => setShowRulesModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {mockCompetition.rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{rule}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">How Winners Are Determined</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Rankings are based on Return on Investment (ROI) percentage. The trader with the highest percentage return at the end of the competition period wins. All trades must comply with the rules above to be eligible.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

const PodiumCard = ({ rank, data, color, isFirst }: PodiumCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 border border-slate-200 dark:border-white/5 transition-transform hover:scale-105 ${
    isFirst ? 'bg-white dark:bg-[#0f1115] md:-mt-8 shadow-2xl z-10' : 'bg-slate-50 dark:bg-white/[0.02] shadow-lg'
  }`}>
    <div className={`absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
      {rank === 1 ? <Crown size={24} /> : rank}
    </div>
    <div className="flex flex-col items-center text-center mt-6">
      <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/10 mb-4 overflow-hidden border-4 border-slate-100 dark:border-white/5 shadow-lg">
        <img src={data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} alt="avatar" className="w-full h-full" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <img src={`https://flagcdn.com/${data.country.toLowerCase()}.svg`} alt="flag" className="w-5 h-3 rounded-[2px] shadow-sm" />
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{data.name}</h3>
      </div>
      <div className="text-4xl font-bold text-green-500 my-3">+{data.return}%</div>
      <div className="text-sm text-slate-500 font-mono">${data.profit.toLocaleString()}</div>
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 w-full flex justify-around text-xs">
        <div className="text-center">
          <div className="text-slate-500">Trades</div>
          <div className="font-bold text-slate-900 dark:text-white">{data.trades}</div>
        </div>
        <div className="text-center">
          <div className="text-slate-500">Growth</div>
          <div className="font-bold text-green-600 dark:text-green-400">+{data.return}%</div>
        </div>
      </div>
    </div>
  </div>
);

const LeaderboardRow = ({ trader, isCurrentUser }: LeaderboardRowProps) => (
  <div className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors group ${
    isCurrentUser 
      ? 'bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500' 
      : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
  }`}>
    <div className="col-span-1 font-mono font-bold text-slate-400 flex items-center gap-2">
      {trader.rank <= 3 && <Medal className={`w-4 h-4 ${
        trader.rank === 1 ? 'text-yellow-500' :
        trader.rank === 2 ? 'text-slate-400' :
        'text-orange-500'
      }`} />}
      #{trader.rank}
    </div>
    <div className="col-span-5 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden shrink-0">
        <img src={trader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${trader.name}`} alt="avatar" className="w-full h-full" />
      </div>
      <div className="flex items-center gap-2">
        <img src={`https://flagcdn.com/${trader.country.toLowerCase()}.svg`} alt={trader.country} className="w-4 h-3 rounded-sm object-cover shadow-sm" />
        <span className="font-medium text-slate-700 dark:text-slate-200">{trader.name}</span>
      </div>
    </div>
    <div className="col-span-2 text-center">
      <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
        {trader.trades} trades
      </span>
    </div>
    <div className="col-span-2 text-right font-bold text-green-500 text-lg">+{trader.return}%</div>
    <div className="col-span-2 text-right font-mono text-slate-600 dark:text-slate-400">${trader.profit.toLocaleString()}</div>
  </div>
);

const StatRow = ({ label, value }: StatRowProps) => (
  <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
    <span className="opacity-70 text-sm">{label}</span>
    <span className="font-bold font-mono">{value}</span>
  </div>
);

const PrizeRow = ({ place, prize, highlight }: PrizeRowProps) => (
  <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
    highlight 
      ? 'bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20' 
      : 'bg-slate-50 dark:bg-white/5'
  }`}>
    <span className={`text-sm font-semibold ${highlight ? 'text-yellow-700 dark:text-yellow-400' : 'text-slate-700 dark:text-slate-300'}`}>
      {place}
    </span>
    <span className={`font-mono font-bold ${highlight ? 'text-yellow-700 dark:text-yellow-400' : 'text-slate-900 dark:text-white'}`}>
      {prize}
    </span>
  </div>
);

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white dark:bg-[#0f1115] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  </div>
);