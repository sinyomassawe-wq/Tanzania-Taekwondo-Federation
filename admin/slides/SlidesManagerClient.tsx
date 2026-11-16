'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Trash2, Edit3, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface Slide {
  id: string;
  title_en: string;
  title_sw: string;
  subtitle_en: string;
  subtitle_sw: string;
  cta_text_en: string;
  cta_text_sw: string;
  cta_url: string;
  image_url: string;
  display_order: number;
  is_active: number;
}

interface Props {
  initialSlides: Slide[];
}

export default function SlidesManagerClient({ initialSlides }: Props) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [editingSlide, setEditingSlide] = useState<Partial<Slide> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide?.title_en || !editingSlide?.title_sw) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSlide),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/slides');
        const data = await fetchRes.json();
        if (data.slides) setSlides(data.slides);
        setEditingSlide(null);
      } else {
        alert('Failed to save slide.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete hero slide "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/slides?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSlides(slides.filter((s) => s.id !== id));
      } else {
        alert('Failed to delete slide.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Homepage Hero Slides</h1>
          <p className="text-gray-500 text-xs">
            Manage the dynamic showcase banners on the homepage, calls to action, headlines, and visuals.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingSlide({
              title_en: '',
              title_sw: '',
              subtitle_en: '',
              subtitle_sw: '',
              cta_text_en: 'Explore More',
              cta_text_sw: 'Chunguza Zaidi',
              cta_url: '/membership',
              image_url: '/assets/images/ttf-logo.png',
              display_order: slides.length + 1,
              is_active: 1,
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hero Slide</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingSlide.id ? 'Edit Hero Banner' : 'Create Hero Banner'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Headline (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.title_en || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title_en: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Headline (Swahili) *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.title_sw || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title_sw: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Subtitle / Summary (EN)</label>
                  <textarea
                    rows={2}
                    value={editingSlide.subtitle_en || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle_en: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Subtitle / Summary (SW)</label>
                  <textarea
                    rows={2}
                    value={editingSlide.subtitle_sw || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle_sw: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Button Text (EN)</label>
                  <input
                    type="text"
                    value={editingSlide.cta_text_en || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, cta_text_en: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Button Text (SW)</label>
                  <input
                    type="text"
                    value={editingSlide.cta_text_sw || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, cta_text_sw: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Button Link URL</label>
                  <input
                    type="text"
                    placeholder="/membership or /competitions"
                    value={editingSlide.cta_url || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, cta_url: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Background Image URL</label>
                <input
                  type="text"
                  placeholder="https://... or /assets/images/..."
                  value={editingSlide.image_url || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Slide Order</label>
                  <input
                    type="number"
                    value={editingSlide.display_order || 0}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, display_order: parseInt(e.target.value, 10) })
                    }
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSlide.is_active === 1}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, is_active: e.target.checked ? 1 : 0 })
                      }
                      className="w-4 h-4 text-brand-green rounded"
                    />
                    <span className="font-bold text-[#0B2A4A]">Active & Visible</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {slides.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Order #{s.display_order}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    s.is_active === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s.is_active === 1 ? 'Active' : 'Hidden'}
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-[#0B2A4A]">{s.title_en}</h3>
              <p className="text-xs text-gray-500 italic">{s.title_sw}</p>
              {s.cta_url && (
                <p className="text-[11px] text-brand-blue font-mono">
                  CTA: {s.cta_text_en} ({s.cta_url})
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setEditingSlide(s)}
                className="px-3 py-1.5 bg-blue-50 text-brand-blue rounded-xl font-bold text-xs hover:bg-blue-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id, s.title_en)}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
