import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { generateQrDataUrl, formatDate } from '@/lib/utils';
import {
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  ShieldCheck,
  User,
  Calendar,
  MapPin,
  Building,
  QrCode,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export default async function VerifyMembershipPage({ params }: Props) {
  const db = getDb();
  const memberId = decodeURIComponent(params.id);

  const member = db
    .prepare('SELECT * FROM memberships WHERE id = ?')
    .get(memberId) as any;

  if (!member) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-red-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
            License Record Not Found
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            No active or historical TTF membership record exists for ID: <strong className="font-mono">{memberId}</strong>.
          </p>
          <div className="pt-2">
            <Link
              href="/membership/register"
              className="inline-block px-5 py-2.5 bg-brand-green text-white font-bold text-xs rounded-xl"
            >
              Apply for Official License
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const qrCodeUrl = await generateQrDataUrl(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify/${member.id}`
  );

  const isApproved = member.status === 'approved';
  const isPending = member.status === 'pending';

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Verification Status Header */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                isApproved
                  ? 'bg-green-100 text-brand-green'
                  : isPending
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {isApproved ? (
                <ShieldCheck className="w-7 h-7" />
              ) : isPending ? (
                <Clock className="w-7 h-7" />
              ) : (
                <XCircle className="w-7 h-7" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Official TTF Verification Portal
              </div>
              <h1 className="font-display font-extrabold text-xl text-[#0B2A4A] flex items-center gap-2">
                <span>{member.full_name}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isApproved
                      ? 'bg-green-50 text-brand-green border border-green-200'
                      : isPending
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {member.status.toUpperCase()}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              className="px-4 py-2 bg-[#0B2A4A] hover:bg-brand-navy text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-colors no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Print License Card</span>
            </button>
          </div>
        </div>

        {/* Printable Official Membership Card Component */}
        <div className="print-card-section bg-gradient-to-br from-[#0B2A4A] via-[#10355c] to-[#0B2A4A] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-brand-gold relative overflow-hidden max-w-2xl mx-auto">
          {/* Watermark Logo in background */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none w-80 h-80">
            <Image
              src="/assets/images/ttf-logo.png"
              alt="Watermark"
              width={320}
              height={320}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20 relative z-10">
            <div className="flex items-center space-x-3">
              {/* White badge protecting the TTF logo */}
              <div className="w-14 h-14 bg-white rounded-full p-1 shadow-sm flex items-center justify-center flex-shrink-0">
                <Image
                  src="/assets/images/ttf-logo.png"
                  alt="TTF Crest"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                  TANZANIA TAEKWONDO FEDERATION
                </div>
                <div className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                  Official Licensure & Identification Card
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-300 block">LICENSE ID</span>
              <span className="font-mono font-bold text-xs sm:text-sm text-brand-gold tracking-wider">
                {member.id}
              </span>
            </div>
          </div>

          {/* Flag stripe accent line */}
          <div className="my-3">
            <FlagStripe size="sm" />
          </div>

          {/* Card Body */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2 items-center relative z-10">
            {/* Member Photo */}
            <div className="sm:col-span-4 flex flex-col items-center">
              <div className="w-32 h-36 rounded-2xl overflow-hidden bg-gray-200 border-2 border-brand-gold shadow-md relative">
                <Image
                  src={
                    member.photo_url ||
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'
                  }
                  alt={member.full_name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                {member.type} MEMBER
              </span>
            </div>

            {/* Member Metadata */}
            <div className="sm:col-span-5 space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Full Name
                </span>
                <span className="font-display font-black text-base text-white">
                  {member.full_name}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Taekwondo Belt / Dan
                </span>
                <span className="font-semibold text-white">
                  {member.belt_dan || 'Registered Athlete'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Club & Region
                </span>
                <span className="text-gray-200">
                  {member.club_name || 'Affiliated Club'} • {member.region}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase block">Approved</span>
                  <span className="text-gray-200">{formatDate(member.approved_at) || 'Pending'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase block">Expires</span>
                  <span className="text-gray-200">{formatDate(member.expires_at) || 'Annual'}</span>
                </div>
              </div>
            </div>

            {/* QR Code Block */}
            <div className="sm:col-span-3 flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-inner">
              {qrCodeUrl ? (
                <div className="w-24 h-24 relative">
                  <img src={qrCodeUrl} alt="Verification QR Code" className="w-full h-full" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-gray-400 text-[10px]">
                  QR Code
                </div>
              )}
              <span className="text-[8px] font-mono font-bold text-[#0B2A4A] text-center mt-1">
                SCAN TO VERIFY
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-6 pt-3 border-t border-white/20 flex justify-between items-center text-[10px] text-gray-400 relative z-10">
            <span>Official Digital Credential of Tanzania Taekwondo Federation</span>
            <span className="font-bold text-brand-gold">SECURE • VERIFIED</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4 no-print">
          <Link href="/membership" className="text-xs font-bold text-brand-blue hover:underline">
            ← Return to Membership Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
