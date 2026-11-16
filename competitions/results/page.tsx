import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { Trophy, Award, Download, Filter, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ResultsPageProps {
  searchParams: {
    year?: string;
    cat?: string;
  };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const db = getDb();
  const selectedYear = searchParams.year || '2025';
  const selectedCat = searchParams.cat || 'All';

  let sql = 'SELECT * FROM results WHERE 1=1';
  const params: any[] = [];

  if (selectedYear !== 'All') {
    sql += ' AND year = ?';
    params.push(parseInt(selectedYear, 10));
  }

  if (selectedCat !== 'All') {
    sql += ' AND category = ?';
    params.push(selectedCat);
  }

  sql += ' ORDER BY year DESC, division ASC, weight_class ASC';

  const results = db.prepare(sql).all(...params) as any[];

  // Historical records
  const champions = db
    .prepare('SELECT * FROM records ORDER BY year DESC, weight_class ASC')
    .all() as any[];

  const years = ['All', '2025', '2024', '2023'];
  const categories = ['All', 'Kyorugi', 'Poomsae', 'Para'];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Official Records & Brackets / Matokeo
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Championship Results & Records
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
              Medal podium standings, bracket archives, and all-time Tanzanian national champions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="#records"
              className="px-4 py-2 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] text-xs font-bold rounded-xl shadow transition-colors flex items-center space-x-1"
            >
              <Trophy className="w-4 h-4 mr-1" />
              <span>National Champions Roll</span>
            </a>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Year:
            </span>
            <div className="flex space-x-1.5">
              {years.map((yr) => (
                <Link
                  key={yr}
                  href={`/competitions/results?year=${yr}${selectedCat !== 'All' ? `&cat=${selectedCat}` : ''}`}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedYear === yr
                      ? 'bg-[#0B2A4A] text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {yr}
                </Link>
              ))}
            </div>

            <span className="text-gray-300 mx-2 hidden sm:inline">|</span>

            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Discipline:
            </span>
            <div className="flex space-x-1.5">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/competitions/results?year=${selectedYear}&cat=${cat}`}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedCat === cat
                      ? 'bg-brand-green text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Results Tables */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
            Official Medal Standings ({selectedYear === 'All' ? 'All Years' : selectedYear})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <span className="font-display font-bold text-base text-[#0B2A4A]">
                    {res.gender} {res.division} {res.weight_class}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-brand-green border border-green-200">
                    {res.category} • {res.year}
                  </span>
                </div>

                <div className="space-y-2.5 text-sm">
                  {/* Gold */}
                  <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-yellow-50/70 border border-yellow-200/60">
                    <span className="text-xl">🥇</span>
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-900 block leading-none">
                        GOLD MEDALIST
                      </span>
                      <span className="font-bold text-gray-900">{res.gold_athlete}</span>
                    </div>
                  </div>

                  {/* Silver */}
                  <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xl">🥈</span>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-700 block leading-none">
                        SILVER MEDALIST
                      </span>
                      <span className="font-bold text-gray-900">{res.silver_athlete}</span>
                    </div>
                  </div>

                  {/* Bronze */}
                  {(res.bronze_athlete_1 || res.bronze_athlete_2) && (
                    <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-orange-50/50 border border-orange-200/50">
                      <span className="text-xl">🥉</span>
                      <div>
                        <span className="text-[10px] font-extrabold text-amber-900 block leading-none">
                          BRONZE MEDALIST(S)
                        </span>
                        <span className="font-medium text-gray-800 text-xs">
                          {[res.bronze_athlete_1, res.bronze_athlete_2].filter(Boolean).join(' • ')}
                        </span>
                      </div>
                    </div>
                  )}

                  {res.notes_en && (
                    <p className="text-xs text-gray-500 pt-2 italic">
                      Note: {res.notes_en}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Historical Champions Roll */}
        <section id="records" className="space-y-6 pt-10 border-t border-gray-200">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">
              Historical Statistics & Heritage
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A] tracking-tight">
              Tanzania National Champions Archive
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Official record of national championship winners by year and weight class.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0B2A4A] text-white text-xs font-bold tracking-wider uppercase">
                    <th className="py-3.5 px-6">Year</th>
                    <th className="py-3.5 px-6">Division / Weight</th>
                    <th className="py-3.5 px-6">Gender</th>
                    <th className="py-3.5 px-6">National Champion</th>
                    <th className="py-3.5 px-6">Club & Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {champions.map((c) => (
                    <tr key={c.id} className="hover:bg-yellow-50/30 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-brand-navy">{c.year}</td>
                      <td className="py-3.5 px-6 font-semibold text-gray-800">
                        {c.division} {c.weight_class}
                      </td>
                      <td className="py-3.5 px-6 text-gray-600">{c.gender}</td>
                      <td className="py-3.5 px-6 font-bold text-brand-green">
                        🏆 {c.champion_name}
                      </td>
                      <td className="py-3.5 px-6 text-gray-500 text-xs">
                        {c.club_name || 'Affiliated Club'}, {c.region}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
