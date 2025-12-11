'use client';

import React, { useState } from 'react';
import { User, Shield, FileText, Smartphone, CreditCard, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
const [activeTab, setActiveTab] = useState('kyc');

return (
  <div className="max-w-5xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1 space-y-1">
        <NavButton icon={<User size={18} />} label="General Profile" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
        <NavButton icon={<Shield size={18} />} label="Security & 2FA" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
        <NavButton icon={<FileText size={18} />} label="KYC Verification" active={activeTab === 'kyc'} onClick={() => setActiveTab('kyc')} alert />
        <NavButton icon={<CreditCard size={18} />} label="Billing Methods" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
      </div>
      <div className="md:col-span-3">
        {activeTab === 'kyc' && (
          <div className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 p-4 rounded-xl flex items-start gap-4">
              <AlertCircle className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={20} />
              <div><h3 className="font-bold text-sm text-orange-700 dark:text-orange-400">Verification Required</h3><p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">You must verify your identity before requesting payouts.</p></div>
            </div>
            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6"><div><h3 className="font-bold text-slate-900 dark:text-white">Government ID</h3><p className="text-sm text-slate-500">Upload a clear photo of your Passport.</p></div><span className="px-2.5 py-1 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-full">Not Submitted</span></div>
              <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform"><UploadCloud size={24} /></div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Click to upload</h4>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'security' && (
           <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm"><h3 className="font-bold text-slate-900 dark:text-white mb-6">Security</h3><p className="text-slate-500">2FA settings here.</p></div>
        )}
        {activeTab === 'general' && (
           <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-8 shadow-sm"><h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile</h2><InputGroup label="Full Name" value="Alex Trader" /></div>
        )}
      </div>
    </div>
  </div>
);
}

const NavButton = ({ icon, label, active, onClick, alert }: any) => (
<button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${ active ? 'bg-white dark:bg-[#0f1115] text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-white/10' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5' }`}>
  <div className="flex items-center gap-3">{icon}{label}</div>{alert && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
</button>
);
const InputGroup = ({ label, value }: any) => (
<div className="mb-4"><label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{label}</label><input type="text" defaultValue={value} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white" /></div>
);