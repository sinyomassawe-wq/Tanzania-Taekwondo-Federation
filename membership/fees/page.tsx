import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  CreditCard,
  Building,
  Smartphone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MembershipFeesPage() {
  const db = getDb();

  // Load editable bank and mobile money settings from DB
  const getSetting = (key: string) => {
    const row = db.prepare('SELECT value_en, value_sw FROM settings WHERE key = ?').get(key) as any;
    return row ? row.value_en : '';
  };

  const bankName = getSetting('bank_name') || '[CRDB Bank Plc / NMB Bank]';
  const bankAccount = getSetting('bank_account_number') || '[015XXXXXXXXXXX]';
  const mobileMoney = getSetting('mobile_money') || '[M-Pesa / Tigo Pesa Lipa Namba: 5XXXXXX]';

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Payment Guidelines / Maelekezo ya Malipo
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Fees & Payment Instructions
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Official federation accounts for membership dues, tournament registration, Dan promotion fees, and club annual affiliation.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Fee Schedule Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-xl text-[#0B2A4A]">
            Official Fee Schedule (2026/2027)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block text-sm">Competitive Athlete License</span>
                <span className="text-gray-500">Cadet, Junior & Senior sparring & poomsae</span>
              </div>
              <span className="font-mono font-bold text-brand-green text-sm">[TZS 20,000 / yr]</span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block text-sm">Coach & Instructor Accreditation</span>
                <span className="text-gray-500">Ring corner accreditation & directory listing</span>
              </div>
              <span className="font-mono font-bold text-brand-green text-sm">[TZS 50,000 / yr]</span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block text-sm">National Referee Certification</span>
                <span className="text-gray-500">Class 1, 2, and 3 annual license pass</span>
              </div>
              <span className="font-mono font-bold text-brand-green text-sm">[TZS 40,000 / yr]</span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block text-sm">Club Affiliation & Renewal</span>
                <span className="text-gray-500">Dojang recognition & voting delegation</span>
              </div>
              <span className="font-mono font-bold text-brand-green text-sm">[TZS 100,000 / yr]</span>
            </div>
          </div>
        </div>

        {/* Bank & Mobile Money Payment Details (Managed from admin) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bank Transfer Box */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block mb-1">
                Bank Wire & Electronic Transfer
              </span>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                Official TTF Bank Account
              </h3>

              <div className="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2 text-xs text-gray-800">
                <div>
                  <span className="text-gray-500 block text-[10px]">BANK & ACCOUNT NAME</span>
                  <strong className="text-sm font-semibold">{bankName}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">ACCOUNT NUMBER</span>
                  <strong className="font-mono text-sm text-[#0B2A4A]">{bankAccount}</strong>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Please include your Name or Membership Reference ID in the deposit narration / payment reference.
            </p>
          </div>

          {/* Mobile Money Box */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
                Direct Mobile Money (Tanzania)
              </span>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                Lipa Namba / Merchant Code
              </h3>

              <div className="mt-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-xs text-gray-800">
                <div>
                  <span className="text-gray-500 block text-[10px]">MERCHANT NUMBER (LIPA NAMBA)</span>
                  <strong className="font-mono text-sm text-[#0B2A4A]">{mobileMoney}</strong>
                </div>
                <div className="text-[11px] text-gray-600">
                  Accepted networks: <strong>M-Pesa, Tigo Pesa, Airtel Money, Halopesa</strong>.
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Save your transaction confirmation SMS. You may attach the screenshot or SMS reference during membership registration or email it to <strong className="text-brand-navy">finance@ttf.or.tz</strong>.
            </p>
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Payment Clearance Notice:</strong> The TTF Registrar reviews bank receipts and mobile money settlements daily. Once your deposit is matched to your online registration ID, your official digital membership card is activated with instant QR validity.
          </div>
        </div>
      </div>
    </div>
  );
}
