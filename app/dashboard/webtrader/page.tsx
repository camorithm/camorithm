'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  Settings, 
  Clock, 
  DollarSign,
  Activity,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Types
interface Position {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  volume: number;
  openPrice: number;
  currentPrice: number;
  sl: number | null;
  tp: number | null;
  profit: number;
  profitPercent: number;
  openTime: string;
}

interface Order {
  id: string;
  symbol: string;
  type: 'buy_limit' | 'sell_limit' | 'buy_stop' | 'sell_stop';
  volume: number;
  price: number;
  sl: number | null;
  tp: number | null;
  createdAt: string;
}

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function WebTraderPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD');
  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history'>('positions');
  const [orderType, setOrderType] = useState<'market' | 'pending'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [volume, setVolume] = useState(0.01);
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [pendingPrice, setPendingPrice] = useState('');
  const [showWatchlist, setShowWatchlist] = useState(true);
  const [showOrderPanel, setShowOrderPanel] = useState(true);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(250);
  const [isBottomCollapsed, setIsBottomCollapsed] = useState(false);

  // Mock data
  const [accountBalance] = useState(100000);
  const [equity, setEquity] = useState(100000);
  const [margin] = useState(500);
  const [freeMargin] = useState(99500);
  const [marginLevel] = useState(20000);

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { symbol: 'EURUSD', name: 'Euro vs US Dollar', price: 1.0523, change: 0.0012, changePercent: 0.11 },
    { symbol: 'GBPUSD', name: 'British Pound vs US Dollar', price: 1.2645, change: -0.0023, changePercent: -0.18 },
    { symbol: 'USDJPY', name: 'US Dollar vs Japanese Yen', price: 149.82, change: 0.45, changePercent: 0.30 },
    { symbol: 'AUDUSD', name: 'Australian Dollar vs US Dollar', price: 0.6523, change: 0.0008, changePercent: 0.12 },
    { symbol: 'XAUUSD', name: 'Gold vs US Dollar', price: 2045.30, change: 12.50, changePercent: 0.61 },
  ]);

  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'pos1',
      symbol: 'EURUSD',
      type: 'buy',
      volume: 0.10,
      openPrice: 1.0512,
      currentPrice: 1.0523,
      sl: 1.0490,
      tp: 1.0560,
      profit: 110.00,
      profitPercent: 1.05,
      openTime: '2024-12-16 09:15:23'
    },
    {
      id: 'pos2',
      symbol: 'GBPUSD',
      type: 'sell',
      volume: 0.05,
      openPrice: 1.2668,
      currentPrice: 1.2645,
      sl: 1.2700,
      tp: 1.2600,
      profit: 115.00,
      profitPercent: 0.91,
      openTime: '2024-12-16 08:42:11'
    }
  ]);

  const [pendingOrders, setPendingOrders] = useState<Order[]>([
    {
      id: 'ord1',
      symbol: 'USDJPY',
      type: 'buy_limit',
      volume: 0.02,
      price: 149.50,
      sl: 149.00,
      tp: 150.50,
      createdAt: '2024-12-16 10:30:00'
    }
  ]);

  // Calculate total P&L
  useEffect(() => {
    const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);
    setEquity(accountBalance + totalProfit);
  }, [positions, accountBalance]);

  const placeOrder = () => {
    if (orderType === 'market') {
      // Create new position
      const newPosition: Position = {
        id: `pos${Date.now()}`,
        symbol: selectedSymbol,
        type: orderSide,
        volume,
        openPrice: watchlist.find(w => w.symbol === selectedSymbol)?.price || 0,
        currentPrice: watchlist.find(w => w.symbol === selectedSymbol)?.price || 0,
        sl: stopLoss ? parseFloat(stopLoss) : null,
        tp: takeProfit ? parseFloat(takeProfit) : null,
        profit: 0,
        profitPercent: 0,
        openTime: new Date().toISOString()
      };
      setPositions([...positions, newPosition]);
      
      // Reset form
      setVolume(0.01);
      setStopLoss('');
      setTakeProfit('');
    } else {
      // Create pending order
      const orderTypeMap = {
        buy: 'buy_limit' as const,
        sell: 'sell_limit' as const
      };
      
      const newOrder: Order = {
        id: `ord${Date.now()}`,
        symbol: selectedSymbol,
        type: orderTypeMap[orderSide],
        volume,
        price: parseFloat(pendingPrice),
        sl: stopLoss ? parseFloat(stopLoss) : null,
        tp: takeProfit ? parseFloat(takeProfit) : null,
        createdAt: new Date().toISOString()
      };
      setPendingOrders([...pendingOrders, newOrder]);
      
      // Reset form
      setVolume(0.01);
      setStopLoss('');
      setTakeProfit('');
      setPendingPrice('');
    }
  };

  const closePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const cancelOrder = (id: string) => {
    setPendingOrders(pendingOrders.filter(o => o.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-[#0a0b0d] text-white flex flex-col overflow-hidden">
      
      {/* TOP BAR */}
      <div className="h-14 bg-[#13151a] border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Symbol Selector */}
          <div className="flex items-center gap-2 bg-[#1a1d24] rounded-lg px-3 py-2 min-w-[180px]">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm">{selectedSymbol}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1">
            {['1m', '5m', '15m', '1h', '4h', '1D'].map(tf => (
              <button 
                key={tf}
                className="px-3 py-1.5 text-xs font-medium rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Balance:</span>
            <span className="font-mono font-bold text-sm">${accountBalance.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Equity:</span>
            <span className={`font-mono font-bold text-sm ${equity >= accountBalance ? 'text-green-400' : 'text-red-400'}`}>
              ${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Free Margin:</span>
            <span className="font-mono font-bold text-sm">${freeMargin.toLocaleString()}</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR - Watchlist */}
        {showWatchlist && (
          <div className="w-64 bg-[#13151a] border-r border-white/5 flex flex-col">
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
              <h3 className="font-bold text-sm">Market Watch</h3>
              <button 
                onClick={() => setShowWatchlist(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search symbols..."
                  className="w-full bg-[#1a1d24] border border-white/5 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {watchlist.map(item => (
                <button
                  key={item.symbol}
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className={`w-full p-3 border-b border-white/5 hover:bg-white/5 transition-colors text-left ${
                    selectedSymbol === item.symbol ? 'bg-blue-500/10' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="font-bold text-sm">{item.symbol}</div>
                      <div className="text-xs text-slate-500 truncate">{item.name}</div>
                    </div>
                    <Star className="w-4 h-4 text-slate-600 hover:text-yellow-400 transition-colors cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm">{item.price.toFixed(item.symbol.includes('JPY') ? 2 : 4)}</span>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      item.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CENTER - Chart */}
        <div className="flex-1 flex flex-col bg-[#0a0b0d]">
          <div className="flex-1 relative">
            {/* TradingView Chart Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-sm mb-2">TradingView Chart Integration</p>
                <p className="text-xs text-slate-600 max-w-md">
                  In production, this would embed the TradingView Advanced Chart widget.<br />
                  Add your TradingView widget code here with symbol: <span className="font-mono text-blue-400">{selectedSymbol}</span>
                </p>
                <div className="mt-4 p-4 bg-[#13151a] border border-white/5 rounded-lg inline-block">
                  <code className="text-xs text-slate-400">
                    &lt;TradingViewWidget symbol="{selectedSymbol}" /&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* Quick Toggle Buttons */}
            {!showWatchlist && (
              <button
                onClick={() => setShowWatchlist(true)}
                className="absolute top-4 left-4 p-2 bg-[#13151a] border border-white/5 rounded-lg hover:bg-white/5 transition-colors"
                title="Show Watchlist"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
            )}
            {!showOrderPanel && (
              <button
                onClick={() => setShowOrderPanel(true)}
                className="absolute top-4 right-4 p-2 bg-[#13151a] border border-white/5 rounded-lg hover:bg-white/5 transition-colors"
                title="Show Order Panel"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            )}
          </div>

          {/* BOTTOM PANEL - Positions/Orders/History */}
          <div 
            className={`bg-[#13151a] border-t border-white/5 flex flex-col transition-all duration-300 ${
              isBottomCollapsed ? 'h-12' : ''
            }`}
            style={{ height: isBottomCollapsed ? '48px' : `${bottomPanelHeight}px` }}
          >
            {/* Tabs Header */}
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    activeTab === 'positions' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Positions ({positions.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Pending Orders ({pendingOrders.length})
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    activeTab === 'history' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  History
                </button>
              </div>
              <button 
                onClick={() => setIsBottomCollapsed(!isBottomCollapsed)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                {isBottomCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Tab Content */}
            {!isBottomCollapsed && (
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'positions' && (
                  <div className="space-y-2">
                    {positions.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No open positions</p>
                      </div>
                    ) : (
                      positions.map(pos => (
                        <div key={pos.id} className="bg-[#1a1d24] border border-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                pos.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {pos.type.toUpperCase()}
                              </span>
                              <span className="font-bold">{pos.symbol}</span>
                              <span className="text-sm text-slate-400">{pos.volume} lots</span>
                            </div>
                            <button
                              onClick={() => closePosition(pos.id)}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs font-medium transition-colors"
                            >
                              Close
                            </button>
                          </div>
                          <div className="grid grid-cols-6 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Open Price</div>
                              <div className="font-mono">{pos.openPrice.toFixed(4)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Current Price</div>
                              <div className="font-mono">{pos.currentPrice.toFixed(4)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">S/L</div>
                              <div className="font-mono text-xs">{pos.sl ? pos.sl.toFixed(4) : '—'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">T/P</div>
                              <div className="font-mono text-xs">{pos.tp ? pos.tp.toFixed(4) : '—'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Profit/Loss</div>
                              <div className={`font-mono font-bold ${pos.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {pos.profit >= 0 ? '+' : ''}${pos.profit.toFixed(2)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Open Time</div>
                              <div className="text-xs">{new Date(pos.openTime).toLocaleTimeString()}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-2">
                    {pendingOrders.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No pending orders</p>
                      </div>
                    ) : (
                      pendingOrders.map(order => (
                        <div key={order.id} className="bg-[#1a1d24] border border-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                order.type.includes('buy') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {order.type.replace('_', ' ').toUpperCase()}
                              </span>
                              <span className="font-bold">{order.symbol}</span>
                              <span className="text-sm text-slate-400">{order.volume} lots</span>
                            </div>
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="grid grid-cols-5 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Entry Price</div>
                              <div className="font-mono">{order.price.toFixed(4)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">S/L</div>
                              <div className="font-mono text-xs">{order.sl ? order.sl.toFixed(4) : '—'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">T/P</div>
                              <div className="font-mono text-xs">{order.tp ? order.tp.toFixed(4) : '—'}</div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-xs text-slate-500 mb-1">Created</div>
                              <div className="text-xs">{new Date(order.createdAt).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="text-center py-8 text-slate-500">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No trade history yet</p>
                    <p className="text-xs mt-1">Closed positions will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR - Order Panel */}
        {showOrderPanel && (
          <div className="w-80 bg-[#13151a] border-l border-white/5 flex flex-col">
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
              <h3 className="font-bold text-sm">New Order</h3>
              <button 
                onClick={() => setShowOrderPanel(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Symbol Display */}
              <div className="bg-[#1a1d24] rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{selectedSymbol}</span>
                  <span className="text-xs text-slate-500">
                    {watchlist.find(w => w.symbol === selectedSymbol)?.name || ''}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Bid</div>
                    <div className="font-mono font-bold text-red-400">
                      {(watchlist.find(w => w.symbol === selectedSymbol)?.price || 0).toFixed(4)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Ask</div>
                    <div className="font-mono font-bold text-green-400">
                      {((watchlist.find(w => w.symbol === selectedSymbol)?.price || 0) + 0.0002).toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Type Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    orderType === 'market'
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1a1d24] text-slate-400 hover:text-white'
                  }`}
                >
                  Market Order
                </button>
                <button
                  onClick={() => setOrderType('pending')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    orderType === 'pending'
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1a1d24] text-slate-400 hover:text-white'
                  }`}
                >
                  Pending Order
                </button>
              </div>

              {/* Pending Price (only for pending orders) */}
              {orderType === 'pending' && (
                <div className="mb-4">
                  <label className="text-xs text-slate-400 mb-2 block">Entry Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={pendingPrice}
                    onChange={(e) => setPendingPrice(e.target.value)}
                    placeholder="0.0000"
                    className="w-full bg-[#1a1d24] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              )}

              {/* Volume Input */}
              <div className="mb-4">
                <label className="text-xs text-slate-400 mb-2 block">Volume (Lots)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVolume(Math.max(0.01, volume - 0.01))}
                    className="p-2 bg-[#1a1d24] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value) || 0.01)}
                    className="flex-1 bg-[#1a1d24] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-center focus:outline-none focus:border-blue-500/50"
                  />
                  <button
                    onClick={() => setVolume(volume + 0.01)}
                    className="p-2 bg-[#1a1d24] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  {[0.01, 0.05, 0.10, 0.50, 1.00].map(v => (
                    <button
                      key={v}
                      onClick={() => setVolume(v)}
                      className="flex-1 py-1 bg-[#1a1d24] hover:bg-white/5 rounded text-xs transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stop Loss */}
              <div className="mb-4">
                <label className="text-xs text-slate-400 mb-2 block">Stop Loss (Optional)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="0.0000"
                  className="w-full bg-[#1a1d24] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-500/50"
                />
              </div>

              {/* Take Profit */}
              <div className="mb-6">
                <label className="text-xs text-slate-400 mb-2 block">Take Profit (Optional)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="0.0000"
                  className="w-full bg-[#1a1d24] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-500/50"
                />
              </div>

              {/* Order Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => {
                    setOrderSide('buy');
                    placeOrder();
                  }}
                  className="py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-green-500/20"
                >
                  BUY
                </button>
                <button
                  onClick={() => {
                    setOrderSide('sell');
                    placeOrder();
                  }}
                  className="py-3 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-red-500/20"
                >
                  SELL
                </button>
              </div>

              {/* Risk Calculation */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-300">
                    <div className="font-medium mb-1">Risk Assessment</div>
                    <div className="text-blue-400/80">
                      Position Size: ${(volume * 100000).toLocaleString()}<br />
                      Margin Required: ~${(volume * 100).toFixed(2)}<br />
                      {stopLoss && (
                        <>Risk: ${Math.abs((parseFloat(stopLoss) - (watchlist.find(w => w.symbol === selectedSymbol)?.price || 0)) * volume * 100000).toFixed(2)}</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}