'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { PlusCircle, Edit3, Trash2, Calendar, User, Search, Eye } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  category: string;
  title_en: string;
  title_sw: string;
  summary_en?: string;
  summary_sw?: string;
  content_en: string;
  content_sw: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  is_featured: number;
}

interface Props {
  initialArticles: Article[];
}

export default function NewsEditorClient({ initialArticles }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    category: 'Federation News',
    title_en: '',
    title_sw: '',
    summary_en: '',
    summary_sw: '',
    content_en: '',
    content_sw: '',
    image_url: '',
    author: 'TTF Media',
    is_featured: 0,
  });

  const categories = [
    'Federation News',
    'Competitions',
    'Athletes',
    'Development',
    'Referees and Coaches',
    'Para Taekwondo',
    'Anti-doping and Integrity',
  ];

  const handleOpenNew = () => {
    setSelectedArticle(null);
    setFormData({
      id: '',
      category: 'Federation News',
      title_en: '',
      title_sw: '',
      summary_en: '',
      summary_sw: '',
      content_en: '',
      content_sw: '',
      image_url: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop',
      author: 'TTF Media Desk',
      is_featured: 0,
    });
    setIsEditing(true);
  };

  const handleEdit = (art: Article) => {
    setSelectedArticle(art);
    setFormData({
      id: art.id,
      category: art.category,
      title_en: art.title_en,
      title_sw: art.title_sw,
      summary_en: art.summary_en || '',
      summary_sw: art.summary_sw || '',
      content_en: art.content_en,
      content_sw: art.content_sw,
      image_url: art.image_url || '',
      author: art.author || 'TTF Media',
      is_featured: art.is_featured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (formData.id) {
          setArticles((prev) =>
            prev.map((a) => (a.id === formData.id ? { ...a, ...formData } : a))
          );
        } else {
          setArticles([data.article, ...articles]);
        }
        setIsEditing(false);
      } else {
        alert(data.error || 'Failed to save article');
      }
    } catch (e) {
      alert('Network error saving article');
    }
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-semibold">
              Showing {articles.length} published article{articles.length === 1 ? '' : 's'}
            </span>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0B2A4A] text-white font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Title (English)</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Author</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900 max-w-sm">
                        <div className="truncate">{art.title_en}</div>
                        <div className="text-[10px] text-gray-400 font-normal truncate">
                          SW: {art.title_sw}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-brand-green border border-green-200">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {formatDate(art.published_at)}
                      </td>
                      <td className="py-3 px-3 text-gray-500">{art.author || 'TTF'}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(art)}
                            className="p-1.5 text-brand-blue hover:bg-blue-50 rounded"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <a
                            href={`/news/${art.slug}`}
                            target="_blank"
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(art.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Edit / Create Form */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="font-display font-bold text-xl text-[#0B2A4A]">
              {formData.id ? 'Edit News Article' : 'Write New Article'}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white font-semibold outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Author / Bylines</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Headline (English) *
              </label>
              <input
                type="text"
                required
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                placeholder="English headline"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Kichwa cha Habari (Swahili / Kiswahili) *
              </label>
              <input
                type="text"
                required
                value={formData.title_sw}
                onChange={(e) => setFormData({ ...formData, title_sw: e.target.value })}
                placeholder="Kichwa cha habari kwa Kiswahili"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Summary Excerpt (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.summary_en}
                  onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Muhtasari (Kiswahili)
                </label>
                <textarea
                  rows={2}
                  value={formData.summary_sw}
                  onChange={(e) => setFormData({ ...formData, summary_sw: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/... or /uploads/news/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Full Content Body (English HTML) *
              </label>
              <textarea
                rows={6}
                required
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                placeholder="<p>Full article paragraph here...</p>"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Habari Kamili (Kiswahili HTML) *
              </label>
              <textarea
                rows={6}
                required
                value={formData.content_sw}
                onChange={(e) => setFormData({ ...formData, content_sw: e.target.value })}
                placeholder="<p>Aya ya makala kamili kwa Kiswahili...</p>"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-xs outline-none"
              />
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors"
              >
                Save & Publish Article
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
