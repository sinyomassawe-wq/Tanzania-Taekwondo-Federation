import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import {
  UserCheck,
  Mail,
  Calendar,
  Newspaper,
  Users,
  Building,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const db = getDb();

  // Dashboard KPI counts
  const pendingMembers = db
    .prepare("SELECT COUNT(*) as count FROM memberships WHERE status = 'pending'")
    .get() as any;

  const newMessages = db
    .prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'")
    .get() as any;

  const integrityReports = db
    .prepare("SELECT COUNT(*) as count FROM integrity_reports WHERE status = 'new'")
    .get() as any;

  const totalEvents = db
    .prepare('SELECT COUNT(*) as count FROM events')
    .get() as any;

  const totalNews = db
    .prepare('SELECT COUNT(*) as count FROM news')
    .get() as any;

  const totalAthletes = db
    .prepare('SELECT COUNT(*) as count FROM athletes')
    .get() as any;

  const totalClubs = db
    .prepare('SELECT COUNT(*) as count FROM clubs WHERE status = "active"')
    .get() as any;

  // Recent applications
  const recentApplications = db
    .prepare('SELECT * FROM memberships ORDER BY created_at DESC LIMIT 5')
    .all() as any[];

  // Recent audit logs
  const recentLogs = db
    .prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 6')
    .all() as any[];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
            Welcome back, {user.full_name || user.username}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
            Federation Administration Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            System Status: <strong>Operational</strong> • Database: <strong>Active (SQLite WAL)</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/memberships"
            className="px-4 py-2 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1"
          >
            <UserCheck className="w-4 h-4" />
            <span>Review Applications</span>
          </Link>
          <Link
            href="/admin/news"
            className="px-4 py-2 bg-[#0B2A4A] hover:bg-brand-navy text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1"
          >
            <Newspaper className="w-4 h-4" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/memberships"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Pending Applications</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#0B2A4A] mt-2 group-hover:text-amber-600 transition-colors">
            {pendingMembers?.count || 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Awaiting registrar review →</span>
        </Link>

        <Link
          href="/admin/inbox"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Unread Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#0B2A4A] mt-2 group-hover:text-brand-blue transition-colors">
            {newMessages?.count || 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Public messages in inbox →</span>
        </Link>

        <Link
          href="/admin/inbox"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Integrity Vault</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#0B2A4A] mt-2 group-hover:text-red-600 transition-colors">
            {integrityReports?.count || 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Confidential whistleblower cases →</span>
        </Link>

        <Link
          href="/admin/athletes"
          className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Licensed Athletes</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#0B2A4A] mt-2 group-hover:text-brand-green transition-colors">
            {totalAthletes?.count || 0}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Ranked national competitors →</span>
        </Link>
      </div>

      {/* Main Grid: Pending Applications & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Applications (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-display font-bold text-lg text-[#0B2A4A]">
              Recent Membership Applications
            </h2>
            <Link
              href="/admin/memberships"
              className="text-xs font-bold text-brand-green hover:underline"
            >
              View All ({pendingMembers?.count || 0} Pending) →
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentApplications.map((app) => (
              <div key={app.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-gray-900">{app.full_name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'approved'
                          ? 'bg-green-50 text-green-700'
                          : app.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {app.type.toUpperCase()} • {app.region} • Ref: {app.id}
                  </span>
                </div>

                <Link
                  href="/admin/memberships"
                  className="px-3 py-1 bg-gray-100 hover:bg-brand-navy hover:text-white text-gray-700 text-xs font-bold rounded-lg transition-colors"
                >
                  Manage
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs Trail (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-display font-bold text-lg text-[#0B2A4A]">
              System Audit Trail
            </h2>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              Full Log →
            </Link>
          </div>

          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                  <span className="font-mono font-bold text-gray-600">{log.action}</span>
                  <span>{formatDate(log.created_at)}</span>
                </div>
                <p className="text-gray-700 font-medium truncate">{log.details}</p>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  IP: {log.ip_address}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
