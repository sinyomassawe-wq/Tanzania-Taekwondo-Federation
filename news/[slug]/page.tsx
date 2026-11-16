import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: Props) {
  const db = getDb();

  const article = db
    .prepare('SELECT * FROM news WHERE slug = ?')
    .get(params.slug) as any;

  if (!article) {
    notFound();
  }

  // Related articles
  const related = db
    .prepare('SELECT * FROM news WHERE category = ? AND id != ? ORDER BY published_at DESC LIMIT 3')
    .all(article.category, article.id) as any[];

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#0B2A4A] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center text-xs text-brand-gold hover:underline font-bold mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to All News</span>
          </Link>

          <div className="inline-block px-3 py-1 bg-brand-green text-white text-xs font-bold rounded-full mb-3">
            {article.category}
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {article.title_en}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mt-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-brand-blue" />
              {formatDate(article.published_at)}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1.5 text-gray-400" />
              {article.author || 'TTF Secretariat'}
            </span>
          </div>
        </div>
      </div>
      <FlagStripe size="sm" />

      {/* Article Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {article.image_url && (
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md mb-8 bg-gray-100">
            <Image
              src={article.image_url}
              alt={article.title_en}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* English Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed border-b border-gray-200 pb-10">
          <h2 className="font-display font-bold text-xl text-[#0B2A4A] mb-4">
            English Version
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: article.content_en || `<p>${article.summary_en}</p>`,
            }}
          />
        </div>

        {/* Swahili Content (Bilingual requirement) */}
        {article.content_sw && (
          <div className="mt-10 p-6 sm:p-8 bg-green-50/50 rounded-2xl border border-brand-green/20">
            <div className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2">
              Toleo la Kiswahili
            </div>
            <h2 className="font-display font-bold text-xl text-[#0B2A4A] mb-4">
              {article.title_sw}
            </h2>
            <div
              className="prose max-w-none text-gray-800 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content_sw }}
            />
          </div>
        )}

        {/* Social Share bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-600">
            <Share2 className="w-4 h-4 text-brand-blue" />
            <span>Share this press release:</span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title_en + ' - TTF')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title_en)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X (Twitter)</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Related News */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200 space-y-6">
            <h3 className="font-display font-black text-2xl text-[#0B2A4A]">
              Related Coverage in {article.category}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="bg-[#F5F7FA] rounded-2xl p-4 border border-gray-200 hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div className="text-[11px] font-bold text-gray-500 mb-1">
                    {formatDate(rel.published_at)}
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#0B2A4A] group-hover:text-brand-green line-clamp-2">
                    {rel.title_en}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
