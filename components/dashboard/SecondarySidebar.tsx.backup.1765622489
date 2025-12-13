'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  ChevronRight,
  ChevronLeft,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react';

interface SecondarySidebarProps {
  primaryCollapsed?: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const SecondarySidebar = ({ 
  primaryCollapsed = false, 
  isCollapsed = false,
  toggleCollapse 
}: SecondarySidebarProps) => {
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
      { label: 'Security', href: '/dashboard/settings/security', icon: <Shield size={16} /> },
    ]
  };

  // Determine which menu to show based on path
  let activeMenu = menus['default'];
  let sectionTitle = 'Dashboard';

  if (pathname.includes('/settings')) {
    activeMenu = menus['settings'];
    sectionTitle = 'Settings';
  }

  // Position based on primary sidebar state
  const leftPosition = primaryCollapsed ? '80px' : '260px';
  const width = isCollapsed ? '60px' : '220px';

  return (
    <aside 
      className="fixed top-0 h-screen bg-white dark:bg-[#0f1115] border-r border-slate-200 dark:border-white/5 flex flex-col py-6 z-40 transition-all duration-300"
      style={{ 
        left: leftPosition,
        width: width
      }}
    >
      
      {/* Header with Collapse Button */}
      <div className={`px-3 mb-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'}`}>
        {!isCollapsed && (
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {sectionTitle}
          </h2>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {activeMenu.map((item: any) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg text-sm transition-all group relative ${
                isActive 
                  ? 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.02]'
              }`}
            >
              {isCollapsed ? (
                <>
                  <div className="flex items-center">
                    {item.icon}
                  </div>
                  {/* Tooltip for collapsed state */}
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-blue-500 flex-shrink-0" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info - Only show when expanded */}
      {!isCollapsed && (
        <div className="px-6 pb-4 mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/20">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Evaluation Phase 1</div>
            <div className="text-[10px] text-blue-500/60 dark:text-blue-300/60">Account: #9920120</div>
          </div>
        </div>
      )}
    </aside>
  );
};
