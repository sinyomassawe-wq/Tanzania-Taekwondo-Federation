'use client';

import React, { useState } from 'react';
import { Users, Plus, Trash2, Edit3, Shield, Upload } from 'lucide-react';

interface Official {
  id: string;
  name: string;
  position_en: string;
  position_sw: string;
  category: string;
  commission_name: string;
  photo_url: string;
  display_order: number;
  bio_en: string;
  bio_sw: string;
}

interface Props {
  initialOfficials: Official[];
}

export default function OfficialsManagerClient({ initialOfficials }: Props) {
  const [officials, setOfficials] = useState<Official[]>(initialOfficials);
  const [editingOfficial, setEditingOfficial] = useState<Partial<Official> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'members');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditingOfficial((prev) => ({ ...prev, photo_url: data.url }));
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
    if (!editingOfficial?.name || !editingOfficial?.position_en) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/officials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingOfficial),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/officials');
        const data = await fetchRes.json();
        if (data.officials) setOfficials(data.officials);
        setEditingOfficial(null);
      } else {
        alert('Failed to save official.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete official "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/officials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOfficials(officials.filter((o) => o.id !== id));
      } else {
        alert('Failed to delete official.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Executive & Committee Officials</h1>
          <p className="text-gray-500 text-xs">
            Manage President, Vice President, Executive Board members, and technical commission chairpersons.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingOfficial({
              name: '',
              position_en: '',
              position_sw: '',
              category: 'Executive Committee',
              commission_name: '',
              photo_url: '',
              display_order: officials.length + 1,
              bio_en: '',
              bio_sw: '',
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Official</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingOfficial && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingOfficial.id ? 'Edit Official' : 'Add New Official'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. [TTF President name] or Real Name"
                  value={editingOfficial.name || ''}
                  onChange={(e) => setEditingOfficial({ ...editingOfficial, name: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Position (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingOfficial.position_en || ''}
                    onChange={(e) => setEditingOfficial({ ...editingOfficial, position_en: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Position (Swahili) *</label>
                  <input
                    type="text"
                    required
                    value={editingOfficial.position_sw || ''}
                    onChange={(e) => setEditingOfficial({ ...editingOfficial, position_sw: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Category *</label>
                  <select
                    value={editingOfficial.category || 'Executive Committee'}
                    onChange={(e) => setEditingOfficial({ ...editingOfficial, category: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="Executive Committee">Executive Committee</option>
                    <option value="Commission Chair">Commission / Committee Chair</option>
                    <option value="Secretariat">Secretariat</option>
                    <option value="Regional Leadership">Regional Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Commission Name (if applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. Referee, Technical, Safe Sport"
                    value={editingOfficial.commission_name || ''}
                    onChange={(e) => setEditingOfficial({ ...editingOfficial, commission_name: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Display Sort Order</label>
                  <input
                    type="number"
                    value={editingOfficial.display_order || 0}
                    onChange={(e) =>
                      setEditingOfficial({ ...editingOfficial, display_order: parseInt(e.target.value, 10) })
                    }
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Upload Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-100"
                  />
                  {uploading && <span className="text-brand-blue font-bold">Uploading...</span>}
                </div>
              </div>

              {editingOfficial.photo_url && (
                <div>
                  <span className="text-[11px] text-gray-400">Current Photo: {editingOfficial.photo_url}</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingOfficial(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Official
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Officials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {officials.map((o) => (
          <div key={o.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue">
                  {o.category}
                </span>
                <h3 className="font-display font-bold text-sm text-[#0B2A4A] mt-1">{o.name}</h3>
                <p className="text-xs font-semibold text-gray-600">{o.position_en}</p>
                <p className="text-[11px] text-gray-400 italic">{o.position_sw}</p>
                {o.commission_name && (
                  <p className="text-[11px] text-brand-green font-bold mt-1">
                    Commission: {o.commission_name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-[10px] text-gray-400 font-mono">Order: #{o.display_order}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingOfficial(o)}
                  className="text-brand-blue hover:text-blue-700 font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(o.id, o.name)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
