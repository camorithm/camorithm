'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { 
Check, 
BarChart2, 
Shield, 
Zap, 
ChevronRight,
TrendingUp,
Clock,
ArrowRight
} from 'lucide-react';

// --- STYLES & CONFIG ---
const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
h2: "font-['Space_Grotesk'] font-bold tracking-tight",
body: "font-['Inter'] text-gray-400",
// The "Electric Blue" Glow Button
btnPrimary: "group relative bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] transform hover:-translate-y-1 overflow-hidden",
btnSecondary: "bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 backdrop-blur-sm",
glassCard: "bg-[#13151a]/60 backdrop-blur-xl border border-white/5",
};

// --- TYPES ---
type AccountSizeKey = '10k' | '25k' | '50k' | '100k' | '200k';
type TabKey = 'step1' | 'step2' | 'funded';

// --- SUB-COMPONENTS ---

const StatBox = ({ value, label }: { value: string, label: string }) => (
<div className="flex flex-col items-center group cursor-default">
  <span className={`text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-[#007aff] transition-colors ${styles.h2}`}>{value}</span>
  <span className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</span>
</div>
);

const MatrixRow = ({ label, value, isGreen, isRed }: { label: string, value: string, isGreen?: boolean, isRed?: boolean }) => (
<div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
  <span className="text-gray-400 font-medium">{label}</span>
  <span className={`font-bold font-['Space_Grotesk'] ${
    isGreen ? 'text-green-400' : isRed ? 'text-red-400' : 'text-white'
  }`}>
    {value}
  </span>
</div>
);

// --- SECTIONS ---

const Hero = () => {
return (
  <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 bg-[#0a0b0d] overflow-hidden">
    {/* Dynamic Background Grid */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
    
    {/* Lighting FX */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#007aff]/20 rounded-[100%] blur-[120px] pointer-events-none" />

    <div className="relative max-w-[1400px] mx-auto px-6 text-center z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">New: Instant Crypto Payouts Live</span>
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
      </div>

      <h1 className={`text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-white mb-8 ${styles.h1}`}>
        Trade Our Capital. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] via-[#60a5fa] to-[#00c6ff]">
          Keep The Profit.
        </span>
      </h1>

      <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-gray-400`}>
        Manage up to <span className="text-white font-semibold">$200,000</span>. We cover the losses. 
        You take up to 90% of the upside. No time limits.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
        <button className={styles.btnPrimary}>
          <span className="relative z-10 flex items-center">
            Start Challenge <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </button>
        <button className={styles.btnSecondary}>
          View Dashboard
        </button>
      </div>

      {/* 3D Dashboard Mockup */}
      <div className="relative mx-auto max-w-6xl perspective-[2000px] group">
        <div className="relative bg-[#13151a] border border-white/10 rounded-t-3xl shadow-2xl overflow-hidden h-[300px] md:h-[500px] transform rotate-x-[10deg] group-hover:rotate-x-[0deg] transition-transform duration-700 ease-out origin-bottom border-b-0 opacity-90 hover:opacity-100">
           {/* Fake UI Header */}
           <div className="h-14 bg-[#1a1d24] border-b border-white/5 flex items-center px-6 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="text-xs font-mono text-gray-500">PROPFIRM_TERMINAL_V2.0</div>
           </div>
           
           {/* Fake UI Body */}
           <div className="p-8 grid grid-cols-12 gap-6 h-full">
              <div className="col-span-12 md:col-span-9 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5 p-6 relative overflow-hidden">
                  {/* Abstract Chart Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#007aff]/20 to-transparent"></div>
                  <svg className="absolute bottom-0 left-0 w-full h-48 stroke-[#007aff] fill-none stroke-[3]" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 20 C 20 10, 40 18, 50 10 S 80 0, 100 15" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div className="absolute top-6 left-6">
                    <div className="text-3xl font-bold text-white font-mono">$12,450.20</div>
                    <div className="text-green-400 text-sm font-mono flex items-center gap-1">+2.4% <TrendingUp className="w-3 h-3" /></div>
                  </div>
              </div>
              <div className="hidden md:block col-span-3 space-y-4">
                 <div className="h-1/3 bg-white/5 rounded-xl border border-white/5"></div>
                 <div className="h-1/3 bg-white/5 rounded-xl border border-white/5"></div>
              </div>
           </div>
           
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-10 bg-[#0a0b0d]">
        <StatBox value="$150M+" label="Paid out to Traders" />
        <StatBox value="180+" label="Countries" />
        <StatBox value="4.8/5" label="TrustPilot Score" />
        <StatBox value="8h" label="Avg. Payout Time" />
      </div>
    </div>
  </section>
);
};

const BentoFeatures = () => {
return (
  <section className="py-32 bg-[#0a0b0d] relative">
     <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
           <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>Built for Speed</h2>
           <p className="text-gray-400 text-lg">We stripped away the bureaucracy. No hidden rules, no slow payouts, just trading.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
           
           {/* Main Feature Card */}
           <div className="col-span-1 md:col-span-2 row-span-2 bg-[#13151a] border border-white/5 rounded-3xl p-10 relative overflow-hidden group hover:border-[#007aff]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#007aff]/10 blur-[100px] group-hover:bg-[#007aff]/20 transition-all" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                   <div className="w-12 h-12 rounded-xl bg-[#007aff] flex items-center justify-center mb-6">
                      <Zap className="text-white w-6 h-6" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-4">Instant Crypto Payouts</h3>
                   <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                      Stop waiting 14 days for a wire transfer. Withdraw your profits in USDT, BTC, or ETH. 
                      Requests are processed automatically by our treasury engine.
                   </p>
                 </div>
                 
                 {/* Fake Notification UI */}
                 <div className="mt-8 bg-[#0a0b0d] border border-white/10 rounded-2xl p-6 flex items-center gap-4 max-w-md transform transition-transform group-hover:translate-x-2">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm">Payout Processed</div>
                      <div className="text-gray-500 text-xs">TX: 0x8a...4b29 • Just now</div>
                    </div>
                    <div className="ml-auto text-white font-mono font-bold">$4,250.00</div>
                 </div>
              </div>
           </div>

           {/* Secondary Card 1 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <BarChart2 className="w-10 h-10 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Raw Spreads</h3>
              <p className="text-gray-400 text-sm leading-relaxed">0.0 pips on EURUSD. Institutional grade liquidity with no markups.</p>
           </div>

           {/* Secondary Card 2 */}
           <div className="bg-[#13151a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Clock className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">No Time Limits</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Take 5 days or 5 months. We don't pressure your trading style.</p>
           </div>
        </div>
     </div>
  </section>
);
};

const TradingObjectives = () => {
const [activeTab, setActiveTab] = useState<TabKey>('step1');

const content = {
  step1: {
    title: "Phase 1: Evaluation",
    desc: "Prove your trading skills and discipline in a simulated environment.",
    target: "10%",
    days: "4 Days",
    drawdown: "10%",
    isFunded: false
  },
  step2: {
    title: "Phase 2: Verification",
    desc: "Consistent performance is key. Repeat your success.",
    target: "5%",
    days: "4 Days",
    drawdown: "10%",
    isFunded: false
  },
  funded: {
    title: "Phase 3: PRO Trader",
    desc: "You made it. Trade our capital and get paid.",
    target: "None",
    days: "Unlimited",
    drawdown: "10%",
    isFunded: true
  }
};

return (
  <section className="py-32 bg-[#050607] relative border-t border-white/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>The Roadmap</h2>
        <p className="text-gray-400">Simple rules. Fast scaling.</p>
      </div>

      {/* Custom Tab Switcher */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#13151a] p-1 rounded-full border border-white/10 inline-flex">
          {(['step1', 'step2', 'funded'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[#007aff] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'step1' ? '1. Evaluation' : tab === 'step2' ? '2. Verification' : '3. Funded'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-[#13151a] border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden transition-all duration-500">
         {/* Background Glow */}
         <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 opacity-20 ${
           activeTab === 'funded' ? 'bg-green-500' : 'bg-[#007aff]'
         }`} />

         <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/5 pb-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{content[activeTab].title}</h3>
                <p className="text-gray-400">{content[activeTab].desc}</p>
              </div>
              {content[activeTab].isFunded && (
                <span className="mt-4 md:mt-0 bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Check className="w-4 h-4" /> Real Capital
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-sm text-gray-500 uppercase">Profit Target</div>
                <div className={`text-3xl font-bold font-mono ${content[activeTab].isFunded ? 'text-white' : 'text-[#007aff]'}`}>
                  {content[activeTab].target}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500 uppercase">Min Days</div>
                <div className="text-3xl font-bold font-mono text-white">{content[activeTab].days}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500 uppercase">Max Loss</div>
                <div className="text-3xl font-bold font-mono text-red-400">{content[activeTab].drawdown}</div>
              </div>
               <div className="space-y-2">
                <div className="text-sm text-gray-500 uppercase">Leverage</div>
                <div className="text-3xl font-bold font-mono text-white">1:100</div>
              </div>
            </div>
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

// Safe helper to get number for calculations
const getNumericValue = (val: string) => parseInt(val.replace(/\D/g,''));
const currentSizeLabel = sizes.find(s => s.id === size)?.label || '$100k';

return (
  <section className="py-32 bg-[#0a0b0d] relative overflow-hidden">
    {/* Background Decor */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>Choose Your Size</h2>
        <p className="text-gray-400 text-lg">Refundable fee. No recurring charges.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => setSize(s.id)}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border ${
              size === s.id
                ? 'bg-[#007aff] border-[#007aff] text-white shadow-[0_0_20px_rgba(0,122,255,0.4)]'
                : 'bg-[#1a1d24] border-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-[#13151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007aff] to-transparent"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 border-b border-white/5 bg-[#1a1d24]/50">
          <div className="md:col-span-1">
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Account Size</div>
            <div className="text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
              {currentSizeLabel}
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-end">
             <div className="text-right">
               <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">One-time Fee</div>
               <div className="text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tight">{priceMap[size]}</div>
             </div>
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12 bg-[#0a0b0d]/50">
          <div className="space-y-2">
            <MatrixRow label="Trading Period" value="Unlimited" />
            <MatrixRow label="Min. Trading Days" value="4 Days" />
            <MatrixRow label="Max Daily Loss" value={`$${getNumericValue(targetMap[size]) * 0.5}`} />
            <MatrixRow label="Max Overall Loss" value={targetMap[size]} isRed={true} />
            <MatrixRow label="Profit Target" value={targetMap[size]} isGreen={true} />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-[#0a0b0d] p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
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
            
            <button className={`${styles.btnPrimary} w-full !text-lg !py-5 justify-center`}>
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
    <BentoFeatures />
    <TradingObjectives />
    <PricingMatrix />
    <Footer />
  </div>
);
}