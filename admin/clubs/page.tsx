import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import ClubsManagerClient from './ClubsManagerClient';

export default async function AdminClubsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const clubs = db.prepare('SELECT * FROM clubs ORDER BY region ASC, name ASC').all() as any[];

  return <ClubsManagerClient initialClubs={clubs} />;
}
