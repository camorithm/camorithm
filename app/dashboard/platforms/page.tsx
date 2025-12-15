// File: app/dashboard/platforms/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Copy, Check, RefreshCw, Download, AlertCircle, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';

export default function PlatformsPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncedTrades, setSyncedTrades] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  const supabase = createClientComponentClient();
  const apiUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/mt4/sync` : '';

  useEffect(() => {
    loadApiKey();
    loadConnectionStatus();
  }, []);

  const loadApiKey = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('mt4_api_key, mt4_last_sync, mt4_account_number, mt4_server')
        .eq('id', user.id)
        .single();

      if (profile) {
        setApiKey(profile.mt4_api_key);
        setLastSync(profile.mt4_last_sync);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConnectionStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Count trades synced from MT4/MT5
      const { count } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('platform', ['mt4', 'mt5']);

      setSyncedTrades(count || 0);

      // Check if we've received data in last 5 minutes
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: profile } = await supabase
        .from('profiles')
        .select('mt4_last_sync')
        .eq('id', user.id)
        .single();

      if (profile?.mt4_last_sync && profile.mt4_last_sync > fiveMinutesAgo) {
        setConnectionStatus('connected');
      } else if (count && count > 0) {
        setConnectionStatus('disconnected'); // Has trades but not recent
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      setConnectionStatus('disconnected');
    }
  };

  const generateApiKey = async () => {
    setGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Generate new API key
      const newKey = `pk_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;

      const { error } = await supabase
        .from('profiles')
        .update({ mt4_api_key: newKey })
        .eq('id', user.id);

      if (error) throw error;

      setApiKey(newKey);
      alert('✓ New API key generated! Update your Expert Advisor with the new key.');
    } catch (error) {
      console.error('Error generating API key:', error);
      alert('Failed to generate API key');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testConnection = async () => {
    if (!apiKey) return;
    
    setConnectionStatus('checking');
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'X-API-Key': apiKey,
        },
      });

      if (response.ok) {
        setConnectionStatus('connected');
        alert('✓ Connection successful!');
      } else {
        setConnectionStatus('disconnected');
        alert('✗ Connection failed. Check your API key.');
      }
    } catch (error) {
      setConnectionStatus('disconnected');
      alert('✗ Connection failed. Make sure your server is running.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Platform Connections</h1>
        <p className="text-slate-500">Connect MT4, MT5, cTrader, or DXtrade to auto-sync your trades</p>
      </div>

      {/* Connection Status Card */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Connection Status</h2>
          <button
            onClick={loadConnectionStatus}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className="text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              {connectionStatus === 'connected' ? (
                <CheckCircle2 className="text-green-500" size={20} />
              ) : connectionStatus === 'checking' ? (
                <Loader2 className="text-blue-500 animate-spin" size={20} />
              ) : (
                <AlertCircle className="text-slate-400" size={20} />
              )}
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Status</span>
            </div>
            <div className={`text-lg font-bold ${
              connectionStatus === 'connected' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-slate-500'
            }`}>
              {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'checking' ? 'Checking...' : 'Disconnected'}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl">
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Synced Trades</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{syncedTrades}</div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl">
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Last Sync</div>
            <div className="text-sm font-mono text-slate-600 dark:text-slate-400">
              {lastSync ? new Date(lastSync).toLocaleString() : 'Never'}
            </div>
          </div>
        </div>
      </div>

      {/* API Key Card */}
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">API Credentials</h2>
        
        {!apiKey ? (
          <div className="text-center py-8">
            <p className="text-slate-500 mb-4">Generate an API key to connect your trading platforms</p>
            <button
              onClick={generateApiKey}
              disabled={generating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate API Key'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* API URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">API Endpoint</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={apiUrl}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(apiUrl)}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                  title="Copy URL"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-400" />}
                </button>
              </div>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Your API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(apiKey)}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                  title="Copy API Key"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-400" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">⚠️ Keep this key secret. Anyone with this key can sync trades to your account.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={testConnection}
                disabled={connectionStatus === 'checking'}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                Test Connection
              </button>
              <button
                onClick={generateApiKey}
                disabled={generating}
                className="px-4 py-2 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-all"
              >
                Regenerate Key
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Installation Instructions */}
      {apiKey && (
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Installation Instructions</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Download Expert Advisor</h3>
              </div>
              <div className="ml-11 space-y-2">
                <a
                  href="/api/download/PropFirmSync.mq4"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Download MT4 EA (.mq4)
                </a>
                <br />
                <a
                  href="/api/download/PropFirmSync.mq5"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Download MT5 EA (.mq5)
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Install in MetaTrader</h3>
              </div>
              <div className="ml-11">
                <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>Open MetaTrader 4/5</li>
                  <li>Click <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">File → Open Data Folder</code></li>
                  <li>Navigate to <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">MQL4/Experts</code> or <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">MQL5/Experts</code></li>
                  <li>Copy the downloaded EA file here</li>
                  <li>Restart MetaTrader</li>
                </ol>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Configure EA</h3>
              </div>
              <div className="ml-11">
                <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>Drag the EA onto any chart</li>
                  <li>In the settings, paste your <strong>API Key</strong> and <strong>API URL</strong></li>
                  <li>Make sure <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">Allow WebRequest</code> is enabled</li>
                  <li>Add <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">{apiUrl}</code> to allowed URLs in <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">Tools → Options → Expert Advisors</code></li>
                  <li>Click OK - trades will start syncing automatically!</li>
                </ol>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Need Help?</h4>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                    Check the <a href="#" className="underline">full installation guide</a> or <a href="#" className="underline">video tutorial</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}