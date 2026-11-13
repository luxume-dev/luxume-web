import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { careersQuery } from '@/lib/queries';
import { getCareersPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getCareersPageContent } from '@/services/supabase';
import AltTextProvider from '@/providers/AltTextProvider';
import CareersHeroSection from '@/components/careers/CareersHeroSection';
import JobOpeningsSection from '@/components/careers/JobOpeningsSection';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';

export const revalidate = 10;

// SEO is managed from the dashboard (careers_page -> page_seo); there are no hard-coded defaults.
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getCareersPageSeoCached(), { path: '/careers' });
  return { ...seo, alternates: { canonical: '/careers' } };
}

export default async function CareersPage() {
  // None of these throw: a failure falls back to client fetching / the default hero / no SEO extras
  const [queryClient, { data: heading }, seo] = await Promise.all([
    prefetch(getQueryClient(), [careersQuery()]),
    getCareersPageContent(),
    getCareersPageSeoCached(),
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          {seo?.schema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
          )}
          {faqSchema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
          )}

          {/* Hero and openings heading come from careers_page (dashboard); an empty field is hidden */}
          <CareersHeroSection
            title={heading?.title?.trim()}
            description={heading?.description?.trim()}
            bannerImage={heading?.banner_image?.trim()}
            buttonLabel={heading?.banner_button_label?.trim()}
          />
          <JobOpeningsSection
            title={heading?.openings_title?.trim()}
            description={heading?.openings_description?.trim()}
          />
          <BottomContent html={seo?.bottom_content} />
          <FaqSection faqs={faqs} />
        </main>
      </HydrationBoundary>
    </AltTextProvider>
  );
}
