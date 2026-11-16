import { getDb } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import { Calendar, User, Search, Tag, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface NewsPageProps {
  searchParams: {
    cat?: string;
    q?: string;
  };
}

export default function NewsPage({ searchParams }: NewsPageProps) {
  const db = getDb();
  const selectedCat = searchParams.cat || 'All';
  const query = searchParams.q ? searchParams.q.trim().toLowerCase() : '';

  let sql = 'SELECT * FROM news WHERE 1=1';
  const params: any[] = [];

  if (selectedCat !== 'All') {
    sql += ' AND category = ?';
    params.push(selectedCat);
  }

  if (query) {
    sql += ' AND (LOWER(title_en) LIKE ? OR LOWER(title_sw) LIKE ? OR LOWER(summary_en) LIKE ?)';
    params.push(`%${query}%`, `%${query}%`, `%${query}%`);
  }

  sql += ' ORDER BY published_at DESC';

  const articles = db.prepare(sql).all(...params) as any[];

  const categories = [
    'All',
    'Federation News',
    'Competitions',
    'Athletes',
    'Development',
    'Referees and Coaches',
    'Para Taekwondo',
    'Anti-doping and Integrity',
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
            Media & Communications / Vyombo vya Habari
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            TTF Official News & Press
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
            Official federation circulars, tournament previews, athlete interviews, and integrity announcements.
          </p>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/news' : `/news?cat=${encodeURIComponent(cat)}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Search Form */}
          <form method="GET" action="/news" className="flex items-center space-x-2 flex-shrink-0">
            {selectedCat !== 'All' && <input type="hidden" name="cat" value={selectedCat} />}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white w-48 sm:w-60"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#0B2A4A] text-white text-xs font-bold rounded-lg hover:bg-brand-navy"
            >
              Filter
            </button>
            {query && (
              <Link
                href={selectedCat !== 'All' ? `/news?cat=${encodeURIComponent(selectedCat)}` : '/news'}
                className="text-xs text-red-600 hover:underline"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Results summary */}
        <div className="text-xs font-semibold text-gray-500">
          Showing {articles.length} article{articles.length === 1 ? '' : 's'}
          {selectedCat !== 'All' && ` in "${selectedCat}"`}
          {query && ` matching "${query}"`}
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-gray-700">No articles found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search terms or category filter.
            </p>
            <Link
              href="/news"
              className="inline-block mt-4 px-4 py-2 bg-brand-green text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={art.image_url || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop'}
                    alt={art.title_en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-brand-green text-white text-[11px] font-bold rounded-full shadow">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-[11px] text-gray-500 mb-2">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        {formatDate(art.published_at)}
                      </span>
                      <span>•</span>
                      <span>{art.author || 'TTF Media'}</span>
                    </div>

                    <Link href={`/news/${art.slug}`}>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#0B2A4A] group-hover:text-brand-green transition-colors leading-snug line-clamp-2">
                        {art.title_en}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {art.summary_en}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/news/${art.slug}`}
                      className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center group-hover:underline"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
