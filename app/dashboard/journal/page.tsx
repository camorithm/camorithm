'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, ArrowUp, ArrowDown, Tag, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

// Types
interface Trade {
  id: string;
  date: string;
  symbol: string;
  type: 'Buy' | 'Sell';
  lots: number;
  entry: number;
  exit: number;
  pl: number;
  status: 'Win' | 'Loss';
  tags: string[];
  notes?: string;
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
  onEdit: () => void;
  onDelete: () => void;
}

interface TradeDetailModalProps {
  trade: Trade;
  onClose: () => void;
  onSave: (notes: string) => void;
}

// Initial mock data
const initialTrades: Trade[] = [
  { id: 'ORD-001', date: 'Dec 11, 10:42 AM', symbol: 'EURUSD', type: 'Buy', lots: 5.0, entry: 1.0780, exit: 1.0820, pl: 2000, status: 'Win', tags: ['Strategy A'] },
  { id: 'ORD-002', date: 'Dec 11, 09:15 AM', symbol: 'GBPUSD', type: 'Sell', lots: 2.5, entry: 1.2550, exit: 1.2580, pl: -750, status: 'Loss', tags: ['News'] },
  { id: 'ORD-003', date: 'Dec 10, 02:30 PM', symbol: 'XAUUSD', type: 'Buy', lots: 1.0, entry: 1980.50, exit: 1995.00, pl: 1450, status: 'Win', tags: ['Scalp'] },
  { id: 'ORD-004', date: 'Dec 10, 11:00 AM', symbol: 'US30', type: 'Sell', lots: 0.5, entry: 36200, exit: 36150, pl: 250, status: 'Win', tags: [] },
  { id: 'ORD-005', date: 'Dec 09, 08:45 AM', symbol: 'EURJPY', type: 'Buy', lots: 3.0, entry: 155.20, exit: 154.90, pl: -820, status: 'Loss', tags: ['Impulse'] },
  { id: 'ORD-006', date: 'Dec 08, 03:20 PM', symbol: 'BTCUSD', type: 'Buy', lots: 0.1, entry: 42000, exit: 42500, pl: 500, status: 'Win', tags: ['Crypto'] },
  { id: 'ORD-007', date: 'Dec 08, 01:10 PM', symbol: 'USDJPY', type: 'Sell', lots: 4.0, entry: 148.50, exit: 148.20, pl: 1200, status: 'Win', tags: ['Strategy A'] },
  { id: 'ORD-008', date: 'Dec 07, 10:30 AM', symbol: 'GBPJPY', type: 'Buy', lots: 1.5, entry: 186.20, exit: 185.80, pl: -600, status: 'Loss', tags: [] },
];

export default function ImprovedJournalPage() {
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Winners' | 'Losers'>('All');
  const [selectedTrades, setSelectedTrades] = useState<Set<string>>(new Set());
  const [detailTrade, setDetailTrade] = useState<Trade | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'pl' | null>(null);
  const [sortDesc, setSortDesc] = useState(true);

  // Filter and sort trades
  let filteredTrades = trades.filter(trade => {
    const matchesSearch = 
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      activeFilter === 'All' ? true :
      activeFilter === 'Winners' ? trade.status === 'Win' :
      trade.status === 'Loss';
    
    return matchesSearch && matchesFilter;
  });

  // Sort
  if (sortBy) {
    filteredTrades = [...filteredTrades].sort((a, b) => {
      if (sortBy === 'pl') {
        return sortDesc ? b.pl - a.pl : a.pl - b.pl;
      }
      if (sortBy === 'date') {
        return sortDesc ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
      }
      return 0;
    });
  }

  // Stats
  const totalTrades = trades.length;
  const winners = trades.filter(t => t.status === 'Win').length;
  const losers = trades.filter(t => t.status === 'Loss').length;
  const netPL = trades.reduce((sum, t) => sum + t.pl, 0);

  // Handlers
  const toggleSort = (column: 'date' | 'pl') => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedTrades);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTrades(newSelected);
  };

  const selectAll = () => {
    if (selectedTrades.size === filteredTrades.length) {
      setSelectedTrades(new Set());
    } else {
      setSelectedTrades(new Set(filteredTrades.map(t => t.id)));
    }
  };

  const deleteSelected = () => {
    if (confirm(`Delete ${selectedTrades.size} trade(s)?`)) {
      setTrades(trades.filter(t => !selectedTrades.has(t.id)));
      setSelectedTrades(new Set());
    }
  };

  const exportCSV = () => {
    const csv = [
      ['ID', 'Date', 'Symbol', 'Type', 'Lots', 'Entry', 'Exit', 'P/L', 'Status', 'Tags'],
      ...filteredTrades.map(t => [
        t.id, t.date, t.symbol, t.type, t.lots, t.entry, t.exit, t.pl, t.status, t.tags.join(';')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="max-w-full mx-auto space-y-6">
      
      {/* STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Trades" value={totalTrades.toString()} />
        <StatCard label="Winners" value={winners.toString()} valueClass="text-green-600 dark:text-green-400" />
        <StatCard label="Losers" value={losers.toString()} valueClass="text-red-600 dark:text-red-400" />
        <StatCard 
          label="Net P/L" 
          value={`$${netPL.toLocaleString()}`} 
          valueClass={netPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} 
        />
      </div>

      {/* CONTROLS */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-4 shadow-sm space-y-4">
        
        {/* Top Row: Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search symbol or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-2">
            {selectedTrades.size > 0 && (
              <button
                onClick={deleteSelected}
                className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 font-medium rounded-lg transition-all flex items-center gap-2 text-sm"
              >
                <Trash2 size={16} />
                Delete ({selectedTrades.size})
              </button>
            )}
            
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 font-medium rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Bottom Row: Filter Chips (Wrapping, No Scroll) */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip 
            label="All Trades" 
            active={activeFilter === 'All'} 
            onClick={() => setActiveFilter('All')}
            count={totalTrades}
          />
          <FilterChip 
            label="Winners" 
            active={activeFilter === 'Winners'} 
            onClick={() => setActiveFilter('Winners')}
            count={winners}
          />
          <FilterChip 
            label="Losers" 
            active={activeFilter === 'Losers'} 
            onClick={() => setActiveFilter('Losers')}
            count={losers}
          />
          
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-all">
            <Filter size={14} />
            More Filters
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                <th className="text-left px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={selectedTrades.size === filteredTrades.length && filteredTrades.length > 0}
                    onChange={selectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortBy === 'date' && (sortDesc ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Symbol</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Volume</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Entry / Exit</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</th>
                <th 
                  className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => toggleSort('pl')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Profit/Loss
                    {sortBy === 'pl' && (sortDesc ? <ArrowDown size={12} /> : <ArrowUp size={12} />)}
                  </div>
                </th>
                <th className="text-right px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    No trades found
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => (
                  <TradeRow
                    key={trade.id}
                    trade={trade}
                    isSelected={selectedTrades.has(trade.id)}
                    onSelect={() => toggleSelect(trade.id)}
                    onEdit={() => setDetailTrade(trade)}
                    onDelete={() => {
                      if (confirm('Delete this trade?')) {
                        setTrades(trades.filter(t => t.id !== trade.id));
                      }
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {detailTrade && (
        <TradeDetailModal
          trade={detailTrade}
          onClose={() => setDetailTrade(null)}
          onSave={(notes) => {
            setTrades(trades.map(t => 
              t.id === detailTrade.id ? { ...t, notes } : t
            ));
            setDetailTrade(null);
          }}
        />
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, valueClass = 'text-slate-900 dark:text-white' }: { label: string; value: string; valueClass?: string }) => (
  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl p-4 shadow-sm">
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
  </div>
);

const FilterChip = ({ label, active, onClick, count }: FilterChipProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
      active
        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
    }`}
  >
    {label}
    {count !== undefined && (
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
        active 
          ? 'bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900' 
          : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
      }`}>
        {count}
      </span>
    )}
  </button>
);

const TradeRow = ({ trade, isSelected, onSelect, onEdit, onDelete }: TradeRowProps) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
    <td className="px-4 py-3">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
    </td>
    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400 font-mono">{trade.date}</td>
    <td className="px-4 py-3">
      <span className="font-semibold text-slate-900 dark:text-white">{trade.symbol}</span>
    </td>
    <td className="px-4 py-3">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
        trade.type === 'Buy'
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
          : 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400'
      }`}>
        {trade.type === 'Buy' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        {trade.type}
      </span>
    </td>
    <td className="px-4 py-3 text-right font-mono text-sm text-slate-600 dark:text-slate-400">{trade.lots.toFixed(2)}</td>
    <td className="px-4 py-3 text-right">
      <div className="flex flex-col items-end gap-0.5">
        <span className="font-mono text-sm text-slate-900 dark:text-white">{trade.entry}</span>
        <span className="font-mono text-xs text-slate-400">→ {trade.exit}</span>
      </div>
    </td>
    <td className="px-4 py-3">
      {trade.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {trade.tags.map((tag: string) => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <button className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tag size={12} /> Add
        </button>
      )}
    </td>
    <td className={`px-4 py-3 text-right font-bold font-mono ${
      trade.pl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    }`}>
      {trade.pl > 0 ? '+' : ''}${trade.pl.toLocaleString()}
    </td>
    <td className="px-4 py-3 text-right">
      <div className="relative">
        <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <MoreHorizontal size={16} />
        </button>
        {/* Could add dropdown menu here */}
      </div>
    </td>
  </tr>
);

const TradeDetailModal = ({ trade, onClose, onSave }: TradeDetailModalProps) => {
  const [notes, setNotes] = useState(trade.notes || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#0f1115] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trade Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Trade Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <DetailRow label="Symbol" value={trade.symbol} />
            <DetailRow label="Type" value={trade.type} />
            <DetailRow label="Lots" value={trade.lots.toString()} />
            <DetailRow label="Entry" value={trade.entry.toString()} />
            <DetailRow label="Exit" value={trade.exit.toString()} />
            <DetailRow 
              label="P/L" 
              value={`$${trade.pl.toLocaleString()}`}
              valueClass={trade.pl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Trade Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this trade..."
              rows={6}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onSave(notes)}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, valueClass = 'text-slate-900 dark:text-white' }: { label: string; value: string; valueClass?: string }) => (
  <div>
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-lg font-mono font-bold ${valueClass}`}>{value}</div>
  </div>
);