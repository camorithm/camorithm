'use client';

import React, { useState } from 'react';
import { CreditCard, Shield, Check, ChevronRight, Lock, AlertCircle } from 'lucide-react';

interface OrderData {
  size: string;
  platform: string;
  price: number;
  addOns: {
    resetAfterProfit: boolean;
    extraAttempts: boolean;
  };
}

const challengeDetails: Record<string, any> = {
  '10k': {
    price: 99,
    balance: '$10,000',
    profitTarget: '$1,000',
    dailyLoss: '$500',
    maxLoss: '$1,000',
  },
  '25k': {
    price: 199,
    balance: '$25,000',
    profitTarget: '$2,500',
    dailyLoss: '$1,250',
    maxLoss: '$2,500',
  },
  '50k': {
    price: 299,
    balance: '$50,000',
    profitTarget: '$5,000',
    dailyLoss: '$2,500',
    maxLoss: '$5,000',
  },
  '100k': {
    price: 499,
    balance: '$100,000',
    profitTarget: '$10,000',
    dailyLoss: '$5,000',
    maxLoss: '$10,000',
  },
  '200k': {
    price: 979,
    balance: '$200,000',
    profitTarget: '$20,000',
    dailyLoss: '$10,000',
    maxLoss: '$20,000',
  },
};

const addOnPrices = {
  resetAfterProfit: 49,
  extraAttempts: 99,
};

// Component prop types
interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

interface DetailRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

interface AddOnOptionProps {
  label: string;
  description: string;
  price: number;
  checked: boolean;
  onChange: () => void;
}

interface ReviewItemProps {
  label: string;
  value: string;
}

interface RuleItemProps {
  text: string;
}

interface SummaryRowProps {
  label: string;
  value: string;
  valueClass?: string;
}

export default function EnhancedShopPage() {
  const [step, setStep] = useState<'select' | 'review' | 'payment' | 'success'>('select');
  const [order, setOrder] = useState<OrderData>({
    size: '100k',
    platform: 'cTrader',
    price: 499,
    addOns: {
      resetAfterProfit: false,
      extraAttempts: false,
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState<any>({});

  const details = challengeDetails[order.size];
  const addOnTotal = Object.entries(order.addOns)
    .filter(([_, enabled]) => enabled)
    .reduce((sum, [key]) => sum + addOnPrices[key as keyof typeof addOnPrices], 0);
  
  const subtotal = details.price + addOnTotal;
  const finalPrice = subtotal - discount;

  const handleSizeChange = (size: string) => {
    setOrder({ ...order, size, price: challengeDetails[size].price });
  };

  const handleAddOnToggle = (addOn: keyof typeof order.addOns) => {
    setOrder({
      ...order,
      addOns: {
        ...order.addOns,
        [addOn]: !order.addOns[addOn]
      }
    });
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else {
      setErrors({ promo: 'Invalid promo code' });
    }
  };

  const handleSubmitPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <StepIndicator number={1} label="Select" active={step === 'select'} completed={['review', 'payment', 'success'].includes(step)} />
        <div className="w-12 h-px bg-slate-200 dark:bg-white/10" />
        <StepIndicator number={2} label="Review" active={step === 'review'} completed={['payment', 'success'].includes(step)} />
        <div className="w-12 h-px bg-slate-200 dark:bg-white/10" />
        <StepIndicator number={3} label="Payment" active={step === 'payment'} completed={step === 'success'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Selection/Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: SELECT */}
          {step === 'select' && (
            <>
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Select Account Size</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.keys(challengeDetails).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`py-4 px-3 rounded-xl border text-sm font-bold transition-all ${
                        order.size === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      ${size.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Challenge Details */}
                <div className="mt-6 p-4 bg-slate-50 dark:bg-white/5 rounded-xl space-y-2">
                  <DetailRow label="Starting Balance" value={details.balance} />
                  <DetailRow label="Profit Target" value={details.profitTarget} highlight />
                  <DetailRow label="Daily Loss Limit" value={details.dailyLoss} />
                  <DetailRow label="Max Drawdown" value={details.maxLoss} />
                </div>
              </div>

              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Trading Platform</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Match-Trader', 'cTrader', 'DXtrade'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setOrder({ ...order, platform })}
                      className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                        order.platform === platform
                          ? 'bg-white dark:bg-[#1a1d24] border-blue-500 ring-1 ring-blue-500'
                          : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <span className={`font-semibold text-sm ${order.platform === platform ? 'text-blue-600 dark:text-white' : 'text-slate-500'}`}>
                        {platform}
                      </span>
                      {order.platform === platform && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Add-Ons (Optional)</h3>
                </div>
                <div className="space-y-3">
                  <AddOnOption
                    label="Reset After Profit Hit"
                    description="Continue trading after reaching profit target"
                    price={addOnPrices.resetAfterProfit}
                    checked={order.addOns.resetAfterProfit}
                    onChange={() => handleAddOnToggle('resetAfterProfit')}
                  />
                  <AddOnOption
                    label="Extra Attempts Package"
                    description="Get 2 additional attempts if you fail"
                    price={addOnPrices.extraAttempts}
                    checked={order.addOns.extraAttempts}
                    onChange={() => handleAddOnToggle('extraAttempts')}
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('review')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                Continue to Review <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* STEP 2: REVIEW */}
          {step === 'review' && (
            <>
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Review Your Order</h3>
                <div className="space-y-4">
                  <ReviewItem label="Account Size" value={details.balance} />
                  <ReviewItem label="Platform" value={order.platform} />
                  <ReviewItem label="Challenge Fee" value={`$${details.price}`} />
                  {order.addOns.resetAfterProfit && (
                    <ReviewItem label="Reset After Profit" value={`+$${addOnPrices.resetAfterProfit}`} />
                  )}
                  {order.addOns.extraAttempts && (
                    <ReviewItem label="Extra Attempts" value={`+$${addOnPrices.extraAttempts}`} />
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Challenge Rules</h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <RuleItem text="Reach profit target without breaking rules" />
                  <RuleItem text="Minimum 4 trading days required" />
                  <RuleItem text="No hedging or grid trading allowed" />
                  <RuleItem text="100% refundable on first payout" />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('select')}
                  className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Payment <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 'payment' && (
            <>
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard size={20} className="mb-2 text-slate-700 dark:text-slate-300" />
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Card</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-4 rounded-xl border transition-all ${
                      paymentMethod === 'crypto'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">₿</div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Crypto</div>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-xl text-center">
                    <div className="text-4xl mb-3">₿</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Crypto payment integration coming soon
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('review')}
                  className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitPayment}
                  disabled={paymentMethod === 'crypto'}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Complete Purchase ${finalPrice}
                </button>
              </div>
            </>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-12 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Order Confirmed!</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Your challenge account is being set up. You'll receive login credentials via email within 5 minutes.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => setStep('select')}
                  className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  Buy Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Order Summary (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <SummaryRow label="Account Size" value={details.balance} />
              <SummaryRow label="Platform" value={order.platform} />
              {order.addOns.resetAfterProfit && (
                <SummaryRow label="Reset Add-On" value={`+$${addOnPrices.resetAfterProfit}`} />
              )}
              {order.addOns.extraAttempts && (
                <SummaryRow label="Extra Attempts" value={`+$${addOnPrices.extraAttempts}`} />
              )}
              <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <SummaryRow label="Subtotal" value={`$${subtotal}`} />
                {discount > 0 && (
                  <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} valueClass="text-green-600 dark:text-green-400" />
                )}
              </div>
            </div>

            {/* Promo Code */}
            {!promoApplied && step !== 'success' && (
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-white/10"
                  >
                    Apply
                  </button>
                </div>
                {errors.promo && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.promo}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-200 dark:border-white/5">
              <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-3xl text-slate-900 dark:text-white">
                ${finalPrice}<span className="text-lg text-slate-400">.00</span>
              </span>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl text-center mb-4">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 text-xs font-bold">
                <Check size={14} /> 100% Refundable on First Payout
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <Shield size={10} /> Secure SSL Encrypted Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const StepIndicator = ({ number, label, active, completed }: StepIndicatorProps) => (
  <div className="flex flex-col items-center">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
      completed ? 'bg-green-500 text-white' :
      active ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-500/20' :
      'bg-slate-200 dark:bg-white/10 text-slate-400'
    }`}>
      {completed ? <Check size={16} /> : number}
    </div>
    <span className={`text-xs mt-2 font-medium ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
      {label}
    </span>
  </div>
);

const DetailRow = ({ label, value, highlight }: DetailRowProps) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-600 dark:text-slate-400">{label}</span>
    <span className={`font-mono font-bold ${highlight ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
      {value}
    </span>
  </div>
);

const AddOnOption = ({ label, description, price, checked, onChange }: AddOnOptionProps) => (
  <label className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
    />
    <div className="flex-1">
      <div className="font-semibold text-sm text-slate-900 dark:text-white">{label}</div>
      <div className="text-xs text-slate-500 mt-1">{description}</div>
    </div>
    <div className="font-bold text-sm text-slate-900 dark:text-white">+${price}</div>
  </label>
);

const ReviewItem = ({ label, value }: ReviewItemProps) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
    <span className="font-mono font-bold text-slate-900 dark:text-white">{value}</span>
  </div>
);

const RuleItem = ({ text }: RuleItemProps) => (
  <div className="flex items-start gap-2">
    <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
    <span>{text}</span>
  </div>
);

const SummaryRow = ({ label, value, valueClass = 'text-slate-900 dark:text-white' }: SummaryRowProps) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-500 text-sm">{label}</span>
    <span className={`font-semibold text-sm ${valueClass}`}>{value}</span>
  </div>
);