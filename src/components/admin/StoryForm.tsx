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

interface StoryData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  pullQuote?: string | null;
  coverImage: string;
  readTime: string;
  tags?: string | string[];
  status: 'DRAFT' | 'PUBLISHED';
}

export default function StoryForm({ initialData }: { initialData?: StoryData }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  let initialTagsString = '';
  if (initialData?.tags) {
    if (Array.isArray(initialData.tags)) {
      initialTagsString = initialData.tags.join(', ');
    } else {
      try {
        const parsed = JSON.parse(initialData.tags);
        initialTagsString = Array.isArray(parsed) ? parsed.join(', ') : initialData.tags;
      } catch {
        initialTagsString = initialData.tags;
      }
    }
  }

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    pullQuote: initialData?.pullQuote || '',
    coverImage: initialData?.coverImage || '',
    readTime: initialData?.readTime || '6 min read',
    tags: initialTagsString || 'Philosophy, Monochrome',
    status: initialData?.status || 'DRAFT',
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
      setMessage({ type: 'success', text: 'Cover photograph uploaded.' });
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
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        tags: tagsArray,
      };

      const endpoint = isEditing ? `/api/admin/stories/${initialData?.id}` : '/api/admin/stories';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save story.');
      }

      setMessage({ type: 'success', text: 'Story saved successfully.' });

      if (!isEditing && data.story?.id) {
        router.push(`/admin/stories/${data.story.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save story.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/stories"
            className="p-2 text-[#A7A7A7] hover:text-[#F2EFE9] bg-[#161616] border border-[#262626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block">
              Editorial Article
            </span>
            <h1 className="font-serif text-3xl text-[#F2EFE9]">
              {isEditing ? formData.title || 'Untitled Essay' : 'New Story Essay'}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Story'}</span>
        </button>
      </div>

      {/* Message Banner */}
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

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Essay Content
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
                placeholder="e.g. In Praise of Shadows: Notes on Kyoto Monochromes"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                URL Slug <span className="text-[#C6AA7B]">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-[#1A1A1A] border border-r-0 border-[#262626] px-3 py-3 text-xs font-mono text-[#717171]">
                  /stories/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="in-praise-of-shadows"
                  className="flex-1 bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Excerpt (Curatorial Intro) <span className="text-[#C6AA7B]">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A contemplative meditation on ambient Japanese darkness..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Pull Quote (Featured Epigraph)
              </label>
              <input
                type="text"
                value={formData.pullQuote}
                onChange={(e) => setFormData({ ...formData, pullQuote: e.target.value })}
                placeholder="e.g. We find beauty not in the thing itself but in the patterns of shadows..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none italic font-serif"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Full Essay Body (Paragraphs or Markdown) <span className="text-[#C6AA7B]">*</span>
              </label>
              <textarea
                rows={12}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Separate distinct paragraphs with blank lines..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Editorial Status
            </h3>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Publication State
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'DRAFT' | 'PUBLISHED',
                  })
                }
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 7 min read"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Kyoto, Monochrome, Philosophy"
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
                <span>{isUploading ? 'Uploading...' : 'Upload Cover File'}</span>
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
