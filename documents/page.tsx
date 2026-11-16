import { getDb } from '@/lib/db';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle,
  FolderOpen,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: {
    cat?: string;
    q?: string;
  };
}

export default function DocumentsPage({ searchParams }: Props) {
  const db = getDb();
  const selectedCat = searchParams.cat || 'All';
  const query = searchParams.q ? searchParams.q.trim().toLowerCase() : '';

  let sql = 'SELECT * FROM documents WHERE 1=1';
  const params: any[] = [];

  if (selectedCat !== 'All') {
    sql += ' AND category = ?';
    params.push(selectedCat);
  }

  if (query) {
    sql += ' AND (LOWER(title_en) LIKE ? OR LOWER(title_sw) LIKE ?)';
    params.push(`%${query}%`, `%${query}%`);
  }

  sql += ' ORDER BY year DESC, title_en ASC';

  const documents = db.prepare(sql).all(...params) as any[];

  const categories = [
    'All',
    'Competition Rules',
    'Poomsae Rules',
    'Refereeing',
    'Statutes',
    'Policies',
    'Forms',
    'Reports',
    'Circulars and Notices',
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Banner */}
      <div className="bg-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
              Official Library / Kanuni na Nyaraka
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Rules & Documents Library
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Official downloadable regulations, federation constitution, competition rulebooks, membership forms, and annual reports.
            </p>
          </div>

          <Link
            href="/notices"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldDark text-[#0B2A4A] font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-colors self-start md:self-center"
          >
            <FileText className="w-4 h-4" />
            <span>Official Circulars Board</span>
          </Link>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Category Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/documents' : `/documents?cat=${encodeURIComponent(cat)}${query ? `&q=${query}` : ''}`}
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

          <form method="GET" action="/documents" className="flex items-center space-x-2 flex-shrink-0">
            {selectedCat !== 'All' && <input type="hidden" name="cat" value={selectedCat} />}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search document name..."
                className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white w-48 sm:w-60"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#0B2A4A] text-white text-xs font-bold rounded-lg hover:bg-brand-navy"
            >
              Search
            </button>
            {query && (
              <Link
                href={selectedCat !== 'All' ? `/documents?cat=${encodeURIComponent(selectedCat)}` : '/documents'}
                className="text-xs text-red-600 hover:underline"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Document List */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-gray-700">No documents found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your category filter or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center space-x-4 pr-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block">
                      {doc.category} {doc.year ? `• ${doc.year}` : ''}
                    </span>
                    <h3 className="font-display font-bold text-sm text-[#0B2A4A] group-hover:text-brand-blue transition-colors line-clamp-1">
                      {doc.title_en}
                    </h3>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {doc.file_size || 'PDF Document'} • {doc.download_count || 0} downloads
                    </div>
                  </div>
                </div>

                <a
                  href={doc.file_url}
                  download
                  className="px-4 py-2 bg-gray-100 hover:bg-brand-green hover:text-white text-[#0B2A4A] font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
