'use client';

import { useEffect } from 'react';
import { useQuoteForm } from '@/hooks/useQuoteForm';

export default function RequestQuoteModal({ isOpen, onClose, productName, profileType }) {
  const { formData, isLoading, submitStatus, handleChange, handleSubmit, resetForm } =
    useQuoteForm({ productName, profileType });

  // Auto-close after successful submission
  useEffect(() => {
    if (submitStatus.type === 'success') {
      const t = setTimeout(() => {
        onClose();
        resetForm();
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [submitStatus.type, onClose, resetForm]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-lato text-gray-800 focus:outline-none focus:border-[#C83C64] transition-colors placeholder:text-gray-400';

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'modalSlideIn 0.3s ease' }}
      >
        <style>{`
          @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)   scale(1);    }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-aloevera font-bold text-xl" style={{ color: '#1a1b4b' }}>
              Request a Quote
            </h2>
            {(productName || profileType) && (
              <p className="font-lato text-xs text-gray-400 mt-0.5">
                {[productName, profileType].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success State */}
        {submitStatus.type === 'success' ? (
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#f0fdf4' }}
            >
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-aloevera text-lg font-bold text-gray-800">Request Sent!</h3>
            <p className="font-lato text-sm text-gray-500">{submitStatus.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Error message */}
            {submitStatus.type === 'error' && (
              <p className="text-sm font-lato text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {submitStatus.message}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-lato text-xs font-semibold text-gray-600 mb-1">
                  Full Name <span style={{ color: '#C83C64' }}>*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block font-lato text-xs font-semibold text-gray-600 mb-1">
                  Email <span style={{ color: '#C83C64' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-lato text-xs font-semibold text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block font-lato text-xs font-semibold text-gray-600 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block font-lato text-xs font-semibold text-gray-600 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your project requirements..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-lato font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#C83C64' }}
            >
              {isLoading ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
