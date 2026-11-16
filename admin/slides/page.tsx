import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import SlidesManagerClient from './SlidesManagerClient';

export default async function AdminSlidesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const slides = db.prepare('SELECT * FROM hero_slides ORDER BY display_order ASC').all() as any[];

  return <SlidesManagerClient initialSlides={slides} />;
}
