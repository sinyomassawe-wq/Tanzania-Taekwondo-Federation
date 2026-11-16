import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { TANZANIAN_REGIONS } from '@/lib/utils';
import ClubSearchClient from './ClubSearchClient';
import { Building, MapPin, Compass, PlusCircle, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ClubsPage() {
  const db = getDb();

  const clubs = db
    .prepare('SELECT * FROM clubs WHERE status = "active" ORDER BY region ASC, name ASC')
    .all() as any[];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Affiliated Dojangs / Vilabu na Mikoa
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              National Club & Dojang Directory
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Find verified Olympic Taekwondo clubs across all 31 administrative regions of Tanzania Mainland and Zanzibar.
            </p>
          </div>

          <a
            href="#register"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors self-start md:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Your Club</span>
          </a>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Interactive Search & Filter Client Component */}
        <ClubSearchClient initialClubs={clubs} />

        {/* Section: Register Your Club Form */}
        <section id="register" className="pt-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
                New Club Affiliation
              </span>
              <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
                Register Your Taekwondo Club
              </h2>
              <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
                Submit your club details for verification and listing in the official Tanzania Taekwondo Federation directory.
              </p>
            </div>

            <form
              method="POST"
              action="/api/clubs/register"
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Club / Academy Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Serengeti Taekwondo Club"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Region *</label>
                  <select
                    name="region"
                    required
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none"
                  >
                    {TANZANIAN_REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    placeholder="e.g. Kinondoni / Arusha CBD"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Head Instructor / Master *</label>
                  <input
                    type="text"
                    name="headInstructor"
                    required
                    placeholder="Instructor Name & Dan Rank"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Contact Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+255 7XX XXX XXX"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Club Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="club@example.com"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Physical Training Location / Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Building, Street, Landmark"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Training Days</label>
                  <input
                    type="text"
                    name="trainingDays"
                    placeholder="e.g. Mon, Wed, Fri"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Training Hours</label>
                  <input
                    type="text"
                    name="trainingTimes"
                    placeholder="e.g. 17:00 – 19:00"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors text-xs"
                >
                  Submit Club Affiliation Application
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
