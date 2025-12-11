'use client';

import React, { useState } from 'react';
import { 
Wallet, 
CheckCircle2, 
Clock, 
AlertCircle, 
Download, 
Copy,
Landmark,
Bitcoin,
ChevronRight,
FileText
} from 'lucide-react';

export default function PayoutsPage() {
const [method, setMethod] = useState('crypto'); // 'crypto' or 'bank'
const [cryptoType, setCryptoType] = useState('USDT'); // 'USDT' or 'BTC'

return (
  <div className="max-w-6xl mx-auto pb-20">
    
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Payouts & Certificates</h1>
      <p className="text-slate-500 text-sm">Manage your profit splits and download certificates.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: Withdrawal Action */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* 1. ELIGIBILITY CARD */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

           <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                 <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Available for Withdrawal</h2>
                 <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">$4,250.00</div>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                 <CheckCircle2 size={12} />
                 Eligible Now
              </div>
           </div>

           {/* Progress / Status */}
           <div className="space-y-3 relative z-10">
              <StatusRow label="Profit Target Reached" done />
              <StatusRow label="Min Trading Days (4/4)" done />
              <StatusRow label="No Rule Breaches" done />
              <StatusRow label="KYC Verified" done />
           </div>
        </div>

        {/* 2. WITHDRAWAL FORM */}
        <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Request Payout</h3>
           
           {/* Method Tabs */}
           <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl mb-6">
              <TabButton active={method === 'crypto'} onClick={() => setMethod('crypto')} icon={<Bitcoin size={16} />} label="Crypto (Instant)" />
              <TabButton active={method === 'bank'} onClick={() => setMethod('bank')} icon={<Landmark size={16} />} label="Bank Transfer" />
           </div>

           {method === 'crypto' ? (
              <div className="space-y-6">
                 {/* Crypto Selector */}
                 <div className="grid grid-cols-2 gap-4">
                    <CryptoCard 
                      active={cryptoType === 'USDT'} 
                      onClick={() => setCryptoType('USDT')}
                      symbol="USDT" 
                      network="ERC20 / TRC20" 
                      img="https://cryptologos.cc/logos/tether-tether-logo.png?v=025"
                    />
                    <CryptoCard 
                      active={cryptoType === 'BTC'} 
                      onClick={() => setCryptoType('BTC')}
                      symbol="BTC" 
                      network="Bitcoin Network" 
                      img="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025"
                    />
                 </div>

                 {/* Address Input */}
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Destination Wallet Address</label>
                    <div className="relative">
                       <input 
                          type="text" 
                          placeholder={`Enter your ${cryptoType} address`} 
                          className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                       />
                       <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500">
                          <Copy size={16} />
                       </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                       <AlertCircle size={12} />
                       Ensure you select the correct network. Transfers are irreversible.
                    </p>
                 </div>
              </div>
           ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                 <Landmark size={48} className="mx-auto text-slate-300 mb-4" />
                 <p className="text-slate-500 text-sm mb-4">Bank transfers take 3-5 business days.</p>
                 <button className="text-blue-600 text-sm font-semibold hover:underline">Connect via Riseworks</button>
              </div>
           )}

           <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div>
                 <div className="text-xs text-slate-500">You will receive</div>
                 <div className="text-xl font-bold text-slate-900 dark:text-white">$3,400.00 <span className="text-xs font-normal text-slate-400">(80% Split)</span></div>
              </div>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                 Confirm Withdrawal
              </button>
           </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Certificates & History */}
      <div className="space-y-6">
         
         {/* CERTIFICATE CARD */}
         <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Latest Certificate</h3>
            
            {/* CSS Certificate Preview */}
            <div className="aspect-[4/3] bg-[#0a0b0d] rounded-xl border-4 border-[#c5a059] p-4 relative mb-4 shadow-xl overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                  <div className="text-[#c5a059] text-xs tracking-[0.2em] uppercase mb-1">PropFirm</div>
                  <div className="text-white text-lg font-serif italic mb-2">Certificate of Achievement</div>
                  <div className="text-white font-bold text-sm">Alex Trader</div>
                  <div className="text-gray-400 text-[10px] mt-2">$100,000 Funded Trader</div>
               </div>
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="text-white w-8 h-8" />
               </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
               <Download size={16} />
               Download PDF
            </button>
         </div>

         {/* PAYOUT HISTORY */}
         <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 font-bold text-sm text-slate-900 dark:text-white">
               Payout History
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
               <HistoryItem date="Nov 14, 2025" amount="$2,150.00" status="Paid" />
               <HistoryItem date="Oct 28, 2025" amount="$1,840.00" status="Paid" />
               <HistoryItem date="Oct 14, 2025" amount="$920.00" status="Paid" />
            </div>
            <button className="w-full py-3 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
               View All Transactions
            </button>
         </div>

      </div>

    </div>
  </div>
);
}

// --- HELPER COMPONENTS ---

const StatusRow = ({ label, done }: { label: string, done: boolean }) => (
 <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-white/[0.02] last:border-0">
    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
    {done ? (
       <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <CheckCircle2 size={12} className="text-white" />
       </div>
    ) : (
       <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
    )}
 </div>
);

const TabButton = ({ active, onClick, icon, label }: any) => (
 <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
       active 
       ? 'bg-white dark:bg-[#0f1115] text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5' 
       : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
    }`}
 >
    {icon}
    {label}
 </button>
);

const CryptoCard = ({ active, onClick, symbol, network, img }: any) => (
 <button 
    onClick={onClick}
    className={`p-4 rounded-xl border text-left transition-all ${
       active 
       ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-500 ring-1 ring-blue-500' 
       : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
    }`}
 >
    <div className="flex items-center gap-2 mb-2">
       <img src={img} alt={symbol} className="w-6 h-6" />
       <span className="font-bold text-slate-900 dark:text-white">{symbol}</span>
    </div>
    <div className="text-xs text-slate-500">{network}</div>
 </button>
);

const HistoryItem = ({ date, amount, status }: any) => (
 <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
          <FileText size={14} />
       </div>
       <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">{amount}</div>
          <div className="text-xs text-slate-500">{date}</div>
       </div>
    </div>
    <div className="px-2 py-1 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold rounded">
       {status}
    </div>
 </div>
);