'use client';

import { useState } from 'react';

/**
 * FAQ accordion fed by the dashboard (page_faqs).
 *
 * Answers stay in the DOM while collapsed (hidden with a grid-rows transition,
 * not unmounted) so crawlers see the same text as the FAQPage schema.
 */
export default function FaqSection({ faqs = [], title = 'Frequently Asked Questions' }) {
  const [openId, setOpenId] = useState(null);

  if (!faqs.length) return null;

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-aloevera text-3xl md:text-4xl font-bold text-center mb-10"
          style={{ color: '#1a1a2e' }}
        >
          {title}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white transition-shadow duration-300"
                style={{
                  border: `1px solid ${isOpen ? '#C83C64' : '#e5e7eb'}`,
                  boxShadow: isOpen ? '0 10px 25px -10px rgba(200, 60, 100, 0.25)' : 'none',
                }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-lato font-semibold text-base md:text-lg"
                    style={{ color: '#1a1a2e' }}
                  >
                    <span>{faq.questions}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: '#C83C64' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-lato text-gray-600 text-sm md:text-base whitespace-pre-line">
                      {faq.answers}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
