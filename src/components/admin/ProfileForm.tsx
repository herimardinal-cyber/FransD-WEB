'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
} from 'lucide-react';

interface ProfileData {
  id?: string;
  displayName: string;
  tagline: string;
  taglineId?: string | null;
  biography: string;
  biographyId?: string | null;
  philosophy: string;
  philosophyId?: string | null;
  portraitImageUrl?: string | null;
  location: string;
  email: string;
  phone?: string | null;
}

export default function ProfileForm({ initialData }: { initialData?: ProfileData | null }) {
  const router = useRouter();
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'id'>('en');

  const defaultIdBio = `Frans Delian adalah fotografer seni murni dan dokumenter internasional yang berbasis di Zurich, Swiss. Karyanya telah dipamerkan di berbagai galeri terkemuka dan institusi seni di Eropa, Asia, dan Amerika Utara.

Selama lebih dari lima belas tahun, Delian mendedikasikan hidupnya untuk mendokumentasikan sudut-sudut bumi yang paling sunyi — dataran tinggi Islandia yang dingin, labirin medina kuno di Afrika Utara, hingga kesunyian manusia di tengah gemerlap megapolitan Tokyo.

Menggunakan format medium mekanis dan sistem rangefinder klasik, ia menolak kecepatan fotografi digital modern demi ketelitian dan apresiasi mendalam terhadap cahaya alami dan geometri chiaroscuro.`;

  const defaultIdPhilosophy = `Cahaya bukanlah sekadar alat penerang; ia adalah entitas hidup yang bernafas dan mengubah wujud ruang.

Komposisi yang jujur tidak lahir dari manipulasi, melainkan dari kesabaran menanti momen ketika realitas menyingkapkan dirinya sendiri tanpa rasa cemas.

Setiap cetakan seni murni dibuat secara manual menggunakan metode platinum-palladium untuk memastikan ketahanan arsip melampaui ratusan tahun.`;

  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || 'Frans Delian',
    tagline: initialData?.tagline || 'Stories Beyond The Frame',
    taglineId: initialData?.taglineId || 'Kisah Melampaui Bingkai Lensa',
    biography: initialData?.biography || '',
    biographyId: initialData?.biographyId || defaultIdBio,
    philosophy: initialData?.philosophy || '',
    philosophyId: initialData?.philosophyId || defaultIdPhilosophy,
    portraitImageUrl: initialData?.portraitImageUrl || '',
    location: initialData?.location || 'Zurich, Switzerland',
    email: initialData?.email || 'studio@fransdelian.com',
    phone: initialData?.phone || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        throw new Error(data.error || 'Failed to upload portrait image.');
      }

      setFormData((prev) => ({ ...prev, portraitImageUrl: data.file.url }));
      setMessage({ type: 'success', text: 'Portrait image uploaded.' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Portrait upload failed.',
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
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setMessage({ type: 'success', text: 'Photographer profile updated successfully for both English & Indonesian!' });
      router.refresh();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update profile.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
            Artist & Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
            Photographer Profile
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Updating...' : 'Save Profile'}</span>
        </button>
      </div>

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

      {/* Language Version Selector Tab */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#121212] border border-[#222]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#C6AA7B]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#A7A7A7] mr-2">
            Pilihan Bahasa Konten:
          </span>
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all ${
              activeLangTab === 'en'
                ? 'bg-[#C6AA7B] text-[#080808] font-semibold shadow-md'
                : 'bg-[#171717] text-[#A7A7A7] hover:text-[#F2EFE9] border border-[#262626]'
            }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('id')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all ${
              activeLangTab === 'id'
                ? 'bg-[#C6AA7B] text-[#080808] font-semibold shadow-md'
                : 'bg-[#171717] text-[#A7A7A7] hover:text-[#F2EFE9] border border-[#262626]'
            }`}
          >
            Bahasa Indonesia (ID)
          </button>
        </div>
        <span className="text-[11px] font-mono text-[#C6AA7B]">
          {activeLangTab === 'en' ? '• Currently Editing English Version' : '• Sedang Mengedit Versi Bahasa Indonesia'}
        </span>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3 flex items-center justify-between">
              <span>Biographical & Philosophical Manifesto</span>
              <span className="text-xs font-mono text-[#C6AA7B] uppercase tracking-widest">
                [{activeLangTab.toUpperCase()}]
              </span>
            </h3>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Photographer Name <span className="text-[#C6AA7B]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            {activeLangTab === 'en' ? (
              <>
                {/* English Tagline */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Studio Tagline (English)</span>
                    <span className="text-[#C6AA7B] font-mono">[EN]</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none italic font-serif"
                    placeholder="Stories Beyond The Frame"
                  />
                </div>

                {/* English Biography */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Curatorial Biography (English)</span>
                    <span className="text-[#C6AA7B] font-mono">[EN]</span>
                  </label>
                  <textarea
                    rows={7}
                    value={formData.biography}
                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed font-sans"
                    placeholder="Enter biography in English..."
                  />
                </div>

                {/* English Philosophy */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Artist Philosophy & Approach (English)</span>
                    <span className="text-[#C6AA7B] font-mono">[EN]</span>
                  </label>
                  <textarea
                    rows={7}
                    value={formData.philosophy}
                    onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed font-sans"
                    placeholder="Enter artistic philosophy in English..."
                  />
                </div>
              </>
            ) : (
              <>
                {/* Indonesian Tagline */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Tagline Studio (Bahasa Indonesia)</span>
                    <span className="text-[#C6AA7B] font-mono">[ID]</span>
                  </label>
                  <input
                    type="text"
                    value={formData.taglineId}
                    onChange={(e) => setFormData({ ...formData, taglineId: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none italic font-serif"
                    placeholder="Kisah Melampaui Bingkai Lensa"
                  />
                </div>

                {/* Indonesian Biography */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Biografi Kuratorial (Bahasa Indonesia)</span>
                    <span className="text-[#C6AA7B] font-mono">[ID]</span>
                  </label>
                  <textarea
                    rows={7}
                    value={formData.biographyId}
                    onChange={(e) => setFormData({ ...formData, biographyId: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed font-sans"
                    placeholder="Tulis biografi dalam Bahasa Indonesia..."
                  />
                </div>

                {/* Indonesian Philosophy */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Filosofi & Pendekatan Seni (Bahasa Indonesia)</span>
                    <span className="text-[#C6AA7B] font-mono">[ID]</span>
                  </label>
                  <textarea
                    rows={7}
                    value={formData.philosophyId}
                    onChange={(e) => setFormData({ ...formData, philosophyId: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y leading-relaxed font-sans"
                    placeholder="Tulis filosofi pendekatan fotografi dalam Bahasa Indonesia..."
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Contact & Media */}
        <div className="space-y-6">
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
              Portrait & Contact
            </h3>

            {/* Portrait Preview & Upload */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Portrait Photo URL
              </label>
              <input
                type="text"
                value={formData.portraitImageUrl || ''}
                onChange={(e) => setFormData({ ...formData, portraitImageUrl: e.target.value })}
                placeholder="https://... or /uploads/..."
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono mb-2"
              />

              <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-[#C6AA7B] border border-[#333] text-xs font-mono uppercase cursor-pointer transition-colors w-full justify-center">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload Portrait'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={isUploading}
                  onChange={handlePortraitUpload}
                />
              </label>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Base Atelier Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Direct Studio Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Studio Telephone
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+41 44 210 88 44"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
