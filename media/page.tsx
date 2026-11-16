import { getDb } from '@/lib/db';
import FlagStripe from '@/components/layout/FlagStripe';
import MediaClient from './MediaClient';
import { Camera, Video, Download, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MediaPage() {
  const db = getDb();

  const galleryItems = db
    .prepare('SELECT * FROM gallery ORDER BY event_date DESC')
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Visual Highlights & Brand Kit / Maktaba ya Picha
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              TTF Media & Brand Assets
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              High-resolution photo coverage from national championships, highlight reels, official TTF logo packs, and brand guidelines.
            </p>
          </div>

          <a
            href="/assets/images/ttf-logo.png"
            download="ttf-logo.png"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition-colors self-start md:self-center"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Logo Pack</span>
          </a>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Brand Asset Download Section */}
        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[#0B2A4A]">
                Official TTF Brand Guidelines & Logo Downloads
              </h2>
              <p className="text-xs text-gray-500">
                For use by media organizations, affiliated clubs, and tournament broadcast partners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <strong className="text-xs text-gray-800 block">TTF Logo (High Res PNG)</strong>
                <span className="text-[10px] text-gray-500">Full color circular crest</span>
              </div>
              <a
                href="/assets/images/ttf-logo.png"
                download
                className="p-2 bg-brand-green text-white rounded-lg hover:bg-brand-greenDark"
                title="Download PNG"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <strong className="text-xs text-gray-800 block">TTF Favicon & App Icon</strong>
                <span className="text-[10px] text-gray-500">512x512 square badge</span>
              </div>
              <a
                href="/favicon.png"
                download
                className="p-2 bg-brand-green text-white rounded-lg hover:bg-brand-greenDark"
                title="Download Icon"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <strong className="text-xs text-gray-800 block">Brand Palette Specifications</strong>
                <span className="text-[10px] text-gray-500">#1EB53A, #00A3DD, #FCD116, #0B2A4A</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-brand-navy">HEX CODES</span>
            </div>
          </div>
        </section>

        {/* Interactive Gallery with Lightbox Client Component */}
        <MediaClient items={galleryItems} />
      </div>
    </div>
  );
}
