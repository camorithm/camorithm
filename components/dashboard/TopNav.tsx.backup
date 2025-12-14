'use client';

import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface TopNavProps {
  title?: string;
  onMobileMenuToggle?: () => void;
}

export const TopNav = ({ title = "Dashboard", onMobileMenuToggle }: TopNavProps) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-white/80 dark:bg-[#0a0b0d]/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-white/5">
      
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        {onMobileMenuToggle && (
          <button 
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
          >
            <Menu size={20} />
          </button>
        )}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize font-['Space_Grotesk']">
          {title === 'page' ? 'Overview' : title.replace(/-/g, ' ')}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center relative group">
          <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 dark:focus:border-blue-500/50 rounded-xl text-sm outline-none w-64 transition-all"
          />
        </div>

        <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0b0d]"></span>
        </button>
      </div>
    </header>
  );
};