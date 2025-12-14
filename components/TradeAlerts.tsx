'use client';

import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Plus, Trash2, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

// Types
interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  currentPrice: number;
  createdAt: Date;
  triggered: boolean;
  triggeredAt?: Date;
}

interface TradeAlertsProps {
  enableSound?: boolean;
  enableNotifications?: boolean;
  checkInterval?: number;
}

// Mock price data
const mockPrices: Record<string, number> = {
  'EURUSD': 1.0824,
  'GBPUSD': 1.2640,
  'XAUUSD': 2042.10,
  'BTCUSD': 42105.00,
  'US30': 36200.50,
  'NAS100': 16400.20,
  'USDJPY': 148.50,
  'AUDUSD': 0.6580,
};

export const TradeAlerts: React.FC<TradeAlertsProps> = ({
  enableSound = true,
  enableNotifications = true,
  checkInterval = 1000,
}) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>(mockPrices);
  
  // Form state
  const [newAlert, setNewAlert] = useState({
    symbol: 'EURUSD',
    condition: 'above' as 'above' | 'below',
    price: '',
  });

  // Update prices (simulate live prices)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const change = (Math.random() - 0.5) * 0.0005 * updated[symbol];
          updated[symbol] = +(updated[symbol] + change).toFixed(updated[symbol] > 100 ? 2 : 4);
        });
        return updated;
      });
    }, checkInterval);

    return () => clearInterval(interval);
  }, [checkInterval]);

  // Check alerts
  useEffect(() => {
    alerts.forEach(alert => {
      if (alert.triggered) return;

      const currentPrice = currentPrices[alert.symbol];
      if (!currentPrice) return;

      const shouldTrigger = 
        (alert.condition === 'above' && currentPrice >= alert.price) ||
        (alert.condition === 'below' && currentPrice <= alert.price);

      if (shouldTrigger) {
        triggerAlert(alert);
      }
    });
  }, [currentPrices, alerts]);

  const triggerAlert = (alert: PriceAlert) => {
    // Update alert as triggered
    setAlerts(prev => 
      prev.map(a => 
        a.id === alert.id 
          ? { ...a, triggered: true, triggeredAt: new Date() }
          : a
      )
    );

    // Play sound
    if (enableSound) {
      const audio = new Audio('/alert.mp3');
      audio.play().catch(() => console.log('Audio play failed'));
    }

    // Show browser notification
    if (enableNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Price Alert Triggered! 🔔', {
          body: `${alert.symbol} ${alert.condition} ${alert.price}`,
          icon: '/logo.png',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Price Alert Triggered! 🔔', {
              body: `${alert.symbol} ${alert.condition} ${alert.price}`,
              icon: '/logo.png',
            });
          }
        });
      }
    }
  };

  const addAlert = () => {
    if (!newAlert.price || isNaN(parseFloat(newAlert.price))) return;

    const alert: PriceAlert = {
      id: `alert-${Date.now()}`,
      symbol: newAlert.symbol,
      condition: newAlert.condition,
      price: parseFloat(newAlert.price),
      currentPrice: currentPrices[newAlert.symbol],
      createdAt: new Date(),
      triggered: false,
    };

    setAlerts(prev => [...prev, alert]);
    setNewAlert({ symbol: 'EURUSD', condition: 'above', price: '' });
    setShowAddForm(false);
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const activeAlerts = alerts.filter(a => !a.triggered);
  const triggeredAlerts = alerts.filter(a => a.triggered);

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Price Alerts</h3>
              <p className="text-xs text-slate-500">
                {activeAlerts.length} active • {triggeredAlerts.length} triggered
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
          >
            <Plus size={16} />
            Add Alert
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Symbol</label>
                <select
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {Object.keys(mockPrices).map(symbol => (
                    <option key={symbol} value={symbol}>{symbol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Condition</label>
                <select
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="above">Above ≥</option>
                  <option value="below">Below ≤</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Price (Current: {currentPrices[newAlert.symbol]})
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={newAlert.price}
                  onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
                  placeholder="Enter price"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={addAlert}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div>
          <div className="px-6 py-2 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Alerts</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {activeAlerts.map(alert => {
              const currentPrice = currentPrices[alert.symbol];
              const distance = Math.abs(currentPrice - alert.price);
              const percentDistance = (distance / alert.price) * 100;

              return (
                <div key={alert.id} className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center justify-between">
                    {/* Symbol & Condition */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                        {alert.condition === 'above' ? (
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{alert.symbol}</div>
                        <div className="text-xs text-slate-500">
                          {alert.condition === 'above' ? 'Above' : 'Below'} {alert.price}
                        </div>
                      </div>
                    </div>

                    {/* Current Price */}
                    <div className="text-center">
                      <div className="text-xs text-slate-400 mb-1">Current</div>
                      <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                        {currentPrice.toFixed(currentPrice > 100 ? 2 : 4)}
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="text-center">
                      <div className="text-xs text-slate-400 mb-1">Distance</div>
                      <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
                        {percentDistance.toFixed(2)}%
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div>
          <div className="px-6 py-2 bg-green-50 dark:bg-green-500/10 border-y border-green-200 dark:border-green-500/20">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={12} />
              Recently Triggered ({triggeredAlerts.length})
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {triggeredAlerts.slice(0, 5).map(alert => (
              <div key={alert.id} className="px-6 py-3 bg-green-50/30 dark:bg-green-500/5 hover:bg-green-50/50 dark:hover:bg-green-500/10 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {alert.symbol} {alert.condition === 'above' ? '≥' : '≤'} {alert.price}
                      </div>
                      {alert.triggeredAt && (
                        <div className="text-xs text-slate-500">
                          {alert.triggeredAt.toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="px-6 py-12 text-center">
          <BellOff className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-4">No price alerts yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Create your first alert
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${enableNotifications ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
            <span className="text-slate-500">
              {enableNotifications ? 'Notifications ON' : 'Notifications OFF'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${enableSound ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
            <span className="text-slate-500">
              {enableSound ? 'Sound ON' : 'Sound OFF'}
            </span>
          </div>
        </div>
        <span className="text-slate-400">Checking every {checkInterval}ms</span>
      </div>
    </div>
  );
};

export default TradeAlerts;