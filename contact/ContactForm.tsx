'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General',
    subject: '',
    message: '',
    honeypot: '', // invisible honeypot to trap automated spam bots
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your message has been delivered to the TTF Secretariat. We will respond promptly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: 'General',
          subject: '',
          message: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
        setResponseMsg(json.error || 'Failed to deliver message. Please check required fields.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Connection error. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
          Direct Inquiries
        </span>
        <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
          Send a Message to the Secretariat
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Select the relevant department to route your inquiry directly to the designated commission officer.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Invisible Honeypot Anti-Spam Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Do not fill this</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+255 7XX XXX XXX"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Target Department *</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none font-semibold text-gray-800"
            >
              <option value="General">General Inquiries & Secretariat</option>
              <option value="Technical">Technical Director (Selections & Rules)</option>
              <option value="Referee">Referee Board (Seminars & Officiating)</option>
              <option value="Registration">Registrar (Membership & Club Licenses)</option>
              <option value="Media">Media & Communications Desk</option>
              <option value="Partnership">Commercial & Sponsorships</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Subject *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Inquiry regarding Club Affiliation in Arusha"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Message *</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please write your message clearly..."
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5"
        >
          <Send className="w-4 h-4" />
          <span>{status === 'loading' ? 'Delivering Message...' : 'Send Message to Secretariat'}</span>
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
