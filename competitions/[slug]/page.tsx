import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Download,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export default function EventDetailPage({ params }: Props) {
  const db = getDb();

  const event = db
    .prepare('SELECT * FROM events WHERE slug = ?')
    .get(params.slug) as any;

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/competitions/calendar"
            className="inline-flex items-center text-xs text-brand-gold hover:underline font-bold mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Events Calendar</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-brand-green text-white text-xs font-bold rounded-full">
              {event.event_type}
            </span>
            {event.reg_deadline && (
              <span className="px-3 py-1 bg-amber-400 text-black text-xs font-bold rounded-full">
                Entry Deadline: {formatDate(event.reg_deadline)}
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {event.title_en}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300 mt-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-brand-gold" />
              <span>
                {formatDate(event.start_date)}
                {event.end_date && ` – ${formatDate(event.end_date)}`}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-brand-green" />
              <span>{event.venue_name}</span>
            </div>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main 8 cols */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0B2A4A]">
                Tournament Overview
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.description_en}
              </p>

              {event.description_sw && (
                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-xl">
                  <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider block mb-1">
                    Maelezo kwa Kiswahili
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {event.description_sw}
                  </p>
                </div>
              )}
            </div>

            {/* Schedule Details */}
            {event.schedule_details && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex items-center space-x-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-brand-blue" />
                  <span>Program & Order of Bouts</span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  Event Schedule
                </h3>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {event.schedule_details}
                </div>
              </div>
            )}

            {/* Categories & Weight Divisions */}
            {event.categories_weights && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex items-center space-x-2 text-brand-green font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Divisions & Weight Categories</span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  Eligible Weight Classes
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed bg-green-50/40 p-4 rounded-xl border border-green-100">
                  {event.categories_weights}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Entry / Registration Card */}
            <div className="bg-[#0B2A4A] text-white p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="font-display font-bold text-lg text-brand-gold">
                Athlete Registration
              </h3>
              <p className="text-xs text-gray-300">
                Competitors must hold an active TTF membership license and comply with official Kukkiwon / WT age guidelines.
              </p>
              <Link
                href="/membership/register"
                className="block text-center w-full py-3 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow transition-colors"
              >
                Register Athlete Online
              </Link>
            </div>

            {/* Venue & Map Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center">
                <MapPin className="w-4 h-4 text-brand-green mr-1.5" />
                <span>Venue & Location</span>
              </h3>
              <p className="text-xs font-semibold text-gray-800">
                {event.venue_name}
              </p>
              {event.venue_address && (
                <p className="text-xs text-gray-500">{event.venue_address}</p>
              )}
              {event.map_url && (
                <a
                  href={event.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>

            {/* Official Invitation PDF Download */}
            {event.invitation_pdf_url && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                  Tournament Outline
                </h3>
                <p className="text-xs text-gray-600">
                  Download the official event package, weigh-in rules, and entry form.
                </p>
                <a
                  href={event.invitation_pdf_url}
                  download
                  className="w-full py-2.5 bg-gray-100 hover:bg-brand-green hover:text-white text-[#0B2A4A] font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Outline (PDF)</span>
                </a>
              </div>
            )}

            {/* Tournament Contact */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs text-gray-600">
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                Organizing Committee
              </h3>
              {event.contact_person && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{event.contact_person}</span>
                </div>
              )}
              {event.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{event.contact_phone}</span>
                </div>
              )}
              {event.contact_email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{event.contact_email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
