'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Lock,
  ShieldCheck,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function ConfidentialReportPage() {
  const [formData, setFormData] = useState({
    category: 'safeguarding',
    description: '',
    incidentDate: '',
    incidentLocation: '',
    partiesInvolved: '',
    isAnonymous: true,
    reporterName: '',
    reporterContact: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refNumber, setRefNumber] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    try {
      const res = await fetch('/api/integrity-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        setRefNumber(json.referenceNumber);
        setMsg('Your confidential report has been securely registered in the encrypted TTF Integrity vault.');
      } else {
        setStatus('error');
        setMsg(json.error || 'Failed to submit report. Please check required fields.');
      }
    } catch (err) {
      setStatus('error');
      setMsg('Connection error. Please try again.');
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link
          href="/integrity"
          className="inline-flex items-center text-xs text-brand-navy hover:underline font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Integrity & Clean Sport</span>
        </Link>

        {status === 'success' ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
              Report Successfully Logged
            </h1>

            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Your concern has been submitted directly to the TTF Integrity & Ethics Commission. Your identity and all disclosures are protected under the TTF Whistleblower Charter.
            </p>

            <div className="p-4 bg-gray-100 rounded-2xl inline-block border border-gray-300">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">
                CONFIDENTIAL REFERENCE NUMBER
              </span>
              <strong className="font-mono text-base text-[#0B2A4A]">{refNumber}</strong>
            </div>

            <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
              Keep this reference number safe if you need to provide supplementary evidence or follow up on inquiry progress.
            </p>

            <div className="pt-2">
              <Link
                href="/integrity"
                className="inline-block px-5 py-2.5 bg-brand-navy text-white font-bold text-xs rounded-xl"
              >
                Return to Integrity Overview
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center space-x-3.5 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider block">
                  Encrypted & Whistleblower Protected
                </span>
                <h1 className="font-display font-black text-xl text-[#0B2A4A]">
                  Confidential Concern & Whistleblower Form
                </h1>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Use this secure form to report any doping violations, child safeguarding concerns, sexual harassment, financial misconduct, or match manipulation in Tanzanian Taekwondo. You may submit <strong>100% anonymously</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Concern Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none font-semibold text-gray-800"
                >
                  <option value="safeguarding">Safeguarding & Abuse / Harassment</option>
                  <option value="anti_doping">Anti-Doping & Prohibited Substances</option>
                  <option value="match_fixing">Competition Manipulation & Match Fixing</option>
                  <option value="referee_misconduct">Referee Corruption / Improper Officiating</option>
                  <option value="financial_governance">Financial Misconduct / Governance Breach</option>
                  <option value="other">Other Ethical Concern</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Approximate Incident Date</label>
                  <input
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Incident Location / Event / Club</label>
                  <input
                    type="text"
                    value={formData.incidentLocation}
                    onChange={(e) => setFormData({ ...formData, incidentLocation: e.target.value })}
                    placeholder="e.g. Dojang name or Championship venue"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Persons / Parties Involved</label>
                <input
                  type="text"
                  value={formData.partiesInvolved}
                  onChange={(e) => setFormData({ ...formData, partiesInvolved: e.target.value })}
                  placeholder="Names of coaches, officials, or athletes involved (if known)"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Detailed Description of Incident *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please state facts clearly: what occurred, when, who witnessed it, and any physical or digital evidence available..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="w-4 h-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"
                  />
                  <span className="font-bold text-gray-800">
                    Submit this report anonymously (do not record my name)
                  </span>
                </label>

                {!formData.isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={formData.reporterName}
                        onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-xl text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Your Email / Phone</label>
                      <input
                        type="text"
                        value={formData.reporterContact}
                        onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                        placeholder="contact@domain.com or Phone"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-xl text-xs bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {status === 'loading'
                    ? 'Transmitting Secure Report...'
                    : 'Submit Confidential Report'}
                </span>
              </button>

              {msg && (
                <div
                  className={`p-3.5 rounded-xl text-xs ${
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
