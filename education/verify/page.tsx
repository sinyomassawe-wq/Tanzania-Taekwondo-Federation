import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import {
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Calendar,
  User,
  Award,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: {
    cert?: string;
  };
}

export default function CertificateVerifyPage({ searchParams }: Props) {
  const db = getDb();
  const certNumber = searchParams.cert ? searchParams.cert.trim().toUpperCase() : '';

  let certificate: any = null;
  let searched = false;

  if (certNumber) {
    searched = true;
    certificate = db
      .prepare('SELECT * FROM certificates WHERE UPPER(cert_number) = ?')
      .get(certNumber) as any;
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Search Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
              National Grading Registry
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Verify Dan / Coach / Referee Certificate
            </h1>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Verify the authenticity of any official certificate issued by the Tanzania Taekwondo Federation.
            </p>
          </div>

          <form method="GET" action="/education/verify" className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="cert"
                required
                defaultValue={certNumber}
                placeholder="Enter Certificate No. (e.g. TTF-DAN-2024-001)"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green outline-none text-center font-mono uppercase font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Verify Certificate Authenticity</span>
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {searched && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            {certificate ? (
              <div className="bg-white rounded-3xl p-8 border-2 border-brand-green shadow-lg space-y-6">
                <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 text-brand-green flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider block">
                      Authentic & Verified Certificate
                    </span>
                    <h3 className="font-display font-black text-xl text-[#0B2A4A]">
                      {certificate.holder_name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Certificate Number
                    </span>
                    <strong className="font-mono text-sm text-[#0B2A4A]">
                      {certificate.cert_number}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Grade / Level
                    </span>
                    <strong className="text-sm text-[#0B2A4A]">{certificate.grade_level}</strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Issue Date
                    </span>
                    <strong className="text-sm text-gray-800">
                      {formatDate(certificate.issue_date)}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Certified Examiner
                    </span>
                    <strong className="text-sm text-gray-800">
                      {certificate.instructor_name || 'TTF Grandmaster Board'}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-green-50/60 border border-green-200 text-center text-xs text-green-900 font-semibold">
                  ✓ Validated in the Official TTF National Grading Database
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border-2 border-red-200 shadow-md text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900">
                  Certificate Not Found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  No registered certificate matches number: <strong className="font-mono text-gray-700">{certNumber}</strong>. Please double-check formatting or contact the TTF Secretariat for manual verification.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
