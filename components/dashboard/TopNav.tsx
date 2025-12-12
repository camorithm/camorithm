'use client';

import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface TopNavProps {
  title?: string;
  onMobileMenuToggle?: () => void;
}

export const TopNav = ({ title = "Dashboard", onMobileMenuToggle }: TopNavProps) => {
  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 bg-white/80 dark:bg-[#0a0b0d]/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-white/5">
      
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white capitalize font-['Space_Grotesk']">
          {title === 'page' ? 'Overview' : title.replace(/-/g, ' ')}
        </h2>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center relative group">
          <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 dark:focus:border-blue-500/50 rounded-xl text-sm outline-none w-64 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Search Icon Only - Mobile */}
        <button className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 lg:p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0b0d]"></span>
        </button>
      </div>
    </header>
  );
};