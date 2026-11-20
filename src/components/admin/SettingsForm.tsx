'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';

const DEFAULT_CTA_BG =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=85';
const DEFAULT_HERO_BG =
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=90';

export default function SettingsForm({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const router = useRouter();

  const [settings, setSettings] = useState<Record<string, string>>({
    site_title: initialSettings.site_title || 'Frans Delian — Stories Beyond The Frame',
    site_tagline: initialSettings.site_tagline || 'Stories Beyond The Frame',
    meta_description:
      initialSettings.meta_description ||
      'Official fine art and documentary photography portfolio of Frans Delian.',
    contact_email: initialSettings.contact_email || 'studio@fransdelian.com',
    contact_phone: initialSettings.contact_phone || '+41 44 210 88 44',
    atelier_location: initialSettings.atelier_location || 'Zurich, Switzerland',
    social_instagram: initialSettings.social_instagram || 'https://instagram.com/fransdelian',
    social_behance: initialSettings.social_behance || 'https://behance.net/fransdelian',
    social_500px: initialSettings.social_500px || 'https://500px.com/fransdelian',
    social_vsco: initialSettings.social_vsco || 'https://vsco.co/fransdelian',
    social_linkedin: initialSettings.social_linkedin || 'https://linkedin.com/in/fransdelian',
    stat_years_in_field: initialSettings.stat_years_in_field || '15+ Years in Field',
    stat_exhibitions: initialSettings.stat_exhibitions || '40+ Global Exhibitions',
    stat_awards: initialSettings.stat_awards || 'PX3 Gold Winner 2025',
    home_artist_quote:
      initialSettings.home_artist_quote ||
      '“Photography is an exercise in prolonged listening to what light leaves unsaid.”',
    home_artist_quote_id:
      initialSettings.home_artist_quote_id ||
      '“Fotografi adalah latihan mendengarkan secara mendalam apa yang tersirat di balik cahaya.”',
    home_bio_snippet:
      initialSettings.home_bio_snippet ||
      'Frans Delian is an international documentary and fine art photographer. Traveling to remote archipelagos, desert labyrinths, and megalopolis frontiers, his work captures moments of authenticity where human emotion meets unyielding atmosphere without staged intervention.',
    home_bio_snippet_id:
      initialSettings.home_bio_snippet_id ||
      'Frans Delian adalah fotografer seni murni dan dokumenter internasional. Menjelajahi kepulauan terpencil, labirin gurun, hingga perbatasan megapolitan, karyanya mengabadikan momen kejujuran: saat emosi manusia dan suasana alam menyatu tanpa rekayasa.',
    home_cta_bg_url: initialSettings.home_cta_bg_url || '',
    home_hero_bg_url: initialSettings.home_hero_bg_url || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCtaBg, setIsUploadingCtaBg] = useState(false);
  const [isUploadingHeroBg, setIsUploadingHeroBg] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (
    file: File,
    targetKey: 'home_cta_bg_url' | 'home_hero_bg_url',
    setLoading: (v: boolean) => void
  ) => {
    setLoading(true);
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
        throw new Error(data.error || 'Gagal mengunggah foto.');
      }

      handleChange(targetKey, data.file.url);
      setMessage({
        type: 'success',
        text: `Foto latar berhasil diunggah (${
          targetKey === 'home_cta_bg_url' ? 'Background Komisi / CTA' : 'Background Hero'
        }). Klik tombol "Save Settings" di atas untuk menyimpan permanen.`,
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Gagal mengunggah foto latar.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update settings.');
      }

      setMessage({ type: 'success', text: 'Site settings updated successfully.' });
      router.refresh();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update settings.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
            Global Configuration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
            Site Settings & SEO
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(198,170,123,0.15)]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
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

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Branding & SEO */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
            Branding & Metadata
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Default Site Title
              </label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => handleChange('site_title', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.site_tagline}
                onChange={(e) => handleChange('site_tagline', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.meta_description}
              onChange={(e) => handleChange('meta_description', e.target.value)}
              className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Global Key Stats */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
            Portfolio Highlights & Metric Strips
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Experience Metric
              </label>
              <input
                type="text"
                value={settings.stat_years_in_field}
                onChange={(e) => handleChange('stat_years_in_field', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Exhibitions Metric
              </label>
              <input
                type="text"
                value={settings.stat_exhibitions}
                onChange={(e) => handleChange('stat_exhibitions', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Awards Metric
              </label>
              <input
                type="text"
                value={settings.stat_awards}
                onChange={(e) => handleChange('stat_awards', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Homepage Spotlight */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
            <div>
              <span>Homepage Spotlight (Fotografer & Filosofi)</span>
              <span className="text-xs font-mono text-[#717171] block font-normal mt-0.5">
                Kutipan dan ringkasan biografi yang tampil pada section &quot;Fotografer & Filosofi&quot; di Halaman Depan.
              </span>
            </div>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                <span>Featured Quote (English)</span>
                <span className="text-[#C6AA7B] font-mono">[EN]</span>
              </label>
              <textarea
                rows={3}
                value={settings.home_artist_quote}
                onChange={(e) => handleChange('home_artist_quote', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-xs focus:outline-none font-serif italic"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                <span>Kutipan Utama (Bahasa Indonesia)</span>
                <span className="text-[#C6AA7B] font-mono">[ID]</span>
              </label>
              <textarea
                rows={3}
                value={settings.home_artist_quote_id}
                onChange={(e) => handleChange('home_artist_quote_id', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-xs focus:outline-none font-serif italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                <span>Bio Snippet (English)</span>
                <span className="text-[#C6AA7B] font-mono">[EN]</span>
              </label>
              <textarea
                rows={4}
                value={settings.home_bio_snippet}
                onChange={(e) => handleChange('home_bio_snippet', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-xs focus:outline-none font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2 flex justify-between">
                <span>Ringkasan Biografi (Bahasa Indonesia)</span>
                <span className="text-[#C6AA7B] font-mono">[ID]</span>
              </label>
              <textarea
                rows={4}
                value={settings.home_bio_snippet_id}
                onChange={(e) => handleChange('home_bio_snippet_id', e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-3 text-xs focus:outline-none font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Homepage Background Imagery */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-6">
          <div className="border-b border-[#1C1C1C] pb-3">
            <h3 className="font-serif text-xl text-[#F2EFE9] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#C6AA7B]" />
              <span>Foto Latar Landing Page (Homepage Backgrounds)</span>
            </h3>
            <p className="text-xs font-mono text-[#717171] mt-0.5">
              Kelola foto latar belakang dramatis untuk section Hero dan Call-to-Action (CTA).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. CTA Section Background (The one in user screenshot) */}
            <div className="bg-[#171717] border border-[#262626] p-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C6AA7B] block mb-1">
                  Section Bawah (CTA)
                </span>
                <h4 className="font-serif text-lg text-[#F2EFE9]">
                  Background Komisi Karya & Kontak
                </h4>
                <p className="text-xs text-[#888] mt-1">
                  Foto latar pada section &quot;Memiliki visi yang menuntut ketelitian visual abadi?&quot; di bagian bawah Landing Page.
                </p>
              </div>

              {/* Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm group">
                <Image
                  src={settings.home_cta_bg_url || DEFAULT_CTA_BG}
                  alt="CTA Background Preview"
                  fill
                  unoptimized={
                    (settings.home_cta_bg_url || DEFAULT_CTA_BG).startsWith('http') &&
                    !(settings.home_cta_bg_url || DEFAULT_CTA_BG).includes('images.unsplash.com')
                  }
                  className="object-cover filter brightness-[0.4] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/60 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C6AA7B]">
                    Preview Tampilan
                  </span>
                  <span className="font-serif text-sm text-[#F2EFE9] line-clamp-1">
                    Memiliki visi yang menuntut ketelitian visual abadi?
                  </span>
                </div>
                {!settings.home_cta_bg_url && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 border border-white/10 text-[9px] font-mono text-[#A7A7A7]">
                    Default Template
                  </div>
                )}
              </div>

              {/* Upload & Controls */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#222] hover:bg-[#C6AA7B] text-[#F2EFE9] hover:text-[#080808] border border-[#333] text-xs font-mono uppercase tracking-wider cursor-pointer transition-all">
                    {isUploadingCtaBg ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Mengunggah...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto Baru</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploadingCtaBg}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'home_cta_bg_url', setIsUploadingCtaBg);
                        }
                      }}
                    />
                  </label>

                  {settings.home_cta_bg_url && (
                    <button
                      type="button"
                      onClick={() => handleChange('home_cta_bg_url', '')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent hover:bg-red-950/40 text-[#888] hover:text-red-400 border border-transparent hover:border-red-800/40 text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset ke Default</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#777] mb-1">
                    Path / URL Gambar
                  </label>
                  <input
                    type="text"
                    value={settings.home_cta_bg_url}
                    onChange={(e) => handleChange('home_cta_bg_url', e.target.value)}
                    placeholder={DEFAULT_CTA_BG}
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Hero Section Background */}
            <div className="bg-[#171717] border border-[#262626] p-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C6AA7B] block mb-1">
                  Section Atas (Hero)
                </span>
                <h4 className="font-serif text-lg text-[#F2EFE9]">
                  Background Hero Utama
                </h4>
                <p className="text-xs text-[#888] mt-1">
                  Foto layar penuh sinematik saat pertama kali membuka website (di belakang nama Frans Delian).
                </p>
              </div>

              {/* Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm group">
                <Image
                  src={settings.home_hero_bg_url || DEFAULT_HERO_BG}
                  alt="Hero Background Preview"
                  fill
                  unoptimized={
                    (settings.home_hero_bg_url || DEFAULT_HERO_BG).startsWith('http') &&
                    !(settings.home_hero_bg_url || DEFAULT_HERO_BG).includes('images.unsplash.com')
                  }
                  className="object-cover filter brightness-[0.7] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C6AA7B]">
                    Preview Tampilan
                  </span>
                  <span className="font-serif text-sm tracking-wider uppercase text-[#F2EFE9]">
                    Frans Delian — Hero
                  </span>
                </div>
                {!settings.home_hero_bg_url && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 border border-white/10 text-[9px] font-mono text-[#A7A7A7]">
                    Default Template
                  </div>
                )}
              </div>

              {/* Upload & Controls */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#222] hover:bg-[#C6AA7B] text-[#F2EFE9] hover:text-[#080808] border border-[#333] text-xs font-mono uppercase tracking-wider cursor-pointer transition-all">
                    {isUploadingHeroBg ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Mengunggah...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto Baru</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploadingHeroBg}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'home_hero_bg_url', setIsUploadingHeroBg);
                        }
                      }}
                    />
                  </label>

                  {settings.home_hero_bg_url && (
                    <button
                      type="button"
                      onClick={() => handleChange('home_hero_bg_url', '')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent hover:bg-red-950/40 text-[#888] hover:text-red-400 border border-transparent hover:border-red-800/40 text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset ke Default</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#777] mb-1">
                    Path / URL Gambar
                  </label>
                  <input
                    type="text"
                    value={settings.home_hero_bg_url}
                    onChange={(e) => handleChange('home_hero_bg_url', e.target.value)}
                    placeholder={DEFAULT_HERO_BG}
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Representasi, Kontak & Jejaring Sosial (Footer Info) */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-6">
          <div className="border-b border-[#1C1C1C] pb-3">
            <h3 className="font-serif text-xl text-[#F2EFE9]">
              Representasi, Kontak & Jejaring Sosial (Footer Website)
            </h3>
            <p className="text-xs font-mono text-[#717171] mt-0.5">
              Kelola teks Studio, Email, dan link Jejaring Sosial yang tampil pada bagian footer di seluruh halaman website.
            </p>
          </div>

          {/* Studio, Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Lokasi Studio (Tampil di Contact & Footer)
              </label>
              <input
                type="text"
                value={settings.atelier_location}
                onChange={(e) => handleChange('atelier_location', e.target.value)}
                placeholder="Zurich, Switzerland"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
              <span className="text-[10px] text-[#666] font-mono mt-1 block">
                Contoh: Limmatquai 44, 8001 Zurich atau Aceh, Indonesia
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Surat Elektronik / Email Studio
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="studio@fransdelian.com"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
              <span className="text-[10px] text-[#666] font-mono mt-1 block">
                Contoh: studio@fransdelian.com
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Telepon / Signal Studio
              </label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                placeholder="+41 44 210 88 44"
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
              <span className="text-[10px] text-[#666] font-mono mt-1 block">
                Contoh: +41 44 210 88 44 atau +62 812...
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#C6AA7B] mb-3">
              Tautan Jejaring Sosial (Footer Social Networks)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/fransdelian"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  500px URL
                </label>
                <input
                  type="url"
                  value={settings.social_500px}
                  onChange={(e) => handleChange('social_500px', e.target.value)}
                  placeholder="https://500px.com/fransdelian"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  Behance URL
                </label>
                <input
                  type="url"
                  value={settings.social_behance}
                  onChange={(e) => handleChange('social_behance', e.target.value)}
                  placeholder="https://behance.net/fransdelian"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  VSCO URL
                </label>
                <input
                  type="url"
                  value={settings.social_vsco}
                  onChange={(e) => handleChange('social_vsco', e.target.value)}
                  placeholder="https://vsco.co/fransdelian"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.social_linkedin}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/fransdelian"
                  className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
