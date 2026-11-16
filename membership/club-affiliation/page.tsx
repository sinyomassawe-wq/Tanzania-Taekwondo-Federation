import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Building,
  CheckCircle,
  FileText,
  Download,
  ShieldCheck,
  ArrowRight,
  Compass,
} from 'lucide-react';

export default function ClubAffiliationPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Dojang Recognition / Usajili wa Vilabu
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Club Affiliation & Accreditation
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Requirements, governance rules, and step-by-step procedure for martial arts clubs, schools, and private dojangs in Tanzania to gain official TTF membership.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Steps */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
            4-Step Club Affiliation Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <span className="w-7 h-7 rounded-full bg-brand-green text-white font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-display font-bold text-base text-[#0B2A4A]">
                Head Instructor Qualification
              </h4>
              <p className="leading-relaxed">
                The club must have a resident head instructor holding a minimum Kukkiwon 2nd Dan Black Belt and an active TTF Coach License.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <span className="w-7 h-7 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-display font-bold text-base text-[#0B2A4A]">
                Venue Safety & Mat Standards
              </h4>
              <p className="leading-relaxed">
                The training dojang must have safe martial arts mats, first aid equipment, and adequate ventilation approved by the regional inspector.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <span className="w-7 h-7 rounded-full bg-brand-gold text-[#0B2A4A] font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-display font-bold text-base text-[#0B2A4A]">
                Regional Association Endorsement
              </h4>
              <p className="leading-relaxed">
                Clubs must obtain a letter of endorsement from their respective Regional Taekwondo Association (or TTF Secretariat for new regions).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center text-xs">
                4
              </span>
              <h4 className="font-display font-bold text-base text-[#0B2A4A]">
                Annual Dues & Certificate Issuance
              </h4>
              <p className="leading-relaxed">
                Payment of the annual affiliation fee ([TZS 100,000 / Year]) and issuance of the official Framed Certificate of Affiliation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <FileText className="w-8 h-8 text-brand-green" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
              Download Affiliation Package
            </h3>
            <p className="text-xs text-gray-600">
              Download the official TTF Club Constitution Guidelines and application package in PDF format.
            </p>
            <a
              href="/uploads/documents/ttf-club-affiliation-form.pdf"
              download
              className="inline-flex items-center px-4 py-2.5 bg-gray-100 hover:bg-brand-green hover:text-white font-bold text-xs rounded-xl transition-colors"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>Download Form (PDF)</span>
            </a>
          </div>

          <div className="bg-[#0B2A4A] text-white p-7 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <Building className="w-8 h-8 text-brand-gold" />
              <h3 className="font-display font-bold text-lg text-white mt-3">
                Register Your Club Online
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Submit your club details directly to the TTF Secretariat to be added to the official national dojang directory.
              </p>
            </div>
            <Link
              href="/clubs#register"
              className="inline-flex items-center justify-center px-5 py-3 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow transition-colors"
            >
              <span>Go to Club Registration Form</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
