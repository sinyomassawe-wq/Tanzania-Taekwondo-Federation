import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  ShieldCheck,
  Scale,
  Heart,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';

export default function IntegrityPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Olympic Values & Ethics / Uadilifu na Michezo Safi
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Integrity, Clean Sport & Safeguarding
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Modeled on World Taekwondo integrity standards: safeguarding athletes, upholding anti-doping regulations, and eliminating competition manipulation.
            </p>
          </div>

          <Link
            href="/integrity/report"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all flex-shrink-0 self-start md:self-center"
          >
            <Lock className="w-4 h-4" />
            <span>Confidential Whistleblower Portal</span>
          </Link>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 3 Core Integrity Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Clean Sport (Anti-Doping) */}
          <div id="clean-sport" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
              Clean Sport (Anti-Doping)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              TTF strictly adheres to the World Anti-Doping Code (WADA) and works with the Africa Zone V Regional Anti-Doping Organization (RADO).
            </p>
            <div className="pt-2 space-y-2 text-xs text-gray-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>Annual WADA Prohibited List Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>Therapeutic Use Exemption (TUE) Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>Mandatory Squad In-Competition Testing</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <a
                href="https://www.wada-ama.org/en/prohibited-list"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-green hover:underline flex items-center"
              >
                <span>View 2026 WADA Prohibited List</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* 2. Fair Sport (Competition Ethics) */}
          <div id="fair-sport" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
              Fair Sport & Match Integrity
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Preventing competition manipulation, referee corruption, illegal betting, and bout outcome fixing in all sanctioned divisions.
            </p>
            <div className="pt-2 space-y-2 text-xs text-gray-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-blue" />
                <span>Neutral Blind Referee Assignments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-blue" />
                <span>Electronic Scoring (PSS) & Instant Video Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-blue" />
                <span>Strict Disciplinary Sanctions for Collusion</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/documents"
                className="text-xs font-bold text-brand-blue hover:underline flex items-center"
              >
                <span>Download Ethics Code (PDF)</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* 3. Safe Sport (Safeguarding) */}
          <div id="safe-sport" className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
              Safe Sport & Child Protection
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero tolerance for harassment, physical or psychological abuse, sexual exploitation, or discrimination of any kind across all dojangs.
            </p>
            <div className="pt-2 space-y-2 text-xs text-gray-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-pink-600" />
                <span>Mandatory Coach Vetting & Police Clearance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-pink-600" />
                <span>Designated TTF Safeguarding Officers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-pink-600" />
                <span>Whistleblower Protection Guarantee</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/integrity/report"
                className="text-xs font-bold text-pink-600 hover:underline flex items-center"
              >
                <span>Report an Incident Confidentially</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section: Sanctions & Disciplinary Code */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
              Disciplinary Rules & Sanctions Policy
            </h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              The TTF Disciplinary Commission enforces sanctions ranging from official warnings and point deductions to multi-year national and international suspensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <strong className="block text-sm text-[#0B2A4A] mb-1">Doping Violations</strong>
              <span>
                Standard minimum suspension of 2 to 4 years for positive tests of prohibited substances, plus disqualification of all tournament results and medal forfeiture.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <strong className="block text-sm text-[#0B2A4A] mb-1">Unsportsmanlike Conduct & Violence</strong>
              <span>
                Physical aggression towards referees, opponents, or tournament marshals results in immediate expulsion and indefinite license suspension.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
