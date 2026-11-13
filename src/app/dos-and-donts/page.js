import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { getGuidelinePageContent } from '@/services/supabase';
import { getGuidelinePageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';

export const revalidate = 10;

// Content and SEO are managed from the dashboard (guideline_page -> page_seo)
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getGuidelinePageSeoCached(), { path: '/dos-and-donts' });
  return {
    ...seo,
    alternates: { canonical: '/dos-and-donts' },
  };
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const list = (value) => (Array.isArray(value) ? value.map(text).filter(Boolean) : []);

// Empty fields hide their part of the page
function pageContent(data) {
  const content = data?.content && typeof data.content === 'object' ? data.content : {};
  const cta = content.cta && typeof content.cta === 'object' ? content.cta : {};
  return {
    label: text(data?.label),
    title: text(data?.title),
    description: text(data?.description),
    card_text: text(data?.card_text),
    dos: list(content.dos),
    donts: list(content.donts),
    cta: {
      title: text(cta.title),
      description: text(cta.description),
      button_label: text(cta.button_label),
      button_link: text(cta.button_link),
    },
  };
}

const isExternal = (href) => /^https?:\/\//i.test(href);

export default async function DosAndDontsPage() {
  // None of these throw: a failure renders the page with the defaults / without the SEO extras
  const [{ data }, seo] = await Promise.all([getGuidelinePageContent(), getGuidelinePageSeoCached()]);
  const page = pageContent(data);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);
  const hasLists = page.dos.length > 0 || page.donts.length > 0;
  const bothLists = page.dos.length > 0 && page.donts.length > 0;

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main className="bg-white min-h-screen">
        {seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}

        {/* Hero */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-4 py-28 md:py-36 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1b4b 0%, #2d2f6b 60%, #C83C64 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: '#C83C64' }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: '#ffffff' }} />

          {page.label && (
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-lato font-semibold tracking-widest uppercase text-white/70 border border-white/20 mb-5">
              {page.label}
            </span>
          )}
          {page.title && (
            <h1 className="font-aloevera font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {page.title}
            </h1>
          )}
          {page.description && (
            <p className="font-lato text-white/70 max-w-xl text-base md:text-lg whitespace-pre-line">
              {page.description}
            </p>
          )}
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Intro card */}
            {page.card_text && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-14 text-center">
                <p className="font-lato text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                  {page.card_text}
                </p>
              </div>
            )}

            {/* Two-column grid */}
            {hasLists && (
              <div className={`grid grid-cols-1 gap-8 ${bothLists ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>

                {/* Do's */}
                {page.dos.length > 0 && (
                  <div className="rounded-2xl overflow-hidden border border-green-100 shadow-sm">
                    {/* Column header */}
                    <div className="flex items-center gap-3 px-6 py-5" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="font-aloevera font-bold text-2xl md:text-3xl text-green-700">Do&apos;s</h2>
                    </div>

                    {/* Items */}
                    <div className="bg-white divide-y divide-gray-50">
                      {page.dos.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 px-6 py-5 hover:bg-green-50/40 transition-colors">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Don'ts */}
                {page.donts.length > 0 && (
                  <div className="rounded-2xl overflow-hidden border border-red-100 shadow-sm">
                    {/* Column header */}
                    <div className="flex items-center gap-3 px-6 py-5" style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C83C64' }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h2 className="font-aloevera font-bold text-2xl md:text-3xl" style={{ color: '#C83C64' }}>Don&apos;ts</h2>
                    </div>

                    {/* Items */}
                    <div className="bg-white divide-y divide-gray-50">
                      {page.donts.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 px-6 py-5 hover:bg-red-50/40 transition-colors">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center mt-0.5" style={{ borderColor: '#C83C64' }}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#C83C64' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom CTA */}
            {page.cta.title && (
              <div
                className="mt-14 rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
                style={{ background: 'linear-gradient(135deg, #1a1b4b, #2d2f6b)' }}
              >
                <div>
                  <h3 className="font-aloevera font-bold text-xl md:text-2xl text-white mb-2">
                    {page.cta.title}
                  </h3>
                  {page.cta.description && (
                    <p className="font-lato text-white/60 text-sm">{page.cta.description}</p>
                  )}
                </div>
                {page.cta.button_label && page.cta.button_link && (
                  <Link
                    href={page.cta.button_link}
                    {...(isExternal(page.cta.button_link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex-shrink-0 inline-block px-8 py-3 rounded-xl font-lato font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C83C64' }}
                  >
                    {page.cta.button_label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        <BottomContent html={seo?.bottom_content} />
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
