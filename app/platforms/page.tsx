'use client';

import React from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import { 
Monitor, 
Smartphone, 
Globe, 
Download, 
Cpu, 
Zap, 
Server, 
ShieldCheck, 
ArrowRight,
CheckCircle2,
Activity
} from 'lucide-react';

// --- CONFIG ---

const platforms = [
{
  id: 'mt5',
  name: 'MetaTrader 5',
  tagline: 'The Modern Standard',
  description: 'The successor to MT4. Multi-asset platform with advanced depth of market, faster processing, and 21 timeframes. Built for the modern algorithmic trader.',
  features: ['64-bit Architecture', '38 Technical Indicators', 'Economic Calendar Built-in', 'Depth of Market (DOM)'],
  color: 'text-green-500',
  bg: 'bg-green-500/10'
},
{
  id: 'ctrader',
  name: 'cTrader',
  tagline: 'Built for ECN Trading',
  description: 'Sleek, intuitive, and powerful. Designed specifically for ECN execution with Level II pricing, advanced order types, and beautiful charting.',
  features: ['Level II Pricing', 'Visual Stop Loss/Take Profit', 'Advanced Chart Trading', 'C# Algo Language'],
  color: 'text-blue-500',
  bg: 'bg-blue-500/10'
},
{
  id: 'mt4',
  name: 'MetaTrader 4',
  tagline: 'The Classic Choice',
  description: 'The world’s most popular trading platform. Known for its massive library of Expert Advisors (EAs) and custom indicators.',
  features: ['Thousands of EAs', 'Simple Interface', 'Highly Stable', 'MQL4 Language'],
  color: 'text-orange-500',
  bg: 'bg-orange-500/10'
},
{
  id: 'dxtrade',
  name: 'DXtrade',
  tagline: 'Next-Gen Web Trading',
  description: 'A modern, browser-based platform designed for prop trading. Fully customizable layout, trading journal integration, and no installation required.',
  features: ['100% Web Based', 'Trading Journal Inside', 'Drag & Drop Layout', 'Mobile Responsive'],
  color: 'text-purple-500',
  bg: 'bg-purple-500/10'
}
];

// --- COMPONENTS ---

const PlatformCard = ({ platform }: { platform: typeof platforms[0] }) => (
<div className="group relative bg-[#13151a] border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-white/10 transition-all duration-300">
  {/* Hover Gradient */}
  <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity ${platform.bg.replace('/10', '')}`} />
  
  <div className="relative z-10">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl ${platform.bg} flex items-center justify-center`}>
        <Activity className={`w-7 h-7 ${platform.color}`} />
      </div>
      <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 font-mono">
         v.Latest
      </div>
    </div>

    <h3 className="text-2xl font-bold text-white mb-1">{platform.name}</h3>
    <div className={`text-sm font-medium mb-4 ${platform.color}`}>{platform.tagline}</div>
    <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">{platform.description}</p>

    <div className="space-y-3 mb-8">
      {platform.features.map((feat, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircle2 className={`w-4 h-4 ${platform.color}`} />
          <span>{feat}</span>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
        <Monitor className="w-4 h-4" /> Desktop
      </button>
      <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
        <Globe className="w-4 h-4" /> Web
      </button>
    </div>
  </div>
</div>
);

export default function PlatformsPage() {
return (
  <div className="min-h-screen bg-[#0a0b0d] text-white selection:bg-[#007aff] selection:text-white">
    <Navbar />

    {/* 1. Hero Section */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Server className="w-3 h-3" /> Equinix NY4 Servers
          </div>
          <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold tracking-tight mb-6">
            Institutional Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] to-[#00c6ff]">Trading Infrastructure</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
            Trade with ultra-low latency execution on the world's most robust platforms. 
            Direct market access feel with no artificial slippage.
          </p>
        </div>
      </div>
    </section>

    {/* 2. Platform Cards */}
    <section className="pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>
      </div>
    </section>

    {/* 3. The Tech Stack (Server Info) */}
    <section className="py-24 bg-[#0d0f12] border-y border-white/5 relative">
      <div className="max-w-[1200px] mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
                  Located where the <br /> liquidity lives.
               </h2>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Our trade servers are cross-connected via fiber optics in the Equinix NY4 data center in New York. 
                  This is the same facility used by Wall Street banks and major hedge funds.
               </p>
               
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-[#007aff]/10 flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-[#007aff]" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">Ultra-Low Latency</h4>
                        <p className="text-gray-400 text-sm">Average execution speed of 21ms. No requotes.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-purple-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">Deep Liquidity</h4>
                        <p className="text-gray-400 text-sm">Aggregated feeds from 10+ Tier-1 banks.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Server Visualization */}
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-[#007aff]/20 to-purple-500/20 blur-3xl opacity-30" />
               <div className="bg-[#13151a] border border-white/10 rounded-2xl p-8 relative z-10">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                     <span className="text-gray-400 font-mono text-sm">SERVER_STATUS</span>
                     <span className="flex items-center gap-2 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
                     </span>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                     <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="text-white">New York (NY4)</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Uptime (30d)</span>
                        <span className="text-green-400">99.99%</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Ping (Global Avg)</span>
                        <span className="text-[#007aff]">42ms</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Execution</span>
                        <span className="text-white">Market</span>
                     </div>
                     
                     {/* Abstract Load Bars */}
                     <div className="pt-6 space-y-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                           <span>Load</span>
                           <span>24%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-[24%] bg-[#007aff] rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>

    {/* 4. Download Center */}
    <section className="py-24 px-6">
       <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">Trade Anywhere, Anytime</h2>
          <p className="text-gray-400 mb-12">Seamlessly sync your account across all your devices.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
             <button className="flex items-center gap-3 px-8 py-4 bg-[#1a1d24] border border-white/10 hover:border-white/20 hover:bg-[#20232b] rounded-2xl transition-all group">
                <Monitor className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <div className="text-left">
                   <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Download for</div>
                   <div className="text-white font-bold">Windows</div>
                </div>
             </button>
             
             <button className="flex items-center gap-3 px-8 py-4 bg-[#1a1d24] border border-white/10 hover:border-white/20 hover:bg-[#20232b] rounded-2xl transition-all group">
                <Monitor className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <div className="text-left">
                   <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Download for</div>
                   <div className="text-white font-bold">macOS</div>
                </div>
             </button>

             <button className="flex items-center gap-3 px-8 py-4 bg-[#1a1d24] border border-white/10 hover:border-white/20 hover:bg-[#20232b] rounded-2xl transition-all group">
                <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <div className="text-left">
                   <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Download for</div>
                   <div className="text-white font-bold">iOS</div>
                </div>
             </button>

             <button className="flex items-center gap-3 px-8 py-4 bg-[#1a1d24] border border-white/10 hover:border-white/20 hover:bg-[#20232b] rounded-2xl transition-all group">
                <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <div className="text-left">
                   <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Download for</div>
                   <div className="text-white font-bold">Android</div>
                </div>
             </button>
          </div>
       </div>
    </section>

    <Footer />
  </div>
);
}