'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import { Search, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'General', 'Trading Rules', 'Payments', 'Platforms'];

const QUESTIONS = [
{
  category: 'General',
  q: "Do I need to be a professional trader?",
  a: "No. We welcome traders of all experience levels. However, to pass the challenge, you will need a solid strategy and risk management."
},
{
  category: 'General',
  q: "Is the fee refundable?",
  a: "Yes! If you pass the challenge and reach your first payout, we will refund 100% of your initial sign-up fee with that payout."
},
{
  category: 'Trading Rules',
  q: "Can I hold trades over the weekend?",
  a: "Yes. On our Standard accounts, weekend holding is permitted. There are no restrictions on news trading either."
},
{
  category: 'Trading Rules',
  q: "What is the drawdown limit?",
  a: "We have a 5% Daily Loss limit and a 10% Maximum Overall Loss limit based on your initial account balance."
},
{
  category: 'Payments',
  q: "How fast are payouts processed?",
  a: "We pride ourselves on speed. Crypto payouts (USDT) are typically processed within 4 hours. Bank wires may take 1-3 business days."
},
{
  category: 'Payments',
  q: "What methods do you support?",
  a: "We support Credit/Debit Cards for purchases. For payouts, we support USDT (ERC20/TRC20), BTC, ETH, and Deal/Wise bank transfers."
},
{
  category: 'Platforms',
  q: "Can I use an EA (Expert Advisor)?",
  a: "Yes, you can use EAs as long as they are not arbitrage bots or high-frequency tick scalpers. We allow legitimate algorithmic trading."
}
];

export default function FAQPage() {
const [activeCat, setActiveCat] = useState('All');
const [search, setSearch] = useState('');
const [openIndex, setOpenIndex] = useState<number | null>(0);

const filtered = QUESTIONS.filter(item => {
  const matchesCat = activeCat === 'All' || item.category === activeCat;
  const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
  return matchesCat && matchesSearch;
});

return (
  <div className="min-h-screen bg-[#0a0b0d] text-white">
    <Navbar />

    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold mb-6">How can we help?</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-12">
          <input 
            type="text" 
            placeholder="Search for answers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#13151a] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#007aff] transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCat === cat 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-32 px-6">
      <div className="max-w-[800px] mx-auto space-y-4">
        {filtered.length > 0 ? filtered.map((item, i) => (
          <div 
            key={i} 
            className="bg-[#13151a] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-medium text-lg pr-4">{item.q}</span>
              {openIndex === i ? <Minus className="w-5 h-5 text-[#007aff]" /> : <Plus className="w-5 h-5 text-gray-500" />}
            </button>
            
            <div className={`px-6 text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
              {item.a}
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-12">No results found for "{search}"</div>
        )}
      </div>

      {/* Support CTA */}
      <div className="max-w-[800px] mx-auto mt-16 bg-[#0d0f12] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#007aff]/10 rounded-xl flex items-center justify-center">
               <MessageCircle className="w-6 h-6 text-[#007aff]" />
            </div>
            <div>
               <h4 className="font-bold text-lg">Still have questions?</h4>
               <p className="text-gray-400 text-sm">Our team is available 24/7 via live chat.</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Chat with Support
         </button>
      </div>
    </section>

    <Footer />
  </div>
);
}