'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import { 
Users, 
DollarSign, 
TrendingUp, 
PieChart, 
ArrowRight, 
CheckCircle2, 
Share2, 
Wallet,
Globe,
Award
} from 'lucide-react';

// --- CALCULATOR COMPONENT ---

const EarningsCalculator = () => {
const [referrals, setReferrals] = useState(20);
const [avgOrder, setAvgOrder] = useState(500); // $100k Challenge
const [tier, setTier] = useState(0.15); // 15%

const monthlyEarnings = referrals * avgOrder * tier;
const yearlyEarnings = monthlyEarnings * 12;

return (
  <div className="bg-[#13151a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
      <div>
        <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">Estimate Your Earnings</h3>
        <p className="text-gray-400 mb-8">See how much you could earn by referring traders to PROPFIRM.</p>

        <div className="space-y-8">
          {/* Slider 1: Referrals */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-4">
              <span className="text-gray-300">Monthly Referrals</span>
              <span className="text-white bg-white/10 px-3 py-1 rounded-lg">{referrals} Traders</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={referrals} 
              onChange={(e) => setReferrals(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#007aff]"
            />
          </div>

          {/* Slider 2: Tier */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-4">
              <span className="text-gray-300">Commission Tier</span>
              <span className="text-white bg-white/10 px-3 py-1 rounded-lg">{(tier * 100).toFixed(0)}%</span>
            </div>
            <div className="flex gap-2">
               {[0.10, 0.125, 0.15].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTier(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      tier === t 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {(t * 100).toFixed(1)}%
                  </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="flex flex-col justify-center">
         <div className="bg-[#0a0b0d] border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Monthly Payout</div>
                <div className="text-5xl font-mono font-bold text-white mb-6">
                  ${monthlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>

                <div className="h-px w-full bg-white/5 mb-6" />

                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Yearly Potential</div>
                <div className="text-3xl font-mono font-bold text-green-500">
                  ${yearlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
            </div>
         </div>
      </div>
    </div>
  </div>
);
};

// --- MAIN PAGE ---

export default function AffiliatesPage() {
return (
  <div className="min-h-screen bg-[#0a0b0d] text-white selection:bg-[#007aff] selection:text-white">
    <Navbar />

    {/* 1. Hero Section */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/15 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-8">
          <Award className="w-4 h-4" /> Best Affiliate Program 2024
        </div>
        
        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold tracking-tight mb-6">
          Partner With The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#007aff]">Industry Leader</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Earn up to <span className="text-white font-bold">15% commission</span> on every sale. 
          Get paid bi-weekly in Crypto or Bank Transfer. Build a recurring income stream today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-black hover:bg-gray-200 font-bold rounded-xl px-8 py-4 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10 flex items-center gap-2">
            Join Partner Program <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-colors">
            Login to Dashboard
          </button>
        </div>
      </div>
    </section>

    {/* 2. Stats Grid */}
    <section className="py-12 border-y border-white/5 bg-[#0d0f12]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center border-r border-white/5 last:border-0">
            <div className="text-3xl font-bold font-mono text-white mb-1">$4.2M+</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Paid to Affiliates</div>
          </div>
          <div className="text-center border-r border-white/5 last:border-0">
            <div className="text-3xl font-bold font-mono text-white mb-1">15%</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Top Commission</div>
          </div>
          <div className="text-center border-r border-white/5 last:border-0">
            <div className="text-3xl font-bold font-mono text-white mb-1">12%</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-mono text-white mb-1">Global</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Payments</div>
          </div>
        </div>
      </div>
    </section>

    {/* 3. How It Works */}
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Step 1 */}
           <div className="bg-[#13151a] border border-white/5 p-8 rounded-3xl relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#007aff] rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-900/50">1</div>
              <h3 className="text-xl font-bold mt-6 mb-4">Sign Up Instantly</h3>
              <p className="text-gray-400 leading-relaxed">
                 Create your account in 30 seconds. No approval process required for the starter tier. Get your unique tracking link immediately.
              </p>
           </div>
           
           {/* Step 2 */}
           <div className="bg-[#13151a] border border-white/5 p-8 rounded-3xl relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-900/50">2</div>
              <h3 className="text-xl font-bold mt-6 mb-4">Share Your Link</h3>
              <p className="text-gray-400 leading-relaxed">
                 Use our provided banners, landing pages, and marketing kits. Share on social media, YouTube, or your community.
              </p>
           </div>

           {/* Step 3 */}
           <div className="bg-[#13151a] border border-white/5 p-8 rounded-3xl relative">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-green-900/50">3</div>
              <h3 className="text-xl font-bold mt-6 mb-4">Get Paid Crypto</h3>
              <p className="text-gray-400 leading-relaxed">
                 Track your clicks and sales in real-time. Withdraw your earnings via USDT (TRC20/ERC20) or Bank Wire bi-weekly.
              </p>
           </div>
        </div>
      </div>
    </section>

    {/* 4. Calculator Section */}
    <section className="pb-32 px-6">
       <div className="max-w-[1000px] mx-auto">
          <EarningsCalculator />
       </div>
    </section>

    {/* 5. Tiers Section */}
    <section className="py-24 bg-[#0d0f12] border-t border-white/5 px-6">
       <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold font-['Space_Grotesk'] mb-4">Commission Structure</h2>
             <p className="text-gray-400">The more you refer, the more you earn. Level up automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Tier 1 */}
             <div className="bg-[#13151a] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Level 1</div>
                <div className="text-2xl font-bold text-white mb-2">Affiliate</div>
                <div className="text-4xl font-mono font-bold text-[#007aff] mb-6">10%</div>
                <ul className="space-y-3 text-sm text-gray-400">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gray-600" /> 0 - 50 Referrals</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gray-600" /> Standard Support</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gray-600" /> Monthly Payouts</li>
                </ul>
             </div>

             {/* Tier 2 */}
             <div className="bg-[#13151a] border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-[#007aff]" />
                <div className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">Level 2</div>
                <div className="text-2xl font-bold text-white mb-2">Partner</div>
                <div className="text-4xl font-mono font-bold text-white mb-6">12.5%</div>
                <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> 50 - 200 Referrals</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Priority Support</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Bi-weekly Payouts</li>
                </ul>
             </div>

             {/* Tier 3 */}
             <div className="bg-[#13151a] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4">Level 3</div>
                <div className="text-2xl font-bold text-white mb-2">Ambassador</div>
                <div className="text-4xl font-mono font-bold text-yellow-500 mb-6">15%</div>
                <ul className="space-y-3 text-sm text-gray-400">
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> 200+ Referrals</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Dedicated Manager</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Weekly Payouts</li>
                </ul>
             </div>
          </div>
       </div>
    </section>

    {/* 6. Assets Preview */}
    <section className="py-24 px-6 relative overflow-hidden">
       <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-[#007aff] to-purple-600 rounded-3xl p-12 md:p-16 text-center relative">
          <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to start earning?</h2>
             <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Join 15,000+ partners who are monetizing their communities with the world's most trusted prop firm.
             </p>
             <button className="bg-white text-black font-bold text-lg px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-2xl">
                Become a Partner
             </button>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
       </div>
    </section>

    <Footer />
  </div>
);
}