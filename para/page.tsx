import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  Award,
  CheckCircle,
  ShieldCheck,
  Heart,
  ArrowRight,
  Accessibility,
  ExternalLink,
} from 'lucide-react';

export default function ParaTaekwondoPage() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Paralympic Movement / Taekwondo kwa Wenye Ulemavu
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Tanzania Para Taekwondo
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Empowering Tanzanian athletes with physical impairments to train, excel, and represent the nation on the world Paralympic stage.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Intro Grid */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
              Inclusive Sport Excellence
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B2A4A]">
              Paralympic Sport in Tanzania
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Para Taekwondo is an official Paralympic discipline under World Taekwondo and the International Paralympic Committee (IPC). In Tanzania, TTF coordinates talent identification, specialized coach training, and medical classification to ensure every athlete competes safely and fairly according to functional ability.
            </p>
            <div className="pt-2">
              <Link
                href="/membership/register?type=athlete"
                className="inline-flex items-center px-5 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <span>Register as Para Athlete</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F7FA] p-6 rounded-2xl border border-gray-200 space-y-3">
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">
              Key Paralympic Achievements
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Establishment of TTF Para Taekwondo Committee</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Inaugural Para Kyorugi division at National Championships</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Partnership with Tanzania Paralympic Committee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Classification Breakdown */}
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
              World Taekwondo Para Sport Classifications
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Athletes undergo certified medical classification before competing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-200 inline-block mb-1">
                K44 Classification
              </span>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                Unilateral Arm Amputation / Dysmelia
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For athletes with limb deficiencies of one arm (above or below the elbow) or equivalent neurological impairments impacting one upper limb. This is the primary Paralympic sparring class.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-brand-green border border-green-200 inline-block mb-1">
                P20 – P30 Classification
              </span>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                Para Poomsae (Technical Patterns)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For athletes with intellectual impairments, visual impairments, or neurological movement conditions performing standardized technical forms evaluated on accuracy and rhythm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
