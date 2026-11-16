import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import { FileText, Download, Bell, Calendar, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function NoticesPage() {
  const db = getDb();

  const notices = db
    .prepare("SELECT * FROM documents WHERE category = 'Circulars and Notices' ORDER BY year DESC, created_at DESC")
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Official Gazetted Notices / Matangazo Rasmi
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            TTF Circulars & Official Notices
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Binding directives, national team selection criteria notices, and administrative announcements issued by the Tanzania Taekwondo Federation Secretariat.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block">
                  Official Circular • {notice.year}
                </span>
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                  {notice.title_en}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  File Size: {notice.file_size || 'PDF Document'}
                </div>
              </div>
            </div>

            <a
              href={notice.file_url}
              download
              className="px-4 py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-colors self-start sm:self-center"
            >
              <Download className="w-4 h-4" />
              <span>Download Circular (PDF)</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
