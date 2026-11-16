import { getDb } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Shield,
  Award,
  Users,
  FileText,
  Download,
  Building,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const db = getDb();

  const officials = db
    .prepare('SELECT * FROM officials ORDER BY display_order ASC')
    .all() as any[];

  const documents = db
    .prepare("SELECT * FROM documents WHERE category IN ('Statutes', 'Reports') ORDER BY year DESC")
    .all() as any[];

  const execCommittee = officials.filter((o) => o.category === 'executive_committee');
  const commissions = officials.filter((o) => o.category === 'commission');

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="bg-[#0B2A4A] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-wider mb-2">
            <span>About Us / Kuhusu Sisi</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Tanzania Taekwondo Federation (TTF)
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            The national governing body of Taekwondo in the United Republic of Tanzania, dedicated to developing martial arts excellence, youth empowerment, and Olympic values.
          </p>
        </div>
      </div>
      <FlagStripe size="md" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Section 1: Who We Are */}
        <section id="who-we-are" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-50 text-brand-green font-bold text-xs uppercase tracking-wider">
              <span>National Mandate</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#0B2A4A] tracking-tight">
              Who We Are & Our Mission
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                The <strong>Tanzania Taekwondo Federation (TTF)</strong> is the official governing authority for Olympic Taekwondo across Mainland Tanzania and Zanzibar. Founded to foster, organize, and administer the sport, TTF coordinates national team selections, coach and referee licensing, Kup and Dan grading, and athlete welfare.
              </p>
              <div className="bg-[#F5F7FA] p-6 rounded-2xl border-l-4 border-brand-green space-y-3">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">Our Vision</h3>
                <p className="text-sm text-gray-600">
                  To position Tanzania as a premier competitive martial arts power in Africa, inspiring youth of all genders and abilities to embrace discipline, health, and Olympic sportsmanship.
                </p>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">Our Core Values</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>Ye-Ui (Courtesy)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>Yom-Chi (Integrity)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>In-Nae (Perseverance)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>Guk-Gi (Self-Control)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>Baekjul (Indomitable Spirit)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green" />
                    <span>Inclusivity & Fair Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F7FA] p-8 rounded-3xl border border-gray-200 text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-white rounded-full p-2 shadow-md flex items-center justify-center border border-gray-100">
              <Image
                src="/assets/images/ttf-logo.png"
                alt="TTF Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
              Official Registration & Recognition
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Registered under the National Sports Council Act of the United Republic of Tanzania. Affiliated with World Taekwondo (Seoul, Korea) and the African Taekwondo Union.
            </p>
            <div className="pt-2">
              <Link
                href="/membership/register"
                className="inline-block w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white text-sm font-bold rounded-xl shadow transition-colors"
              >
                Join the Federation
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Executive Committee / Board */}
        <section id="executive-committee" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
              Governance
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#0B2A4A] tracking-tight">
              Executive Committee / Board
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Elected federation officials responsible for strategic governance, oversight, and institutional policy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {execCommittee.map((official) => (
              <div
                key={official.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="relative h-60 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={official.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'}
                    alt={official.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-brand-gold text-[#0B2A4A] text-xs font-extrabold rounded-md shadow">
                    {official.position_en}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                      {official.name}
                    </h3>
                    <p className="text-xs text-brand-green font-semibold mt-0.5">
                      {official.position_sw}
                    </p>
                    <p className="text-xs text-gray-600 mt-2.5 line-clamp-3">
                      {official.bio_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Commissions */}
        <section id="commissions" className="space-y-8 bg-[#F5F7FA] p-8 sm:p-12 rounded-3xl border border-gray-200">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block mb-1">
              Standing Committees
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A] tracking-tight">
              Secretariat & Specialized Commissions
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Expert working bodies overseeing operational areas of Tanzanian Taekwondo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissions.map((comm) => (
              <div key={comm.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-brand-green block mb-1 uppercase tracking-wide">
                  {comm.commission_name}
                </span>
                <h4 className="font-display font-bold text-base text-[#0B2A4A]">
                  {comm.position_en}
                </h4>
                <p className="text-sm font-semibold text-gray-800 mt-1">{comm.name}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {comm.bio_en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Affiliations */}
        <section id="affiliations" className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A] tracking-tight">
              Institutional Affiliations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              TTF is proud to represent Tanzania within official continental and global governing bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="http://www.worldtaekwondo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-green shadow-sm hover:shadow transition-all group"
            >
              <div className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-brand-green flex items-center justify-between">
                <span>World Taekwondo (WT)</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-green" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                International Olympic Committee recognized world federation.
              </p>
            </a>

            <a
              href="https://aftu.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-green shadow-sm hover:shadow transition-all group"
            >
              <div className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-brand-green flex items-center justify-between">
                <span>African Taekwondo Union</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-green" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Continental governing body administering the African Championships.
              </p>
            </a>

            <a
              href="https://olympic.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-green shadow-sm hover:shadow transition-all group"
            >
              <div className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-brand-green flex items-center justify-between">
                <span>Tanzania Olympic Committee</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-green" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                National Olympic Committee governing Tanzanian delegations to Olympic & Commonwealth Games.
              </p>
            </a>

            <a
              href="https://www.bmt.go.tz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-green shadow-sm hover:shadow transition-all group"
            >
              <div className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-brand-green flex items-center justify-between">
                <span>National Sports Council (BMT)</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-green" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Statutory government authority regulating all national sports associations in Tanzania.
              </p>
            </a>
          </div>
        </section>

        {/* Section 5: Constitution & Statutes */}
        <section id="statutes" className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
                Transparency & Governance
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A] tracking-tight">
                Constitution, Statutes & Annual Reports
              </h2>
            </div>
            <Link
              href="/documents"
              className="mt-3 sm:mt-0 text-sm font-bold text-brand-blue hover:underline"
            >
              View All Legal Documents →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A]">
                      {doc.title_en}
                    </h4>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {doc.category} • {doc.year} • {doc.file_size || 'PDF'}
                    </div>
                  </div>
                </div>

                <a
                  href={doc.file_url}
                  download
                  className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-brand-green hover:text-white text-xs font-bold text-[#0B2A4A] transition-colors flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
