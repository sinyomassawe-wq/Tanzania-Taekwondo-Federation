import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import DocumentsManagerClient from './DocumentsManagerClient';

export default async function AdminDocumentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const db = getDb();
  const docs = db.prepare('SELECT * FROM documents ORDER BY created_at DESC').all() as any[];

  return <DocumentsManagerClient initialDocs={docs} />;
}
