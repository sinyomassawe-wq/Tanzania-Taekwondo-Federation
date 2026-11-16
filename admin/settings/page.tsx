import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all() as any[];

  const settingsMap: Record<string, { en: string; sw: string }> = {};
  rows.forEach((r) => {
    settingsMap[r.key] = { en: r.value_en || '', sw: r.value_sw || '' };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
          Site & Organization Settings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage all federation contact details, mobile money merchant numbers, bank wire accounts, and official social links.
        </p>
      </div>

      <SettingsClient initialSettings={settingsMap} />
    </div>
  );
}
