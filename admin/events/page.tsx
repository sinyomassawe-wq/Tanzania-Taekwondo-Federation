import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import EventsManagerClient from './EventsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const events = db.prepare('SELECT * FROM events ORDER BY start_date ASC').all() as any[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
          Competitions & Events Calendar Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Create, schedule, and edit national championships, regional qualifiers, and seminar clinic outlines.
        </p>
      </div>

      <EventsManagerClient initialEvents={events} />
    </div>
  );
}
