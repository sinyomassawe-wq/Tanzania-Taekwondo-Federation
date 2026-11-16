import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import AthletesManagerClient from './AthletesManagerClient';

export default async function AdminAthletesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const athletes = db.prepare('SELECT * FROM athletes ORDER BY full_name ASC').all() as any[];

  return <AthletesManagerClient initialAthletes={athletes} />;
}
