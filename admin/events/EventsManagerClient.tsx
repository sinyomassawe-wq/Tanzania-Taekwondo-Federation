'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { PlusCircle, Edit3, Trash2, Calendar, MapPin, Eye } from 'lucide-react';

interface EventItem {
  id: string;
  slug: string;
  title_en: string;
  title_sw: string;
  event_type: string;
  start_date: string;
  end_date?: string;
  venue_name: string;
  venue_address?: string;
  map_url?: string;
  description_en?: string;
  description_sw?: string;
  schedule_details?: string;
  categories_weights?: string;
  reg_deadline?: string;
  contact_person?: string;
  contact_phone?: string;
  contact_email?: string;
  invitation_pdf_url?: string;
}

interface Props {
  initialEvents: EventItem[];
}

export default function EventsManagerClient({ initialEvents }: Props) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title_en: '',
    title_sw: '',
    event_type: 'National Championship',
    start_date: '',
    end_date: '',
    venue_name: '',
    venue_address: '',
    map_url: '',
    description_en: '',
    description_sw: '',
    schedule_details: '',
    categories_weights: '',
    reg_deadline: '',
    contact_person: '',
    contact_phone: '',
    contact_email: '',
    invitation_pdf_url: '',
  });

  const handleOpenNew = () => {
    setFormData({
      id: '',
      title_en: '',
      title_sw: '',
      event_type: 'National Championship',
      start_date: '',
      end_date: '',
      venue_name: '',
      venue_address: '',
      map_url: '',
      description_en: '',
      description_sw: '',
      schedule_details: '',
      categories_weights: '',
      reg_deadline: '',
      contact_person: '[TTF Tournament Director]',
      contact_phone: '[+255 7XX XXX XXX]',
      contact_email: 'competitions@ttf.or.tz',
      invitation_pdf_url: '',
    });
    setIsEditing(true);
  };

  const handleEdit = (evt: EventItem) => {
    setFormData({
      id: evt.id,
      title_en: evt.title_en,
      title_sw: evt.title_sw,
      event_type: evt.event_type,
      start_date: evt.start_date,
      end_date: evt.end_date || '',
      venue_name: evt.venue_name,
      venue_address: evt.venue_address || '',
      map_url: evt.map_url || '',
      description_en: evt.description_en || '',
      description_sw: evt.description_sw || '',
      schedule_details: evt.schedule_details || '',
      categories_weights: evt.categories_weights || '',
      reg_deadline: evt.reg_deadline || '',
      contact_person: evt.contact_person || '',
      contact_phone: evt.contact_phone || '',
      contact_email: evt.contact_email || '',
      invitation_pdf_url: evt.invitation_pdf_url || '',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        if (formData.id) {
          setEvents((prev) =>
            prev.map((evt) => (evt.id === formData.id ? { ...evt, ...formData } : evt))
          );
        } else {
          setEvents([...events, data.event]);
        }
        setIsEditing(false);
      } else {
        alert(data.error || 'Failed to save event');
      }
    } catch (e) {
      alert('Network error saving event');
    }
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-semibold">
              Showing {events.length} scheduled event{events.length === 1 ? '' : 's'}
            </span>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0B2A4A] text-white font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">Venue</th>
                    <th className="py-3 px-3">Deadline</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        <div>{evt.title_en}</div>
                        <div className="text-[10px] text-gray-400 font-normal">
                          SW: {evt.title_sw}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-brand-blue border border-blue-200">
                          {evt.event_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-semibold">
                        {formatDate(evt.start_date)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{evt.venue_name}</td>
                      <td className="py-3 px-3 text-amber-700">
                        {evt.reg_deadline ? formatDate(evt.reg_deadline) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(evt)}
                            className="p-1.5 text-brand-blue hover:bg-blue-50 rounded"
                            title="Edit Event"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <a
                            href={`/competitions/${evt.slug}`}
                            target="_blank"
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(evt.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete Event"
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
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="font-display font-bold text-xl text-[#0B2A4A]">
              {formData.id ? 'Edit Event Details' : 'Create New Competition Event'}
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
                <label className="block font-bold text-gray-700 mb-1">
                  Event Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="e.g. Tanzania National Taekwondo Championship 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Kichwa cha Tukio (Swahili) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_sw}
                  onChange={(e) => setFormData({ ...formData, title_sw: e.target.value })}
                  placeholder="e.g. Mashindano ya Taifa ya Taekwondo 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Event Type *</label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white outline-none font-semibold"
                >
                  <option value="National Championship">National Championship</option>
                  <option value="Regional">Regional</option>
                  <option value="Poomsae">Poomsae</option>
                  <option value="Para">Para</option>
                  <option value="Kyorugi">Kyorugi</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Venue Name *</label>
                <input
                  type="text"
                  required
                  value={formData.venue_name}
                  onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
                  placeholder="e.g. Benjamin Mkapa Indoor Arena"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Venue Address</label>
                <input
                  type="text"
                  value={formData.venue_address}
                  onChange={(e) => setFormData({ ...formData, venue_address: e.target.value })}
                  placeholder="Street, City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Registration Deadline</label>
                <input
                  type="date"
                  value={formData.reg_deadline}
                  onChange={(e) => setFormData({ ...formData, reg_deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Maelezo (Swahili)
                </label>
                <textarea
                  rows={3}
                  value={formData.description_sw}
                  onChange={(e) => setFormData({ ...formData, description_sw: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Schedule Details
                </label>
                <textarea
                  rows={2}
                  value={formData.schedule_details}
                  onChange={(e) => setFormData({ ...formData, schedule_details: e.target.value })}
                  placeholder="Day 1: Weigh-ins | Day 2: Preliminaries..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Categories & Weight Divisions
                </label>
                <textarea
                  rows={2}
                  value={formData.categories_weights}
                  onChange={(e) => setFormData({ ...formData, categories_weights: e.target.value })}
                  placeholder="Cadet, Junior, Senior -58kg, -68kg..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors"
              >
                Save Event
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
