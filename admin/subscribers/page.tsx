import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import SubscribersClient from './SubscribersClient';

export const dynamic = 'force-dynamic';

export default async function AdminSubscribersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const subscribers = db
    .prepare('SELECT * FROM subscribers ORDER BY created_at DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
            Newsletter Subscribers & Broadcast
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage subscriber database, export contact lists, and dispatch official email circulars via SMTP.
          </p>
        </div>

        <a
          href="/api/admin/subscribers/export"
          download="ttf_subscribers.csv"
          className="px-4 py-2 bg-[#0B2A4A] hover:bg-brand-navy text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1"
        >
          <span>Export Subscribers (CSV)</span>
        </a>
      </div>

      <SubscribersClient initialSubscribers={subscribers} />
    </div>
  );
}
