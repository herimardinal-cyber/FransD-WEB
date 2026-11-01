'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Camera,
} from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption?: string | null;
  orientation: string;
  sortOrder: number;
  camera?: string | null;
  lens?: string | null;
  focalLength?: string | null;
  aperture?: string | null;
  shutterSpeed?: string | null;
  iso?: number | null;
}

interface ProjectData {
  id?: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  location?: string | null;
  client?: string | null;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  coverImage?: string | null;
  photos?: PhotoItem[];
}

const CATEGORIES = [
  'Architectural & Urban',
  'Landscape & Silence',
  'Intimate Portraits',
  'Documentary Series',
  'Fine Art Edition',
];

export default function ProjectForm({ initialData }: { initialData?: ProjectData }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = useState<ProjectData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || CATEGORIES[0],
    year: initialData?.year || new Date().getFullYear(),
    location: initialData?.location || '',
    client: initialData?.client || '',
    description: initialData?.description || '',
    status: initialData?.status || 'DRAFT',
    featured: initialData?.featured || false,
    coverImage: initialData?.coverImage || '',
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(initialData?.photos || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-generate slug from title if slug not manually customized
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

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const endpoint = isEditing
        ? `/api/admin/projects/${initialData?.id}`
        : '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save project.');
      }

      setMessage({ type: 'success', text: 'Project saved successfully.' });

      if (!isEditing && data.project?.id) {
        router.push(`/admin/gallery/${data.project.id}`);
      } else {
        router.refresh();
      }
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Error saving project.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!initialData?.id || !e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const files = Array.from(e.target.files);

      for (const file of files) {
        // Step 1: Upload file to storage
        const uploadBody = new FormData();
        uploadBody.append('file', file);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadBody,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || `Failed to upload ${file.name}`);
        }

        // Step 2: Attach to project
        const photoRes = await fetch(`/api/admin/projects/${initialData.id}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: uploadData.file.url,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            orientation: 'LANDSCAPE',
          }),
        });

        const photoData = await photoRes.json();
        if (photoRes.ok && photoData.photo) {
          setPhotos((prev) => [...prev, photoData.photo]);
        }
      }

      setMessage({ type: 'success', text: 'Photos uploaded and added to series.' });
      router.refresh();
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Photo upload failed.',
      });
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  // Photo Delete Handler
  const handleDeletePhoto = async (photoId: string) => {
    if (!initialData?.id) return;
    if (!confirm('Are you sure you want to remove this photo from the project?')) return;

    try {
      const res = await fetch(
        `/api/admin/projects/${initialData.id}/photos?photoId=${photoId}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to delete photo');

      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete photo');
    }
  };

  // Photo Move Order
  const handleMovePhoto = async (index: number, direction: 'up' | 'down') => {
    if (!initialData?.id) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[targetIndex];
    newPhotos[targetIndex] = temp;

    setPhotos(newPhotos);

    try {
      await fetch(`/api/admin/projects/${initialData.id}/photos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newPhotos.map((p) => p.id) }),
      });
    } catch (err) {
      console.error('Failed to sync photo order:', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/gallery"
            className="p-2 text-[#A7A7A7] hover:text-[#F2EFE9] bg-[#161616] border border-[#262626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block">
              {isEditing ? 'Curate Series' : 'Create Series'}
            </span>
            <h1 className="font-serif text-3xl text-[#F2EFE9]">
              {isEditing ? formData.title || 'Untitled Project' : 'New Photo Series'}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSaveProject}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Series'}</span>
        </button>
      </div>

      {/* Status Messages */}
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

      {/* Main Form Layout */}
      <form onSubmit={handleSaveProject} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Core Metadata */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Editorial Details
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Project Title <span className="text-[#C6AA7B]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Architectonics of Shadow"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                URL Slug <span className="text-[#C6AA7B]">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-[#1A1A1A] border border-r-0 border-[#262626] px-3 py-3 text-xs font-mono text-[#717171]">
                  /gallery/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="architectonics-of-shadow"
                  className="flex-1 bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Category & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Category <span className="text-[#C6AA7B]">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Creation Year <span className="text-[#C6AA7B]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Location & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Location / Region
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Tokyo & Osaka, Japan"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Client / Publisher
                </label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Architectural Review"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Editorial Statement & Curatorial Notes
              </label>
              <textarea
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="High-contrast monochrome studies dissecting the monumental geometry..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Publication Status & Cover */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Publication Status
            </h3>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Visibility
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
                  })
                }
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none font-mono"
              >
                <option value="DRAFT">Draft (Unlisted)</option>
                <option value="PUBLISHED">Published (Public)</option>
                <option value="ARCHIVED">Archived (Internal)</option>
              </select>
            </div>

            {/* Featured Switch */}
            <div className="pt-2 flex items-center justify-between border-t border-[#1C1C1C]">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#F2EFE9] block">
                  Featured on Homepage
                </span>
                <span className="text-[11px] text-[#717171]">
                  Spotlights this series on the main hero & grid
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 accent-[#C6AA7B] bg-[#171717] border-[#262626] rounded-none cursor-pointer"
              />
            </div>

            {/* Cover Image URL */}
            <div className="pt-2 border-t border-[#1C1C1C]">
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Cover Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.coverImage || ''}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://... or /uploads/..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
              <span className="text-[10px] text-[#717171] mt-1 block">
                If left empty, the first photo in the series serves as the cover.
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* Photo Management Section (Available once project exists) */}
      {isEditing && (
        <div className="bg-[#121212] border border-[#222] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1C1C1C]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block">
                Curated Stills
              </span>
              <h2 className="font-serif text-2xl text-[#F2EFE9]">
                Series Photographs ({photos.length})
              </h2>
            </div>

            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F1E1B] hover:bg-[#C6AA7B] text-[#C6AA7B] hover:text-[#080808] border border-[#C6AA7B]/40 font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors">
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading Files...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Photographs</span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={isUploading}
                onChange={handlePhotoUpload}
              />
            </label>
          </div>

          {/* Photos Grid */}
          {photos.length === 0 ? (
            <div className="py-12 border border-dashed border-[#262626] text-center">
              <Camera className="w-10 h-10 text-[#555] mx-auto mb-3" />
              <h4 className="font-serif text-lg text-[#F2EFE9]">No Photographs Attached</h4>
              <p className="text-xs font-mono text-[#717171] mt-1">
                Click &quot;Upload Photographs&quot; above to add stills to this series.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="bg-[#161616] border border-[#262626] overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/3] bg-[#0A0A0A] overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Order Badge */}
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-[#C6AA7B]">
                      #{index + 1}
                    </div>

                    {/* Quick Move Buttons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleMovePhoto(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 hover:text-[#C6AA7B] text-[#A7A7A7] disabled:opacity-20"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMovePhoto(index, 'down')}
                        disabled={index === photos.length - 1}
                        title="Move Down"
                        className="p-1 hover:text-[#C6AA7B] text-[#A7A7A7] disabled:opacity-20"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata preview & delete */}
                  <div className="p-3.5 flex items-center justify-between text-xs border-t border-[#222]">
                    <div className="min-w-0 pr-2">
                      <div className="font-serif text-sm text-[#F2EFE9] truncate">
                        {photo.title}
                      </div>
                      <div className="text-[10px] font-mono text-[#717171] truncate">
                        {photo.camera || 'Leica M11'} {photo.lens ? `• ${photo.lens}` : ''}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      title="Delete photo"
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
