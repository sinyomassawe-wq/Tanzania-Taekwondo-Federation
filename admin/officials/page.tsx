import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import OfficialsManagerClient from './OfficialsManagerClient';

export default async function AdminOfficialsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const officials = db.prepare('SELECT * FROM officials ORDER BY display_order ASC, name ASC').all() as any[];

  return <OfficialsManagerClient initialOfficials={officials} />;
}
