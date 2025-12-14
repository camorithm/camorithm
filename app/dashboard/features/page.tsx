'use client';

import React, { useState } from 'react';
import { EconomicCalendar } from '../../../components/EconomicCalendar';
import { TradeAlerts } from '../../../components/TradeAlerts';
import { KeyboardShortcuts } from '../../../components/KeyboardShortcuts';
import { EnhancedTradeNotes } from '../../../components/EnhancedTradeNotes';
import { Zap, Keyboard, Bell, Calendar, FileText } from 'lucide-react';

export default function FeaturesPage() {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      {/* Keyboard Shortcuts (Global) */}
      <KeyboardShortcuts 
        onShortcut={(id: string) => console.log('Shortcut triggered:', id)}
      />

      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-3">🚀 Professional Trader Pack</h1>
          <p className="text-blue-100 mb-6">5 powerful features to supercharge your trading workflow</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FeatureBadge icon={<Calendar size={16} />} label="Economic Calendar" />
            <FeatureBadge icon={<Bell size={16} />} label="Price Alerts" />
            <FeatureBadge icon={<Keyboard size={16} />} label="Shortcuts" />
            <FeatureBadge icon={<Zap size={16} />} label="Quick Actions" />
            <FeatureBadge icon={<FileText size={16} />} label="Rich Notes" />
          </div>

          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center gap-2 text-sm">
              <Keyboard className="w-4 h-4" />
              <span className="font-semibold">Try it now:</span>
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+K</kbd>
              <span>to open command palette</span>
            </div>
          </div>
        </div>

        {/* Economic Calendar */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Economic Calendar</h2>
              <p className="text-sm text-slate-500">Never miss high-impact news events</p>
            </div>
          </div>
          <EconomicCalendar
            showFilters={true}
            maxEvents={8}
            autoRefresh={true}
          />
        </div>

        {/* Trade Alerts */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Price Alerts</h2>
              <p className="text-sm text-slate-500">Set it and forget it - we'll notify you</p>
            </div>
          </div>
          <TradeAlerts
            enableSound={true}
            enableNotifications={true}
            checkInterval={1000}
          />
        </div>

        {/* Enhanced Trade Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Enhanced Trade Notes</h2>
                <p className="text-sm text-slate-500">Rich journaling with templates and screenshots</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-all"
            >
              {showNotes ? 'Hide' : 'Show'} Demo
            </button>
          </div>

          {showNotes && (
            <EnhancedTradeNotes
              tradeId="ORD-001"
              onSave={(note: any) => {
                console.log('Note saved:', note);
                alert('Note saved successfully! (Demo)');
                setShowNotes(false);
              }}
              onCancel={() => setShowNotes(false)}
            />
          )}
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
              <Keyboard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h2>
              <p className="text-sm text-slate-500">Power user speed - master these hotkeys</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ShortcutRow keys={['⌘', 'K']} description="Command Palette" />
            <ShortcutRow keys={['⌘', 'D']} description="Go to Dashboard" />
            <ShortcutRow keys={['⌘', 'J']} description="Go to Journal" />
            <ShortcutRow keys={['⌘', 'P']} description="Go to Payouts" />
            <ShortcutRow keys={['⌘', 'T']} description="New Trade Entry" />
            <ShortcutRow keys={['⌘', '⇧', 'T']} description="Toggle Theme" />
            <ShortcutRow keys={['⌘', 'N']} description="Quick Note" />
            <ShortcutRow keys={['⌘', '/']} description="Show All Shortcuts" />
            <ShortcutRow keys={['⌘', '⇧', 'X']} description="Close All Positions" />
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Zap size={16} />
              <strong>Pro Tip:</strong> Press <kbd className="px-2 py-0.5 bg-white dark:bg-[#0f1115] border border-blue-300 dark:border-blue-500/30 rounded text-xs mx-1">Ctrl+K</kbd> anywhere to access all commands instantly!
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HighlightCard
            icon={<Calendar className="w-8 h-8" />}
            title="Real-Time Updates"
            description="Economic calendar refreshes automatically with live countdowns to next events"
            color="blue"
          />
          <HighlightCard
            icon={<Bell className="w-8 h-8" />}
            title="Smart Notifications"
            description="Browser & sound alerts when price targets are hit - never miss an entry"
            color="green"
          />
          <HighlightCard
            icon={<Keyboard className="w-8 h-8" />}
            title="Lightning Fast"
            description="Navigate entire platform without touching your mouse - pure efficiency"
            color="orange"
          />
        </div>
      </div>
    </>
  );
}

// Helper Components
const FeatureBadge = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const ShortcutRow = ({ keys, description }: { keys: string[], description: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
    <span className="text-sm text-slate-600 dark:text-slate-400">{description}</span>
    <div className="flex items-center gap-1">
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-slate-400 text-xs mx-0.5">+</span>}
          <kbd className="px-2 py-1 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded text-xs font-mono">
            {key}
          </kbd>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const HighlightCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) => (
  <div className={`p-6 bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 rounded-2xl`}>
    <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-500/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400 mb-4`}>
      {icon}
    </div>
    <h3 className={`text-lg font-bold text-${color}-900 dark:text-${color}-100 mb-2`}>{title}</h3>
    <p className={`text-sm text-${color}-700 dark:text-${color}-300/80`}>{description}</p>
  </div>
);