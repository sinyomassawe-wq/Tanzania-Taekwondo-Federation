import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle,
  Download,
  Calendar,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function EducationPage() {
  const db = getDb();

  const documents = db
    .prepare("SELECT * FROM documents WHERE category IN ('Refereeing', 'Forms', 'Statutes') ORDER BY year DESC")
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Technical Standards & Education / Elimu na Mafunzo
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Education, Grading & Certification
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              World Taekwondo approved coach licensing, referee clinics, national Dan promotion testing, and Kukkiwon credentialing.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/education/verify"
              className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify Dan Certificate</span>
            </Link>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coach Certification */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                Coaches Certification Course
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Covers sports science, periodized training plans, athlete safety, concussion protocols, and modern ring tactics.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>National Level 1 (Assistant Coach)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>National Level 2 (Head Dojang Coach)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>World Taekwondo Global Coach License</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/membership/register?type=coach"
                className="inline-block text-xs font-bold text-brand-blue hover:underline"
              >
                Apply for Coach License →
              </Link>
            </div>
          </div>

          {/* Referee & Judge Clinics */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                Referee & Judge Seminars
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Rigorous training on the latest WT Kyorugi and Poomsae competition rules, hand signals, Daedo electronic systems, and Instant Video Replay (IVR).
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Class 3 National Referee Clinic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Class 1 & 2 Senior Referee Promotion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Certified Poomsae Scoring Evaluator</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/membership/register?type=referee"
                className="inline-block text-xs font-bold text-brand-green hover:underline"
              >
                Apply for Referee License →
              </Link>
            </div>
          </div>

          {/* Dan / Kup Grading */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-brand-gold flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                Dan / Kup Grading Syllabus
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Standardized national syllabus for color belt (Kup 10 to 1) testing, and bi-annual National Black Belt (1st to 5th Dan) examinations accredited with Kukkiwon.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Taegeuk 1 through 8 Poomsae Forms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Kyukpa (Power Breaking) Guidelines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Official Kukkiwon Dan Verification</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/education/verify"
                className="inline-block text-xs font-bold text-amber-600 hover:underline"
              >
                Verify Existing Certificate →
              </Link>
            </div>
          </div>
        </div>

        {/* Section: Downloadable Syllabi & Rules */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
              Technical Documents & Grading Manuals
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Download the official TTF curriculum, grading criteria, and referee rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between hover:border-brand-green transition-colors"
              >
                <div>
                  <h4 className="font-display font-bold text-xs text-[#0B2A4A]">
                    {doc.title_en}
                  </h4>
                  <span className="text-[10px] text-gray-500">{doc.category} • {doc.year}</span>
                </div>
                <a
                  href={doc.file_url}
                  download
                  className="px-3 py-1 bg-gray-100 hover:bg-brand-green hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
