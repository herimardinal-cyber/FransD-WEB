'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

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
    atelier_location: initialSettings.atelier_location || 'Zurich, Switzerland',
    social_instagram: initialSettings.social_instagram || 'https://instagram.com/fransdelian',
    social_behance: initialSettings.social_behance || 'https://behance.net/fransdelian',
    social_linkedin: initialSettings.social_linkedin || 'https://linkedin.com/in/fransdelian',
    stat_years_in_field: initialSettings.stat_years_in_field || '15+ Years in Field',
    stat_exhibitions: initialSettings.stat_exhibitions || '40+ Global Exhibitions',
    stat_awards: initialSettings.stat_awards || 'PX3 Gold Winner 2025',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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

        {/* Social Channels */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <h3 className="font-serif text-xl text-[#F2EFE9] border-b border-[#1C1C1C] pb-3">
            Channels & Atelier
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.social_instagram}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
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
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-3 py-2 text-xs focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
