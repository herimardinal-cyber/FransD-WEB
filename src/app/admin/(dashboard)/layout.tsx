import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Studio Admin | Frans Delian',
  description: 'Frans Delian Photography Administration Portal',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getSessionAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  // Count unread inquiries
  const unreadMessagesCount = await prisma.contactMessage.count({
    where: { status: 'UNREAD' },
  }).catch(() => 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EFE9] flex flex-col lg:flex-row font-sans selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* Sidebar Nav */}
      <AdminNav user={admin} unreadMessagesCount={unreadMessagesCount} />

      {/* Main Content Pane */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="px-6 sm:px-10 py-6 border-t border-[#1C1C1C] text-center text-xs font-mono text-[#555] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Frans Delian Studio CMS • Phase 2 Production Node</span>
          <span>MySQL & Prisma Connected</span>
        </footer>
      </div>
    </div>
  );
}

