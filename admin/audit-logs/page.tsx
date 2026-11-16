import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';
import { History, Shield, User, Clock, Terminal } from 'lucide-react';

export default async function AuditLogsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  if (user.role !== 'admin' && user.role !== 'super_admin') {
    return (
      <div className="p-8 text-center text-sm text-red-600 bg-red-50 rounded-2xl border border-red-200">
        Access restricted. Only users with the Super Admin role can inspect security audit logs.
      </div>
    );
  }

  const db = getDb();
  const logs = db
    .prepare(
      `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 150`
    )
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Security & System Audit Logs</h1>
          <p className="text-gray-500 text-xs">
            Immutable activity log tracking administrator actions, authentications, approvals, and content modifications.
          </p>
        </div>
        <div className="text-xs bg-white px-4 py-2 rounded-xl border border-gray-200 font-bold text-[#0B2A4A] shadow-sm">
          Showing {logs.length} Recent Records
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[#0B2A4A]">
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Timestamp</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">User</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Action</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Entity</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Target ID</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No audit records recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  let parsedDetails = '';
                  try {
                    parsedDetails = log.details ? JSON.stringify(JSON.parse(log.details), null, 2) : '-';
                  } catch (e) {
                    parsedDetails = log.details || '-';
                  }

                  const isAuth = log.action.includes('LOGIN') || log.action.includes('AUTH');
                  const isApprove = log.action.includes('APPROVE') || log.action.includes('SUCCESS');
                  const isReject = log.action.includes('REJECT') || log.action.includes('FAIL');

                  return (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-gray-500 text-[11px] whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString('en-GB')}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#0B2A4A] whitespace-nowrap">
                        {log.username || log.user_id || 'System'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                            isReject
                              ? 'bg-red-100 text-red-700'
                              : isApprove
                              ? 'bg-green-100 text-green-700'
                              : isAuth
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium whitespace-nowrap capitalize">
                        {log.entity_type}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-[11px] whitespace-nowrap">
                        {log.entity_id || '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                        <span title={parsedDetails} className="font-mono text-[11px] text-gray-500">
                          {parsedDetails}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
