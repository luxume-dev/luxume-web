import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { homeFeaturedProjectsQuery, testimonialsQuery } from '@/lib/queries';
import { getHomePageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getHomeContent } from '@/services/supabase';
import AltTextProvider from '@/providers/AltTextProvider';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import ProjectsSection from '@/components/ProjectsSection';
import VideoSection from '@/components/VideoSection';
import ProductHighlightsSection from '@/components/ProductHighlightsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AwardsSection from '@/components/AwardsSection';
import FaqSection from '@/components/FaqSection';
import DownloadsAndResources from '@/components/DownloadsAndResources';

export const revalidate = 3600;

// SEO is managed from the dashboard (home_page -> page_seo); empty fields keep the layout defaults.
export async function generateMetadata() {
  return buildSeoMetadata(await getHomePageSeoCached(), { path: '/' });
}

export default async function Home() {
  // Featured Projects and Testimonials both fetched client-side, so the
  // homepage shipped skeletons to crawlers. Prefetch them here instead.
  const [queryClient, seo, { data: content }] = await Promise.all([
    prefetch(getQueryClient(), [homeFeaturedProjectsQuery(), testimonialsQuery()]),
    getHomePageSeoCached(),
    getHomeContent(),
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <AltTextProvider alts={buildAltMap(seo)}>
    <main>
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      {/* Hero content comes from home_page (dashboard); empty fields fall back
          to the SEO head text, then to the static defaults in HeroSection. */}
      <HeroSection
        heading={content?.hero_title?.trim() || seo?.head_text?.trim()}
        text={seo?.body_text?.trim()}
        banner={content?.hero_banner?.trim()}
        buttonLabel={content?.hero_button_label?.trim()}
        buttonLink={content?.hero_button_link?.trim()}
      />

      <div className="relative w-full mt-[100vh] bg-white">
        {/* Smart Home intro + progress block come from home_page (dashboard);
            there are no static fallbacks, an empty field hides its element. */}
        <AboutSection
          title={content?.smart_home_title?.trim()}
          description={content?.smart_home_description?.trim()}
        />
        <StatsSection
          titles={content?.progress_title}
          labels={content?.progress_label}
          image={content?.progress_image?.trim()}
        />
        <CoreValuesSection
          title={content?.core_value_title?.trim()}
          description={content?.core_value_description?.trim()}
          cardTitles={content?.core_value_card_title}
          cardDescriptions={content?.core_value_card_description}
          icons={content?.core_value_icon}
        />
        {/* Coated Steel Layers content comes from home_page (dashboard); there
            are no static fallbacks, an empty field hides its element. */}
        <CoatedSteelSection
          label={content?.coated_steel_label?.trim()}
          title={content?.coated_steel_title?.trim()}
          description={content?.coated_steel_description?.trim()}
          images={content?.coated_steel_images}
          imageLabels={content?.coated_steel_img_label}
        />
        {/* Heading comes from home_page (dashboard); the cards are the active
            projects marked "Show on Home Page" (projects.is_home_featured). */}
        <ProjectsSection
          label={content?.project_label?.trim()}
          title={content?.project_title?.trim()}
          description={content?.project_description?.trim()}
        />
        {/* Video and Product Highlights come from home_page (dashboard); there
            are no static fallbacks, an empty field hides its element. */}
        <VideoSection src={content?.home_video?.trim()} />
        <ProductHighlightsSection
          title={content?.hlghlight_title?.trim()}
          description={content?.hlghlight_description?.trim()}
          cardTitles={content?.hlghlight_card_title}
          cardDescriptions={content?.hlghlight_card_description}
          icons={content?.hlghlight_card_icon}
        />
        {/* Headings come from home_page (dashboard); the testimonials are the
            active ones picked on the dashboard Home Page (is_home_featured). */}
        <TestimonialsSection
          title={content?.testimonial_title?.trim()}
          description={content?.testimonial_description?.trim()}
          textTitle={content?.testimonial_text_title?.trim()}
          shortText={content?.testimonial_short_text?.trim()}
        />
        {/* Recognition content comes from home_page (dashboard); there are no
            static fallbacks, an empty field hides its element. */}
        <AwardsSection
          label={content?.recognition_label?.trim()}
          title={content?.recognition_title?.trim()}
          description={content?.recognition_description?.trim()}
          awardTitles={content?.award_title}
          awardDescriptions={content?.award_description}
          awardImages={content?.award_image}
        />
        <FaqSection faqs={faqs} />
        <DownloadsAndResources />
      </div>
    </main>
    </AltTextProvider>
    </HydrationBoundary>
  );
}
