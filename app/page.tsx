'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
Check, 
BarChart2, 
Shield, 
Zap, 
} from 'lucide-react';

// --- STYLES ---
const styles = {
h1: "font-['Space_Grotesk'] font-bold tracking-tight",
h2: "font-['Space_Grotesk'] font-bold tracking-tight",
body: "font-['Inter'] text-gray-400",
btnPrimary: "bg-[#007aff] hover:bg-[#0062cc] text-white font-semibold rounded-full px-8 py-3.5 transition-all duration-300 shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_30px_rgba(0,122,255,0.5)] transform hover:-translate-y-0.5",
btnSecondary: "bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full px-8 py-3.5 transition-all duration-300 backdrop-blur-sm",
card: "bg-[#13151a] border border-white/5 rounded-2xl p-8 hover:border-[#007aff]/30 transition-colors duration-300",
};

// --- TYPES ---
// This fixes the "implicitly has any type" errors
type AccountSizeKey = '10k' | '25k' | '50k' | '100k' | '200k';

interface StatBoxProps {
value: string;
label: string;
}

interface FeatureCardProps {
icon: React.ReactNode;
title: string;
desc: string;
}

interface MatrixRowProps {
label: string;
value: string;
isGreen?: boolean; // Optional prop
isRed?: boolean;   // Optional prop
}

// --- SUB-COMPONENTS ---

const StatBox: React.FC<StatBoxProps> = ({ value, label }) => (
<div className="flex flex-col items-center">
  <span className={`text-3xl md:text-4xl font-bold text-white mb-1 ${styles.h2}`}>{value}</span>
  <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</span>
</div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
<div className={styles.card}>
  <div className="w-14 h-14 rounded-2xl bg-[#007aff]/10 flex items-center justify-center mb-6">
    {icon}
  </div>
  <h3 className={`text-2xl text-white mb-4 ${styles.h2}`}>{title}</h3>
  <p className={styles.body}>{desc}</p>
</div>
);

const MatrixRow: React.FC<MatrixRowProps> = ({ label, value, isGreen, isRed }) => (
<div className="flex justify-between items-center py-3 border-b border-white/5">
  <span className="text-gray-400 font-medium">{label}</span>
  <span className={`font-bold font-['Space_Grotesk'] ${
    isGreen ? 'text-green-400' : isRed ? 'text-red-400' : 'text-white'
  }`}>
    {value}
  </span>
</div>
);

// --- MAIN PAGE SECTIONS ---

const Hero = () => {
return (
  <section className="relative pt-40 pb-32 bg-[#0a0b0d] overflow-hidden">
    {/* Background FX */}
    <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none">
      <div className="absolute -top-[200px] left-1/4 w-[800px] h-[800px] bg-[#007aff]/10 rounded-full blur-[120px]" />
      <div className="absolute top-[100px] right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-[1400px] mx-auto px-6 text-center z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#0a0b0d]"></div>
          ))}
        </div>
        <span className="text-sm text-gray-300 font-medium">Trusted by 10,000+ Traders</span>
      </div>

      <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-white mb-8 ${styles.h1}`}>
        Grow & Monetize <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] to-[#00c6ff]">
          Your Trading Skills
        </span>
      </h1>

      <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${styles.body}`}>
        Manage up to <span className="text-white font-semibold">$200,000</span> of our capital. 
        Keep up to 90% of the profits. We take the risk, you take the reward.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <button className={styles.btnPrimary}>
          Start Challenge
        </button>
        <button className={styles.btnSecondary}>
          Free Trial
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-10 bg-[#0a0b0d]/50 backdrop-blur-sm">
        <StatBox value="$150M+" label="Paid out to Traders" />
        <StatBox value="180+" label="Countries" />
        <StatBox value="4.8/5" label="TrustPilot Score" />
        <StatBox value="8h" label="Avg. Payout Time" />
      </div>
    </div>
  </section>
);
};

const Features = () => {
return (
  <section className="py-24 bg-[#0a0b0d]">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="mb-16">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>
          Why Traders Choose Us
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-[#007aff]" />}
          title="More Power, Less Risk"
          desc="We cover the losses. You never risk your own capital. Trade with peace of mind."
        />
        <FeatureCard 
          icon={<Zap className="w-8 h-8 text-[#007aff]" />}
          title="Bi-Weekly Payouts"
          desc="Get paid every 14 days via Crypto or Bank Transfer. Fast, reliable, transparent."
        />
        <FeatureCard 
          icon={<BarChart2 className="w-8 h-8 text-[#007aff]" />}
          title="Raw Spreads"
          desc="Trade with institutional grade liquidity. 0.0 pips on majors. No hidden markups."
        />
      </div>
    </div>
  </section>
);
};

const PricingMatrix = () => {
// Fix: Explicitly type the state so TypeScript knows only valid keys are allowed
const [size, setSize] = useState<AccountSizeKey>('100k');

const sizes: { id: AccountSizeKey; label: string }[] = [
  { id: '10k', label: '$10,000' },
  { id: '25k', label: '$25,000' },
  { id: '50k', label: '$50,000' },
  { id: '100k', label: '$100,000' },
  { id: '200k', label: '$200,000' },
];

// Fix: Type the Maps so we can index them with 'size' string
const priceMap: Record<AccountSizeKey, string> = { '10k': '€155', '25k': '€250', '50k': '€345', '100k': '€540', '200k': '€1,080' };
const targetMap: Record<AccountSizeKey, string> = { '10k': '$1,000', '25k': '$2,500', '50k': '$5,000', '100k': '$10,000', '200k': '$20,000' };

// Safe helper to get number for calculations
const getNumericValue = (val: string) => parseInt(val.replace(/\D/g,''));

// Fix: Handle the possibly undefined .find() result
const currentSizeLabel = sizes.find(s => s.id === size)?.label || '$100,000';

return (
  <section className="py-24 bg-[#0a0b0d] relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="max-w-[1400px] mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${styles.h2}`}>Choose Your Challenge</h2>
        <p className="text-gray-400 text-lg">Configure your account size and currency.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => setSize(s.id)}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              size === s.id
                ? 'bg-[#007aff] text-white shadow-lg shadow-blue-500/25 transform scale-105'
                : 'bg-[#1a1d24] text-gray-400 hover:bg-[#252830]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-[#13151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 border-b border-white/5">
          <div className="md:col-span-1">
            <div className="text-gray-400 text-sm mb-2">Selected Account</div>
            <div className="text-4xl font-bold text-white font-['Space_Grotesk']">
              {currentSizeLabel}
            </div>
          </div>
          <div className="md:col-span-2 flex items-center justify-end">
             <div className="text-right">
               <div className="text-gray-400 text-sm mb-1">One-time Fee</div>
               <div className="text-4xl font-bold text-white font-['Space_Grotesk']">{priceMap[size]}</div>
             </div>
          </div>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <MatrixRow label="Trading Period" value="Unlimited" />
            <MatrixRow label="Min. Trading Days" value="4 Days" />
            <MatrixRow label="Max Daily Loss" value={`$${getNumericValue(targetMap[size]) * 0.5}`} />
            {/* Fix: Passed isRed/isGreen explicitly */}
            <MatrixRow label="Max Overall Loss" value={targetMap[size]} isRed={true} />
            <MatrixRow label="Profit Target" value={targetMap[size]} isGreen={true} />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-[#0a0b0d] p-6 rounded-2xl border border-white/5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500 mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Refundable Fee</h4>
                  <p className="text-sm text-gray-400">Receive your fee back with your first payout.</p>
                </div>
              </div>
            </div>
            
            <button className={`${styles.btnPrimary} w-full !text-lg !py-5`}>
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

// --- MAIN PAGE DEFAULT EXPORT ---

export default function Home() {
return (
  <div className="min-h-screen bg-[#0a0b0d] text-white selection:bg-[#007aff] selection:text-white">
    <Navbar />
    <Hero />
    <Features />
    <PricingMatrix />
    <Footer />
  </div>
);
}