import CompanyPage, { companyPageMetadata } from '@/components/CompanyPage';

export const revalidate = 10;

const SLUG = 'privacy-policy';

// Content and SEO are managed from the dashboard (company_page, slug
// 'privacy-policy' -> page_seo). The title and description below are only used until they are saved there.
export function generateMetadata() {
  return companyPageMetadata(SLUG, {
    title: 'Privacy Policy',
    description:
      'How Luxume Roofing collects, uses, and protects your personal information when you use our website or contact us.',
  });
}

export default function PrivacyPolicy() {
  return <CompanyPage slug={SLUG} fallbackTitle="Privacy Policy" />;
}
