'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
const [isCollapsed, setIsCollapsed] = useState(false);
const [isDark, setIsDark] = useState(true);
const pathname = usePathname();

const pageTitle = pathname.split('/').pop() || 'Overview';

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDark]);

return (
  <div className={`min-h-screen bg-[#f8f9fa] dark:bg-[#0a0b0d] transition-colors duration-300 font-sans`}>
    
    {/* Sidebar is fixed and Z-50 */}
    <Sidebar 
      isCollapsed={isCollapsed} 
      toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      isDark={isDark}
      toggleTheme={() => setIsDark(!isDark)}
    />

    {/* Main Content is Z-0 to sit behind Sidebar tooltips */}
    <div 
      className={`relative z-0 transition-all duration-300 ease-in-out flex flex-col min-h-screen ${
        isCollapsed ? 'ml-[80px]' : 'ml-[260px]'
      }`}
    >
      <TopNav title={pageTitle} />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  </div>
);
}