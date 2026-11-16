'use client';

import React, { useState } from 'react';
import { Save, CheckCircle, Building, Smartphone, Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  initialSettings: Record<string, { en: string; sw: string }>;
}

export default function SettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const updateField = (key: string, lang: 'en' | 'sw', value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-xs">
      {/* 1. Official Secretariat Contacts */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
          <Phone className="w-4 h-4 text-brand-green" />
          <span>Secretariat Telephone & Emails</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Office Telephone (English)</label>
            <input
              type="text"
              value={settings['phone']?.en || ''}
              onChange={(e) => updateField('phone', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Simu ya Ofisi (Kiswahili)</label>
            <input
              type="text"
              value={settings['phone']?.sw || ''}
              onChange={(e) => updateField('phone', 'sw', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Official Email</label>
            <input
              type="text"
              value={settings['email']?.en || ''}
              onChange={(e) => updateField('email', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Office Working Hours</label>
            <input
              type="text"
              value={settings['office_hours']?.en || ''}
              onChange={(e) => updateField('office_hours', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Physical Headquarters Address</label>
          <input
            type="text"
            value={settings['address']?.en || ''}
            onChange={(e) => updateField('address', 'en', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* 2. Official Payment Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
          <Building className="w-4 h-4 text-brand-blue" />
          <span>Bank Wire & Mobile Money Lipa Namba</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Official Bank & Account Name</label>
            <input
              type="text"
              value={settings['bank_name']?.en || ''}
              onChange={(e) => updateField('bank_name', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Bank Account Number</label>
            <input
              type="text"
              value={settings['bank_account_number']?.en || ''}
              onChange={(e) => updateField('bank_account_number', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Mobile Money Lipa Namba (M-Pesa / Tigo Pesa)
          </label>
          <input
            type="text"
            value={settings['mobile_money']?.en || ''}
            onChange={(e) => updateField('mobile_money', 'en', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* 3. Official Social Channels */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-base text-[#0B2A4A]">
          Official Social Media Handles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings['facebook_url']?.en || ''}
              onChange={(e) => updateField('facebook_url', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Twitter / X URL</label>
            <input
              type="text"
              value={settings['twitter_url']?.en || ''}
              onChange={(e) => updateField('twitter_url', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings['instagram_url']?.en || ''}
              onChange={(e) => updateField('instagram_url', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">YouTube URL</label>
            <input
              type="text"
              value={settings['youtube_url']?.en || ''}
              onChange={(e) => updateField('youtube_url', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="submit"
          disabled={status === 'saving'}
          className="px-6 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{status === 'saving' ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>

        {status === 'saved' && (
          <span className="text-brand-green font-bold flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </span>
        )}
      </div>
    </form>
  );
}
