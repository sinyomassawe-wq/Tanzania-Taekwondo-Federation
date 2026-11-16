import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import MembershipManagerClient from './MembershipManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminMembershipsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const db = getDb();
  const memberships = db
    .prepare('SELECT * FROM memberships ORDER BY created_at DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
            Membership Registry & Licensure
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review online athlete, coach, referee, and club applications, verify payments, approve licenses, and generate digital membership cards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/admin/memberships/export"
            download="ttf_memberships.csv"
            className="px-4 py-2 bg-[#0B2A4A] hover:bg-brand-navy text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1"
          >
            <span>Export Registry (CSV)</span>
          </a>
        </div>
      </div>

      <MembershipManagerClient initialMemberships={memberships} />
    </div>
  );
}
