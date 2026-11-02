'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.gallery, href: '/gallery' },
    { label: t.nav.stories, href: '/stories' },
    { label: t.nav.events, href: '/events' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#262626]/80 py-4 shadow-2xl shadow-black/60'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
            aria-label="Frans Delian Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors duration-300 font-medium">
              Frans Delian
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#A7A7A7] group-hover:text-[#F2EFE9] transition-colors duration-300 -mt-0.5">
              {t.nav.tagline}
            </span>
          </Link>

          {/* Desktop Navigation & Language Switcher */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <nav className="flex items-center space-x-8 lg:space-x-10" aria-label="Main Navigation">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-xs uppercase tracking-[0.22em] transition-colors duration-300 py-1 font-medium ${
                      active ? 'text-[#C6AA7B]' : 'text-[#A7A7A7] hover:text-[#F2EFE9]'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6AA7B] shadow-[0_0_8px_rgba(198,170,123,0.6)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher on Header */}
            <LanguageSwitcher variant="nav" />
          </div>

          {/* Mobile Right Controls: Language & Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher variant="nav" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#222]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6AA7B] font-mono">
              Navigation
            </span>
            <LanguageSwitcher variant="mobile" />
          </div>

          {navItems.map((item, idx) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl tracking-wide transition-all duration-300 flex items-center justify-between ${
                  active ? 'text-[#C6AA7B] pl-2 border-l-2 border-[#C6AA7B]' : 'text-[#F2EFE9] hover:text-[#C6AA7B]'
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[#A7A7A7] tracking-widest">0{idx + 1}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-[#262626] pt-8 flex flex-col space-y-4">
          <div className="flex justify-between items-center text-xs tracking-wider text-[#A7A7A7]">
            <span>{t.contact.title}</span>
            <a
              href="mailto:studio@fransdelian.com"
              className="text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors flex items-center gap-1 font-mono text-xs"
            >
              studio@fransdelian.com
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center space-x-6 text-xs uppercase tracking-widest text-[#A7A7A7] pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C6AA7B] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://500px.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C6AA7B] transition-colors"
            >
              500px
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C6AA7B] transition-colors"
            >
              Behance
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
