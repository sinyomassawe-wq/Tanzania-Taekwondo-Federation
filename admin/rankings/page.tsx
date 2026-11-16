import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import RankingsManagerClient from './RankingsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminRankingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const db = getDb();
  const athletes = db
    .prepare('SELECT * FROM athletes ORDER BY ranking_points DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
            National Rankings & Points Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update athlete seeding points, weight categories, and batch import/export rankings via standard CSV files.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/admin/rankings/export"
            download="ttf_rankings.csv"
            className="px-4 py-2 bg-[#0B2A4A] hover:bg-brand-navy text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1"
          >
            <span>Export Rankings (CSV)</span>
          </a>
        </div>
      </div>

      <RankingsManagerClient initialAthletes={athletes} />
    </div>
  );
}
