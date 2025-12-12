'use client';

import React, { useState } from 'react';
import { PrimarySidebar } from '../../components/dashboard/PrimarySidebar';
import { SecondarySidebar } from '../../components/dashboard/SecondarySidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { MobileNav } from '../../components/dashboard/MobileNav';
import { ThemeProvider } from '../../components/dashboard/ThemeProvider';
import { usePathname } from 'next/navigation';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logic to determine if secondary sidebar should be shown at all
  const showSecondary = !pathname.includes('/shop') && !pathname.includes('/competitions');
  
  // Calculate margin based on sidebar state
  const marginLeft = showSecondary && isSecondarySidebarOpen ? 'ml-[290px]' : 'ml-[70px]';

  const pageTitle = pathname.split('/').pop() || 'Overview';

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Desktop: Primary Rail (Always Visible) */}
      <PrimarySidebar 
        isSecondarySidebarOpen={isSecondarySidebarOpen}
        toggleSecondarySidebar={() => setIsSecondarySidebarOpen(!isSecondarySidebarOpen)}
        showSecondary={showSecondary}
      />

      {/* Desktop: Secondary Menu (Conditional) */}
      {showSecondary && (
        <SecondarySidebar 
          isOpen={isSecondarySidebarOpen}
          onClose={() => setIsSecondarySidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${marginLeft} lg:${marginLeft}`}>
        <TopNav 
          title={pageTitle}
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </ThemeProvider>
  );
}