'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SecondarySidebar } from '../../components/dashboard/SecondarySidebar';
import { TopNav } from '../../components/dashboard/TopNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Sidebar state - DEFAULT: Primary collapsed (80px), Secondary expanded (220px)
  const [primaryCollapsed, setPrimaryCollapsed] = useState(true);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  
  // Mobile menu state (for TopNav component)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showSecondary = !pathname.includes('/shop') && !pathname.includes('/competitions');
  const pageTitle = pathname.split('/').pop() || 'Overview';

  // ENFORCED mutual exclusivity
  const handlePrimaryToggle = () => {
    if (primaryCollapsed) {
      // Expanding primary -> MUST collapse secondary
      setPrimaryCollapsed(false);
      setSecondaryCollapsed(true);
    } else {
      // Collapsing primary
      setPrimaryCollapsed(true);
    }
  };

  const handleSecondaryToggle = () => {
    if (secondaryCollapsed) {
      // Expanding secondary -> MUST collapse primary  
      setSecondaryCollapsed(false);
      setPrimaryCollapsed(true);
    } else {
      // Collapsing secondary
      setSecondaryCollapsed(true);
    }
  };

  // Calculate total left padding
  const primaryWidth = primaryCollapsed ? 80 : 260;
  const secondaryWidth = showSecondary ? (secondaryCollapsed ? 60 : 220) : 0;
  const totalPadding = `${primaryWidth + secondaryWidth}px`;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505]">
      
      {/* Primary Sidebar - Only pass props it actually accepts */}
      <Sidebar 
        isCollapsed={primaryCollapsed}
        toggleCollapse={handlePrimaryToggle}
      />

      {/* Secondary Sidebar - CONDITIONAL */}
      {showSecondary && (
        <SecondarySidebar 
          primaryCollapsed={primaryCollapsed}
          isCollapsed={secondaryCollapsed}
          toggleCollapse={handleSecondaryToggle}
        />
      )}

      {/* Main Content - Padded by total sidebar width */}
      <div style={{ paddingLeft: totalPadding }} className="transition-all duration-300">
        <TopNav 
          title={pageTitle}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}