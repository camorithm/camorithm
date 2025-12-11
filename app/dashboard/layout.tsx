'use client';

import React, { useState } from 'react';
import { 
LayoutDashboard, 
BarChart2, 
Wallet, 
Settings, 
CreditCard,
Bell,
Search,
ChevronDown,
LineChart,
LogOut,
Moon,
Sun
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
// Toggle this state to see Light/Dark mode in action
const [isDark, setIsDark] = useState(true);

return (
  <div className={isDark ? 'dark' : ''}>
    <div className="flex h-screen w-full bg-[#f8f9fa] dark:bg-[#0a0b0d] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* SIDEBAR 1: Global Rail (Slim) */}
      <aside className="w-[70px] flex-shrink-0 flex flex-col items-center py-6 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#0f1115] z-20">
        <div className="w-8 h-8 bg-blue-600 rounded-lg mb-8 flex items-center justify-center text-white font-bold">P</div>
        
        <nav className="flex-1 flex flex-col gap-4 w-full px-3">
          <RailItem icon={<LayoutDashboard size={20} />} active />
          <RailItem icon={<BarChart2 size={20} />} />
          <RailItem icon={<Wallet size={20} />} />
          <RailItem icon={<Settings size={20} />} />
        </nav>

        <div className="mt-auto flex flex-col gap-4">
           <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 transition-colors"
           >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></div>
        </div>
      </aside>

      {/* SIDEBAR 2: Context Menu (Wide) */}
      <aside className="w-[240px] flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/5 bg-[#f8f9fa] dark:bg-[#0a0b0d] z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-white/5">
          <span className="font-semibold text-sm tracking-wide">My Challenges</span>
          <ChevronDown size={14} className="ml-auto text-slate-400" />
        </div>

        <div className="p-4">
           <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Analytics</div>
           <nav className="space-y-1">
              <ContextItem label="Overview" active />
              <ContextItem label="Trade Journal" />
              <ContextItem label="Profit Factor" badge="Beta" />
              <ContextItem label="Drawdown Monitor" />
           </nav>
        </div>

         <div className="p-4 mt-auto border-t border-slate-200 dark:border-white/5">
           <div className="bg-blue-600/5 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-200 dark:border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">Scale Up</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">You are 2% away from your next capital allocation.</p>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View Requirements</button>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
         {/* Top Header */}
         <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0b0d]">
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <span>Dashboards</span>
               <span className="text-slate-300">/</span>
               <span className="text-slate-900 dark:text-white font-medium">Evaluation Phase 1</span>
            </div>

            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search trades..." 
                    className="h-9 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-white/5 border-none text-sm focus:ring-1 focus:ring-blue-500 outline-none w-64 transition-all"
                  />
               </div>
               <button className="relative p-2 text-slate-400 hover:text-blue-500 transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0b0d]"></span>
               </button>
            </div>
         </header>

         {/* Scrollable Page Content */}
         <div className="flex-1 overflow-y-auto p-8">
            {children}
         </div>
      </main>
    </div>
  </div>
);
}

// Helper Components for Sidebar
const RailItem = ({ icon, active }: { icon: any, active?: boolean }) => (
<button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
  active 
    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
}`}>
  {icon}
</button>
);

const ContextItem = ({ label, active, badge }: { label: string, active?: boolean, badge?: string }) => (
<button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
  active 
    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' 
    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
}`}>
  {label}
  {badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">{badge}</span>}
</button>
);