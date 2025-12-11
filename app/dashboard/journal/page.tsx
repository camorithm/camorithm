'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, MoreHorizontal, ArrowUp, ArrowDown, Tag, X, Plus, Edit2, Trash2, Eye } from 'lucide-react';

// --- TYPES ---
interface Trade {
  id: string;
  date: string;
  timestamp: number;
  symbol: string;
  type: 'Buy' | 'Sell';
  lots: number;
  entry: number;
  exit: number;
  pl: number;
  status: 'Win' | 'Loss';
  tags: string[];
  notes?: string;
  duration?: string;
}

type FilterType = 'All' | 'Winners' | 'Losers';
type SortField = 'date' | 'symbol' | 'pl';
type SortOrder = 'asc' | 'desc';

// --- INITIAL DATA ---
const initialTrades: Trade[] = [
  { id: 'ORD-001', date: 'Dec 11, 10:42 AM', timestamp: Date.now() - 3600000, symbol: 'EURUSD', type: 'Buy', lots: 5.0, entry: 1.0780, exit: 1.0820, pl: 2000, status: 'Win', tags: ['Strategy A', 'Morning'], notes: 'Perfect entry at support level', duration: '2h 15m' },
  { id: 'ORD-002', date: 'Dec 11, 09:15 AM', timestamp: Date.now() - 7200000, symbol: 'GBPUSD', type: 'Sell', lots: 2.5, entry: 1.2550, exit: 1.2580, pl: -750, status: 'Loss', tags: ['News'], notes: 'Stopped out on news spike', duration: '45m' },
  { id: 'ORD-003', date: 'Dec 10, 02:30 PM', timestamp: Date.now() - 86400000, symbol: 'XAUUSD', type: 'Buy', lots: 1.0, entry: 1980.50, exit: 1995.00, pl: 1450, status: 'Win', tags: ['Scalp', 'Gold'], duration: '1h 20m' },
  { id: 'ORD-004', date: 'Dec 10, 11:00 AM', timestamp: Date.now() - 100000000, symbol: 'US30', type: 'Sell', lots: 0.5, entry: 36200, exit: 36150, pl: 250, status: 'Win', tags: ['Indices'], duration: '3h 40m' },
  { id: 'ORD-005', date: 'Dec 09, 08:45 AM', timestamp: Date.now() - 172800000, symbol: 'EURJPY', type: 'Buy', lots: 3.0, entry: 155.20, exit: 154.90, pl: -820, status: 'Loss', tags: ['Impulse'], notes: 'Failed breakout trade', duration: '25m' },
  { id: 'ORD-006', date: 'Dec 09, 02:15 PM', timestamp: Date.now() - 180000000, symbol: 'BTCUSD', type: 'Buy', lots: 0.1, entry: 42000, exit: 42500, pl: 500, status: 'Win', tags: ['Crypto', 'Swing'], duration: '5h 10m' },
  { id: 'ORD-007', date: 'Dec 08, 11:30 AM', timestamp: Date.now() - 259200000, symbol: 'EURUSD', type: 'Sell', lots: 2.0, entry: 1.0850, exit: 1.0820, pl: 600, status: 'Win', tags: ['Strategy A'], duration: '1h 50m' },
  { id: 'ORD-008', date: 'Dec 08, 09:00 AM', timestamp: Date.now() - 268000000, symbol: 'GBPJPY', type: 'Buy', lots: 1.5, entry: 180.50, exit: 180.20, pl: -450, status: 'Loss', tags: ['Morning'], notes: 'Wrong direction', duration: '30m' },
];

const availableTags = ['Strategy A', 'Strategy B', 'Scalp', 'Swing', 'News', 'Morning', 'Gold', 'Crypto', 'Indices', 'Impulse'];

// Component prop types
interface StatCardProps {
  label: string;
  value: string;
  color?: string;
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

interface TradeRowProps {
  trade: Trade;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface TradeDetailModalProps {
  trade: Trade;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string;
  valueClass?: string;
}

export default function EnhancedJournalPage() {
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTrades, setSelectedTrades] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTagFilters, setSelectedTagFilters] = useState<Set<string>>(new Set());
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const [viewingTrade, setViewingTrade] = useState<Trade | null>(null);

  // Filtering and sorting logic
  const filteredTrades = useMemo(() => {
    let filtered = trades;

    // Status filter
    if (activeFilter === 'Winners') {
      filtered = filtered.filter(t => t.status === 'Win');
    } else if (activeFilter === 'Losers') {
      filtered = filtered.filter(t => t.status === 'Loss');
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.symbol.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query)) ||
        t.id.toLowerCase().includes(query)
      );
    }

    // Tag filters
    if (selectedTagFilters.size > 0) {
      filtered = filtered.filter(t => 
        t.tags.some(tag => selectedTagFilters.has(tag))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = a.timestamp - b.timestamp;
      } else if (sortField === 'symbol') {
        comparison = a.symbol.localeCompare(b.symbol);
      } else if (sortField === 'pl') {
        comparison = a.pl - b.pl;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [trades, activeFilter, searchQuery, selectedTagFilters, sortField, sortOrder]);

  // Stats calculations
  const stats = useMemo(() => {
    const winners = filteredTrades.filter(t => t.status === 'Win').length;
    const losers = filteredTrades.filter(t => t.status === 'Loss').length;
    const totalPL = filteredTrades.reduce((sum, t) => sum + t.pl, 0);
    return { winners, losers, totalPL, total: filteredTrades.length };
  }, [filteredTrades]);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedTrades.size === filteredTrades.length) {
      setSelectedTrades(new Set());
    } else {
      setSelectedTrades(new Set(filteredTrades.map(t => t.id)));
    }
  };

  const handleSelectTrade = (id: string) => {
    const newSelected = new Set(selectedTrades);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTrades(newSelected);
  };

  const handleDeleteTrade = (id: string) => {
    if (confirm('Are you sure you want to delete this trade?')) {
      setTrades(trades.filter(t => t.id !== id));
      setSelectedTrades(new Set([...selectedTrades].filter(sid => sid !== id)));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedTrades.size} selected trade(s)?`)) {
      setTrades(trades.filter(t => !selectedTrades.has(t.id)));
      setSelectedTrades(new Set());
    }
  };

  const handleExport = () => {
    // Simulate CSV export
    const csv = ['ID,Date,Symbol,Type,Lots,Entry,Exit,P/L,Status,Tags'].concat(
      filteredTrades.map(t => 
        `${t.id},${t.date},${t.symbol},${t.type},${t.lots},${t.entry},${t.exit},${t.pl},${t.status},"${t.tags.join(', ')}"`
      )
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleTagFilter = (tag: string) => {
    const newFilters = new Set(selectedTagFilters);
    if (newFilters.has(tag)) {
      newFilters.delete(tag);
    } else {
      newFilters.add(tag);
    }
    setSelectedTagFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Trades" value={stats.total.toString()} />
        <StatCard label="Winners" value={stats.winners.toString()} color="text-green-600 dark:text-green-400" />
        <StatCard label="Losers" value={stats.losers.toString()} color="text-red-600 dark:text-red-400" />
        <StatCard 
          label="Net P/L" 
          value={`${stats.totalPL >= 0 ? '+' : ''}$${stats.totalPL.toLocaleString()}`}
          color={stats.totalPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
        />
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <FilterChip 
              label="All Trades" 
              active={activeFilter === 'All'} 
              onClick={() => setActiveFilter('All')}
              count={trades.length}
            />
            <FilterChip 
              label="Winners" 
              active={activeFilter === 'Winners'} 
              onClick={() => setActiveFilter('Winners')}
              count={trades.filter(t => t.status === 'Win').length}
            />
            <FilterChip 
              label="Losers" 
              active={activeFilter === 'Losers'} 
              onClick={() => setActiveFilter('Losers')}
              count={trades.filter(t => t.status === 'Loss').length}
            />
            
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                showFilters || selectedTagFilters.size > 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
              }`}
            >
              <Filter size={14} />
              Advanced
              {selectedTagFilters.size > 0 && (
                <span className="bg-white/20 text-xs px-1.5 rounded-full">{selectedTagFilters.size}</span>
              )}
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search symbol or tag..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64 transition-all"
              />
            </div>
            
            {selectedTrades.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete ({selectedTrades.size})
              </button>
            )}
            
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              <span className="hidden md:inline">Export</span>
            </button>
            
            <button
              onClick={() => setShowTradeModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={14} />
              <span className="hidden md:inline">Add Trade</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase">Filter by Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedTagFilters.has(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTagFilters.size > 0 && (
                <button
                  onClick={() => setSelectedTagFilters(new Set())}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Data Grid */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 font-semibold border-b border-slate-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 w-[50px]">
                  <input 
                    type="checkbox" 
                    checked={selectedTrades.size === filteredTrades.length && filteredTrades.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date 
                    {sortField === 'date' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => handleSort('symbol')}
                >
                  <div className="flex items-center gap-1">
                    Symbol
                    {sortField === 'symbol' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </div>
                </th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Volume</th>
                <th className="px-6 py-4 text-right">Entry / Exit</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Tags</th>
                <th 
                  className="px-6 py-4 text-right cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => handleSort('pl')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Profit
                    {sortField === 'pl' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </div>
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                    No trades found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => (
                  <TradeRow
                    key={trade.id}
                    trade={trade}
                    isSelected={selectedTrades.has(trade.id)}
                    onSelect={() => handleSelectTrade(trade.id)}
                    onView={() => setViewingTrade(trade)}
                    onEdit={() => {
                      setEditingTrade(trade);
                      setShowTradeModal(true);
                    }}
                    onDelete={() => handleDeleteTrade(trade.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trade Detail Modal */}
      {viewingTrade && (
        <TradeDetailModal
          trade={viewingTrade}
          onClose={() => setViewingTrade(null)}
        />
      )}

      {/* Add/Edit Trade Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f1115] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingTrade ? 'Edit Trade' : 'Add New Trade'}
              </h3>
              <button 
                onClick={() => {
                  setShowTradeModal(false);
                  setEditingTrade(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4">Trade form would go here (will implement next)</p>
              <button
                onClick={() => {
                  setShowTradeModal(false);
                  setEditingTrade(null);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                Save Trade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, color = 'text-slate-900 dark:text-white' }: StatCardProps) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-4">
    <div className="text-xs text-slate-500 mb-1">{label}</div>
    <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
  </div>
);

const FilterChip = ({ label, active, onClick, count }: FilterChipProps) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 ${
      active 
        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
    }`}
  >
    {label} 
    {count !== undefined && (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
        active 
          ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900' 
          : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
      }`}>
        {count}
      </span>
    )}
  </button>
);

const TradeRow = ({ trade, isSelected, onSelect, onView, onEdit, onDelete }: TradeRowProps) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={onSelect}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
        />
      </td>
      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{trade.date}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
          <div className="w-6 h-6 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] text-slate-500">
            {trade.symbol[0]}
          </div>
          {trade.symbol}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
          trade.type === 'Buy' 
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' 
            : 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400'
        }`}>
          {trade.type === 'Buy' ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {trade.type}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-mono text-slate-600 dark:text-slate-400">{trade.lots.toFixed(2)}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-mono text-slate-700 dark:text-white">{trade.entry}</span>
          <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
            <span className="text-slate-300">→</span> {trade.exit}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-xs text-slate-500">{trade.duration || 'N/A'}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1 max-w-[150px]">
          {trade.tags.length > 0 ? (
            <>
              {trade.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                  {tag}
                </span>
              ))}
              {trade.tags.length > 2 && (
                <span className="text-xs text-slate-400">+{trade.tags.length - 2}</span>
              )}
            </>
          ) : (
            <button 
              className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Tag size={12} /> Add
            </button>
          )}
        </div>
      </td>
      <td className={`px-6 py-4 text-right font-bold font-mono ${
        trade.pl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {trade.pl > 0 ? '+' : ''}${trade.pl.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-right relative">
        <button 
          onClick={() => setShowActions(!showActions)}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>
        
        {showActions && (
          <div className="absolute right-8 top-12 bg-white dark:bg-[#1a1d24] border border-slate-200 dark:border-white/10 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
            <button 
              onClick={() => { onView(); setShowActions(false); }}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
            >
              <Eye size={14} /> View Details
            </button>
            <button 
              onClick={() => { onEdit(); setShowActions(false); }}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
            >
              <Edit2 size={14} /> Edit
            </button>
            <button 
              onClick={() => { onDelete(); setShowActions(false); }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const TradeDetailModal = ({ trade, onClose }: TradeDetailModalProps) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white dark:bg-[#0f1115] rounded-2xl max-w-2xl w-full" onClick={e => e.stopPropagation()}>
      <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trade Details - {trade.id}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <DetailRow label="Symbol" value={trade.symbol} />
        <DetailRow label="Type" value={trade.type} />
        <DetailRow label="Date" value={trade.date} />
        <DetailRow label="Volume" value={`${trade.lots.toFixed(2)} lots`} />
        <DetailRow label="Entry Price" value={trade.entry.toString()} />
        <DetailRow label="Exit Price" value={trade.exit.toString()} />
        <DetailRow label="Duration" value={trade.duration || 'N/A'} />
        <DetailRow 
          label="Profit/Loss" 
          value={`${trade.pl > 0 ? '+' : ''}$${trade.pl.toLocaleString()}`}
          valueClass={trade.pl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
        />
        <div>
          <span className="text-sm font-semibold text-slate-500">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {trade.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {trade.notes && (
          <div>
            <span className="text-sm font-semibold text-slate-500">Notes:</span>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-lg">
              {trade.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value, valueClass = 'text-slate-900 dark:text-white' }: DetailRowProps) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
    <span className="text-sm font-semibold text-slate-500">{label}</span>
    <span className={`text-sm font-mono font-bold ${valueClass}`}>{value}</span>
  </div>
);