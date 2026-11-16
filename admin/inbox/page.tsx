import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import InboxManagerClient from './InboxManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminInboxPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all() as any[];
  const reports = db.prepare('SELECT * FROM integrity_reports ORDER BY created_at DESC').all() as any[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
          Inbox & Confidential Whistleblower Vault
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review public correspondence, department inquiries, and confidential ethical/anti-doping reports.
        </p>
      </div>

      <InboxManagerClient initialContacts={contacts} initialReports={reports} />
    </div>
  );
}
