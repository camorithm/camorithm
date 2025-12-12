'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  ChevronRight, 
  CreditCard,
  FileText,
  Shield,
  X,
  BarChart3
} from 'lucide-react';

interface SecondarySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecondarySidebar = ({ isOpen, onClose }: SecondarySidebarProps) => {
  const pathname = usePathname();

  // Define menus for different contexts
  const menus: any = {
    'default': [
      { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={16} />, exact: true },
      { label: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 size={16} /> },
      { label: 'Journal', href: '/dashboard/journal', icon: <BookOpen size={16} /> },
      { label: 'Payouts', href: '/dashboard/payouts', icon: <Wallet size={16} /> },
    ],
    'settings': [
      { label: 'Profile', href: '/dashboard/settings', icon: <FileText size={16} />, exact: true },
      { label: 'Security', href: '/dashboard/settings?tab=security', icon: <Shield size={16} /> },
      { label: 'Billing', href: '/dashboard/settings?tab=billing', icon: <CreditCard size={16} /> },
    ]
  };

  // Determine which menu to show based on path
  let activeMenu = menus['default'];
  let sectionTitle = 'Dashboard';

  if (pathname.includes('/settings')) {
    activeMenu = menus['settings'];
    sectionTitle = 'Settings';
  } else if (pathname.includes('/shop')) {
    return null;
  } else if (pathname.includes('/competitions')) {
    return null;
  }

  // If not open, don't render
  if (!isOpen) return null;

  return (
    <aside className="fixed top-0 left-[70px] h-screen w-[220px] bg-[#0f1115] border-r border-white/5 flex flex-col py-6 z-40 animate-in slide-in-from-left duration-300">
      
      {/* Header with Close Button */}
      <div className="px-6 mb-8 flex items-center justify-between">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">{sectionTitle}</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-1">
        {activeMenu.map((item: any) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-white/5 text-white font-medium' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </div>
              {isActive && <ChevronRight size={14} className="text-blue-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="px-6 pb-4 mt-auto">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/20">
          <div className="text-xs font-bold text-blue-400 mb-1">Evaluation Phase 1</div>
          <div className="text-[10px] text-blue-300/60">Account: #9920120</div>
        </div>
      </div>
    </aside>
  );
};