'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown, MessageCircle, LayoutDashboard, UserPlus } from 'lucide-react';

const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
navLink: "flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200",
btnPrimary: "bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-full px-6 py-2.5 text-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_30px_rgba(0,122,255,0.5)] transform hover:-translate-y-0.5",
btnSecondary: "text-white hover:text-[#007aff] font-medium text-sm px-4 transition-colors flex items-center gap-2",
};

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    {/* 
      UPDATED: Permanent background color and border. 
      Removed scroll event listener logic since it's now always dark.
    */}
    <nav className="fixed w-full z-50 bg-[#0a0b0d] border-b border-white/10 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Brand Identity */}
          <div className="flex items-center gap-3 z-50">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-[#007aff] to-[#00c6ff] rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/20 rotate-45 rounded-sm"></div>
                </div>
              </div>
              <span className={`text-xl text-white ${styles.h1}`}>PROPFIRM</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/challenges" className={styles.navLink}>
              Challenges
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mb-2 ml-0.5"></span>
            </Link>
            <Link href="/platforms" className={styles.navLink}>Platforms</Link>
            
            {/* Dropdown */}
            <div className="group relative h-20 flex items-center cursor-pointer">
              <span className={styles.navLink}>
                Resources <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </span>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-2">
                <Link href="/academy" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">Academy</Link>
                <Link href="/blog" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">Blog</Link>
                <Link href="/faq" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">FAQ</Link>
              </div>
            </div>

            <Link href="/affiliates" className={styles.navLink}>Affiliates</Link>
          </div>

          {/* 3. High-Value Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-[#5865F2] transition-colors p-2">
              <MessageCircle className="w-5 h-5" />
            </a>

            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>

            {/* Dashboard Link */}
            <Link href="/dashboard" className={styles.btnSecondary}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            
            {/* Sign Up Link */}
            <Link href="/sign-up" className={styles.btnPrimary}>
              Sign Up
            </Link>
            
            <div className="flex items-center gap-1 text-gray-400 pl-3 cursor-pointer hover:text-white">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold">EN</span>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0a0b0d] z-40 lg:hidden pt-24 px-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <Link href="/challenges" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Challenges</Link>
          <Link href="/platforms" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Platforms</Link>
          <Link href="/academy" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Academy</Link>
          <Link href="/affiliates" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Affiliates</Link>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Mobile Dashboard Link */}
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            
            {/* Mobile Sign Up Link */}
            <Link 
              href="/sign-up" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center py-4 rounded-xl bg-[#007aff] text-white font-bold shadow-lg shadow-blue-500/20"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    {/* Overlay backdrop for mobile */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        onClick={() => setIsOpen(false)}
      />
    )}
  </>
);
};

export default Navbar;