import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import GalleryManagerClient from './GalleryManagerClient';

export default async function AdminGalleryPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const items = db.prepare('SELECT * FROM gallery ORDER BY event_date DESC, id DESC').all() as any[];

  return <GalleryManagerClient initialItems={items} />;
}
