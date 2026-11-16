'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Mail, ShieldCheck, CheckCircle, Clock, Trash2, Eye, User, Phone, MapPin } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  department: string;
  status: string;
  created_at: string;
}

interface Report {
  id: string;
  reference_number: string;
  category: string;
  description: string;
  incident_date?: string;
  incident_location?: string;
  parties_involved?: string;
  reporter_name?: string;
  reporter_contact?: string;
  is_anonymous: number;
  status: string;
  admin_notes?: string;
  created_at: string;
}

interface Props {
  initialContacts: Contact[];
  initialReports: Report[];
}

export default function InboxManagerClient({ initialContacts, initialReports }: Props) {
  const [tab, setTab] = useState<'inbox' | 'reports'>('inbox');
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleUpdateContactStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', id, status }),
      });
      if (res.ok) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleUpdateReportStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'report', id, status }),
      });
      if (res.ok) {
        setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        if (selectedReport && selectedReport.id === id) {
          setSelectedReport({ ...selectedReport, status });
        }
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex space-x-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setTab('inbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
            tab === 'inbox'
              ? 'bg-[#0B2A4A] text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>General Correspondence ({contacts.length})</span>
        </button>

        <button
          onClick={() => setTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
            tab === 'reports'
              ? 'bg-red-700 text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Confidential Integrity Reports ({reports.length})</span>
        </button>
      </div>

      {tab === 'inbox' ? (
        /* Contacts List */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0B2A4A] text-white font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">From</th>
                  <th className="py-3 px-3">Dept</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-center">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No contact messages.
                    </td>
                  </tr>
                ) : (
                  contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        <div>{c.name}</div>
                        <div className="text-[10px] text-gray-400 font-normal">{c.email}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-brand-green">
                        {c.department}
                      </td>
                      <td className="py-3 px-4 text-gray-800 max-w-xs truncate">
                        {c.subject}
                      </td>
                      <td className="py-3 px-3 text-gray-500">{formatDate(c.created_at)}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : c.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-brand-navy hover:text-white rounded text-[11px] font-bold"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Integrity Reports List */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-red-900 text-white font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-4">Incident Info</th>
                  <th className="py-3 px-3">Date Logged</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-center">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No integrity reports submitted.
                    </td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-red-900">
                        {r.reference_number}
                      </td>
                      <td className="py-3 px-3 font-semibold uppercase text-gray-800">
                        {r.category.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4 text-gray-700 max-w-sm truncate">
                        {r.description}
                      </td>
                      <td className="py-3 px-3 text-gray-500">{formatDate(r.created_at)}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'new'
                              ? 'bg-red-100 text-red-800'
                              : r.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedReport(r)}
                          className="px-2.5 py-1 bg-red-50 text-red-800 hover:bg-red-800 hover:text-white rounded text-[11px] font-bold"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <span className="text-[10px] font-bold text-brand-green uppercase">
                  {selectedContact.department} Department
                </span>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  {selectedContact.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 bg-gray-50 p-4 rounded-xl">
              <div><strong>Sender:</strong> {selectedContact.name} ({selectedContact.email})</div>
              {selectedContact.phone && <div><strong>Phone:</strong> {selectedContact.phone}</div>}
              <div><strong>Date:</strong> {formatDate(selectedContact.created_at)}</div>
            </div>

            <div className="text-xs text-gray-800 p-4 rounded-xl bg-gray-50 whitespace-pre-wrap leading-relaxed">
              {selectedContact.message}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleUpdateContactStatus(selectedContact.id, 'resolved')}
                className="flex-1 py-2 bg-brand-green text-white font-bold text-xs rounded-xl"
              >
                Mark as Resolved
              </button>
              <button
                onClick={() => handleUpdateContactStatus(selectedContact.id, 'read')}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Mark Read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase">
                  Confidential Whistleblower Vault
                </span>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  Case: {selectedReport.reference_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-1.5 bg-red-50 p-4 rounded-xl border border-red-100 text-red-950">
              <div><strong>Category:</strong> {selectedReport.category.replace('_', ' ')}</div>
              <div><strong>Incident Date:</strong> {selectedReport.incident_date || 'Unspecified'}</div>
              <div><strong>Location:</strong> {selectedReport.incident_location || 'Unspecified'}</div>
              <div><strong>Parties Involved:</strong> {selectedReport.parties_involved || 'See description'}</div>
              <div><strong>Reporter Identity:</strong> {selectedReport.is_anonymous ? 'Anonymous Whistleblower' : `${selectedReport.reporter_name} (${selectedReport.reporter_contact})`}</div>
            </div>

            <div className="text-xs text-gray-800 p-4 rounded-xl bg-gray-50 whitespace-pre-wrap leading-relaxed border">
              <strong className="block text-gray-900 mb-1">Incident Statement:</strong>
              {selectedReport.description}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleUpdateReportStatus(selectedReport.id, 'resolved')}
                className="flex-1 py-2 bg-brand-green text-white font-bold text-xs rounded-xl"
              >
                Mark Investigation Resolved
              </button>
              <button
                onClick={() => handleUpdateReportStatus(selectedReport.id, 'under_review')}
                className="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl"
              >
                Under Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
