import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If not logged in, pass through children (so login page renders), or redirect in subpages
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B2A4A] text-white flex-shrink-0 flex flex-col justify-between border-r border-[#143B63]">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-[#143B63] flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center flex-shrink-0">
              <Image
                src="/assets/images/ttf-logo.png"
                alt="TTF Crest"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-white block leading-tight">
                TTF ADMIN
              </span>
              <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">
                Control Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <AdminNav userRole={user.role} />
        </div>

        {/* User Mini Bar in footer of sidebar */}
        <div className="p-4 border-t border-[#143B63] bg-[#081e36] text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-white block truncate">{user.username}</span>
              <span className="text-[10px] text-brand-green uppercase font-semibold">
                {user.role.replace('_', ' ')}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-[10px] text-gray-400 hover:text-white"
              title="View Public Site"
            >
              View Site ↗
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader user={user} />
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
