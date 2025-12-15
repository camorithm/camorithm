'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { 
Check, 
BarChart2, 
Zap, 
TrendingUp,
Clock,
ArrowRight,
Star,
Shield,
Trophy
} from 'lucide-react';

// --- STYLES & CONFIG ---
const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
h2: "font-['Space_Grotesk'] font-bold tracking-tight",
body: "font-['Inter'] text-gray-400",
btnPrimary: "group relative bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,122,255,0.5)] transform hover:-translate-y-0.5 overflow-hidden flex items-center justify-center",
btnSecondary: "bg-[#1a1d24] hover:bg-[#252830] border border-white/10 text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-300 backdrop-blur-sm",
card: "bg-[#13151a] border border-white/5 rounded-2xl",
};

// --- TYPES ---
type AccountSizeKey = '10k' | '25k' | '50k' | '100k' | '200k';

// --- SUB-COMPONENTS ---

const MatrixRow = ({ label, value, isGreen, isRed }: { label: string, value: string, isGreen?: boolean, isRed?: boolean }) => (
<div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] px-3 rounded-lg transition-colors">
  <span className="text-gray-400 font-medium text-sm">{label}</span>
  <span className={`font-bold font-mono text-lg ${
    isGreen ? 'text-green-400' : isRed ? 'text-red-400' : 'text-white'
  }`}>
    {value}
  </span>
</div>
);

// --- SECTIONS ---

const Hero = () => {
return (
  <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#0a0b0d] overflow-hidden">
    {/* IMPROVEMENT: Grid Background Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
    
    {/* Background Gradients - Added a secondary purple glow for depth */}
    <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-[#007aff]/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[120px] pointer-events-none" />
    
    {/* Noise Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

    <div className="relative max-w-[1400px] mx-auto px-6 text-center z-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide group-hover:text-white transition-colors">
          94% Pass Rate Last Month
        </span>
      </div>

      <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white mb-6 ${styles.h1}`}>
        Trade Our Capital. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] via-[#60a5fa] to-[#00c6ff] drop-shadow-sm">
          Keep The Profit.
        </span>
      </h1>

      <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed`}>
        Get funded up to <span className="text-white font-semibold border-b border-white/20">$200,000</span>. 
        We take the risk. You take 90% of the upside. No hidden rules.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
        <button className={styles.btnPrimary}>
          Start Challenge <ArrowRight className="ml-2 w-4 h-4" />
        </button>
        <button className={styles.btnSecondary}>
          View Dashboard
        </button>
      </div>

      {/* 3D Dashboard Mockup - Enhanced with better glassmorphism */}
      <div className="relative mx-auto max-w-5xl perspective-[2000px] group">
        <div className="relative bg-[#0f1115]/90 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden h-[350px] md:h-[500px] transform rotate-x-[15deg] group-hover:rotate-x-[5deg] transition-transform duration-700 ease-out border-b-0 shadow-blue-900/20">
           
           {/* Reflection Gradient */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

           {/* UI Header */}
           <div className="h-14 bg-[#1a1d24]/50 border-b border-white/5 flex items-center px-6 justify-between">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-md border border-white/5">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">MetaTrader 5 • Live</div>
              </div>
           </div>
           
           {/* UI Chart Area */}
           <div className="p-8 relative h-full">
              {/* Floating Metrics */}
              <div className="absolute top-8 left-8 p-5 bg-[#13151a]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-20 flex gap-6">
                  <div>
                      <div className="text-xs text-gray-500 font-bold uppercase mb-1">Equity</div>
                      <div className="text-3xl font-mono text-white font-bold tracking-tight">$104,250.00</div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                     <div className="text-green-500 text-sm font-mono font-bold bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +4.2%
                     </div>
                  </div>
              </div>

              {/* Enhanced Graph Line with Glow */}
              <svg className="absolute bottom-0 left-0 w-full h-72 z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#007aff" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                  </defs>
                  <path d="M0 20 C 15 18, 30 19, 40 12 S 60 5, 75 8 S 90 2, 100 6 V 20 H 0 Z" fill="url(#gradient)" />
                  <path d="M0 20 C 15 18, 30 19, 40 12 S 60 5, 75 8 S 90 2, 100 6" fill="none" stroke="#007aff" strokeWidth="0.5" filter="url(#glow)" />
              </svg>
           </div>
        </div>
      </div>
    </div>
  </section>
);
};

const Testimonials = () => {
  // Duplicating array for smoother marquee loop
  const reviews = [
      { name: "Alex M.", text: "The spread on Gold is insane and I got my payout via USDT immediately." },
      { name: "Sarah K.", text: "Passed my 100k challenge in 5 days. Dashboard is super clean." },
      { name: "Marcus D.", text: "Support answered my ticket in 2 minutes. Best in the game." },
      { name: "Jonas B.", text: "Finally a firm that doesn't slip my orders during news." },
  ];

  return (
      <section className="py-20 border-y border-white/5 bg-[#0d0f12] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                  <h2 className={`text-3xl text-white mb-2 ${styles.h2}`}>Traders Trust Us</h2>
                  <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                              <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-[1px]"><Star className="w-3 h-3 text-white fill-white" /></div>
                          ))}
                      </div>
                      <span className="text-white font-bold text-sm">Trustpilot</span>
                      <span className="text-gray-500 text-sm border-l border-white/10 pl-3 ml-1">4.8/5 Score</span>
                  </div>
              </div>
              <a href="#" className="text-[#007aff] text-sm font-medium hover:text-white transition-colors flex items-center gap-1">
                  Read all 2,400+ reviews <ArrowRight className="w-3 h-3" />
              </a>
          </div>

          {/* Scrolling Marquee */}
          <div className="relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d0f12] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d0f12] to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-6 animate-scroll whitespace-nowrap pl-6 hover:[animation-play-state:paused]">
                  {[...reviews, ...reviews, ...reviews].map((review, i) => (
                      <div key={i} className="w-[350px] bg-[#1a1d24] border border-white/5 p-6 rounded-xl flex-shrink-0 hover:border-white/20 transition-all cursor-default group">
                          <div className="flex gap-1 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                              {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-[#00b67a] fill-[#00b67a]" />)}
                          </div>
                          <h4 className="text-white font-bold text-sm mb-2">"Payout received in 2 hours"</h4>
                          <p className="text-gray-400 text-sm leading-relaxed whitespace-normal mb-4">
                              {review.text}
                          </p>
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                              <div className="text-xs text-gray-500 font-medium">{review.name} • Verified Trader</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
}

const BentoFeatures = () => {
return (
  <section className="py-32 bg-[#0a0b0d]">
     <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className={`text-3xl md:text-5xl text-white mb-6 ${styles.h2}`}>Built for Serious Traders</h2>
           <p className="text-gray-400">Everything you need to succeed, nothing you don't.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
           
           {/* Main Feature Card */}
           <div className="col-span-1 md:col-span-2 row-span-2 bg-[#13151a] border border-white/5 rounded-3xl p-10 relative overflow-hidden group hover:border-[#007aff]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#007aff]/10 blur-[100px] group-hover:bg-[#007aff]/20 transition-all" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                   <div className="w-14 h-14 rounded-2xl bg-[#007aff] flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="text-white w-7 h-7" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-4">Instant Crypto Payouts</h3>
                   <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                      Stop waiting 14 days for a wire transfer. Withdraw your profits in USDT, BTC, or ETH. 
                      Requests are processed automatically.
                   </p>
                 </div>
                 
                 <div className="mt-8 bg-[#0a0b0d]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-5 max-w-md border-l-4 border-l-green-500 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm font-bold">Payout Approved</div>
                      <div className="text-gray-500 text-xs">TXID: 0x8a...4b29</div>
                    </div>
                    <div className="ml-auto text-white font-mono font-bold text-lg">$4,250.00</div>
                 </div>
              </div>
           </div>

           {/* Secondary Card 1 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                  <BarChart2 className="w-16 h-16 text-white/5" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                  <BarChart2 className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Raw Spreads</h3>
              <p className="text-gray-400 text-sm leading-relaxed">0.0 pips on EURUSD. Institutional grade liquidity with no markups.</p>
           </div>

           {/* Secondary Card 2 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No Time Limits</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Take 5 days or 5 months. We don't pressure your trading style.</p>
           </div>
        </div>
     </div>
  </section>
);
};

const PricingMatrix = () => {
const [size, setSize] = useState<AccountSizeKey>('100k');

const sizes: { id: AccountSizeKey; label: string; popular?: boolean }[] = [
  { id: '10k', label: '$10k' },
  { id: '25k', label: '$25k' },
  { id: '50k', label: '$50k' },
  { id: '100k', label: '$100k', popular: true },
  { id: '200k', label: '$200k' },
];

const priceMap: Record<AccountSizeKey, string> = { '10k': '€155', '25k': '€250', '50k': '€345', '100k': '€540', '200k': '€1,080' };
const targetMap: Record<AccountSizeKey, string> = { '10k': '$1,000', '25k': '$2,500', '50k': '$5,000', '100k': '$10,000', '200k': '$20,000' };

const getNumericValue = (val: string) => parseInt(val.replace(/\D/g,''));
const currentSizeLabel = sizes.find(s => s.id === size)?.label || '$100k';

return (
  <section className="py-32 bg-[#0a0b0d] relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>Select Account Size</h2>
        <p className="text-gray-400 text-lg">Refundable fee. No recurring charges. Pure opportunity.</p>
      </div>

      {/* Account Size Selector */}
      <div className="flex justify-center mb-16">
          <div className="bg-[#13151a] p-2 rounded-2xl border border-white/10 inline-flex flex-wrap justify-center gap-1">
          {sizes.map((s) => (
              <button
              key={s.id}
              onClick={() => setSize(s.id)}
              className={`relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  size === s.id
                  ? 'bg-[#007aff] text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              >
              {s.label}
              {/* Popular Badge */}
              {s.popular && size !== s.id && (
                  <span className="absolute -top-3 -right-2 bg-green-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
              )}
              </button>
          ))}
          </div>
      </div>

      {/* Pricing Card */}
      <div className="max-w-4xl mx-auto bg-[#13151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
        {/* Active Border Glow */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#007aff]/30 rounded-3xl transition-colors pointer-events-none duration-500"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 border-b border-white/5 bg-[#1a1d24]/50 backdrop-blur-sm">
          <div className="md:col-span-1">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
               <Shield className="w-3 h-3" /> Balance
            </div>
            <div className="text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
              {currentSizeLabel}
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-end">
             <div className="text-right">
               <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">One-time Fee</div>
               <div className="text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tight">{priceMap[size]}</div>
             </div>
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12 bg-[#0a0b0d]/50">
          <div className="space-y-1">
            <MatrixRow label="Trading Period" value="Unlimited" />
            <MatrixRow label="Min. Trading Days" value="4 Days" />
            <MatrixRow label="Max Daily Loss" value={`$${getNumericValue(targetMap[size]) * 0.5}`} />
            <MatrixRow label="Max Overall Loss" value={targetMap[size]} isRed={true} />
            <MatrixRow label="Profit Target" value={targetMap[size]} isGreen={true} />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-[#1a1d24]/50 p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-sm">100% Refundable</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Pass the challenge and get your {priceMap[size]} fee back with your first payout.
                  </p>
                </div>
            </div>
            
            <button className={`${styles.btnPrimary} w-full !text-lg !py-4 shadow-blue-500/20 hover:shadow-blue-500/40`}>
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

// --- MAIN PAGE EXPORT ---

export default function Home() {
return (
  <div className="min-h-screen bg-[#0a0b0d] text-white selection:bg-[#007aff] selection:text-white">
    <Navbar />
    <Hero />
    <Testimonials />
    <BentoFeatures />
    <PricingMatrix />
    <Footer />
  </div>
);
}