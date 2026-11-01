'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Trash2,
  CheckCircle,
  Archive,
  Send,
} from 'lucide-react';

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
  ipAddress?: string | null;
  status: 'UNREAD' | 'READ' | 'ARCHIVED' | 'SPAM';
  createdAt: string | Date;
}

export default function MessagesManager({
  initialMessages,
}: {
  initialMessages: ContactMessageItem[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessageItem[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages[0]?.id || null
  );
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'ARCHIVED'>('ALL');
  const [actionLoading, setActionLoading] = useState(false);

  const selectedMessage = messages.find((m) => m.id === selectedId);

  const handleUpdateStatus = async (
    id: string,
    newStatus: 'UNREAD' | 'READ' | 'ARCHIVED' | 'SPAM'
  ) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error updating status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from studio records?')) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete message');

      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) {
        setSelectedId(messages.find((m) => m.id !== id)?.id || null);
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting message');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'UNREAD') return m.status === 'UNREAD';
    if (filter === 'ARCHIVED') return m.status === 'ARCHIVED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex items-center gap-2 border-b border-[#222] pb-4">
        {(['ALL', 'UNREAD', 'ARCHIVED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
              filter === tab
                ? 'bg-[#1C1A17] text-[#C6AA7B] border border-[#C6AA7B]/40 font-semibold'
                : 'text-[#717171] hover:text-[#F2EFE9] bg-[#121212]'
            }`}
          >
            {tab} ({messages.filter((m) => tab === 'ALL' || m.status === tab).length})
          </button>
        ))}
      </div>

      {/* Main Split Layout: Inquiries List & Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#222] divide-y divide-[#1C1C1C] overflow-y-auto max-h-[750px]">
          {filteredMessages.length === 0 ? (
            <div className="p-10 text-center text-xs font-mono text-[#717171]">
              No inquiries matching current filter.
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = msg.id === selectedId;

              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedId(msg.id);
                    if (msg.status === 'UNREAD') {
                      handleUpdateStatus(msg.id, 'READ');
                    }
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#1C1A17] border-l-2 border-[#C6AA7B]'
                      : 'hover:bg-[#161616]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-serif text-sm text-[#F2EFE9] truncate font-medium">
                      {msg.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#717171] shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-xs text-[#C6AA7B] truncate font-mono">
                    {msg.subject}
                  </div>

                  <p className="text-xs text-[#717171] line-clamp-2 mt-1 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#555]">{msg.inquiryType}</span>
                    {msg.status === 'UNREAD' ? (
                      <span className="bg-[#C6AA7B]/20 text-[#C6AA7B] px-1.5 py-0.5 border border-[#C6AA7B]/30 font-semibold">
                        UNREAD
                      </span>
                    ) : msg.status === 'ARCHIVED' ? (
                      <span className="text-[#555]">ARCHIVED</span>
                    ) : (
                      <span className="text-zinc-500">READ</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#222] p-6 sm:p-8 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#222]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block">
                    Inquiry Reference: FD-{selectedMessage.id.slice(-6).toUpperCase()}
                  </span>
                  <h2 className="font-serif text-2xl text-[#F2EFE9] mt-1">
                    {selectedMessage.subject}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {selectedMessage.status !== 'ARCHIVED' ? (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'ARCHIVED')}
                      disabled={actionLoading}
                      title="Archive inquiry"
                      className="p-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#A7A7A7] border border-[#333] transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'READ')}
                      disabled={actionLoading}
                      title="Mark as Active"
                      className="p-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#C6AA7B] border border-[#333] transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    disabled={actionLoading}
                    title="Delete inquiry"
                    className="p-2 bg-[#1A1A1A] hover:bg-red-950/40 text-red-400 border border-[#333] hover:border-red-900 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="bg-[#171717] border border-[#222] p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#717171] block">From:</span>
                  <span className="text-[#F2EFE9] font-medium font-serif text-sm">
                    {selectedMessage.name}
                  </span>
                  <div className="text-[#C6AA7B] mt-0.5">
                    &lt;{selectedMessage.email}&gt;
                  </div>
                </div>

                <div>
                  <span className="text-[#717171] block">Type & Timestamp:</span>
                  <span className="text-[#F2EFE9]">{selectedMessage.inquiryType}</span>
                  <div className="text-[#717171] mt-0.5">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] p-6 text-sm text-[#E5E5E5] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>

              {/* Direct Reply Link */}
              <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>

                {selectedMessage.ipAddress && (
                  <span className="text-[10px] font-mono text-[#555]">
                    IP: {selectedMessage.ipAddress}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="my-auto text-center py-16 text-[#555] font-mono text-xs">
              <Mail className="w-12 h-12 mx-auto mb-3 text-[#333]" />
              Select an inquiry from the left to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
