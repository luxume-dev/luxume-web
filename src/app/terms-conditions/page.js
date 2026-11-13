import CompanyPage, { companyPageMetadata } from '@/components/CompanyPage';

export const revalidate = 10;

const SLUG = 'terms-conditions';

// Content and SEO are managed from the dashboard (company_page, slug
// 'terms-conditions' -> page_seo). The title and description below are only used until they are saved there.
export function generateMetadata() {
  return companyPageMetadata(SLUG, {
    title: 'Terms & Conditions',
    description:
      'The terms and conditions governing use of the Luxume Roofing website and the purchase of our steel roofing products.',
  });
}

export default function TermsConditions() {
  return <CompanyPage slug={SLUG} fallbackTitle="Terms & Conditions" />;
}
