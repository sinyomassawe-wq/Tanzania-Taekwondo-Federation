import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  Trophy,
  MapPin,
  ArrowRight,
  Award,
  FileCheck,
  Compass,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CompetitionsPage() {
  const db = getDb();

  const upcomingEvents = db
    .prepare('SELECT * FROM events ORDER BY start_date ASC LIMIT 4')
    .all() as any[];

  const latestResults = db
    .prepare('SELECT * FROM results ORDER BY year DESC LIMIT 4')
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            National Championships & Tournaments / Mashindano
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            TTF Competitions Hub
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Sanctioned national championships, regional qualification circuits, international trial events, and historical medal records.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Competitions Sub-Nav Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/competitions/calendar"
            className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-brand-blue shadow-sm hover:shadow-md transition-all group"
          >
            <Calendar className="w-8 h-8 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-brand-blue">
              Events Calendar
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Explore scheduled tournaments, weight-in dates & registration cutoffs.
            </p>
            <div className="mt-4 text-xs font-bold text-brand-blue flex items-center">
              <span>View Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/competitions/results"
            className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-brand-green shadow-sm hover:shadow-md transition-all group"
          >
            <Trophy className="w-8 h-8 text-brand-green mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-brand-green">
              Results & Brackets
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Official podium medalists, score sheets, and tournament bracket downloads.
            </p>
            <div className="mt-4 text-xs font-bold text-brand-green flex items-center">
              <span>Browse Results</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/competitions/results#records"
            className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-brand-gold shadow-sm hover:shadow-md transition-all group"
          >
            <Award className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-amber-600">
              National Champions
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Historical archive of Tanzanian gold medalists across all Olympic weight divisions.
            </p>
            <div className="mt-4 text-xs font-bold text-amber-600 flex items-center">
              <span>See Champions</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/competitions/host"
            className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-600 shadow-sm hover:shadow-md transition-all group"
          >
            <Compass className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-purple-600">
              Host an Event / Bid
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Sanctioning criteria, venue technical requirements, and bidding inquiries.
            </p>
            <div className="mt-4 text-xs font-bold text-purple-600 flex items-center">
              <span>Bidding Info</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>

        {/* Featured Upcoming Events */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
              Next Sanctioned Tournaments
            </h2>
            <Link
              href="/competitions/calendar"
              className="text-xs font-bold text-brand-green hover:underline"
            >
              All Scheduled Dates →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-green-50 text-brand-green border border-green-200 rounded-full text-xs font-bold">
                      {evt.event_type}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {formatDate(evt.start_date)}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                    {evt.title_en}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {evt.description_en}
                  </p>

                  <div className="mt-4 text-xs text-gray-500 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-brand-green" />
                    <span>{evt.venue_name}</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/competitions/${evt.slug}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-blue flex items-center"
                  >
                    <span>View Outline & Weights</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <Link
                    href="/membership/register"
                    className="text-xs font-bold text-brand-green hover:underline"
                  >
                    Enter Athlete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
