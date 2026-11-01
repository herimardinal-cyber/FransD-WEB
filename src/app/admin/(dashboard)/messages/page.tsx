import prisma from '@/lib/prisma';
import MessagesManager from '@/components/admin/MessagesManager';

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#222]">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
          Client Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
          Inquiries & Correspondence ({messages.length})
        </h1>
      </div>

      <MessagesManager
        initialMessages={messages.map((m) => ({
          ...m,
          status: m.status as 'UNREAD' | 'READ' | 'ARCHIVED' | 'SPAM',
        }))}
      />
    </div>
  );
}

