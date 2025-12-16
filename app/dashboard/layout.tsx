'use client';

import React, { useState, useEffect } from 'react';
import { PrimarySidebar } from '../../components/dashboard/PrimarySidebar';
import { SecondarySidebar } from '../../components/dashboard/SecondarySidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Logic to determine layout width based on secondary sidebar presence
  // Shop, Competitions, and WebTrader hide the secondary sidebar to give more room
  const showSecondary = !pathname.includes('/shop') 
    && !pathname.includes('/competitions')
    && !pathname.includes('/webtrader');
    
  const marginLeft = showSecondary ? 'ml-[290px]' : 'ml-[70px]';

  // WebTrader gets full-screen treatment (no TopNav, no padding)
  const isWebTrader = pathname.includes('/webtrader');

  const pageTitle = pathname.split('/').pop() || 'Overview';

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. Primary Rail (Always Visible) */}
      <PrimarySidebar />

      {/* 2. Secondary Menu (Conditional) */}
      {showSecondary && <SecondarySidebar />}

      {/* 3. Main Content Area */}
      {isWebTrader ? (
        // Full-screen layout for WebTrader
        <div className={`transition-all duration-300 ease-in-out ${marginLeft}`}>
          {children}
        </div>
      ) : (
        // Standard layout with TopNav and padding
        <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${marginLeft}`}>
          <TopNav title={pageTitle} />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}