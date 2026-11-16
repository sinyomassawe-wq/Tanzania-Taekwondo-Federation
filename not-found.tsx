import Link from 'next/link';
import Image from 'next/image';
import FlagStripe from '@/components/layout/FlagStripe';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl text-center space-y-6">
        {/* Exact TTF Logo on white badge */}
        <div className="w-24 h-24 mx-auto bg-white rounded-full p-2 shadow-md border border-gray-100 flex items-center justify-center">
          <Image
            src="/assets/images/ttf-logo.png"
            alt="Tanzania Taekwondo Federation Logo"
            width={88}
            height={88}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono font-black text-4xl text-brand-green block">404</span>
          <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
            Page Not Found / Ukurasa Haujapatikana
          </h1>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            The page you requested may have been moved, archived, or does not exist. Use the links below to return to the official federation portal.
          </p>
        </div>

        <FlagStripe size="sm" />

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/news"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Browse News</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
