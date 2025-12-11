'use client';

import React, { useState } from 'react';
import { User, Shield, FileText, CreditCard, UploadCloud, CheckCircle2, AlertCircle, Camera, Mail, Phone, MapPin, Calendar, Lock, Key, Smartphone, X, Check, Eye, EyeOff } from 'lucide-react';

// Types
interface KYCDocument {
  id: string;
  type: 'passport' | 'license' | 'selfie';
  file?: File;
  preview?: string;
  status: 'not_uploaded' | 'pending' | 'approved' | 'rejected';
  uploadedAt?: string;
  rejectionReason?: string;
}

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  tradingAlerts: boolean;
}

type TabType = 'profile' | 'kyc' | 'security' | 'billing';

// Component Props
interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  alert?: boolean;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

interface FileUploadZoneProps {
  document: KYCDocument;
  onUpload: (file: File) => void;
  title: string;
  description: string;
}

export default function EnhancedSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('kyc');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Alex Trader',
    email: 'alex@propfirm.com',
    phone: '+44 7700 900123',
    dateOfBirth: '1995-06-15',
    address: '123 Trading Street',
    city: 'London',
    country: 'United Kingdom',
    postalCode: 'SW1A 1AA',
  });
  
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});
  
  // KYC State
  const [kycDocuments, setKycDocuments] = useState<KYCDocument[]>([
    { id: 'passport', type: 'passport', status: 'not_uploaded' },
    { id: 'selfie', type: 'selfie', status: 'not_uploaded' },
  ]);
  
  const [kycNotes, setKycNotes] = useState('');
  
  // Security State
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    emailNotifications: true,
    tradingAlerts: true,
  });
  
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Handlers
  const handleProfileUpdate = () => {
    const errors: Partial<Record<keyof ProfileData, string>> = {};
    
    if (!profile.fullName) errors.fullName = 'Name is required';
    if (!profile.email) errors.email = 'Email is required';
    if (!profile.phone) errors.phone = 'Phone is required';
    
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    
    setProfileErrors({});
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleFileUpload = (docId: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setKycDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { 
              ...doc, 
              file, 
              preview: reader.result as string, 
              status: 'pending',
              uploadedAt: new Date().toISOString()
            }
          : doc
      ));
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDocument = (docId: string) => {
    setKycDocuments(prev => prev.map(doc =>
      doc.id === docId
        ? { ...doc, file: undefined, preview: undefined, status: 'not_uploaded' }
        : doc
    ));
  };

  const handleKycSubmit = () => {
    const allUploaded = kycDocuments.every(doc => doc.status !== 'not_uploaded');
    
    if (!allUploaded) {
      alert('Please upload all required documents');
      return;
    }
    
    // Simulate submission
    setKycDocuments(prev => prev.map(doc => ({ ...doc, status: 'pending' })));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePasswordChange = () => {
    const errors: string[] = [];
    
    if (!currentPassword) errors.push('Current password is required');
    if (!newPassword) errors.push('New password is required');
    if (newPassword.length < 8) errors.push('Password must be at least 8 characters');
    if (newPassword !== confirmPassword) errors.push('Passwords do not match');
    
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setPasswordErrors([]);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const kycProgress = (kycDocuments.filter(d => d.status !== 'not_uploaded').length / kycDocuments.length) * 100;
  const isKycComplete = kycDocuments.every(d => d.status === 'approved');
  const hasKycPending = kycDocuments.some(d => d.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-8 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-top z-50">
          <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
          <div>
            <h3 className="font-bold text-sm text-green-700 dark:text-green-400">Changes Saved!</h3>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">Your settings have been updated successfully.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* LEFT: Navigation */}
        <div className="md:col-span-1 space-y-1">
          <NavButton 
            icon={<User size={18} />} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
          <NavButton 
            icon={<FileText size={18} />} 
            label="KYC Verification" 
            active={activeTab === 'kyc'} 
            onClick={() => setActiveTab('kyc')}
            alert={!isKycComplete && !hasKycPending}
          />
          <NavButton 
            icon={<Shield size={18} />} 
            label="Security & 2FA" 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')} 
          />
          <NavButton 
            icon={<CreditCard size={18} />} 
            label="Billing" 
            active={activeTab === 'billing'} 
            onClick={() => setActiveTab('billing')} 
          />
        </div>

        {/* RIGHT: Content */}
        <div className="md:col-span-3">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
                    <p className="text-sm text-slate-500 mt-1">Update your profile details</p>
                  </div>
                  {/* Profile Picture */}
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-2xl font-bold text-slate-500">
                      AT
                    </div>
                    <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    value={profile.fullName}
                    onChange={(value) => setProfile({ ...profile, fullName: value })}
                    required
                    error={profileErrors.fullName}
                  />
                  <InputField
                    label="Email Address"
                    value={profile.email}
                    onChange={(value) => setProfile({ ...profile, email: value })}
                    type="email"
                    required
                    error={profileErrors.email}
                  />
                  <InputField
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(value) => setProfile({ ...profile, phone: value })}
                    type="tel"
                    required
                    error={profileErrors.phone}
                  />
                  <InputField
                    label="Date of Birth"
                    value={profile.dateOfBirth}
                    onChange={(value) => setProfile({ ...profile, dateOfBirth: value })}
                    type="date"
                    required
                  />
                  <InputField
                    label="Address"
                    value={profile.address}
                    onChange={(value) => setProfile({ ...profile, address: value })}
                    placeholder="123 Street Name"
                  />
                  <InputField
                    label="City"
                    value={profile.city}
                    onChange={(value) => setProfile({ ...profile, city: value })}
                  />
                  <InputField
                    label="Country"
                    value={profile.country}
                    onChange={(value) => setProfile({ ...profile, country: value })}
                  />
                  <InputField
                    label="Postal Code"
                    value={profile.postalCode}
                    onChange={(value) => setProfile({ ...profile, postalCode: value })}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 flex gap-3">
                  <button
                    onClick={handleProfileUpdate}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Save Changes
                  </button>
                  <button className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KYC TAB */}
          {activeTab === 'kyc' && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`border rounded-xl p-4 flex items-start gap-4 ${
                isKycComplete 
                  ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20'
                  : hasKycPending
                  ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
                  : 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
              }`}>
                {isKycComplete ? (
                  <>
                    <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-bold text-sm text-green-700 dark:text-green-400">Verification Complete</h3>
                      <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                        Your identity has been verified. You can now request payouts.
                      </p>
                    </div>
                  </>
                ) : hasKycPending ? (
                  <>
                    <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400">Verification Pending</h3>
                      <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                        Your documents are being reviewed. This usually takes 24-48 hours.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-bold text-sm text-orange-700 dark:text-orange-400">Verification Required</h3>
                      <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">
                        You must verify your identity before requesting payouts.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Progress Bar */}
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Verification Progress</span>
                  <span className="text-sm font-mono text-slate-500">{Math.round(kycProgress)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${kycProgress}%` }}
                  />
                </div>
              </div>

              {/* Document Uploads */}
              {kycDocuments.map((doc) => (
                <FileUploadZone
                  key={doc.id}
                  document={doc}
                  onUpload={(file) => handleFileUpload(doc.id, file)}
                  title={doc.type === 'passport' ? 'Government ID' : 'Selfie with ID'}
                  description={
                    doc.type === 'passport'
                      ? 'Upload a clear photo of your passport or driver\'s license'
                      : 'Take a selfie while holding your ID next to your face'
                  }
                />
              ))}

              {/* Additional Notes */}
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={kycNotes}
                  onChange={(e) => setKycNotes(e.target.value)}
                  placeholder="Any additional information that might help with verification..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleKycSubmit}
                disabled={kycDocuments.every(d => d.status === 'not_uploaded') || hasKycPending}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                {hasKycPending ? 'Verification Pending' : 'Submit for Verification'}
              </button>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Password Change */}
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Change Password</h3>
                
                {passwordErrors.length > 0 && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                    {passwordErrors.map((error, i) => (
                      <p key={i} className="text-xs text-red-600 dark:text-red-400">{error}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Current Password</label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">New Password</label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Confirm New Password</label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {showPasswords ? <EyeOff size={12} /> : <Eye size={12} />}
                    {showPasswords ? 'Hide' : 'Show'} passwords
                  </button>
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Update Password
                </button>
              </div>

              {/* 2FA Setup */}
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactorEnabled}
                      onChange={(e) => {
                        setSecurity({ ...security, twoFactorEnabled: e.target.checked });
                        if (e.target.checked) setShow2FASetup(true);
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {show2FASetup && security.twoFactorEnabled && (
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <div className="text-center mb-4">
                      <div className="w-32 h-32 bg-white p-4 rounded-xl mx-auto mb-4">
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-xs text-slate-500">
                          QR Code
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Scan this code with your authenticator app
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-center font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all">
                      Verify & Enable
                    </button>
                  </div>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <ToggleRow
                    label="Email Notifications"
                    description="Receive updates about your account via email"
                    checked={security.emailNotifications}
                    onChange={(checked) => setSecurity({ ...security, emailNotifications: checked })}
                  />
                  <ToggleRow
                    label="Trading Alerts"
                    description="Get notified about important trading events"
                    checked={security.tradingAlerts}
                    onChange={(checked) => setSecurity({ ...security, tradingAlerts: checked })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-12 shadow-sm text-center">
              <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Billing & Invoices</h3>
              <p className="text-slate-500 mb-6">View your purchase history and download invoices</p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all">
                View Purchase History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const NavButton = ({ icon, label, active, onClick, alert }: NavButtonProps) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-white dark:bg-[#0f1115] text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-white/10' 
        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      {label}
    </div>
    {alert && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
  </button>
);

const InputField = ({ label, value, onChange, type = 'text', placeholder, required, error }: InputFieldProps) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border ${
        error ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
      } rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const FileUploadZone = ({ document, onUpload, title, description }: FileUploadZoneProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        {document.status !== 'not_uploaded' && (
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
            document.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
            document.status === 'pending' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
            'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
          }`}>
            {document.status === 'approved' ? 'Approved' : document.status === 'pending' ? 'Pending' : 'Rejected'}
          </span>
        )}
      </div>

      {document.preview ? (
        <div className="relative group">
          <img 
            src={document.preview} 
            alt="Document preview" 
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <label className="px-4 py-2 bg-white text-slate-900 font-medium rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <button
              onClick={() => {/* handleRemoveDocument(document.id) */}}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
        >
          <label className="cursor-pointer w-full">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Click to upload or drag & drop</h4>
            <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

const ToggleRow = ({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) => (
  <div className="flex items-start justify-between py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
    <div>
      <div className="font-semibold text-sm text-slate-900 dark:text-white">{label}</div>
      <div className="text-xs text-slate-500 mt-1">{description}</div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);