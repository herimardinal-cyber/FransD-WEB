'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      // Successful login, redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EFE9] flex flex-col justify-between p-6 sm:p-12 selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* Top Header */}
      <header className="flex justify-between items-center max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-[0.25em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors flex items-center gap-2"
        >
          <span>&larr;</span>
          <span>Return to Portfolio</span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#717171]">
          Sumopod Security Node
        </span>
      </header>

      {/* Main Content Card */}
      <main className="w-full max-w-md mx-auto my-auto py-12">
        <div className="bg-[#121212] border border-[#262626] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C6AA7B] to-transparent opacity-60" />

          {/* Brand & Title */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C6AA7B] block mb-2">
              Private Studio Gateway
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#F2EFE9]">
              Frans Delian
            </h1>
            <p className="text-xs text-[#A7A7A7] mt-2 font-mono uppercase tracking-wider">
              Archive & Content Administration
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-950/40 border border-red-800/60 p-3.5 text-xs text-red-200 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2"
              >
                Admin Identifier
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@fransdelian.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7] mb-2"
              >
                Access Cipher (Password)
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-[#171717] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(198,170,123,0.15)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Studio Archive</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-[#262626]/80 flex items-center justify-center gap-2 text-[11px] font-mono text-[#717171]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6AA7B]" />
            <span>Encrypted Session • Rate Limited</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center max-w-5xl mx-auto w-full text-[11px] font-mono text-[#717171]">
        &copy; {new Date().getFullYear()} Frans Delian Photography. All Rights Reserved.
      </footer>
    </div>
  );
}
