'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface EventData {
  id?: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  venue: string;
  city: string;
  country: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  status: 'UPCOMING' | 'ONGOING' | 'PAST';
  coverImage: string;
  registrationUrl?: string | null;
}

export default function EventForm({ initialData }: { initialData?: EventData }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  const formatDateForInput = (d?: string | Date | null) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    venue: initialData?.venue || '',
    city: initialData?.city || '',
    country: initialData?.country || 'Switzerland',
    startDate: formatDateForInput(initialData?.startDate) || formatDateForInput(new Date()),
    endDate: formatDateForInput(initialData?.endDate) || '',
    status: initialData?.status || 'UPCOMING',
    coverImage: initialData?.coverImage || '',
    registrationUrl: initialData?.registrationUrl || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!isEditing || !formData.slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, title }));
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    setMessage(null);

    try {
      const uploadBody = new FormData();
      uploadBody.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadBody,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      setFormData((prev) => ({ ...prev, coverImage: data.file.url }));
      setMessage({ type: 'success', text: 'Cover image uploaded successfully.' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Cover upload failed.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const endpoint = isEditing ? `/api/admin/events/${initialData?.id}` : '/api/admin/events';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save event.');
      }

      setMessage({ type: 'success', text: 'Event saved successfully.' });

      if (!isEditing && data.event?.id) {
        router.push(`/admin/events/${data.event.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save event.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="p-2 text-[#A7A7A7] hover:text-[#F2EFE9] bg-[#161616] border border-[#262626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block">
              Exhibition & Event
            </span>
            <h1 className="font-serif text-3xl text-[#F2EFE9]">
              {isEditing ? formData.title || 'Untitled Event' : 'New Exhibition'}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Event'}</span>
        </button>
      </div>

      {/* Alert */}
      {message && (
        <div
          className={`p-4 border text-xs flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
              : 'bg-red-950/40 border-red-800/60 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Event Details
            </h3>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Title <span className="text-[#C6AA7B]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Geometries of Silence: Zurich Solo Exhibition"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                URL Slug <span className="text-[#C6AA7B]">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-[#1A1A1A] border border-r-0 border-[#262626] px-3 py-3 text-xs font-mono text-[#717171]">
                  /events/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="geometries-of-silence"
                  className="flex-1 bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Subtitle / Exhibition Type
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Solo Retrospective & Monograph Launch"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Venue / Museum <span className="text-[#C6AA7B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Kunsthalle Zurich"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  City <span className="text-[#C6AA7B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Zurich"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Switzerland"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Opening / Start Date <span className="text-[#C6AA7B]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Closing / End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Exhibition Overview & Program Description
              </label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Curated selection of 42 large-format archival prints..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Status & Cover */}
        <div className="space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Event Status
            </h3>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Stage
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'UPCOMING' | 'ONGOING' | 'PAST',
                  })
                }
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="PAST">Past / Concluded</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Registration / RSVP Link (Optional)
              </label>
              <input
                type="url"
                value={formData.registrationUrl}
                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                placeholder="https://kunsthalle.ch/tickets"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            {/* Cover Image */}
            <div className="pt-2 border-t border-[#1C1C1C]">
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Cover Image URL <span className="text-[#C6AA7B]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://... or /uploads/..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono mb-2"
              />

              <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#C6AA7B] border border-[#333] text-xs font-mono uppercase cursor-pointer transition-colors w-full justify-center">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload Event Poster'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={isUploading}
                  onChange={handleCoverUpload}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
