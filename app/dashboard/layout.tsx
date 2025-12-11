'use client';

import React, { useState } from 'react';
import { PrimarySidebar } from '../../components/dashboard/PrimarySidebar';
import { SecondarySidebar } from '../../components/dashboard/SecondarySidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(true);

  // Logic to determine if secondary sidebar should be shown at all
  const showSecondary = !pathname.includes('/shop') && !pathname.includes('/competitions');
  
  // Calculate margin based on sidebar state
  const marginLeft = showSecondary && isSecondarySidebarOpen ? 'ml-[290px]' : 'ml-[70px]';

  const pageTitle = pathname.split('/').pop() || 'Overview';

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. Primary Rail (Always Visible) - Pass toggle function */}
      <PrimarySidebar 
        isSecondarySidebarOpen={isSecondarySidebarOpen}
        toggleSecondarySidebar={() => setIsSecondarySidebarOpen(!isSecondarySidebarOpen)}
        showSecondary={showSecondary}
      />

      {/* 2. Secondary Menu (Conditional) - Pass state and close handler */}
      {showSecondary && (
        <SecondarySidebar 
          isOpen={isSecondarySidebarOpen}
          onClose={() => setIsSecondarySidebarOpen(false)}
        />
      )}

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