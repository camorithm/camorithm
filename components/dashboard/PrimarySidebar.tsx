'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
LayoutDashboard, 
Trophy, 
ShoppingCart, 
Settings, 
LineChart, 
GraduationCap 
} from 'lucide-react';

export const PrimarySidebar = () => {
const pathname = usePathname();

// Helper to determine active root section
const isActive = (path: string) => {
  if (path === '/dashboard' && pathname === '/dashboard') return true;
  if (path !== '/dashboard' && pathname.startsWith(path)) return true;
  return false;
};

return (
  <aside className="fixed top-0 left-0 h-screen w-[70px] bg-[#050505] border-r border-white/10 flex flex-col items-center py-6 z-50">
    
    {/* 1. BRAND LOGO */}
    <Link href="/" className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl shadow-lg shadow-blue-500/20 mb-8">
      P
    </Link>

    {/* 2. MAIN MODULES */}
    <nav className="flex-1 w-full flex flex-col items-center gap-4">
      <RailItem 
        icon={<LayoutDashboard size={22} />} 
        label="Dashboard" 
        href="/dashboard" 
        active={isActive('/dashboard') && !pathname.includes('/dashboard/shop') && !pathname.includes('/dashboard/competitions') && !pathname.includes('/dashboard/settings')} 
      />
      <RailItem 
        icon={<Trophy size={22} />} 
        label="Competitions" 
        href="/dashboard/competitions" 
        active={pathname.includes('/dashboard/competitions')} 
      />
      <RailItem 
        icon={<LineChart size={22} />} 
        label="WebTrader" 
        href="#" 
        active={false} 
      />
      <RailItem 
        icon={<ShoppingCart size={22} />} 
        label="Shop" 
        href="/dashboard/shop" 
        active={pathname.includes('/dashboard/shop')} 
      />
    </nav>

    {/* 3. BOTTOM ACTIONS */}
    <div className="flex flex-col gap-4 mb-4">
      <RailItem 
        icon={<GraduationCap size={22} />} 
        label="Academy" 
        href="#" 
        active={false} 
      />
      <RailItem 
        icon={<Settings size={22} />} 
        label="Settings" 
        href="/dashboard/settings" 
        active={pathname.includes('/dashboard/settings')} 
      />
      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 mt-2 flex items-center justify-center text-[10px] font-bold text-slate-400">
        AT
      </div>
    </div>
  </aside>
);
};

const RailItem = ({ icon, label, active, href }: any) => (
<Link 
  href={href}
  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${
    active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
      : 'text-slate-500 hover:bg-white/10 hover:text-white'
  }`}
>
  {icon}
  {/* Tooltip */}
  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-white/10">
    {label}
  </div>
</Link>
);