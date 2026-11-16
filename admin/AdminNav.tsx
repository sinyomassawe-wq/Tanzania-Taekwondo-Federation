'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCheck,
  Newspaper,
  Calendar,
  Trophy,
  Users,
  Building,
  GraduationCap,
  ShieldCheck,
  FileText,
  Camera,
  Handshake,
  Sliders,
  Mail,
  Send,
  Settings,
  History,
  Database,
} from 'lucide-react';

interface Props {
  userRole: string;
}

export default function AdminNav({ userRole }: Props) {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Memberships & Cards', href: '/admin/memberships', icon: UserCheck },
    { label: 'News Articles', href: '/admin/news', icon: Newspaper },
    { label: 'Competitions Calendar', href: '/admin/events', icon: Calendar },
    { label: 'Results & Records', href: '/admin/results', icon: Trophy },
    { label: 'Rankings & CSV', href: '/admin/rankings', icon: Trophy },
    { label: 'Athletes Directory', href: '/admin/athletes', icon: Users },
    { label: 'Clubs Directory', href: '/admin/clubs', icon: Building },
    { label: 'Executive & Officials', href: '/admin/officials', icon: GraduationCap },
    { label: 'Documents & Circulars', href: '/admin/documents', icon: FileText },
    { label: 'Photo/Video Gallery', href: '/admin/gallery', icon: Camera },
    { label: 'Partners & Sponsors', href: '/admin/partners', icon: Handshake },
    { label: 'Hero Slides', href: '/admin/slides', icon: Sliders },
    { label: 'Inbox & Whistleblower', href: '/admin/inbox', icon: Mail },
    { label: 'Newsletter Subscribers', href: '/admin/subscribers', icon: Send },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: History },
    { label: 'Database Backup', href: '/admin/backup', icon: Database },
  ];

  return (
    <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin text-xs">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
              isActive
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-[#143B63]'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
