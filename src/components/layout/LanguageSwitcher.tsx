'use client';

import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'nav' | 'footer' | 'mobile';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'nav', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 text-xs font-mono ${className}`}>
        <span className="flex items-center gap-1.5 text-[#717171]">
          <Globe className="w-3.5 h-3.5 text-[#C6AA7B]" />
          <span>Language:</span>
        </span>
        <div className="inline-flex items-center gap-2 p-1 bg-[#121212] border border-[#262626]">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-all duration-300 ${
              language === 'en'
                ? 'bg-[#1C1A17] text-[#C6AA7B] border border-[#C6AA7B]/40 font-semibold shadow-sm'
                : 'text-[#717171] hover:text-[#F2EFE9]'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-all duration-300 ${
              language === 'id'
                ? 'bg-[#1C1A17] text-[#C6AA7B] border border-[#C6AA7B]/40 font-semibold shadow-sm'
                : 'text-[#717171] hover:text-[#F2EFE9]'
            }`}
          >
            Indonesia
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 bg-[#121212] border border-[#262626] ${className}`}>
        <span className="flex items-center gap-2 text-xs font-mono text-[#A7A7A7]">
          <Globe className="w-3.5 h-3.5 text-[#C6AA7B]" />
          <span>Language / Bahasa</span>
        </span>
        <div className="inline-flex items-center gap-1 bg-[#080808] p-1 border border-[#222]">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-mono tracking-wider transition-colors ${
              language === 'en'
                ? 'bg-[#1C1A17] text-[#C6AA7B] border border-[#C6AA7B]/40 font-bold'
                : 'text-[#717171] hover:text-[#F2EFE9]'
            }`}
          >
            EN
          </button>
          <span className="text-[#333] text-xs">/</span>
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`px-3 py-1 text-xs font-mono tracking-wider transition-colors ${
              language === 'id'
                ? 'bg-[#1C1A17] text-[#C6AA7B] border border-[#C6AA7B]/40 font-bold'
                : 'text-[#717171] hover:text-[#F2EFE9]'
            }`}
          >
            ID
          </button>
        </div>
      </div>
    );
  }

  // Default 'nav' variant for desktop header
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#121212]/80 border border-[#262626] backdrop-blur-sm ${className}`}
      title="Switch Language / Ganti Bahasa"
    >
      <Globe className="w-3 h-3 text-[#C6AA7B]/80 mr-0.5" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`text-[11px] font-mono tracking-wider transition-colors py-0.5 px-1 ${
          language === 'en'
            ? 'text-[#C6AA7B] font-bold border-b border-[#C6AA7B]'
            : 'text-[#717171] hover:text-[#F2EFE9]'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-[#333] text-[10px] select-none">|</span>
      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`text-[11px] font-mono tracking-wider transition-colors py-0.5 px-1 ${
          language === 'id'
            ? 'text-[#C6AA7B] font-bold border-b border-[#C6AA7B]'
            : 'text-[#717171] hover:text-[#F2EFE9]'
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        ID
      </button>
    </div>
  );
}

