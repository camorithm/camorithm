'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X,
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  Trophy, 
  Settings, 
  ShoppingCart,
  BarChart3,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or document class
    const savedTheme = localStorage.getItem('theme');
    const currentIsDark = savedTheme === 'dark' || document.documentElement.classList.contains('dark');
    setIsDark(currentIsDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const newTheme = newIsDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/dashboard', exact: true },
    { label: 'Analytics', icon: <BarChart3 size={20} />, href: '/dashboard/analytics' },
    { label: 'Journal', icon: <BookOpen size={20} />, href: '/dashboard/journal' },
    { label: 'Payouts', icon: <Wallet size={20} />, href: '/dashboard/payouts' },
    { label: 'Competitions', icon: <Trophy size={20} />, href: '/dashboard/competitions' },
    { label: 'New Challenge', icon: <ShoppingCart size={20} />, href: '/dashboard/shop' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 left-0 h-screen w-[280px] bg-white dark:bg-[#0f1115] border-r border-slate-200 dark:border-white/5 z-70 lg:hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-white/5">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-mono shadow-lg shadow-blue-500/30">
              P
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-xl text-slate-900 dark:text-white">
              PropFirm
            </span>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 flex flex-col gap-2">
          
          {/* Theme Toggle - Only show when mounted */}
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-500">
              AT
            </div>
            <div className="flex-1 overflow-hidden text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Alex Trader</div>
              <div className="text-[10px] text-slate-500 truncate">alex@propfirm.com</div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};