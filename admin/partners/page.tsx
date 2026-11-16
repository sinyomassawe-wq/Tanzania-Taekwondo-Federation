import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import PartnersManagerClient from './PartnersManagerClient';

export default async function AdminPartnersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const partners = db.prepare('SELECT * FROM partners ORDER BY display_order ASC, name ASC').all() as any[];

  return <PartnersManagerClient initialPartners={partners} />;
}
