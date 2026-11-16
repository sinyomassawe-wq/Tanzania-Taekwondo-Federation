'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { TANZANIAN_REGIONS } from '@/lib/utils';
import {
  UserCheck,
  Upload,
  CheckCircle,
  AlertCircle,
  Send,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';

export default function MembershipRegisterPage() {
  const [formData, setFormData] = useState({
    type: 'athlete',
    fullName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    nationalId: '',
    region: 'Dar es Salaam',
    clubName: '',
    beltDan: '1st Dan Black Belt',
    kukkiwonNumber: '',
    consent: false,
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [registeredId, setRegisteredId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please agree to the TTF Code of Conduct and athlete consent.');
      return;
    }

    setStatus('loading');
    setMsg('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        data.append(k, String(v));
      });

      if (photoFile) data.append('photo', photoFile);
      if (idFile) data.append('idDocument', idFile);
      if (certFile) data.append('certificate', certFile);

      const res = await fetch('/api/membership/apply', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        setRegisteredId(json.id);
        setMsg('Application submitted successfully! Your application is in pending review with the TTF Registrar.');
      } else {
        setStatus('error');
        setMsg(json.error || 'Submission failed. Please check form values.');
      }
    } catch (err: any) {
      setStatus('error');
      setMsg('Connection error during submission. Please try again.');
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/membership"
            className="inline-flex items-center text-xs text-brand-gold hover:underline font-bold mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Membership Overview</span>
          </Link>
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Online Registration / Usajili wa Kidijitali
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            Apply for TTF Membership & License
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-xl">
            Complete the official registration form to obtain your verified TTF membership ID number and digital credential.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {status === 'success' ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="font-display font-black text-2xl text-[#0B2A4A]">
              Application Received!
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your application has been logged with provisional reference number:
            </p>
            <div className="inline-block px-5 py-2.5 bg-gray-100 rounded-xl font-mono font-bold text-base text-[#0B2A4A] border border-gray-300">
              {registeredId}
            </div>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              A confirmation email has been dispatched. Please proceed to settle your registration dues via our official bank or mobile money accounts, after which your membership card with verified QR code will be generated.
            </p>
            <div className="pt-4 flex justify-center space-x-4">
              <Link
                href="/membership/fees"
                className="px-6 py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                View Payment Instructions
              </Link>
              <Link
                href={`/verify/${registeredId}`}
                className="px-6 py-3 bg-[#0B2A4A] hover:bg-brand-navy text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Track Verification Page
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Membership Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'athlete', label: 'Athlete' },
                    { id: 'coach', label: 'Coach' },
                    { id: 'referee', label: 'Referee' },
                    { id: 'official', label: 'Official' },
                    { id: 'supporter', label: 'Supporter' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: item.id })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                        formData.type === item.id
                          ? 'bg-brand-green text-white shadow-sm ring-2 ring-brand-green/30'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-4">
                  1. Personal & Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="As shown on National ID or Passport"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="applicant@example.com"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+255 7XX XXX XXX"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      National ID (NIDA) / Passport / Birth Cert No.
                    </label>
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                      placeholder="e.g. 1990XXXXXXXXXXXXX"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Affiliation & Martial Arts Grade */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-4">
                  2. Taekwondo Grade & Club Affiliation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Region in Tanzania *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none"
                    >
                      {TANZANIAN_REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Affiliated Club / School / Dojang Name
                    </label>
                    <input
                      type="text"
                      value={formData.clubName}
                      onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                      placeholder="e.g. Dar Stars Martial Arts"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Current Belt / Dan Rank
                    </label>
                    <input
                      type="text"
                      value={formData.beltDan}
                      onChange={(e) => setFormData({ ...formData, beltDan: e.target.value })}
                      placeholder="e.g. 1st Dan Black Belt / 2nd Kup Red Belt"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Kukkiwon Dan Certificate Number (If applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.kukkiwonNumber}
                      onChange={(e) => setFormData({ ...formData, kukkiwonNumber: e.target.value })}
                      placeholder="e.g. 05XXXXXX"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-2">
                  3. Credential & Identification Uploads
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Upload clear image files (JPEG/PNG) or PDF. Max file size: 5MB each.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-green text-center space-y-2 bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <span className="text-xs font-bold text-gray-700 block">
                      Passport Photo *
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                      className="text-[11px] text-gray-500 w-full"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-green text-center space-y-2 bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <span className="text-xs font-bold text-gray-700 block">
                      ID / Birth Certificate
                    </span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                      className="text-[11px] text-gray-500 w-full"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-green text-center space-y-2 bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <span className="text-xs font-bold text-gray-700 block">
                      Dan / Kup Certificate
                    </span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setCertFile(e.target.files?.[0] || null)}
                      className="text-[11px] text-gray-500 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"
                  />
                  <span className="text-xs text-gray-700 leading-relaxed">
                    I solemnly declare that all particulars submitted herein are truthful. I pledge to adhere to the Tanzania Taekwondo Federation Constitution, World Taekwondo Fair Play guidelines, the WADA Anti-Doping Code, and the TTF Child Safeguarding Policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'loading'
                      ? 'Submitting Application...'
                      : 'Submit Official Registration Application'}
                  </span>
                </button>
              </div>

              {msg && (
                <div
                  className={`p-4 rounded-xl text-xs ${
                    status === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-green-50 text-green-800 border border-green-200'
                  }`}
                >
                  {msg}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
