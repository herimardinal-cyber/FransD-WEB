'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    inquiryType: 'Editorial & Assignment',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketId, setTicketId] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic frontend validations
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!formData.subject.trim()) {
      setStatus('error');
      setErrorMessage('Please provide a subject for your inquiry.');
      return;
    }

    if (formData.message.trim().length < 15) {
      setStatus('error');
      setErrorMessage('Please provide more details in your message (minimum 15 characters).');
      return;
    }

    // Simulate backend response
    setStatus('submitting');
    setTimeout(() => {
      // Generated simulated reference ID
      const generatedId = `FD-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      inquiryType: 'Editorial & Assignment',
      subject: '',
      message: '',
    });
    setStatus('idle');
    setTicketId('');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="bg-[#121212] border border-[#C6AA7B]/40 p-8 sm:p-12 text-center flex flex-col items-center max-w-xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#C6AA7B]/15 border border-[#C6AA7B]/40 flex items-center justify-center text-[#C6AA7B] mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C6AA7B] mb-2">
          Inquiry Dispatched (Simulated)
        </span>
        <h3 className="font-serif text-3xl text-[#F2EFE9] mb-4">
          Thank you, {formData.name.split(' ')[0]}
        </h3>
        <p className="text-[#A7A7A7] text-sm leading-relaxed mb-6">
          Your message has been received by Frans Delian Studio. We personally review every inquiry and typically respond within two business days.
        </p>
        <div className="bg-[#171717] border border-[#262626] px-5 py-3 rounded text-xs font-mono text-[#A7A7A7] mb-8">
          Inquiry Reference: <span className="text-[#C6AA7B] font-semibold">{ticketId}</span>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] bg-[#171717] hover:bg-[#262626] text-[#F2EFE9] border border-[#262626] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Send Another Inquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {status === 'error' && errorMessage && (
        <div className="bg-red-950/40 border border-red-800/60 p-4 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
            Full Name <span className="text-[#C6AA7B]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Julian Vance"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm rounded-none focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
            Email Address <span className="text-[#C6AA7B]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="e.g. julian@studio.com"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm rounded-none focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Inquiry Type */}
        <div className="space-y-2">
          <label htmlFor="inquiryType" className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
            Nature of Inquiry
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm rounded-none focus:outline-none transition-colors"
          >
            <option value="Editorial & Assignment">Editorial & Assignment</option>
            <option value="Commercial Campaign">Commercial Campaign</option>
            <option value="Exhibition & Museum Curation">Exhibition & Museum Curation</option>
            <option value="Limited Print Acquisition">Limited Print Acquisition</option>
            <option value="Workshop & Masterclass">Workshop & Masterclass</option>
            <option value="General Conversation">General Conversation</option>
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
            Subject <span className="text-[#C6AA7B]">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Brief subject summary"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] px-4 py-3 text-sm rounded-none focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs uppercase font-mono tracking-wider text-[#A7A7A7]">
          Message & Project Details <span className="text-[#C6AA7B]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Please describe project scope, proposed dates, locations, or print requirements..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full bg-[#121212] border border-[#262626] focus:border-[#C6AA7B] text-[#F2EFE9] p-4 text-sm rounded-none focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Notice */}
      <p className="text-[11px] text-[#717171] leading-relaxed">
        Phase 1 Note: This form performs front-end client verification with simulated dispatch. Database persistence via MySQL/Prisma will be connected in Phase 2.
      </p>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto px-10 py-4 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(198,170,123,0.2)]"
        >
          {status === 'submitting' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

