'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import { 
Check, 
X as XIcon, 
HelpCircle, 
Trophy, 
Zap, 
Shield, 
TrendingUp,
ArrowRight,
Info
} from 'lucide-react';

// --- CONFIGURATION DATA ---

type ChallengeMode = 'steady' | 'turbo';
type AccountSize = '10k' | '25k' | '50k' | '100k' | '200k';

const ACCOUNTS: Record<AccountSize, { label: string; value: number }> = {
'10k': { label: '$10,000', value: 10000 },
'25k': { label: '$25,000', value: 25000 },
'50k': { label: '$50,000', value: 50000 },
'100k': { label: '$100,000', value: 100000 },
'200k': { label: '$200,000', value: 200000 },
};

// Pricing & Rules Logic
const getChallengeData = (mode: ChallengeMode, size: AccountSize) => {
const balance = ACCOUNTS[size].value;

if (mode === 'steady') {
  // 2-Step Model
  return {
    price: size === '10k' ? 95 : size === '25k' ? 185 : size === '50k' ? 295 : size === '100k' ? 495 : 995,
    targetPhase1: balance * 0.08, // 8%
    targetPhase2: balance * 0.05, // 5%
    dailyLoss: balance * 0.05,    // 5%
    maxLoss: balance * 0.10,      // 10%
    leverage: '1:100',
    duration: 'Unlimited',
    refund: true
  };
} else {
  // 1-Step Model (Turbo)
  return {
    price: size === '10k' ? 115 : size === '25k' ? 225 : size === '50k' ? 365 : size === '100k' ? 585 : 1185,
    targetPhase1: balance * 0.10, // 10%
    targetPhase2: null,           // No Phase 2
    dailyLoss: balance * 0.04,    // 4%
    maxLoss: balance * 0.06,      // 6% Trailing
    leverage: '1:30',
    duration: 'Unlimited',
    refund: false
  };
}
};

// --- COMPONENTS ---

const RuleRow = ({ label, value, tooltip, highlight }: { label: string, value: string | number, tooltip?: string, highlight?: boolean }) => (
<div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
  <div className="flex items-center gap-2">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    {tooltip && <HelpCircle className="w-3 h-3 text-gray-600 cursor-help" />}
  </div>
  <span className={`font-mono font-bold text-base ${highlight ? 'text-[#007aff]' : 'text-white'}`}>
    {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
  </span>
</div>
);

const ComparisonRow = ({ feature, us, them }: { feature: string, us: boolean | string, them: boolean | string }) => (
<div className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 items-center">
  <div className="text-gray-400 font-medium text-sm">{feature}</div>
  <div className="text-center font-bold text-white flex justify-center">
      {us === true ? <Check className="text-green-500 w-5 h-5" /> : us}
  </div>
  <div className="text-center text-gray-500 flex justify-center opacity-50">
      {them === false ? <XIcon className="text-red-500 w-5 h-5" /> : them}
  </div>
</div>
);

export default function ChallengesPage() {
const [mode, setMode] = useState<ChallengeMode>('steady');
const [size, setSize] = useState<AccountSize>('100k');

const data = getChallengeData(mode, size);

return (
  <div className="min-h-screen bg-[#0a0b0d] text-white selection:bg-[#007aff] selection:text-white">
    <Navbar />

    {/* 1. Header Section */}
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#007aff]/10 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-['Space_Grotesk'] font-bold tracking-tight mb-6">
          Choose Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] to-[#00c6ff]">Funding</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Select an evaluation model that fits your trading style. 
          Pass the challenge and keep up to 90% of the profits.
        </p>
      </div>
    </section>

    {/* 2. Main Configurator */}
    <section className="pb-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Mode Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
          <button 
            onClick={() => setMode('steady')}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
              mode === 'steady' 
                ? 'bg-[#13151a] border-[#007aff] shadow-[0_0_30px_rgba(0,122,255,0.15)]' 
                : 'bg-[#0f1115] border-white/5 hover:border-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode === 'steady' ? 'bg-[#007aff]' : 'bg-gray-800'}`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              {mode === 'steady' && <Check className="text-[#007aff]" />}
            </div>
            <h3 className="text-xl font-bold mb-1">Standard Challenge</h3>
            <p className="text-sm text-gray-400">2-Step Evaluation. Lower drawdown limits, higher leverage. The classic path.</p>
          </button>

          <button 
            onClick={() => setMode('turbo')}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
              mode === 'turbo' 
                ? 'bg-[#13151a] border-[#d946ef] shadow-[0_0_30px_rgba(217,70,239,0.15)]' 
                : 'bg-[#0f1115] border-white/5 hover:border-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode === 'turbo' ? 'bg-[#d946ef]' : 'bg-gray-800'}`}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              {mode === 'turbo' && <Check className="text-[#d946ef]" />}
            </div>
            <h3 className="text-xl font-bold mb-1">Turbo Challenge</h3>
            <p className="text-sm text-gray-400">1-Step Evaluation. Get funded faster. No Phase 2. Strict trailing drawdown.</p>
          </button>
        </div>

        {/* Size Selector */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-4 md:pb-0">
           <div className="bg-[#13151a] p-1.5 rounded-2xl border border-white/10 inline-flex">
            {(Object.keys(ACCOUNTS) as AccountSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  size === s
                  ? mode === 'steady' ? 'bg-[#007aff] text-white shadow-lg' : 'bg-[#d946ef] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {ACCOUNTS[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Card */}
        <div className="bg-[#13151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Left: Rules */}
          <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className={`w-6 h-6 ${mode === 'steady' ? 'text-[#007aff]' : 'text-[#d946ef]'}`} />
              <h3 className="text-2xl font-bold font-['Space_Grotesk']">Trading Objectives</h3>
            </div>

            <div className="space-y-1">
              <RuleRow label="Profit Target (Phase 1)" value={`${(data.targetPhase1 / ACCOUNTS[size].value * 100).toFixed(0)}%`} highlight />
              {data.targetPhase2 !== null && (
                <RuleRow label="Profit Target (Phase 2)" value={`${(data.targetPhase2 / ACCOUNTS[size].value * 100).toFixed(0)}%`} />
              )}
              <RuleRow label="Daily Loss Limit" value={data.dailyLoss} />
              <RuleRow label="Max Overall Loss" value={data.maxLoss} />
              <RuleRow label="Leverage" value={data.leverage} />
              <RuleRow label="Minimum Trading Days" value="4 Days" />
              <RuleRow label="Time Limit" value="Unlimited" tooltip="Take as long as you need" />
            </div>
          </div>

          {/* Right: Checkout */}
          <div className="w-full md:w-[400px] bg-[#0a0b0d]/50 p-8 md:p-10 flex flex-col justify-between relative">
            {/* Highlight Gradient */}
            <div className={`absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-b ${mode === 'steady' ? 'from-blue-500/20' : 'from-fuchsia-500/20'} to-transparent`} />

            <div>
              <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Account Balance</div>
              <div className="text-4xl font-mono font-bold text-white mb-8">{ACCOUNTS[size].label}</div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>One-time fee, no recurring charges</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Access to MT4, MT5 & cTrader</span>
                </div>
                {data.refund && (
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>100% Refundable with first payout</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold text-white">${data.price}</span>
                <span className="text-gray-500 mb-1 line-through">${data.price * 1.2}</span>
              </div>
              
              <button className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 ${
                mode === 'steady' 
                  ? 'bg-[#007aff] hover:bg-[#0062cc] shadow-blue-500/25' 
                  : 'bg-[#d946ef] hover:bg-[#c026d3] shadow-fuchsia-500/25'
              }`}>
                Start Challenge <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 3. Comparison / Why Us */}
    <section className="py-20 bg-[#0d0f12] border-t border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Traders Choose Us</h2>
        
        <div className="bg-[#13151a] border border-white/5 rounded-2xl overflow-hidden p-6 md:p-8">
          <div className="grid grid-cols-3 gap-4 mb-6 border-b border-white/10 pb-4">
             <div className="font-bold text-gray-400">Feature</div>
             <div className="font-bold text-white text-center">PROPFIRM</div>
             <div className="font-bold text-gray-500 text-center">Others</div>
          </div>
          
          <ComparisonRow feature="Profit Split" us="Up to 90%" them="80%" />
          <ComparisonRow feature="Crypto Payouts" us={true} them={false} />
          <ComparisonRow feature="Trading Time Limit" us="Unlimited" them="Unlimited" />
          <ComparisonRow feature="News Trading" us={true} them="Restricted" />
          <ComparisonRow feature="Weekend Holding" us={true} them="Restricted" />
          <ComparisonRow feature="Payout Speed" us="< 4 Hours" them="3-5 Days" />
          <ComparisonRow feature="Raw Spreads" us="0.0 Pips" them="0.5+ Pips" />
        </div>
      </div>
    </section>

    {/* 4. FAQ Snippet */}
    <section className="py-20 px-6">
       <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
             <div className="bg-[#13151a] border border-white/5 p-6 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                   <span className="font-medium text-white">Can I hold trades over the weekend?</span>
                   <ArrowRight className="w-4 h-4 text-gray-500 group-hover:rotate-90 transition-transform" />
                </div>
             </div>
             <div className="bg-[#13151a] border border-white/5 p-6 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                   <span className="font-medium text-white">What platforms do you support?</span>
                   <ArrowRight className="w-4 h-4 text-gray-500 group-hover:rotate-90 transition-transform" />
                </div>
             </div>
             <div className="bg-[#13151a] border border-white/5 p-6 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                   <span className="font-medium text-white">How does the scaling plan work?</span>
                   <ArrowRight className="w-4 h-4 text-gray-500 group-hover:rotate-90 transition-transform" />
                </div>
             </div>
          </div>
       </div>
    </section>

    <Footer />
  </div>
);
}