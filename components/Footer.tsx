'use client';

import React from 'react';
import { Globe } from 'lucide-react';

const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
};

const Footer = () => {
return (
  <footer className="bg-[#050607] pt-24 pb-12 border-t border-white/5">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-2">
           <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-[#007aff] to-[#00c6ff] rounded-md"></div>
              <span className={`text-xl text-white ${styles.h1}`}>PROPFIRM</span>
          </div>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
            We empower traders with capital and technology. Join the revolution of modern proprietary trading. Built for serious traders.
          </p>
          <div className="flex gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer">
                <Globe className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-[#007aff] cursor-pointer">About Us</li>
            <li className="hover:text-[#007aff] cursor-pointer">Careers</li>
            <li className="hover:text-[#007aff] cursor-pointer">Press</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-[#007aff] cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-[#007aff] cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#007aff] cursor-pointer">Risk Disclosure</li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-[#007aff] cursor-pointer">Support Center</li>
            <li className="hover:text-[#007aff] cursor-pointer">Discord Community</li>
            <li className="hover:text-[#007aff] cursor-pointer">support@propfirm.com</li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs">
          © 2025 PropFirm Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
           <span className="text-gray-600 text-xs">All trading involves risk. Only risk capital you're prepared to lose.</span>
        </div>
      </div>
    </div>
  </footer>
);
};

export default Footer;