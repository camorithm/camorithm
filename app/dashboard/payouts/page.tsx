'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Download, Copy, Landmark, Bitcoin, FileText, Check, ExternalLink, Clock } from 'lucide-react';

interface PayoutHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  txid?: string;
}

const mockHistory: PayoutHistory[] = [
  { id: 'PAY-001', date: 'Nov 14, 2025', amount: 2150.00, method: 'USDT (ERC20)', status: 'completed', txid: '0x8a...4b29' },
  { id: 'PAY-002', date: 'Oct 28, 2025', amount: 1840.00, method: 'BTC', status: 'completed', txid: '0x7c...3a18' },
  { id: 'PAY-003', date: 'Oct 14, 2025', amount: 920.00, method: 'USDT (TRC20)', status: 'completed', txid: '0x5b...2d07' },
  { id: 'PAY-004', date: 'Sep 30, 2025', amount: 1500.00, method: 'Bank Transfer', status: 'completed' },
];

// Component prop types
interface StatusRowProps {
  label: string;
  done: boolean;
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

interface CryptoCardProps {
  active: boolean;
  onClick: () => void;
  symbol: string;
  img: string;
}

export default function EnhancedPayoutsPage() {
  const [method, setMethod] = useState<'crypto' | 'bank'>('crypto');
  const [cryptoType, setCryptoType] = useState<'USDT' | 'BTC' | 'ETH'>('USDT');
  const [network, setNetwork] = useState<'ERC20' | 'TRC20'>('ERC20');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [errors, setErrors] = useState<{ address?: string; amount?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableBalance = 4250.00;
  const splitPercentage = 80;
  const receiveAmount = parseFloat(amount || '0') * (splitPercentage / 100);
  const minWithdrawal = 100;

  // Validation functions
  const validateAddress = (addr: string): boolean => {
    if (!addr) {
      setErrors(prev => ({ ...prev, address: 'Wallet address is required' }));
      return false;
    }

    if (cryptoType === 'USDT') {
      if (network === 'ERC20') {
        // Ethereum address validation (simplified)
        if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
          setErrors(prev => ({ ...prev, address: 'Invalid ERC20 address format' }));
          return false;
        }
      } else if (network === 'TRC20') {
        // TRON address validation (simplified)
        if (!/^T[a-zA-Z0-9]{33}$/.test(addr)) {
          setErrors(prev => ({ ...prev, address: 'Invalid TRC20 address format' }));
          return false;
        }
      }
    } else if (cryptoType === 'BTC') {
      // Bitcoin address validation (simplified)
      if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr) && !/^bc1[a-z0-9]{39,59}$/.test(addr)) {
        setErrors(prev => ({ ...prev, address: 'Invalid Bitcoin address format' }));
        return false;
      }
    } else if (cryptoType === 'ETH') {
      // Ethereum address validation
      if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
        setErrors(prev => ({ ...prev, address: 'Invalid Ethereum address format' }));
        return false;
      }
    }

    setErrors(prev => ({ ...prev, address: undefined }));
    return true;
  };

  const validateAmount = (amt: string): boolean => {
    const numAmount = parseFloat(amt);
    
    if (!amt || isNaN(numAmount)) {
      setErrors(prev => ({ ...prev, amount: 'Amount is required' }));
      return false;
    }
    
    if (numAmount < minWithdrawal) {
      setErrors(prev => ({ ...prev, amount: `Minimum withdrawal is $${minWithdrawal}` }));
      return false;
    }
    
    if (numAmount > availableBalance) {
      setErrors(prev => ({ ...prev, amount: `Insufficient balance. Available: $${availableBalance}` }));
      return false;
    }

    setErrors(prev => ({ ...prev, amount: undefined }));
    return true;
  };

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setIsAddressCopied(true);
      setTimeout(() => setIsAddressCopied(false), 2000);
    }
  };

  const handleSubmit = async () => {
    const isAddressValid = validateAddress(address);
    const isAmountValid = validateAmount(amount);

    if (!isAddressValid || !isAmountValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setAddress('');
      setAmount('');
      
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    validateAmount(value.toString());
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Success Banner */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-sm text-green-700 dark:text-green-400">Withdrawal Request Submitted!</h3>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
              Your payout request has been queued for processing. You'll receive a confirmation shortly.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Withdrawal Action */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. ELIGIBILITY CARD */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Available Balance</h2>
                <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  ${availableBalance.toFixed(2)}
                </div>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Eligible Now
              </div>
            </div>

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
              <TabButton 
                active={method === 'crypto'} 
                onClick={() => setMethod('crypto')} 
                icon={<Bitcoin size={16} />} 
                label="Crypto (Instant)" 
              />
              <TabButton 
                active={method === 'bank'} 
                onClick={() => setMethod('bank')} 
                icon={<Landmark size={16} />} 
                label="Bank Transfer" 
              />
            </div>

            {method === 'crypto' ? (
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-lg">$</span>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        validateAmount(e.target.value);
                      }}
                      className={`w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-black/20 border ${
                        errors.amount 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-slate-200 dark:border-white/10 focus:ring-blue-500'
                      } rounded-xl text-2xl font-mono font-bold focus:ring-2 focus:border-transparent outline-none transition-all`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.amount}
                    </p>
                  )}
                  
                  {/* Quick Amount Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleQuickAmount(1000)}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                      $1,000
                    </button>
                    <button
                      onClick={() => handleQuickAmount(2500)}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                      $2,500
                    </button>
                    <button
                      onClick={() => handleQuickAmount(availableBalance)}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                    >
                      Max (${availableBalance})
                    </button>
                  </div>
                </div>

                {/* Crypto Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">
                    Select Cryptocurrency
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <CryptoCard 
                      active={cryptoType === 'USDT'} 
                      onClick={() => setCryptoType('USDT')} 
                      symbol="USDT" 
                      img="https://cryptologos.cc/logos/tether-usdt-logo.png?v=025" 
                    />
                    <CryptoCard 
                      active={cryptoType === 'BTC'} 
                      onClick={() => setCryptoType('BTC')} 
                      symbol="BTC"
                      img="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025" 
                    />
                    <CryptoCard 
                      active={cryptoType === 'ETH'} 
                      onClick={() => setCryptoType('ETH')} 
                      symbol="ETH"
                      img="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025" 
                    />
                  </div>
                </div>

                {/* Network Selection (USDT only) */}
                {cryptoType === 'USDT' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">
                      Network
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setNetwork('ERC20')}
                        className={`px-4 py-3 rounded-xl border text-left transition-all ${
                          network === 'ERC20'
                            ? 'bg-white dark:bg-[#1a1d24] border-blue-500 ring-1 ring-blue-500'
                            : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-sm text-slate-900 dark:text-white">ERC20</div>
                        <div className="text-xs text-slate-500 mt-1">Ethereum Network</div>
                      </button>
                      <button
                        onClick={() => setNetwork('TRC20')}
                        className={`px-4 py-3 rounded-xl border text-left transition-all ${
                          network === 'TRC20'
                            ? 'bg-white dark:bg-[#1a1d24] border-blue-500 ring-1 ring-blue-500'
                            : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-sm text-slate-900 dark:text-white">TRC20</div>
                        <div className="text-xs text-slate-500 mt-1">TRON Network</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Wallet Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">
                    Destination Wallet Address
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={`Enter your ${cryptoType} ${cryptoType === 'USDT' ? `(${network})` : ''} address`}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (e.target.value) validateAddress(e.target.value);
                      }}
                      onBlur={() => validateAddress(address)}
                      className={`w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-black/20 border ${
                        errors.address 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-slate-200 dark:border-white/10 focus:ring-blue-500'
                      } rounded-xl text-sm font-mono focus:ring-2 focus:border-transparent outline-none transition-all`}
                    />
                    <button 
                      onClick={handleCopyAddress}
                      disabled={!address}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddressCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  {errors.address ? (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.address}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> Double-check your address and network. Transactions are irreversible.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                <Landmark size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-sm mb-4">Bank transfers take 3-5 business days.</p>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  Connect via Riseworks
                </button>
              </div>
            )}

            {/* Summary & Submit */}
            {method === 'crypto' && amount && parseFloat(amount) >= minWithdrawal && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Withdrawal Amount</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Split ({splitPercentage}%)</span>
                    <span className="font-mono text-slate-700 dark:text-slate-400">${receiveAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Network Fee</span>
                    <span className="font-mono text-slate-700 dark:text-slate-400">~$2.50</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-500">You will receive</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                        ${(receiveAmount - 2.50).toFixed(2)}
                      </div>
                    </div>
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !!errors.address || !!errors.amount}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm Withdrawal'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Certificates & History */}
        <div className="space-y-6">
          {/* Certificate Card */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Latest Certificate</h3>
            <div className="aspect-[4/3] bg-[#0a0b0d] rounded-xl border-4 border-[#c5a059] p-4 relative mb-4 shadow-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <div className="text-[#c5a059] text-xs tracking-[0.2em] uppercase mb-1">PropFirm</div>
                <div className="text-white text-lg font-serif italic mb-2">Certificate of Achievement</div>
                <div className="text-white font-bold text-sm">Alex Trader</div>
                <div className="text-gray-400 text-[10px] mt-2">$100,000 Funded Trader</div>
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="text-white w-8 h-8" />
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <Download size={16} /> Download PDF
            </button>
          </div>

          {/* Payout History */}
          <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 font-bold text-sm text-slate-900 dark:text-white">
              Payout History
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {mockHistory.map((payout) => (
                <HistoryItem key={payout.id} {...payout} />
              ))}
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

// --- SUB COMPONENTS ---

const StatusRow = ({ label, done }: StatusRowProps) => (
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

const TabButton = ({ active, onClick, icon, label }: TabButtonProps) => (
  <button 
    onClick={onClick} 
    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-white dark:bg-[#0f1115] text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5' 
        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
    }`}
  >
    {icon} {label}
  </button>
);

const CryptoCard = ({ active, onClick, symbol, img }: CryptoCardProps) => (
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
  </button>
);

const HistoryItem = ({ id, date, amount, method, status, txid }: PayoutHistory) => {
  const statusConfig = {
    completed: { color: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400', label: 'Completed' },
    processing: { color: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400', label: 'Processing' },
    pending: { color: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400', label: 'Pending' },
    failed: { color: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400', label: 'Failed' },
  };

  const config = statusConfig[status];

  return (
    <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
            <FileText size={14} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">${amount.toLocaleString()}</div>
            <div className="text-xs text-slate-500">{date}</div>
          </div>
        </div>
        <div className={`px-2 py-1 ${config.color} text-xs font-bold rounded`}>
          {config.label}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 ml-11">
        <span>{method}</span>
        {txid && status === 'completed' && (
          <a 
            href="#" 
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={10} /> View TX
          </a>
        )}
      </div>
    </div>
  );
};