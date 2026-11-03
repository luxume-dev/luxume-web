import { getAboutPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { zipLists } from '@/lib/cmsList';
import { getAboutContent } from '@/services/supabase';
import AltTextProvider from '@/providers/AltTextProvider';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutUsSection from '@/components/about/AboutUsSection';
import AboutCoreValuesSection from '@/components/about/AboutCoreValuesSection';
import HowWeWorkSection from '@/components/about/HowWeWorkSection';
import FaqSection from '@/components/FaqSection';

export const revalidate = 3600;

const DEFAULT_METADATA = {
  title: 'About Us',
  description:
    'Learn about Luxume Roofing — our story, our core values, and how we manufacture premium coated steel roofing built for durability and design.',
};

// SEO is managed from the dashboard (about_page -> page_seo); empty fields keep these defaults.
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getAboutPageSeoCached(), { path: '/about' });
  return { ...DEFAULT_METADATA, ...seo, alternates: { canonical: '/about' } };
}

export default async function AboutPage() {
  const [seo, { data: content }] = await Promise.all([getAboutPageSeoCached(), getAboutContent()]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  // Content comes from about_page (dashboard). Empty fields aren't rendered,
  // and a section with nothing filled in is hidden entirely.
  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main>
        {seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}

        <AboutHeroSection
          banner={content?.banner_image?.trim()}
          cards={zipLists({ title: content?.card_title, description: content?.card_description })}
        />
        <AboutUsSection
          title={content?.about_us_title?.trim()}
          description={content?.about_us_description?.trim()}
          image={content?.about_us_image?.trim()}
        />
        <AboutCoreValuesSection
          title={content?.core_value_title?.trim()}
          description={content?.core_value_description?.trim()}
          cards={zipLists({
            title: content?.core_card_title,
            description: content?.core_card_description,
            icon: content?.core_card_icon,
          })}
        />
        <HowWeWorkSection
          title={content?.work_title?.trim()}
          description={content?.work_description?.trim()}
          image={content?.work_image?.trim()}
          points={zipLists({ title: content?.work_point_title, description: content?.work_point_description })}
          bottomText={content?.work_buttom_text?.trim()}
        />
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
