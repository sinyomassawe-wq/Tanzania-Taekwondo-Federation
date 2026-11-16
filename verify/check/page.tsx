'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { QrCode, Search, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyCheckPage() {
  const [licenseId, setLicenseId] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseId.trim()) {
      router.push(`/verify/${encodeURIComponent(licenseId.trim())}`);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto shadow-sm">
            <QrCode className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
              Public Credentials Verification
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Verify TTF Membership License
            </h1>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Enter any official TTF membership license ID (e.g. <span className="font-mono text-gray-700">TTF-2026-ATH-0012</span>) to confirm registration authenticity, Dan rank, and current validity status.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                required
                value={licenseId}
                onChange={(e) => setLicenseId(e.target.value)}
                placeholder="Enter License ID (e.g. TTF-2026-ATH-0012)"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none text-center font-mono uppercase font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Verify License Authenticity</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <Link href="/education/verify" className="hover:text-brand-blue hover:underline">
              Verify Dan Certificate Instead →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
