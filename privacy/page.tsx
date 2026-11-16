import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';

export default function PrivacyPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display font-black text-3xl text-[#0B2A4A]">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Last updated: January 2026 • Tanzania Taekwondo Federation (TTF)
        </p>
        <FlagStripe size="sm" />

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          1. Information We Collect
        </h2>
        <p>
          The Tanzania Taekwondo Federation collects personal information submitted during online athlete and club membership registration, contact inquiries, and confidential whistleblower reports. This may include full names, contact information, dates of birth, identification documents, and Dan rank credentials.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          2. Purpose of Processing
        </h2>
        <p>
          Information is collected solely to administer sports governance, verify license credentials, coordinate national and international tournament brackets, manage national team selections, and enforce anti-doping regulations.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          3. Public Verification Registry
        </h2>
        <p>
          To maintain transparency and prevent credential forgery, athlete Dan ranks, license numbers, and club affiliations are publicly verifiable via our secure QR verification system. Sensitive contact and identification numbers are never published publicly.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          4. Contact Our Data Protection Officer
        </h2>
        <p>
          For questions regarding your personal data or to request corrections, contact the TTF Secretariat at <strong>info@ttf.or.tz</strong>.
        </p>
      </div>
    </div>
  );
}
