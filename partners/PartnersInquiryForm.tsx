'use client';

import React, { useState } from 'react';
import { Handshake, Send, CheckCircle } from 'lucide-react';

export default function PartnersInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tier: 'Corporate Sponsor',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: 'Partnership',
          subject: `Partnership Inquiry from ${formData.company || formData.name} (${formData.tier})`,
          message: `Company / Organization: ${formData.company}\nInterest Tier: ${formData.tier}\n\nProposal:\n${formData.message}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setResponseMsg('Thank you for your interest! The TTF Commercial & Partnerships Director will reach out to you shortly.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          tier: 'Corporate Sponsor',
          message: '',
        });
      } else {
        setStatus('error');
        setResponseMsg('Failed to send inquiry. Please check required fields.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
          Brand Alignment & Impact
        </span>
        <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
          Become a TTF Partner or Sponsor
        </h2>
        <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
          Partner with Tanzania Taekwondo to elevate youth fitness, national team medal success, and high-visibility tournament branding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Organization / Brand *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company or Foundation Name"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Corporate Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@brand.com"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+255 7XX XXX XXX"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Partnership Interest Tier</label>
          <select
            value={formData.tier}
            onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none font-semibold text-gray-800"
          >
            <option value="Headline Partner">Headline National Team Partner</option>
            <option value="Corporate Sponsor">Championship Tournament Sponsor</option>
            <option value="Official Supplier">Equipment / Nutrition / Apparel Supplier</option>
            <option value="Grassroots Supporter">Youth & School Grassroots Patron</option>
            <option value="Institutional CSR">Corporate Social Responsibility (CSR) Partner</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Brief Proposal or Objectives</label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your brand's vision and how we can collaborate..."
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5"
        >
          <Send className="w-4 h-4" />
          <span>{status === 'loading' ? 'Submitting...' : 'Submit Partnership Inquiry'}</span>
        </button>

        {responseMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {responseMsg}
          </div>
        )}
      </form>
    </div>
  );
}
