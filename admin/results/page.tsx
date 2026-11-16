import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import ResultsManagerClient from './ResultsManagerClient';

export default async function AdminResultsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const results = db.prepare('SELECT * FROM results ORDER BY year DESC, category ASC').all() as any[];
  const records = db.prepare('SELECT * FROM records ORDER BY year DESC, division ASC').all() as any[];

  return <ResultsManagerClient initialResults={results} initialRecords={records} />;
}
