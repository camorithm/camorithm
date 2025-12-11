'use client';

import React from 'react';
import { PrimarySidebar } from '../../components/dashboard/PrimarySidebar';
import { SecondarySidebar } from '../../components/dashboard/SecondarySidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname();

// Logic to determine layout width based on secondary sidebar presence
// Shop and Competitions hide the secondary sidebar to give more room
const showSecondary = !pathname.includes('/shop') && !pathname.includes('/competitions');
const marginLeft = showSecondary ? 'ml-[290px]' : 'ml-[70px]';

const pageTitle = pathname.split('/').pop() || 'Overview';

return (
  <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
    
    {/* 1. Primary Rail (Always Visible) */}
    <PrimarySidebar />

    {/* 2. Secondary Menu (Conditional) */}
    <SecondarySidebar />

    {/* 3. Main Content Area */}
    <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${marginLeft}`}>
      <TopNav title={pageTitle} />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  </div>
);
}