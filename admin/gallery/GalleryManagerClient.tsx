'use client';

import React, { useState } from 'react';
import { Camera, Plus, Trash2, Edit3, Image as ImageIcon, Video, Upload } from 'lucide-react';

interface GalleryItem {
  id: string;
  title_en: string;
  title_sw: string;
  album_name: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  event_date: string;
  is_featured: number;
}

interface Props {
  initialItems: GalleryItem[];
}

export default function GalleryManagerClient({ initialItems }: Props) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'gallery');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditingItem((prev) => ({
          ...prev,
          media_url: data.url,
          thumbnail_url: data.url,
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title_en || !editingItem?.media_url) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/gallery');
        const data = await fetchRes.json();
        if (data.items) setItems(data.items);
        setEditingItem(null);
      } else {
        alert('Failed to save gallery item.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete media item "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      } else {
        alert('Failed to delete item.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Photo & Video Gallery</h1>
          <p className="text-gray-500 text-xs">
            Manage tournament albums, action photos, seminars, and official video embeds.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingItem({
              title_en: '',
              title_sw: '',
              album_name: 'National Championships',
              media_type: 'photo',
              media_url: '',
              thumbnail_url: '',
              event_date: new Date().toISOString().split('T')[0],
              is_featured: 0,
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Item</span>
        </button>
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingItem.id ? 'Edit Media Entry' : 'Add Media to Gallery'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title_en || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Title (Swahili) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title_sw || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title_sw: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Album / Event Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanzania Open 2025"
                    value={editingItem.album_name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, album_name: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Media Type</label>
                  <select
                    value={editingItem.media_type || 'photo'}
                    onChange={(e) => setEditingItem({ ...editingItem, media_type: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="photo">Photo / Image</option>
                    <option value="video">Video (YouTube / MP4)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-100"
                />
                {uploading && <span className="text-brand-blue font-bold ml-2">Uploading...</span>}
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Media URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://... or /uploads/gallery/..."
                  value={editingItem.media_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, media_url: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Event Date</label>
                  <input
                    type="date"
                    value={editingItem.event_date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, event_date: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_featured === 1}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, is_featured: e.target.checked ? 1 : 0 })
                      }
                      className="w-4 h-4 text-brand-green rounded"
                    />
                    <span className="font-bold text-[#0B2A4A]">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative h-44 bg-gray-100">
              <img
                src={item.thumbnail_url || item.media_url}
                alt={item.title_en}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/ttf-logo.png';
                }}
              />
              <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                {item.album_name}
              </span>
              {item.is_featured === 1 && (
                <span className="absolute top-2 right-2 bg-brand-gold text-slate-900 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                  Featured
                </span>
              )}
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-display font-bold text-sm text-[#0B2A4A] truncate">{item.title_en}</h3>
              <p className="text-[11px] text-gray-500 italic truncate">{item.title_sw}</p>
              <span className="text-[10px] text-gray-400 font-mono block">{item.event_date}</span>
            </div>

            <div className="p-4 pt-0 flex justify-between items-center text-xs border-t border-gray-50">
              <button
                onClick={() => setEditingItem(item)}
                className="text-brand-blue font-bold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title_en)}
                className="text-red-500 font-bold hover:underline"
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
