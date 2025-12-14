'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Command, Zap, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface ShortcutAction {
  id: string;
  label: string;
  description: string;
  shortcut: string[];
  category: 'navigation' | 'actions' | 'view' | 'tools';
  icon?: React.ReactNode;
  action: () => void;
}

interface KeyboardShortcutsProps {
  onShortcut?: (actionId: string) => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ onShortcut }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define shortcuts
  const shortcuts: ShortcutAction[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      description: 'Navigate to main dashboard',
      shortcut: ['ctrl', 'd'],
      category: 'navigation',
      action: () => router.push('/dashboard'),
    },
    {
      id: 'nav-journal',
      label: 'Go to Journal',
      description: 'Navigate to trading journal',
      shortcut: ['ctrl', 'j'],
      category: 'navigation',
      action: () => router.push('/dashboard/journal'),
    },
    {
      id: 'nav-payouts',
      label: 'Go to Payouts',
      description: 'Navigate to payouts page',
      shortcut: ['ctrl', 'p'],
      category: 'navigation',
      action: () => router.push('/dashboard/payouts'),
    },
    {
      id: 'nav-performance',
      label: 'Go to Performance',
      description: 'Navigate to performance analytics',
      shortcut: ['ctrl', 'shift', 'p'],
      category: 'navigation',
      action: () => router.push('/dashboard/performance'),
    },
    {
      id: 'nav-shop',
      label: 'Go to Shop',
      description: 'Navigate to challenge shop',
      shortcut: ['ctrl', 's'],
      category: 'navigation',
      action: () => router.push('/dashboard/shop'),
    },
    {
      id: 'nav-competitions',
      label: 'Go to Competitions',
      description: 'Navigate to competitions',
      shortcut: ['ctrl', 'c'],
      category: 'navigation',
      action: () => router.push('/dashboard/competitions'),
    },
    
    // Actions
    {
      id: 'action-new-trade',
      label: 'New Trade Entry',
      description: 'Open trade entry modal',
      shortcut: ['ctrl', 't'],
      category: 'actions',
      action: () => {
        onShortcut?.('new-trade');
        alert('Trade entry modal would open here');
      },
    },
    {
      id: 'action-close-all',
      label: 'Close All Positions',
      description: 'Emergency close all positions',
      shortcut: ['ctrl', 'shift', 'x'],
      category: 'actions',
      action: () => {
        if (confirm('Close ALL positions?')) {
          onShortcut?.('close-all');
          alert('All positions closed (demo)');
        }
      },
    },
    {
      id: 'action-quick-note',
      label: 'Quick Note',
      description: 'Add a quick trading note',
      shortcut: ['ctrl', 'n'],
      category: 'actions',
      action: () => {
        onShortcut?.('quick-note');
        alert('Quick note modal would open here');
      },
    },
    
    // View
    {
      id: 'view-theme',
      label: 'Toggle Theme',
      description: 'Switch between light/dark mode',
      shortcut: ['ctrl', 'shift', 't'],
      category: 'view',
      action: () => {
        document.documentElement.classList.toggle('dark');
        onShortcut?.('toggle-theme');
      },
    },
    {
      id: 'view-fullscreen',
      label: 'Toggle Fullscreen',
      description: 'Enter/exit fullscreen mode',
      shortcut: ['f11'],
      category: 'view',
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        onShortcut?.('fullscreen');
      },
    },
    
    // Tools
    {
      id: 'tool-search',
      label: 'Global Search',
      description: 'Search across all content',
      shortcut: ['ctrl', 'shift', 'f'],
      category: 'tools',
      action: () => {
        onShortcut?.('search');
        alert('Global search would open here');
      },
    },
    {
      id: 'tool-command',
      label: 'Command Palette',
      description: 'Open command palette',
      shortcut: ['ctrl', 'k'],
      category: 'tools',
      action: () => setIsOpen(true),
    },
    {
      id: 'tool-help',
      label: 'Help & Shortcuts',
      description: 'View keyboard shortcuts',
      shortcut: ['ctrl', '/'],
      category: 'tools',
      action: () => {
        onShortcut?.('help');
        setIsOpen(true);
      },
    },
  ];

  // Handle keyboard events
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    // Command palette toggle
    if (ctrl && key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
      return;
    }

    // Close on Escape
    if (key === 'escape') {
      setIsOpen(false);
      return;
    }

    // Navigate in palette
    if (isOpen) {
      if (key === 'arrowdown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredShortcuts.length - 1));
      } else if (key === 'arrowup') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (key === 'enter') {
        e.preventDefault();
        executeShortcut(filteredShortcuts[selectedIndex]);
      }
      return;
    }

    // Match shortcuts
    shortcuts.forEach(shortcut => {
      const matches = shortcut.shortcut.every((k, i) => {
        if (k === 'ctrl') return ctrl;
        if (k === 'shift') return shift;
        if (k === 'alt') return e.altKey;
        return k === key;
      });

      if (matches && shortcut.shortcut.length === (ctrl ? 1 : 0) + (shift ? 1 : 0) + 1) {
        e.preventDefault();
        executeShortcut(shortcut);
      }
    });
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const executeShortcut = (shortcut: ShortcutAction) => {
    shortcut.action();
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  };

  // Filter shortcuts
  const filteredShortcuts = shortcuts.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const formatShortcut = (keys: string[]) => {
    return keys.map(key => {
      if (key === 'ctrl') return '⌘';
      if (key === 'shift') return '⇧';
      if (key === 'alt') return '⌥';
      return key.toUpperCase();
    }).join(' + ');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation': return '🧭';
      case 'actions': return '⚡';
      case 'view': return '👁️';
      case 'tools': return '🛠️';
      default: return '📌';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-[10vh] animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0f1115] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in slide-in-from-top-4 duration-200">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 dark:border-white/5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search commands..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredShortcuts.length === 0 ? (
            <div className="p-12 text-center">
              <Command className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No commands found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {Object.entries(
                filteredShortcuts.reduce((acc, shortcut) => {
                  if (!acc[shortcut.category]) acc[shortcut.category] = [];
                  acc[shortcut.category].push(shortcut);
                  return acc;
                }, {} as Record<string, ShortcutAction[]>)
              ).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 bg-slate-50 dark:bg-white/[0.02]">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <span>{getCategoryIcon(category)}</span>
                      {category}
                    </span>
                  </div>
                  <div>
                    {items.map((shortcut, index) => {
                      const globalIndex = filteredShortcuts.indexOf(shortcut);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={shortcut.id}
                          onClick={() => executeShortcut(shortcut)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full px-4 py-3 flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-500/10 border-l-2 border-l-blue-500'
                              : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 text-left">
                            {shortcut.icon}
                            <div>
                              <div className={`text-sm font-medium ${
                                isSelected
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-slate-900 dark:text-white'
                              }`}>
                                {shortcut.label}
                              </div>
                              <div className="text-xs text-slate-500">{shortcut.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {shortcut.shortcut.map((key, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && <span className="text-slate-400 text-xs mx-0.5">+</span>}
                                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                                    {key === 'ctrl' ? '⌘' : key === 'shift' ? '⇧' : key.toUpperCase()}
                                  </kbd>
                                </React.Fragment>
                              ))}
                            </div>
                            {isSelected && <ArrowRight size={16} className="text-blue-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded text-[10px]">↓</kbd>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded text-[10px]">↵</kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded text-[10px]">esc</kbd>
              <span>close</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-blue-500" />
            <span>{filteredShortcuts.length} commands</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;