'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Images,
  BookOpen,
  Calendar,
  Mail,
  User,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
} from 'lucide-react';

interface AdminNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  unreadMessagesCount?: number;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Gallery', href: '/admin/gallery', icon: Images, createHref: '/admin/gallery/new' },
  { label: 'Stories', href: '/admin/stories', icon: BookOpen, createHref: '/admin/stories/new' },
  { label: 'Events', href: '/admin/events', icon: Calendar, createHref: '/admin/events/new' },
  { label: 'Inquiries', href: '/admin/messages', icon: Mail, badgeKey: 'messages' },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: Shield },
];

export default function AdminNav({ user, unreadMessagesCount = 0 }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#121212] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#A7A7A7] hover:text-[#F2EFE9] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <span className="font-serif text-lg tracking-tight text-[#F2EFE9] block leading-none">
              Frans Delian
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C6AA7B]">
              Admin Studio
            </span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="text-xs font-mono text-[#A7A7A7] hover:text-[#C6AA7B] flex items-center gap-1"
        >
          <span>View Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </header>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#101010] border-r border-[#222] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[#222]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
              Studio CMS v2.0
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-[#A7A7A7] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <Link href="/admin" className="block group">
            <h2 className="font-serif text-2xl tracking-tight text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors">
              Frans Delian
            </h2>
            <p className="text-[11px] font-mono text-[#717171] uppercase tracking-widest mt-0.5">
              Archive & Editorial
            </p>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <div key={item.href} className="flex items-center gap-1 group">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-none transition-all ${
                    isActive
                      ? 'bg-[#1C1A17] text-[#C6AA7B] border-l-2 border-[#C6AA7B] font-semibold'
                      : 'text-[#A7A7A7] hover:bg-[#161616] hover:text-[#F2EFE9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6AA7B]' : 'text-[#717171]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badgeKey === 'messages' && unreadMessagesCount > 0 && (
                    <span className="bg-[#C6AA7B] text-[#080808] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {unreadMessagesCount}
                    </span>
                  )}
                </Link>

                {item.createHref && (
                  <Link
                    href={item.createHref}
                    title={`Create new ${item.label.toLowerCase()}`}
                    className="p-2 text-[#717171] hover:text-[#C6AA7B] hover:bg-[#161616] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#222] bg-[#0C0C0C]">
          <div className="mb-3 px-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#717171] block">
              Active Session
            </span>
            <div className="text-xs font-serif text-[#F2EFE9] truncate font-medium mt-0.5">
              {user.name}
            </div>
            <div className="text-[10px] font-mono text-[#A7A7A7] truncate">
              {user.email}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#1C1C1C]">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#A7A7A7] hover:text-[#F2EFE9] bg-[#161616] hover:bg-[#202020] transition-colors"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-red-400 hover:text-red-300 bg-[#161616] hover:bg-red-950/40 border border-transparent hover:border-red-900/60 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>{isLoggingOut ? '...' : 'Exit'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
}

