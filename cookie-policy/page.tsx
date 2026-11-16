import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display font-black text-3xl text-[#0B2A4A]">
          Cookie Notice
        </h1>
        <p className="text-xs text-gray-500">
          Privacy-First Architecture • Tanzania Taekwondo Federation
        </p>
        <FlagStripe size="sm" />

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          Strictly Necessary & Preference Cookies Only
        </h2>
        <p>
          The official website of the Tanzania Taekwondo Federation operates with a minimal, privacy-friendly cookie footprint. We do not use third-party behavioral advertising cookies or cross-site tracking scripts.
        </p>

        <h3 className="font-display font-bold text-base text-[#0B2A4A] pt-2">
          Cookies Deployed:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>ttf_lang:</strong> Remembers your language preference between English (EN) and Swahili (SW).
          </li>
          <li>
            <strong>ttf_admin_token:</strong> Secure HTTP-only session cookie used exclusively for authenticated federation staff logging into the admin portal.
          </li>
        </ul>
      </div>
    </div>
  );
}
