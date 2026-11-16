'use client';

import React, { useState } from 'react';
import { Users, Plus, Trash2, Edit3, Shield, Star, Search, Upload } from 'lucide-react';
import { TANZANIAN_REGIONS } from '@/lib/constants';

interface Athlete {
  id: string;
  full_name: string;
  gender: string;
  category: string;
  weight_class: string;
  discipline: string;
  belt_dan: string;
  club_name: string;
  region: string;
  national_rank: number | null;
  ranking_points: number;
  titles_en: string;
  titles_sw: string;
  bio_en: string;
  bio_sw: string;
  photo_url: string;
  is_national_team: number;
}

interface Props {
  initialAthletes: Athlete[];
}

export default function AthletesManagerClient({ initialAthletes }: Props) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingAthlete, setEditingAthlete] = useState<Partial<Athlete> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const filtered = athletes.filter((a) => {
    const matchesSearch =
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.club_name && a.club_name.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || a.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

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
        setEditingAthlete((prev) => ({ ...prev, photo_url: data.url }));
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
    if (!editingAthlete?.full_name) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/athletes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAthlete),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/athletes');
        const data = await fetchRes.json();
        if (data.athletes) setAthletes(data.athletes);
        setEditingAthlete(null);
      } else {
        alert('Failed to save athlete.');
      }
    } catch (e) {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove athlete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/athletes?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAthletes(athletes.filter((a) => a.id !== id));
      } else {
        alert('Failed to delete athlete.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Athletes Directory</h1>
          <p className="text-gray-500 text-xs">
            Manage registered competitors, national team squad members, weight classes, and Dan grades.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingAthlete({
              full_name: '',
              gender: 'Male',
              category: 'Senior',
              weight_class: '-68kg',
              discipline: 'Kyorugi',
              belt_dan: '1st Dan',
              club_name: '',
              region: 'Dar es Salaam',
              national_rank: null,
              ranking_points: 0,
              titles_en: '',
              titles_sw: '',
              bio_en: '',
              bio_sw: '',
              photo_url: '',
              is_national_team: 0,
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Athlete</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search athlete or club..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 text-[#0B2A4A]"
        >
          <option value="all">All Categories</option>
          <option value="Senior">Senior</option>
          <option value="Junior">Junior</option>
          <option value="Cadet">Cadet</option>
          <option value="Para">Para</option>
        </select>
        <span className="text-xs text-gray-400">Total: {filtered.length} athletes</span>
      </div>

      {/* Editor Modal */}
      {editingAthlete && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-lg font-display font-black text-[#0B2A4A]">
                {editingAthlete.id ? 'Edit Athlete Profile' : 'Register New Athlete'}
              </h2>
              <button
                onClick={() => setEditingAthlete(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingAthlete.full_name || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, full_name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Gender *</label>
                  <select
                    value={editingAthlete.gender || 'Male'}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, gender: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Category *</label>
                  <select
                    value={editingAthlete.category || 'Senior'}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  >
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Cadet">Cadet</option>
                    <option value="Para">Para</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Discipline</label>
                  <select
                    value={editingAthlete.discipline || 'Kyorugi'}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, discipline: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  >
                    <option value="Kyorugi">Kyorugi (Sparring)</option>
                    <option value="Poomsae">Poomsae (Forms)</option>
                    <option value="Para-Kyorugi">Para Kyorugi (K44)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Weight Class *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. -68kg, -58kg, +80kg"
                    value={editingAthlete.weight_class || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, weight_class: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Dan / Belt Rank</label>
                  <input
                    type="text"
                    placeholder="e.g. 1st Dan, 2nd Dan"
                    value={editingAthlete.belt_dan || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, belt_dan: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Club / Academy</label>
                  <input
                    type="text"
                    value={editingAthlete.club_name || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, club_name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Region</label>
                  <select
                    value={editingAthlete.region || 'Dar es Salaam'}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, region: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  >
                    {TANZANIAN_REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">National Rank</label>
                  <input
                    type="number"
                    value={editingAthlete.national_rank || ''}
                    onChange={(e) =>
                      setEditingAthlete({
                        ...editingAthlete,
                        national_rank: e.target.value ? parseInt(e.target.value, 10) : null,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Ranking Points</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingAthlete.ranking_points || 0}
                    onChange={(e) =>
                      setEditingAthlete({ ...editingAthlete, ranking_points: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingAthlete.is_national_team === 1}
                      onChange={(e) =>
                        setEditingAthlete({ ...editingAthlete, is_national_team: e.target.checked ? 1 : 0 })
                      }
                      className="w-4 h-4 text-brand-green rounded"
                    />
                    <span className="font-bold text-[#0B2A4A]">National Team Squad</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Titles / Honors (EN)</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025 National Champion"
                    value={editingAthlete.titles_en || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, titles_en: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Titles / Honors (SW)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bingwa wa Kitaifa 2025"
                    value={editingAthlete.titles_sw || ''}
                    onChange={(e) => setEditingAthlete({ ...editingAthlete, titles_sw: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Photo Upload</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                  {uploading && <span className="text-brand-blue font-bold">Uploading...</span>}
                </div>
                {editingAthlete.photo_url && (
                  <p className="text-[11px] text-gray-500 mt-1 truncate">Current: {editingAthlete.photo_url}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingAthlete(null)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Athlete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[#0B2A4A]">
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Athlete</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Category</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Weight</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Dan Rank</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Club / Region</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Points</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#0B2A4A] flex-shrink-0">
                        {a.full_name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-[#0B2A4A] flex items-center space-x-1.5">
                          <span>{a.full_name}</span>
                          {a.is_national_team === 1 && (
                            <span className="bg-brand-gold/30 text-amber-900 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                              National Squad
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{a.gender}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-600">{a.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-brand-blue">{a.weight_class}</td>
                  <td className="py-3 px-4 font-semibold text-gray-700">{a.belt_dan || '-'}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <div>{a.club_name || '-'}</div>
                    <div className="text-[10px] text-gray-400">{a.region}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-brand-green">{a.ranking_points} pts</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingAthlete(a)}
                      className="text-brand-blue hover:text-blue-700 font-bold inline-flex items-center space-x-0.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(a.id, a.full_name)}
                      className="text-red-500 hover:text-red-700 font-bold inline-flex items-center space-x-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
