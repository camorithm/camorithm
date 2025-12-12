'use client';

import React, { useState } from 'react';
import { Sidebar } from './../components/dashboard/Sidebar';
import { SecondarySidebar } from './../components/dashboard/SecondarySidebar';
import { TopNav } from './../components/dashboard/TopNav';
import { MobileNav } from './../components/dashboard/MobileNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine if secondary sidebar should show
  const showSecondary = !pathname.includes('/shop') && !pathname.includes('/competitions');

  const pageTitle = pathname.split('/').pop() || 'Overview';

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-blue-500/30">
      
      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
      </div>

      {/* Secondary Menu (Conditional) - Hidden on Mobile */}
      {showSecondary && (
        <div className="hidden lg:block">
          <SecondarySidebar />
        </div>
      )}

      {/* Main Content Area - FIX: Use proper conditional classes */}
      <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${
        showSecondary ? 'lg:ml-[290px]' : 'lg:ml-[70px]'
      }`}>
        <TopNav 
          title={pageTitle}
          onMobileMenuToggle={toggleMobileMenu}
        />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}