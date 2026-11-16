import { getDb } from '@/lib/db';
import FlagStripe from '@/components/layout/FlagStripe';
import { Handshake, ExternalLink, Award, Send } from 'lucide-react';
import PartnersInquiryForm from './PartnersInquiryForm';

export const dynamic = 'force-dynamic';

export default function PartnersPage() {
  const db = getDb();

  const partners = db
    .prepare('SELECT * FROM partners ORDER BY display_order ASC')
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Sponsorship & Alliances / Washirika na Wafadhili
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Partners & Official Sponsors
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Collaborating with leading public institutions, corporate sponsors, and international federations to empower Tanzanian martial arts.
            </p>
          </div>

          <a
            href="#inquire"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors self-start md:self-center"
          >
            <Handshake className="w-4 h-4" />
            <span>Become a Partner</span>
          </a>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Partners Grid */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
            Current Institutional & Corporate Partners
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-brand-green border border-green-200">
                      {p.tier} PARTNER
                    </span>
                    <Handshake className="w-4 h-4 text-brand-green" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                    {p.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Official Recognition</span>
                  {p.website_url && (
                    <a
                      href={p.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-blue hover:underline flex items-center"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Become a Partner Inquiry Form */}
        <section id="inquire" className="pt-6">
          <PartnersInquiryForm />
        </section>
      </div>
    </div>
  );
}
