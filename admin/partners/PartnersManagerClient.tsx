'use client';

import React, { useState } from 'react';
import { Handshake, Plus, Trash2, Edit3, ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  tier: string;
  logo_url: string;
  website_url: string;
  display_order: number;
}

interface Props {
  initialPartners: Partner[];
}

export default function PartnersManagerClient({ initialPartners }: Props) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner?.name) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPartner),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/partners');
        const data = await fetchRes.json();
        if (data.partners) setPartners(data.partners);
        setEditingPartner(null);
      } else {
        alert('Failed to save partner.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete partner "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPartners(partners.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete partner.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Partners & Sponsors</h1>
          <p className="text-gray-500 text-xs">
            Manage institutional partners, technical suppliers, official sponsors, and media partners.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingPartner({
              name: '',
              tier: 'Official Partner',
              logo_url: '',
              website_url: '',
              display_order: partners.length + 1,
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingPartner.id ? 'Edit Partner' : 'Add New Partner'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-bold mb-1">Partner Organization Name *</label>
                <input
                  type="text"
                  required
                  value={editingPartner.name || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Sponsorship Tier *</label>
                <select
                  value={editingPartner.tier || 'Official Partner'}
                  onChange={(e) => setEditingPartner({ ...editingPartner, tier: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                >
                  <option value="Institutional Partner">Institutional Partner</option>
                  <option value="Principal Partner">Principal Partner</option>
                  <option value="Official Partner">Official Partner</option>
                  <option value="Technical Supplier">Technical Supplier</option>
                  <option value="Media Partner">Media Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Logo Image URL</label>
                <input
                  type="text"
                  placeholder="/assets/images/... or https://..."
                  value={editingPartner.logo_url || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, logo_url: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Website URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingPartner.website_url || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, website_url: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Sort Order</label>
                <input
                  type="number"
                  value={editingPartner.display_order || 0}
                  onChange={(e) =>
                    setEditingPartner({ ...editingPartner, display_order: parseInt(e.target.value, 10) })
                  }
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partners List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue">
                {p.tier}
              </span>
              <h3 className="font-display font-bold text-sm text-[#0B2A4A] mt-2">{p.name}</h3>
              {p.website_url && (
                <a
                  href={p.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-gray-400 hover:text-brand-blue flex items-center space-x-1 mt-1"
                >
                  <span className="truncate">{p.website_url}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-[10px] text-gray-400 font-mono">Order: #{p.display_order}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingPartner(p)}
                  className="text-brand-blue hover:text-blue-700 font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
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
