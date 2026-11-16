'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Send, Mail, Users, CheckCircle, Trash2 } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  created_at: string;
}

interface Props {
  initialSubscribers: Subscriber[];
}

export default function SubscribersClient({ initialSubscribers }: Props) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) return;

    if (!confirm(`Dispatch newsletter broadcast to ${subscribers.length} subscribers?`)) return;

    setSending(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg(`Newsletter broadcast dispatched successfully to ${data.sentCount} subscribers.`);
        setSubject('');
        setBody('');
      } else {
        setStatusMsg(`Error: ${data.error || 'Failed to dispatch'}`);
      }
    } catch (e) {
      setStatusMsg('Network error while dispatching broadcast');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Broadcast Compose Form (5 cols) */}
      <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider block mb-1">
            Bulk Emailer
          </span>
          <h2 className="font-display font-bold text-lg text-[#0B2A4A]">
            Send Newsletter to Subscribers
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Dispatches to all active verified subscribers via configured SMTP.
          </p>
        </div>

        <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Subject Line *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. TTF Monthly Circular - National Championships"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Message Body (HTML supported) *</label>
            <textarea
              rows={6}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="<p>Dear Taekwondo enthusiasts,</p><p>We are pleased to announce...</p>"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? 'Sending Broadcast...' : `Send to ${subscribers.length} Subscribers`}</span>
          </button>

          {statusMsg && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-semibold">
              {statusMsg}
            </div>
          )}
        </form>
      </div>

      {/* Subscriber List (7 cols) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h2 className="font-display font-bold text-lg text-[#0B2A4A]">
            Subscribers Database ({subscribers.length})
          </h2>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{s.email}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-brand-green">
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
