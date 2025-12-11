'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { 
Check, 
BarChart2, 
Zap, 
ChevronRight,
TrendingUp,
Clock,
ArrowRight,
Star,
Quote
} from 'lucide-react';

// --- STYLES & CONFIG ---
const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
h2: "font-['Space_Grotesk'] font-bold tracking-tight",
body: "font-['Inter'] text-gray-400",
// UPDATED: Less border radius (rounded-xl), tighter feel
btnPrimary: "group relative bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,122,255,0.5)] transform hover:-translate-y-0.5 overflow-hidden",
btnSecondary: "bg-[#1a1d24] hover:bg-[#252830] border border-white/10 text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-300 backdrop-blur-sm",
card: "bg-[#13151a] border border-white/5 rounded-2xl",
};

// --- TYPES ---
type AccountSizeKey = '10k' | '25k' | '50k' | '100k' | '200k';
type TabKey = 'step1' | 'step2' | 'funded';

// --- SUB-COMPONENTS ---

const StatBox = ({ value, label }: { value: string, label: string }) => (
<div className="flex flex-col items-center group cursor-default p-4 rounded-xl hover:bg-white/5 transition-colors">
  <span className={`text-3xl font-bold text-white mb-1 group-hover:text-[#007aff] transition-colors ${styles.h2}`}>{value}</span>
  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{label}</span>
</div>
);

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

const TrustPilotStar = () => (
<div className="w-6 h-6 bg-[#00b67a] flex items-center justify-center text-white mr-1">
  <Star className="w-3 h-3 fill-current" />
</div>
);

// --- SECTIONS ---

const Hero = () => {
return (
  // UPDATED: Reduced top padding from pt-40 to pt-28
  <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 bg-[#0a0b0d] overflow-hidden">
    {/* Background Gradients */}
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#007aff]/15 rounded-[100%] blur-[100px] pointer-events-none" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

    <div className="relative max-w-[1400px] mx-auto px-6 text-center z-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-8 hover:border-[#007aff]/50 transition-colors cursor-pointer group">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-mono text-gray-300 uppercase tracking-wide group-hover:text-white transition-colors"> payouts processed in 4h</span>
      </div>

      <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white mb-6 ${styles.h1}`}>
        Trade Our Capital. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] via-[#60a5fa] to-[#00c6ff]">
          Keep The Profit.
        </span>
      </h1>

      <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed`}>
        Get funded up to <span className="text-white font-semibold border-b border-white/20">$200,000</span>. 
        We take the risk. You take 90% of the upside.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <button className={styles.btnPrimary}>
          <span className="flex items-center">
            Start Challenge <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </button>
        <button className={styles.btnSecondary}>
          View Dashboard
        </button>
      </div>

      {/* 3D Dashboard Mockup - Slightly tilted for depth */}
      <div className="relative mx-auto max-w-5xl perspective-[2000px] group">
        <div className="relative bg-[#0f1115] border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden h-[350px] md:h-[500px] transform rotate-x-[15deg] group-hover:rotate-x-[5deg] transition-transform duration-700 ease-out border-b-0">
           {/* Fake UI Header */}
           <div className="h-12 bg-[#1a1d24]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-white/10"></div>
                 <div className="w-3 h-3 rounded-full bg-white/10"></div>
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">Live_Server_01</div>
           </div>
           
           {/* Fake UI Chart */}
           <div className="p-6 relative h-full">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              {/* Floating Metrics */}
              <div className="absolute top-10 left-10 p-4 bg-[#13151a] border border-white/10 rounded-xl shadow-xl z-20">
                  <div className="text-sm text-gray-500 mb-1">Current Equity</div>
                  <div className="text-3xl font-mono text-white font-bold">$104,250.00</div>
                  <div className="text-green-500 text-xs font-mono mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +4.25% Today
                  </div>
              </div>

              {/* Abstract Graph Line */}
              <svg className="absolute bottom-0 left-0 w-full h-64 stroke-[#007aff] fill-[url(#gradient)] stroke-2 z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#007aff" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
                      </linearGradient>
                  </defs>
                  <path d="M0 20 C 20 15, 40 18, 50 10 S 70 0, 100 8 V 20 H 0 Z" />
                  <path d="M0 20 C 20 15, 40 18, 50 10 S 70 0, 100 8" fill="none" />
              </svg>
           </div>
        </div>
      </div>
    </div>
  </section>
);
};

const Testimonials = () => {
  return (
      <section className="py-20 border-y border-white/5 bg-[#0d0f12]">
          <div className="max-w-[1400px] mx-auto px-6 mb-10 flex justify-between items-end">
              <div>
                  <h2 className={`text-3xl text-white mb-2 ${styles.h2}`}>Traders Trust Us</h2>
                  <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                          <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></div>
                          <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></div>
                          <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></div>
                          <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></div>
                          <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></div>
                      </div>
                      <span className="text-white font-bold text-sm">Trustpilot</span>
                      <span className="text-gray-500 text-sm">4.8/5 Score</span>
                  </div>
              </div>
              <a href="#" className="text-[#007aff] text-sm hover:underline">Read all 2,400+ reviews</a>
          </div>

          {/* Scrolling Marquee */}
          <div className="flex gap-6 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d0f12] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d0f12] to-transparent z-10"></div>
              
              {/* We double the list for infinite scroll effect */}
              <div className="flex gap-6 animate-scroll whitespace-nowrap pl-6">
                  {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="w-[350px] bg-[#1a1d24] border border-white/5 p-6 rounded-xl flex-shrink-0 hover:border-white/10 transition-colors">
                          <div className="flex gap-1 mb-4">
                              {[1,2,3,4,5].map(s => <div key={s} className="w-4 h-4 bg-[#00b67a]"><Star className="w-full h-full p-0.5 text-white fill-white" /></div>)}
                          </div>
                          <h4 className="text-white font-bold text-sm mb-2">"Payout received in 2 hours"</h4>
                          <p className="text-gray-400 text-sm leading-relaxed whitespace-normal mb-4">
                              Honestly the best prop firm I've used. The spread on Gold is insane and I got my payout via USDT immediately.
                          </p>
                          <div className="text-xs text-gray-500">Alex M. • Verified Trader</div>
                      </div>
                  ))}
                   {[1,2,3,4,5,6].map((i) => (
                      <div key={`dup-${i}`} className="w-[350px] bg-[#1a1d24] border border-white/5 p-6 rounded-xl flex-shrink-0 hover:border-white/10 transition-colors">
                          <div className="flex gap-1 mb-4">
                              {[1,2,3,4,5].map(s => <div key={s} className="w-4 h-4 bg-[#00b67a]"><Star className="w-full h-full p-0.5 text-white fill-white" /></div>)}
                          </div>
                          <h4 className="text-white font-bold text-sm mb-2">"Payout received in 2 hours"</h4>
                          <p className="text-gray-400 text-sm leading-relaxed whitespace-normal mb-4">
                              Honestly the best prop firm I've used. The spread on Gold is insane and I got my payout via USDT immediately.
                          </p>
                          <div className="text-xs text-gray-500">Alex M. • Verified Trader</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
           
           {/* Main Feature Card - Hover Lift Effect */}
           <div className="col-span-1 md:col-span-2 row-span-2 bg-[#13151a] border border-white/5 rounded-3xl p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#007aff]/10 blur-[100px] group-hover:bg-[#007aff]/20 transition-all" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                   <div className="w-12 h-12 rounded-xl bg-[#007aff] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                      <Zap className="text-white w-6 h-6" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-4">Instant Crypto Payouts</h3>
                   <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                      Stop waiting 14 days for a wire transfer. Withdraw your profits in USDT, BTC, or ETH. 
                      Requests are processed automatically.
                   </p>
                 </div>
                 
                 <div className="mt-8 bg-[#0a0b0d]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4 max-w-md border-l-4 border-l-green-500">
                    <div>
                      <div className="text-white font-mono text-sm">Payout Approved</div>
                      <div className="text-gray-500 text-xs">TXID: 0x8a...4b29</div>
                    </div>
                    <div className="ml-auto text-white font-mono font-bold">$4,250.00</div>
                 </div>
              </div>
           </div>

           {/* Secondary Card 1 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <BarChart2 className="w-10 h-10 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Raw Spreads</h3>
              <p className="text-gray-400 text-sm leading-relaxed">0.0 pips on EURUSD. Institutional grade liquidity with no markups.</p>
           </div>

           {/* Secondary Card 2 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <Clock className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">No Time Limits</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Take 5 days or 5 months. We don't pressure your trading style.</p>
           </div>
        </div>
     </div>
  </section>
);
};

const PricingMatrix = () => {
const [size, setSize] = useState<AccountSizeKey>('100k');

const sizes: { id: AccountSizeKey; label: string }[] = [
  { id: '10k', label: '$10k' },
  { id: '25k', label: '$25k' },
  { id: '50k', label: '$50k' },
  { id: '100k', label: '$100k' },
  { id: '200k', label: '$200k' },
];

const priceMap: Record<AccountSizeKey, string> = { '10k': '€155', '25k': '€250', '50k': '€345', '100k': '€540', '200k': '€1,080' };
const targetMap: Record<AccountSizeKey, string> = { '10k': '$1,000', '25k': '$2,500', '50k': '$5,000', '100k': '$10,000', '200k': '$20,000' };

const getNumericValue = (val: string) => parseInt(val.replace(/\D/g,''));
const currentSizeLabel = sizes.find(s => s.id === size)?.label || '$100k';

return (
  <section className="py-32 bg-[#0a0b0d] relative overflow-hidden">
    {/* Glow Effect behind card */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>Select Account Size</h2>
        <p className="text-gray-400 text-lg">Refundable fee. No recurring charges.</p>
      </div>

      {/* UPDATED: Segmented Control Style Selector */}
      <div className="flex justify-center mb-16">
          <div className="bg-[#13151a] p-1.5 rounded-2xl border border-white/10 inline-flex flex-wrap justify-center gap-1">
          {sizes.map((s) => (
              <button
              key={s.id}
              onClick={() => setSize(s.id)}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  size === s.id
                  ? 'bg-[#007aff] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              >
              {s.label}
              </button>
          ))}
          </div>
      </div>

      {/* Pricing Card */}
      <div className="max-w-4xl mx-auto bg-[#13151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
        {/* Subtle Border Gradient on Hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#007aff]/20 rounded-3xl transition-colors pointer-events-none"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 border-b border-white/5 bg-[#1a1d24]/30 backdrop-blur-sm">
          <div className="md:col-span-1">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Balance</div>
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
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-sm">100% Refundable</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Pass the challenge and get your {priceMap[size]} fee back with your first payout.
                  </p>
                </div>
            </div>
            
            <button className={`${styles.btnPrimary} w-full !text-lg !py-5 justify-center shadow-blue-500/20`}>
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