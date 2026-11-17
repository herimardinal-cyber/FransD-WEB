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
  Award,
  MapPin,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
} from 'lucide-react';

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
}

export interface ExhibitionItem {
  year: string;
  title: string;
  location: string;
  type?: 'Solo' | 'Group' | string;
}

const defaultAwards: AwardItem[] = [
  { year: '2025', title: 'Prix de la Photographie Paris (PX3)', organization: 'Gold Winner in Fine Art / Landscape' },
  { year: '2024', title: 'International Photography Awards (IPA)', organization: 'First Place, Editorial Documentary Series' },
  { year: '2023', title: 'Sony World Photography Awards', organization: 'Shortlist, Creative Fine Art Category' },
  { year: '2022', title: 'Leica Oskar Barnack Award Finalist', organization: 'Leica Camera International' },
];

const defaultExhibitions: ExhibitionItem[] = [
  { year: '2026', title: 'Echoes of Silence (Solo)', location: 'Pavilion of Fine Arts, Zurich', type: 'Solo' },
  { year: '2025', title: 'Stories Beyond The Frame (Retrospective)', location: 'Galerie d’Art Contemporain, Paris', type: 'Solo' },
  { year: '2024', title: 'Nordic Light Masters (Group)', location: 'Fotografiska, Stockholm', type: 'Group' },
  { year: '2023', title: 'Shadows of the Silk Road', location: 'Tokyo Photographic Gallery, Ginza', type: 'Solo' },
  { year: '2022', title: 'Contemporary Humanism', location: 'Somerset House, London', type: 'Group' },
];

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
  awardsJson?: string | null;
  exhibitionsJson?: string | null;
}

export default function ProfileForm({
  initialData,
  initialSettings,
}: {
  initialData?: ProfileData | null;
  initialSettings?: Record<string, string>;
}) {
  const router = useRouter();
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'id'>('en');

  const defaultIdBio = `Frans Delian adalah fotografer seni murni dan dokumenter internasional yang berbasis di Zurich, Swiss. Karyanya telah dipamerkan di berbagai galeri terkemuka dan institusi seni di Eropa, Asia, dan Amerika Utara.

Selama lebih dari lima belas tahun, Delian mendedikasikan hidupnya untuk mendokumentasikan sudut-sudut bumi yang paling sunyi — dataran tinggi Islandia yang dingin, labirin medina kuno di Afrika Utara, hingga kesunyian manusia di tengah gemerlap megapolitan Tokyo.

Menggunakan format medium mekanis dan sistem rangefinder klasik, ia menolak kecepatan fotografi digital modern demi ketelitian dan apresiasi mendalam terhadap cahaya alami dan geometri chiaroscuro.`;

  const defaultIdPhilosophy = `Cahaya bukanlah sekadar alat penerang; ia adalah entitas hidup yang bernafas dan mengubah wujud ruang.

Komposisi yang jujur tidak lahir dari manipulasi, melainkan dari kesabaran menanti momen ketika realitas menyingkapkan dirinya sendiri tanpa rasa cemas.

Setiap cetakan seni murni dibuat secara manual menggunakan metode platinum-palladium untuk memastikan ketahanan arsip melampaui ratusan tahun.`;

  const parseJsonList = <T,>(jsonStr: string | null | undefined, fallback: T[]): T[] => {
    if (!jsonStr) return fallback;
    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

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

  const [homeSettings, setHomeSettings] = useState({
    home_artist_quote:
      initialSettings?.home_artist_quote ||
      '“Photography is an exercise in prolonged listening to what light leaves unsaid.”',
    home_artist_quote_id:
      initialSettings?.home_artist_quote_id ||
      '“Fotografi adalah latihan mendengarkan secara mendalam apa yang tersirat di balik cahaya.”',
    home_bio_snippet:
      initialSettings?.home_bio_snippet ||
      'Frans Delian is an international documentary and fine art photographer. Traveling to remote archipelagos, desert labyrinths, and megalopolis frontiers, his work captures moments of authenticity where human emotion meets unyielding atmosphere without staged intervention.',
    home_bio_snippet_id:
      initialSettings?.home_bio_snippet_id ||
      'Frans Delian adalah fotografer seni murni dan dokumenter internasional. Menjelajahi kepulauan terpencil, labirin gurun, hingga perbatasan megapolitan, karyanya mengabadikan momen kejujuran: saat emosi manusia dan suasana alam menyatu tanpa rekayasa.',
  });

  const [awards, setAwards] = useState<AwardItem[]>(() =>
    parseJsonList<AwardItem>(initialData?.awardsJson, defaultAwards)
  );

  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>(() =>
    parseJsonList<ExhibitionItem>(initialData?.exhibitionsJson, defaultExhibitions)
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Awards CRUD handlers
  const handleAddAward = () => {
    const currentYear = new Date().getFullYear().toString();
    setAwards((prev) => [{ year: currentYear, title: '', organization: '' }, ...prev]);
  };

  const handleUpdateAward = (index: number, field: keyof AwardItem, value: string) => {
    setAwards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveAward = (index: number) => {
    setAwards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveAward = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= awards.length) return;
    setAwards((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[target];
      updated[target] = temp;
      return updated;
    });
  };

  // Exhibitions CRUD handlers
  const handleAddExhibition = () => {
    const currentYear = new Date().getFullYear().toString();
    setExhibitions((prev) => [{ year: currentYear, title: '', location: '', type: 'Solo' }, ...prev]);
  };

  const handleUpdateExhibition = (index: number, field: keyof ExhibitionItem, value: string) => {
    setExhibitions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveExhibition = (index: number) => {
    setExhibitions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveExhibition = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= exhibitions.length) return;
    setExhibitions((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[target];
      updated[target] = temp;
      return updated;
    });
  };

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
      const payload = {
        ...formData,
        awardsJson: JSON.stringify(awards),
        exhibitionsJson: JSON.stringify(exhibitions),
        homeSettings,
      };

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setMessage({ type: 'success', text: 'Photographer profile, honors, and exhibitions saved successfully!' });
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
            Photographer Profile & Curatorial Records
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
          className={`p-4 border text-xs flex items-center gap-3 ${message.type === 'success'
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
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all ${activeLangTab === 'en'
              ? 'bg-[#C6AA7B] text-[#080808] font-semibold shadow-md'
              : 'bg-[#171717] text-[#A7A7A7] hover:text-[#F2EFE9] border border-[#262626]'
              }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('id')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all ${activeLangTab === 'id'
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

          {/* ========================================================= */}
          {/* HOMEPAGE SPOTLIGHT (FOTOGRAFER & FILOSOFI HALAMAN DEPAN) */}
          {/* ========================================================= */}
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3 flex items-center justify-between">
              <div>
                <span>Homepage Spotlight (Fotografer & Filosofi)</span>
                <span className="text-xs font-mono text-[#717171] block font-normal mt-0.5">
                  Kutipan besar & ringkasan biografi yang tampil pada section &quot;Fotografer & Filosofi&quot; di Halaman Depan (Home).
                </span>
              </div>
              <span className="text-xs font-mono text-[#C6AA7B] uppercase tracking-widest shrink-0">
                [{activeLangTab.toUpperCase()}]
              </span>
            </h3>

            {activeLangTab === 'en' ? (
              <>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Homepage Featured Quote (English)</span>
                    <span className="text-[#C6AA7B] font-mono">[EN]</span>
                  </label>
                  <textarea
                    rows={3}
                    value={homeSettings.home_artist_quote}
                    onChange={(e) => setHomeSettings({ ...homeSettings, home_artist_quote: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-sm focus:outline-none italic font-serif"
                    placeholder="Photography is an exercise in prolonged listening to what light leaves unsaid."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Homepage Bio Snippet (English)</span>
                    <span className="text-[#C6AA7B] font-mono">[EN]</span>
                  </label>
                  <textarea
                    rows={4}
                    value={homeSettings.home_bio_snippet}
                    onChange={(e) => setHomeSettings({ ...homeSettings, home_bio_snippet: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-sm focus:outline-none font-sans leading-relaxed"
                    placeholder="Frans Delian is an international documentary and fine art photographer..."
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Kutipan Utama Halaman Depan (Bahasa Indonesia)</span>
                    <span className="text-[#C6AA7B] font-mono">[ID]</span>
                  </label>
                  <textarea
                    rows={3}
                    value={homeSettings.home_artist_quote_id}
                    onChange={(e) => setHomeSettings({ ...homeSettings, home_artist_quote_id: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-sm focus:outline-none italic font-serif"
                    placeholder="Fotografi adalah latihan mendengarkan secara mendalam apa yang tersirat di balik cahaya."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                    <span>Ringkasan Biografi Halaman Depan (Bahasa Indonesia)</span>
                    <span className="text-[#C6AA7B] font-mono">[ID]</span>
                  </label>
                  <textarea
                    rows={4}
                    value={homeSettings.home_bio_snippet_id}
                    onChange={(e) => setHomeSettings({ ...homeSettings, home_bio_snippet_id: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-sm focus:outline-none font-sans leading-relaxed"
                    placeholder="Frans Delian adalah fotografer seni murni dan dokumenter internasional. Menjelajahi kepulauan terpencil..."
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
                  Portrait Photo URL
                </label>
                <span className="text-[10px] font-mono text-[#C6AA7B]">
                  • Tampil di Home & About
                </span>
              </div>
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

        {/* ========================================================= */}
        {/* SELECTED HONORS & EXHIBITIONS (BACKEND CRUD) */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {/* Block Kiri: Selected Honors */}
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C6AA7B]" />
                <h3 className="font-serif text-xl text-[#F2EFE9]">Selected Honors</h3>
                <span className="text-[11px] font-mono text-[#717171] ml-1">
                  ({awards.length})
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddAward}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#252525] border border-[#333] hover:border-[#C6AA7B] text-[#C6AA7B] text-xs font-mono tracking-wider transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Honor</span>
              </button>
            </div>

            <p className="text-xs text-[#717171] font-mono">
              Kelola daftar penghargaan dan pengakuan institusional yang tampil pada block kiri halaman About.
            </p>

            {awards.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#262626] text-xs font-mono text-[#717171]">
                Belum ada penghargaan. Klik &ldquo;Add Honor&rdquo; di atas untuk menambahkan.
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="bg-[#171717] border border-[#262626] p-4 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-[#222] pb-2 text-xs font-mono">
                      <span className="text-[#C6AA7B] font-semibold">#{idx + 1} Honor</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveAward(idx, -1)}
                          disabled={idx === 0}
                          title="Pindah ke atas"
                          className="p-1 text-[#717171] hover:text-[#F2EFE9] disabled:opacity-30 disabled:hover:text-[#717171] transition-colors"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveAward(idx, 1)}
                          disabled={idx === awards.length - 1}
                          title="Pindah ke bawah"
                          className="p-1 text-[#717171] hover:text-[#F2EFE9] disabled:opacity-30 disabled:hover:text-[#717171] transition-colors"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveAward(idx)}
                          title="Hapus penghargaan"
                          className="p-1 text-red-500/70 hover:text-red-400 ml-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                          Honor / Award Title
                        </label>
                        <input
                          type="text"
                          value={award.title}
                          onChange={(e) => handleUpdateAward(idx, 'title', e.target.value)}
                          placeholder="cth. Prix de la Photographie Paris (PX3)"
                          className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={award.year}
                          onChange={(e) => handleUpdateAward(idx, 'year', e.target.value)}
                          placeholder="2025"
                          className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                        Organization / Category Subtitle
                      </label>
                      <input
                        type="text"
                        value={award.organization}
                        onChange={(e) => handleUpdateAward(idx, 'organization', e.target.value)}
                        placeholder="cth. Gold Winner in Fine Art / Landscape"
                        className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block Kanan: Exhibitions */}
          <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C6AA7B]" />
                <h3 className="font-serif text-xl text-[#F2EFE9]">Exhibitions</h3>
                <span className="text-[11px] font-mono text-[#717171] ml-1">
                  ({exhibitions.length})
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddExhibition}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#252525] border border-[#333] hover:border-[#C6AA7B] text-[#C6AA7B] text-xs font-mono tracking-wider transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Exhibition</span>
              </button>
            </div>

            <p className="text-xs text-[#717171] font-mono">
              Kelola daftar pameran solo maupun kelompok yang tampil pada block kanan halaman About.
            </p>

            {exhibitions.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#262626] text-xs font-mono text-[#717171]">
                Belum ada pameran. Klik &ldquo;Add Exhibition&rdquo; di atas untuk menambahkan.
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {exhibitions.map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-[#171717] border border-[#262626] p-4 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-[#222] pb-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[#C6AA7B] font-semibold">#{idx + 1} Exhibition</span>
                        <select
                          value={ex.type || 'Solo'}
                          onChange={(e) => handleUpdateExhibition(idx, 'type', e.target.value)}
                          className="bg-[#121212] border border-[#262626] text-[#A7A7A7] text-[10px] px-2 py-0.5 focus:outline-none"
                        >
                          <option value="Solo">Solo</option>
                          <option value="Group">Group</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveExhibition(idx, -1)}
                          disabled={idx === 0}
                          title="Pindah ke atas"
                          className="p-1 text-[#717171] hover:text-[#F2EFE9] disabled:opacity-30 disabled:hover:text-[#717171] transition-colors"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveExhibition(idx, 1)}
                          disabled={idx === exhibitions.length - 1}
                          title="Pindah ke bawah"
                          className="p-1 text-[#717171] hover:text-[#F2EFE9] disabled:opacity-30 disabled:hover:text-[#717171] transition-colors"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveExhibition(idx)}
                          title="Hapus pameran"
                          className="p-1 text-red-500/70 hover:text-red-400 ml-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                          Exhibition Title
                        </label>
                        <input
                          type="text"
                          value={ex.title}
                          onChange={(e) => handleUpdateExhibition(idx, 'title', e.target.value)}
                          placeholder="cth. Echoes of Silence (Solo)"
                          className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={ex.year}
                          onChange={(e) => handleUpdateExhibition(idx, 'year', e.target.value)}
                          placeholder="2026"
                          className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#717171] mb-1">
                        Location / Gallery / Museum Venue
                      </label>
                      <input
                        type="text"
                        value={ex.location}
                        onChange={(e) => handleUpdateExhibition(idx, 'location', e.target.value)}
                        placeholder="cth. Pavilion of Fine Arts, Zurich"
                        className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#121212] border border-[#222]">
          <span className="text-xs font-mono text-[#717171]">
            Pastikan seluruh data manifesto, Selected Honors, dan Exhibitions sudah sesuai sebelum menyimpan.
          </span>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)] shrink-0"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Updating...' : 'Save Profile & Records'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
