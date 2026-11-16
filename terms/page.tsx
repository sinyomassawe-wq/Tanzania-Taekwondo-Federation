import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';

export default function TermsPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
        <h1 className="font-display font-black text-3xl text-[#0B2A4A]">
          Terms of Service & Participation
        </h1>
        <p className="text-xs text-gray-500">
          Tanzania Taekwondo Federation (TTF) • Governing Regulations
        </p>
        <FlagStripe size="sm" />

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          1. Acceptance of Federation Statutes
        </h2>
        <p>
          By using this website, submitting an online registration, or competing in sanctioned events, all athletes, coaches, referees, and affiliated clubs agree to abide by the Constitution of the Tanzania Taekwondo Federation, World Taekwondo competition rules, and the World Anti-Doping Code.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          2. Intellectual Property & Branding
        </h2>
        <p>
          The name "Tanzania Taekwondo Federation", the official circular crest logo, and official publications are the exclusive property of TTF. Reproduction without written authorization from the Secretariat is strictly prohibited.
        </p>

        <h2 className="font-display font-bold text-lg text-[#0B2A4A] pt-2">
          3. Digital Membership & Verification
        </h2>
        <p>
          Membership cards and credentials generated via this platform are issued on condition of truthful disclosure. The Federation reserves the right to revoke any license found to contain falsified certificates or fraudulent birth data.
        </p>
      </div>
    </div>
  );
}
