'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  ExternalLink,
  CreditCard,
  FileText,
  UserCheck,
} from 'lucide-react';

interface Member {
  id: string;
  type: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth?: string;
  national_id?: string;
  region: string;
  club_name?: string;
  belt_dan?: string;
  kukkiwon_number?: string;
  photo_url?: string;
  id_document_url?: string;
  certificate_url?: string;
  status: string;
  payment_status: string;
  notes?: string;
  created_at: string;
}

interface Props {
  initialMemberships: Member[];
}

export default function MembershipManagerClient({ initialMemberships }: Props) {
  const [members, setMembers] = useState<Member[]>(initialMemberships);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [activeModalMember, setActiveModalMember] = useState<Member | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await fetch('/api/admin/memberships/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: newStatus }),
      });

      if (res.ok) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  status: newStatus,
                  approved_at: newStatus === 'approved' ? new Date().toISOString() : undefined,
                }
              : m
          )
        );
        if (activeModalMember && activeModalMember.id === id) {
          setActiveModalMember({ ...activeModalMember, status: newStatus });
        }
      }
    } catch (e) {
      alert('Failed to update status');
    } finally {
      setLoadingId(null);
    }
  };

  const handlePaymentToggle = async (id: string, current: string) => {
    const nextVal = current === 'verified' ? 'unpaid' : 'verified';
    setLoadingId(id);
    try {
      const res = await fetch('/api/admin/memberships/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'payment', paymentStatus: nextVal }),
      });

      if (res.ok) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, payment_status: nextVal } : m))
        );
        if (activeModalMember && activeModalMember.id === id) {
          setActiveModalMember({ ...activeModalMember, payment_status: nextVal });
        }
      }
    } catch (e) {
      alert('Failed to update payment status');
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = members.filter((m) => {
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    const matchType = filterType === 'all' || m.type === filterType;
    const matchQuery =
      !query.trim() ||
      m.full_name.toLowerCase().includes(query.toLowerCase()) ||
      m.id.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase()) ||
      m.region.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchType && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, name, email, region..."
            className="w-full pl-10 pr-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-xl bg-white font-semibold outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-xl bg-white font-semibold outline-none"
          >
            <option value="all">All Types</option>
            <option value="athlete">Athlete</option>
            <option value="coach">Coach</option>
            <option value="referee">Referee</option>
            <option value="official">Official</option>
            <option value="supporter">Supporter</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B2A4A] text-white font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-4">Region & Club</th>
                <th className="py-3 px-3">Belt / Dan</th>
                <th className="py-3 px-3">Fee Status</th>
                <th className="py-3 px-3">Approval</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No applications matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">
                      {m.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div>{m.full_name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{m.email}</div>
                    </td>
                    <td className="py-3 px-3 uppercase font-semibold text-gray-700">
                      {m.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <div>{m.region}</div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                        {m.club_name || 'Individual'}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {m.belt_dan || '-'}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handlePaymentToggle(m.id, m.payment_status)}
                        disabled={loadingId === m.id}
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          m.payment_status === 'verified'
                            ? 'bg-green-50 text-brand-green border border-green-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                        title="Click to toggle payment verification"
                      >
                        {m.payment_status.toUpperCase()}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          m.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : m.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {m.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setActiveModalMember(m)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded text-[11px]"
                        >
                          Review
                        </button>
                        <Link
                          href={`/verify/${m.id}`}
                          target="_blank"
                          className="p-1 bg-blue-50 hover:bg-blue-100 text-brand-blue rounded"
                          title="Generate & View Printable Membership Card"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Application Review
                </span>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  {activeModalMember.full_name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalMember(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-400 block text-[10px]">MEMBER ID</span>
                  <strong className="font-mono text-gray-800">{activeModalMember.id}</strong>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-400 block text-[10px]">CATEGORY</span>
                  <strong className="uppercase text-gray-800">{activeModalMember.type}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 space-y-1">
                <div><strong>Email:</strong> {activeModalMember.email}</div>
                <div><strong>Phone:</strong> {activeModalMember.phone}</div>
                <div><strong>Region:</strong> {activeModalMember.region}</div>
                <div><strong>Club:</strong> {activeModalMember.club_name || 'None'}</div>
                <div><strong>Rank:</strong> {activeModalMember.belt_dan || 'None'}</div>
                <div><strong>Kukkiwon No:</strong> {activeModalMember.kukkiwon_number || 'N/A'}</div>
              </div>

              {/* Uploaded Documents */}
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                <span className="font-bold text-brand-navy block">Attached Credentials:</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {activeModalMember.photo_url ? (
                    <a
                      href={activeModalMember.photo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-white border rounded text-brand-blue font-bold flex items-center space-x-1"
                    >
                      <span>Photo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No Photo</span>
                  )}

                  {activeModalMember.id_document_url ? (
                    <a
                      href={activeModalMember.id_document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-white border rounded text-brand-blue font-bold flex items-center space-x-1"
                    >
                      <span>ID Document</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No ID File</span>
                  )}

                  {activeModalMember.certificate_url ? (
                    <a
                      href={activeModalMember.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-white border rounded text-brand-blue font-bold flex items-center space-x-1"
                    >
                      <span>Dan Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No Cert File</span>
                  )}
                </div>
              </div>
            </div>

            {/* Approval Decision Controls */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusChange(activeModalMember.id, 'approved')}
                disabled={loadingId === activeModalMember.id}
                className="flex-1 py-2.5 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve & Activate License</span>
              </button>

              <button
                onClick={() => handleStatusChange(activeModalMember.id, 'rejected')}
                disabled={loadingId === activeModalMember.id}
                className="py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>

              <Link
                href={`/verify/${activeModalMember.id}`}
                target="_blank"
                className="py-2.5 px-4 bg-[#0B2A4A] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
