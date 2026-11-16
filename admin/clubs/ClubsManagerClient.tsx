'use client';

import React, { useState } from 'react';
import { Building, Plus, Trash2, Edit3, MapPin, Phone, Mail, CheckCircle, ExternalLink } from 'lucide-react';
import { TANZANIAN_REGIONS } from '@/lib/constants';

interface Club {
  id: string;
  name: string;
  region: string;
  district: string;
  head_instructor: string;
  phone: string;
  email: string;
  address: string;
  training_days_en: string;
  training_days_sw: string;
  training_times: string;
  map_url: string;
  status: string;
}

interface Props {
  initialClubs: Club[];
}

export default function ClubsManagerClient({ initialClubs }: Props) {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [filterRegion, setFilterRegion] = useState('all');
  const [editingClub, setEditingClub] = useState<Partial<Club> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = clubs.filter(
    (c) => filterRegion === 'all' || c.region.toLowerCase() === filterRegion.toLowerCase()
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClub?.name || !editingClub?.region) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingClub),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/clubs');
        const data = await fetchRes.json();
        if (data.clubs) setClubs(data.clubs);
        setEditingClub(null);
      } else {
        alert('Failed to save club.');
      }
    } catch (e) {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove club "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/clubs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setClubs(clubs.filter((c) => c.id !== id));
      } else {
        alert('Failed to delete club.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Affiliated Clubs Directory</h1>
          <p className="text-gray-500 text-xs">
            Manage recognized Tanzanian dojangs, regional dojos, coaching staff, and training sessions.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingClub({
              name: '',
              region: 'Dar es Salaam',
              district: '',
              head_instructor: '',
              phone: '',
              email: '',
              address: '',
              training_days_en: 'Mon, Wed, Fri',
              training_days_sw: 'Jumatatu, Jumatano, Ijumaa',
              training_times: '17:00 - 19:30',
              map_url: '',
              status: 'active',
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Affiliated Club</span>
        </button>
      </div>

      {/* Region Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-[#0B2A4A]">Filter by Region:</span>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="all">All Regions ({clubs.length})</option>
          {TANZANIAN_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-400 ml-auto">Showing {filtered.length} clubs</span>
      </div>

      {/* Editor Modal */}
      {editingClub && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-lg font-display font-black text-[#0B2A4A]">
                {editingClub.id ? 'Edit Club Details' : 'Register New Club'}
              </h2>
              <button
                onClick={() => setEditingClub(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Club / Dojang Name *</label>
                  <input
                    type="text"
                    required
                    value={editingClub.name || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Region *</label>
                  <select
                    value={editingClub.region || 'Dar es Salaam'}
                    onChange={(e) => setEditingClub({ ...editingClub, region: e.target.value })}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">District / Sub-city</label>
                  <input
                    type="text"
                    value={editingClub.district || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, district: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Head Instructor</label>
                  <input
                    type="text"
                    value={editingClub.head_instructor || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, head_instructor: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingClub.phone || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingClub.email || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Physical Dojo Address / Facility</label>
                <input
                  type="text"
                  value={editingClub.address || ''}
                  onChange={(e) => setEditingClub({ ...editingClub, address: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Training Days (EN)</label>
                  <input
                    type="text"
                    value={editingClub.training_days_en || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, training_days_en: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Training Days (SW)</label>
                  <input
                    type="text"
                    value={editingClub.training_days_sw || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, training_days_sw: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Training Times</label>
                  <input
                    type="text"
                    value={editingClub.training_times || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, training_times: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Affiliation Status</label>
                  <select
                    value={editingClub.status || 'active'}
                    onChange={(e) => setEditingClub({ ...editingClub, status: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold"
                  >
                    <option value="active">Active & In Good Standing</option>
                    <option value="pending">Pending Review / Renewal</option>
                    <option value="inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Google Maps / Location Link</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={editingClub.map_url || ''}
                  onChange={(e) => setEditingClub({ ...editingClub, map_url: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingClub(null)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((club) => (
          <div
            key={club.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue">
                    {club.region}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#0B2A4A] mt-1">{club.name}</h3>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    club.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {club.status}
                </span>
              </div>

              <div className="space-y-1.5 mt-3 text-gray-600 text-xs">
                <p className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{club.address || club.district || club.region}</span>
                </p>
                {club.head_instructor && (
                  <p className="text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-700">Coach:</span> {club.head_instructor}
                  </p>
                )}
                {club.phone && (
                  <p className="flex items-center space-x-1.5 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{club.phone}</span>
                  </p>
                )}
                {club.training_times && (
                  <p className="text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-700">Schedule:</span> {club.training_days_en} ({club.training_times})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <button
                onClick={() => setEditingClub(club)}
                className="inline-flex items-center space-x-1 text-brand-blue hover:text-blue-700 font-bold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(club.id, club.name)}
                className="inline-flex items-center space-x-1 text-red-500 hover:text-red-700 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
