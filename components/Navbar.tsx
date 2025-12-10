'use client';

import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
btnPrimary: "bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-full px-8 py-3.5 transition-all duration-300 shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_30px_rgba(0,122,255,0.5)] transform hover:-translate-y-0.5",
};

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);

return (
  <nav className="fixed w-full z-50 bg-[#0a0b0d]/80 backdrop-blur-lg border-b border-white/5">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#007aff] to-[#00c6ff] rounded-lg"></div>
          <span className={`text-2xl text-white ${styles.h1}`}>PROPFIRM</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
          <a href="#" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#" className="hover:text-white transition-colors">Academy</a>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-white hover:text-[#007aff] font-medium px-4 transition-colors">
            Client Area
          </button>
          <button className={`${styles.btnPrimary} !py-2.5 !px-6 !text-sm`}>
            Free Trial
          </button>
          <div className="flex items-center gap-1 text-gray-400 pl-4 border-l border-white/10">
            <Globe className="w-4 h-4" />
            <span className="text-xs">EN</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar;