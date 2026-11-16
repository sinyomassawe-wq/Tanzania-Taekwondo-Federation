import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import NewsEditorClient from './NewsEditorClient';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const db = getDb();
  const articles = db
    .prepare('SELECT * FROM news ORDER BY published_at DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[#0B2A4A]">
          News & Press Releases Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Publish, edit, and organize bilingual articles in English and Swahili with rich text and featured images.
        </p>
      </div>

      <NewsEditorClient initialArticles={articles} />
    </div>
  );
}
