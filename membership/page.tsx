import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  UserCheck,
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle,
  ArrowRight,
  CreditCard,
  QrCode,
} from 'lucide-react';

export default function MembershipPage() {
  const tiers = [
    {
      id: 'athlete',
      title: 'Competitive Athlete License',
      subtitle: 'Leseni ya Mchezaji wa Mashindano',
      fee: '[TZS 20,000 / Year]',
      desc: 'Mandatory annual digital license for all sparring (Kyorugi), Poomsae, and Para competitors in TTF championships.',
      benefits: [
        'Official TTF digital membership ID with verifiable QR code',
        'Eligibility to compete in national championships & regional opens',
        'Inclusion in official national ranking points system',
        'Access to athlete health workshops and talent training camps',
      ],
      cta: 'Register as Athlete',
      href: '/membership/register?type=athlete',
      popular: true,
    },
    {
      id: 'coach',
      title: 'Coach & Instructor License',
      subtitle: 'Leseni ya Kocha na Mkufunzi',
      fee: '[TZS 50,000 / Year]',
      desc: 'Accreditation for certified instructors leading affiliated dojangs and corner-coaching athletes in sanctioned rings.',
      benefits: [
        'Official TTF Coach ID badge & ring corner accreditation pass',
        'Attendance rights to WT Coach Seminars & Continuing Education',
        'Authority to register student athletes under club roster',
        'Invitation to TTF Technical Committee grading clinics',
      ],
      cta: 'Register as Coach',
      href: '/membership/register?type=coach',
      popular: false,
    },
    {
      id: 'referee',
      title: 'Referee & Judge License',
      subtitle: 'Leseni ya Mwamuzi Rasmi',
      fee: '[TZS 40,000 / Year]',
      desc: 'National certification for Kyorugi corner judges, center referees, and Poomsae scoring evaluators.',
      benefits: [
        'Official National Referee ID & licensing credentials',
        'Assignment to sanctioned national championships with per-diem',
        'Annual refresher rules seminar on latest WT competition guidelines',
        'Eligibility for international African Taekwondo Union referee clinics',
      ],
      cta: 'Register as Referee',
      href: '/membership/register?type=referee',
      popular: false,
    },
    {
      id: 'club',
      title: 'Club & Dojang Affiliation',
      subtitle: 'Usajili na Upyaji wa Klabu',
      fee: '[TZS 100,000 / Year]',
      desc: 'Formal annual federation recognition for martial arts academies, schools, and university clubs in Tanzania.',
      benefits: [
        'Official TTF Club Affiliation Certificate of Recognition',
        'Public listing in the National Dojang Directory',
        'Right to enter club teams in National Club Championships',
        'Voting rights at TTF Annual General Assemblies (AGM)',
      ],
      cta: 'Affiliate Your Club',
      href: '/membership/club-affiliation',
      popular: false,
    },
    {
      id: 'official',
      title: 'Technical Official / Staff',
      subtitle: 'Afisa wa Kiufundi au Utawala',
      fee: '[TZS 30,000 / Year]',
      desc: 'Membership for tournament marshals, medical doctors, electronic scoring technicians, and event coordinators.',
      benefits: [
        'Official staff credential and federation identification',
        'Event accreditation pass and tournament assignment roster',
      ],
      cta: 'Register as Official',
      href: '/membership/register?type=official',
      popular: false,
    },
    {
      id: 'supporter',
      title: 'Supporter & Friend of TTF',
      subtitle: 'Mwanachama Mshabiki / Mfadhili',
      fee: '[TZS 25,000 / Year]',
      desc: 'For parents, martial arts enthusiasts, alumni, and community supporters backing Tanzanian Taekwondo.',
      benefits: [
        'Official TTF Supporter card & newsletter updates',
        'Priority admission to national championship VIP seating',
        'Federation commemorative pin and merchandise discounts',
      ],
      cta: 'Join as Supporter',
      href: '/membership/register?type=supporter',
      popular: false,
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              National Licensure / Uanachama wa Shirikisho
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              TTF Membership & Licensure
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Acquire your official federation license, digital ID card with instant QR verification, and sanctioned tournament credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/verify/check"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-sm border border-white/20 flex items-center space-x-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4 text-brand-gold" />
              <span>Verify Card / QR</span>
            </Link>
            <Link
              href="/membership/fees"
              className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Details</span>
            </Link>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Verification Highlight Banner */}
        <div className="bg-gradient-to-r from-[#0B2A4A] to-[#143B63] text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Digital Membership ID Cards with QR Verification
              </h3>
              <p className="text-xs text-gray-300 max-w-xl mt-1 leading-relaxed">
                Every approved athlete and official receives a tamper-proof digital membership card. Tournament weigh-in officials and judges verify authenticity instantly by scanning the unique QR code pointing to <code className="text-brand-gold">/verify/[id]</code>.
              </p>
            </div>
          </div>
          <Link
            href="/verify/check"
            className="px-5 py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow whitespace-nowrap transition-colors"
          >
            Check Membership Status
          </Link>
        </div>

        {/* Membership Tiers Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A] tracking-tight">
              Membership Categories & Annual Dues
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Select your membership category to complete your online registration and upload required credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-xl ${
                  tier.popular
                    ? 'border-brand-green ring-2 ring-brand-green/20'
                    : 'border-gray-200 hover:border-brand-blue'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-7 px-3 py-1 bg-brand-green text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{tier.subtitle}</p>
                    <div className="mt-3 font-mono font-black text-2xl text-brand-green">
                      {tier.fee}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Included Privileges:
                    </span>
                    {tier.benefits.map((b, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    href={tier.href}
                    className={`block text-center w-full py-3 rounded-xl font-bold text-xs shadow transition-colors ${
                      tier.popular
                        ? 'bg-brand-green hover:bg-brand-greenDark text-white'
                        : 'bg-[#0B2A4A] hover:bg-brand-navy text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
