'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Building2,
  CheckCircle,
  FileText,
  Send,
  ShieldCheck,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function HostEventPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    region: 'Dar es Salaam',
    eventType: 'Regional Championship',
    proposedDates: '',
    venueName: '',
    venueCapacity: '',
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
          subject: `Event Hosting Bid: ${formData.eventType} in ${formData.region}`,
          department: 'Technical',
          message: `Host Organization: ${formData.organization}\nEvent Type: ${formData.eventType}\nRegion: ${formData.region}\nVenue: ${formData.venueName} (Capacity: ${formData.venueCapacity})\nProposed Dates: ${formData.proposedDates}\n\nAdditional Details:\n${formData.message}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your event hosting bid has been submitted to the TTF Technical Committee. We will contact you with sanctioning guidelines.');
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          region: 'Dar es Salaam',
          eventType: 'Regional Championship',
          proposedDates: '',
          venueName: '',
          venueCapacity: '',
          message: '',
        });
      } else {
        setStatus('error');
        setResponseMsg('Submission failed. Please check required fields.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Sanctioning & Bidding / Kuandaa Mashindano
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Host a TTF Sanctioned Event
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Regional associations, clubs, universities, and local government authorities can bid to host official TTF competitions and seminars.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Requirements Grid */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
            Official Sanctioning Requirements
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            To ensure fair competition, athlete safety, and compliance with World Taekwondo standards, all prospective hosts must satisfy the following baseline criteria:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <span>
                <strong>Venue Standards:</strong> Minimum 2 standard mats (10m x 10m) with safety borders, adequate ventilation, and spectator seating.
              </span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <span>
                <strong>Medical & First Aid:</strong> Qualified ringside medical doctor, certified emergency medical staff, and dedicated ambulance on standby.
              </span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <span>
                <strong>Officiating:</strong> Sole assignment of licensed TTF referees appointed through the National Referee Committee.
              </span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <span>
                <strong>Scoring Systems:</strong> World Taekwondo approved electronic scoring (PSS) or certified manual scoreboards.
              </span>
            </div>
          </div>
        </div>

        {/* Bidding Inquiry Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-[#0B2A4A]">
              Submit Hosting Application / Expression of Interest
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Complete the inquiry form below. The TTF Technical Committee reviews submissions on a rolling monthly basis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Host Organization / Club / Association *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                  placeholder="e.g. Arusha Regional Association"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                  placeholder="contact@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                  placeholder="+255 7XX XXX XXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:ring-1 focus:ring-brand-green outline-none"
                >
                  <option value="Dar es Salaam">Dar es Salaam</option>
                  <option value="Arusha">Arusha</option>
                  <option value="Dodoma">Dodoma</option>
                  <option value="Kilimanjaro">Kilimanjaro</option>
                  <option value="Mwanza">Mwanza</option>
                  <option value="Mbeya">Mbeya</option>
                  <option value="Tanga">Tanga</option>
                  <option value="Zanzibar">Zanzibar</option>
                  <option value="Other">Other Region</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Proposed Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:ring-1 focus:ring-brand-green outline-none"
                >
                  <option value="Regional Championship">Regional Championship</option>
                  <option value="National Open">National Open Tournament</option>
                  <option value="Poomsae Seminar">Poomsae Clinic</option>
                  <option value="Referee / Coach Clinic">Referee / Coach Course</option>
                  <option value="Grassroots Youth Tour">Grassroots Youth Tour</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Month / Dates
                </label>
                <input
                  type="text"
                  value={formData.proposedDates}
                  onChange={(e) => setFormData({ ...formData, proposedDates: e.target.value })}
                  placeholder="e.g. October 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Proposed Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  placeholder="e.g. Regional Sports Complex"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Estimated Spectator / Ring Capacity
                </label>
                <input
                  type="text"
                  value={formData.venueCapacity}
                  onChange={(e) => setFormData({ ...formData, venueCapacity: e.target.value })}
                  placeholder="e.g. 500 spectators, 3 rings"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Additional Venue Facilities & Notes
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention warm-up areas, locker rooms, accommodation proximity, local sponsors..."
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-green outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{status === 'loading' ? 'Submitting...' : 'Submit Hosting Expression of Interest'}</span>
            </button>

            {responseMsg && (
              <div
                className={`p-3 rounded-xl text-xs ${
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
      </div>
    </div>
  );
}
