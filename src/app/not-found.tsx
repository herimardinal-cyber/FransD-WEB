import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6 text-center text-[#F2EFE9]">
      <div className="max-w-md space-y-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
          Plate 404 • Void
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-[#F2EFE9]">
          Beyond The Frame
        </h1>
        <p className="text-sm text-[#A7A7A7] leading-relaxed">
          The plate or narrative you are looking for does not exist in this archive or has been repositioned.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(198,170,123,0.2)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

