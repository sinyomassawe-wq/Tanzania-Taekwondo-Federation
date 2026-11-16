import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Database, Download, ShieldAlert, CheckCircle } from 'lucide-react';
import fs from 'node:fs';
import path from 'node:path';

export default async function AdminBackupPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  if (user.role !== 'admin' && user.role !== 'super_admin') {
    return (
      <div className="p-8 text-center text-sm text-red-600 bg-red-50 rounded-2xl border border-red-200">
        Access restricted. Only users with the Super Admin role can download database backups.
      </div>
    );
  }

  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'ttf.db');
  let dbSize = 'Unknown';
  let lastModified = 'Unknown';

  if (fs.existsSync(dbPath)) {
    const stats = fs.statSync(dbPath);
    dbSize = `${(stats.size / (1024 * 1024)).toFixed(2)} MB`;
    lastModified = new Date(stats.mtime).toLocaleString('en-GB');
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Database Backup & Disaster Recovery</h1>
        <p className="text-gray-500 text-xs">
          Export the complete, live SQLite database file containing all federation records, members, rankings, and audit logs.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">Production SQLite Database</h2>
            <p className="text-gray-500 text-xs mt-1">
              File path: <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-mono text-[11px]">{dbPath}</code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Current File Size</span>
            <span className="text-base font-bold text-[#0B2A4A] mt-1 block">{dbSize}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Last Written</span>
            <span className="text-base font-bold text-[#0B2A4A] mt-1 block">{lastModified}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start space-x-3 text-amber-900 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Security Note:</span> Database backups contain sensitive information including member contact details, national ID records, and salted credentials. Store backups in an encrypted, access-restricted offline location.
          </div>
        </div>

        <div className="pt-2">
          <a
            href="/api/admin/backup"
            download
            className="inline-flex items-center space-x-2 bg-[#0B2A4A] hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Database Snapshot (.db)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
