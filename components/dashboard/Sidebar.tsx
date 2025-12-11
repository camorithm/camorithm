'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
LayoutDashboard, 
BarChart2, 
BookOpen, 
Wallet, 
Trophy, 
Settings, 
ShoppingCart, 
ChevronLeft, 
ChevronRight, 
LogOut,
Moon,
Sun
} from 'lucide-react';

interface SidebarProps {
isCollapsed: boolean;
toggleCollapse: () => void;
isDark: boolean;
toggleTheme: () => void;
}

export const Sidebar = ({ isCollapsed, toggleCollapse, isDark, toggleTheme }: SidebarProps) => {
const pathname = usePathname();

const navItems = [
  { label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
  { label: 'Journal', icon: <BookOpen size={20} />, href: '/dashboard/journal' },
  { label: 'Payouts', icon: <Wallet size={20} />, href: '/dashboard/payouts' },
  { label: 'Competitions', icon: <Trophy size={20} />, href: '/dashboard/competitions' },
  { label: 'New Challenge', icon: <ShoppingCart size={20} />, href: '/dashboard/shop' },
  { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
];

return (
  <aside 
    className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-[#0f1115] border-r border-slate-200 dark:border-white/5 transition-all duration-300 ease-in-out flex flex-col ${
      isCollapsed ? 'w-[80px]' : 'w-[260px]'
    }`}
  >
    {/* 1. BRAND HEADER */}
    <div className={`h-20 flex items-center ${isCollapsed ? 'justify-center' : 'px-6 justify-between'} border-b border-slate-100 dark:border-white/5`}>
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-8 h-8 flex-shrink-0 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-mono">
          P
        </div>
        {!isCollapsed && (
          <span className="font-['Space_Grotesk'] font-bold text-xl text-slate-900 dark:text-white whitespace-nowrap">
            PropFirm
          </span>
        )}
      </div>
      
      {/* Collapse Button (Desktop Only) */}
      {!isCollapsed && (
        <button 
          onClick={toggleCollapse} 
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
      )}
    </div>

    {/* 2. NAVIGATION ITEMS */}
    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
              isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            
            {!isCollapsed && (
              <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
            )}

            {/* Tooltip for Collapsed State */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </Link>
        );
      })}
    </nav>

    {/* 3. FOOTER ACTIONS */}
    <div className="p-3 border-t border-slate-100 dark:border-white/5 flex flex-col gap-2">
      
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        {!isCollapsed && <span className="font-medium text-sm">Theme Mode</span>}
      </button>

      {/* Expand Button (If Collapsed) */}
      {isCollapsed && (
         <button 
         onClick={toggleCollapse} 
         className="flex items-center justify-center p-3 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
       >
         <ChevronRight size={20} />
       </button>
      )}

      {/* Profile / Logout */}
      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 dark:bg-white/5 ${isCollapsed ? 'justify-center' : ''}`}>
         <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex-shrink-0"></div>
         {!isCollapsed && (
           <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Alex Trader</div>
              <div className="text-[10px] text-slate-500 truncate">alex@example.com</div>
           </div>
         )}
         {!isCollapsed && <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-red-500" />}
      </div>
    </div>
  </aside>
);
};