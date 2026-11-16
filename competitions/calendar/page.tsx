import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  MapPin,
  ArrowRight,
  Download,
  Filter,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface CalendarProps {
  searchParams: {
    type?: string;
  };
}

export default function CalendarPage({ searchParams }: CalendarProps) {
  const db = getDb();
  const selectedType = searchParams.type || 'All';

  let sql = 'SELECT * FROM events WHERE 1=1';
  const params: any[] = [];

  if (selectedType !== 'All') {
    sql += ' AND event_type = ?';
    params.push(selectedType);
  }

  sql += ' ORDER BY start_date ASC';

  const events = db.prepare(sql).all(...params) as any[];

  const eventTypes = [
    'All',
    'National Championship',
    'Regional',
    'Poomsae',
    'Para',
    'Kyorugi',
    'International',
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Official Schedule / Ratiba ya Mashindano
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              TTF National Events Calendar
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
              Sanctioned championships, regional opens, Dan testing clinics, and national squad trials.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href="/uploads/documents/ttf-calendar-2026.pdf"
              download
              className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Calendar</span>
            </a>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter Pills */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-2 overflow-x-auto scrollbar-thin">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 flex items-center flex-shrink-0">
            <Filter className="w-3.5 h-3.5 mr-1 text-brand-green" />
            Filter by:
          </span>
          {eventTypes.map((type) => (
            <Link
              key={type}
              href={type === 'All' ? '/competitions/calendar' : `/competitions/calendar?type=${encodeURIComponent(type)}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </Link>
          ))}
        </div>

        {/* List of Events */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg text-gray-700">No events found</h3>
              <p className="text-xs text-gray-500 mt-1">
                No events currently scheduled for the selected filter.
              </p>
            </div>
          ) : (
            events.map((evt) => {
              const startDate = new Date(evt.start_date);
              const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const day = startDate.getDate();
              const year = startDate.getFullYear();

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start space-x-5">
                    {/* Date Block */}
                    <div className="w-20 h-20 rounded-2xl bg-[#0B2A4A] text-white flex flex-col items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-[11px] font-bold tracking-widest text-brand-gold uppercase">
                        {month}
                      </span>
                      <span className="text-2xl font-display font-black leading-none mt-0.5">
                        {day}
                      </span>
                      <span className="text-[10px] text-gray-300 mt-1">{year}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-brand-green border border-green-200">
                          {evt.event_type}
                        </span>
                        {evt.reg_deadline && (
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Deadline: {formatDate(evt.reg_deadline)}
                          </span>
                        )}
                      </div>

                      <Link href={`/competitions/${evt.slug}`}>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#0B2A4A] hover:text-brand-blue transition-colors">
                          {evt.title_en}
                        </h3>
                      </Link>

                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-brand-green flex-shrink-0" />
                        <span>{evt.venue_name}</span>
                        {evt.venue_address && (
                          <span className="text-gray-400 ml-1 hidden sm:inline">
                            • {evt.venue_address}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end md:self-center">
                    <Link
                      href={`/competitions/${evt.slug}`}
                      className="px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                    >
                      <span>Details & Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/membership/register"
                      className="px-4 py-2 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] text-xs font-bold rounded-xl transition-colors"
                    >
                      Enter Event
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
