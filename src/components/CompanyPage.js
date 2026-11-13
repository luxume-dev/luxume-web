import CompanyPageContent from '@/components/CompanyPageContent';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { getCompanyPage } from '@/services/supabase';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';

/**
 * Company pages (Privacy Policy, Terms & Conditions) are managed from the
 * dashboard: company_page (slug) -> page_seo. There is no built-in text: with
 * no content saved the page shows only its title. The fallback title and
 * metadata passed in are used until they are saved there.
 */

export async function companyPageMetadata(slug, { title, description }) {
  const { data } = await getCompanyPage(slug);
  const path = `/${slug}`;
  return {
    title: data?.title?.trim() || title,
    description: data?.description?.trim() || description,
    ...buildSeoMetadata(data?.page_seo, { path }),
    alternates: { canonical: path },
  };
}

export default async function CompanyPage({ slug, fallbackTitle }) {
  // Never throws: a failure renders the page with just its title
  const { data } = await getCompanyPage(slug);
  const seo = data?.page_seo ?? null;

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {seo?.schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />}

      {/* HTML from the rich-text editor, or blog-style blocks in older rows */}
      <CompanyPageContent
        title={data?.title?.trim() || fallbackTitle}
        description={data?.description}
        content={data?.content}
        updatedAt={data ? data.updated_at ?? data.created_at : null}
      />
      <BottomContent html={seo?.bottom_content} />
      <FaqSection faqs={faqs} />
    </AltTextProvider>
  );
}
