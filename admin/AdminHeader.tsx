'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, ExternalLink, Shield } from 'lucide-react';

interface Props {
  user: {
    username: string;
    role: string;
    full_name?: string;
  };
}

export default function AdminHeader({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <span className="font-display font-bold text-sm text-[#0B2A4A]">
          Federation Management Portal
        </span>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-green-50 text-brand-green border border-green-200">
          {user.role.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs text-gray-600 hover:text-brand-green flex items-center space-x-1"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <span className="text-gray-300">|</span>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
