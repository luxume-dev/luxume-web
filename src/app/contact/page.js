import ContactSection from '@/components/contact/ContactSection';
import FaqSection from '@/components/FaqSection';
import AltTextProvider from '@/providers/AltTextProvider';
import { getContactPageContent } from '@/services/supabase';
import { getContactPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';

export const revalidate = 10;

// SEO is managed from the dashboard (contact_page -> page_seo) only; nothing is
// filled in here when it is empty.
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getContactPageSeoCached(), { path: '/contact' });
  return {
    ...seo,
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage() {
  // None of these throw: a failure renders the page without the dashboard content / SEO extras
  const [{ data }, seo] = await Promise.all([getContactPageContent(), getContactPageSeoCached()]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main>
        {seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}

        {/* Heading, info cards and form wording come from contact_page (dashboard) */}
        <ContactSection
          title={data?.title?.trim()}
          description={data?.description?.trim()}
          info={data?.info}
          formFields={data?.form_fields}
        />
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
