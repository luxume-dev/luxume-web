import React from 'react';
import CompanyPage, { companyPageMetadata } from '@/components/CompanyPage';

export const revalidate = 3600;

const SLUG = 'terms-conditions';

// Content and SEO are managed from the dashboard (company_page, slug
// 'terms-conditions' -> page_seo). The text below is only used until it is saved there.
export function generateMetadata() {
  return companyPageMetadata(SLUG, {
    title: 'Terms & Conditions',
    description:
      'The terms and conditions governing use of the Luxume Roofing website and the purchase of our steel roofing products.',
  });
}

export default function TermsConditions() {
  return (
    <CompanyPage slug={SLUG} fallbackTitle="Terms & Conditions">
      <BuiltInTermsConditions />
    </CompanyPage>
  );
}

function BuiltInTermsConditions() {
  return (
    <main className="min-h-screen bg-white">

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="aloevera-bold text-4xl sm:text-5xl text-[#0F172B] mb-8">Terms & Conditions</h1>
        <div className="prose prose-lg text-gray-600 font-lato max-w-none">
          <p className="mb-4">Last Updated: February 2026</p>
          <p className="mb-6">
            Welcome to Luxume Roofing. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>
          
          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">1. Use of Website</h2>
          <p className="mb-4">
            You may use our website for lawful purposes only. You agree not to use the site in any way that violates applicable laws or regulations.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">2. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of Luxume Roofing or its content suppliers and is protected by copyright laws.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">3. Disclaimer</h2>
          <p className="mb-4">
            The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no warranties about the completeness, accuracy, reliability, or availability of the website or the information contained on it.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Luxume Roofing be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">5. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms and Conditions at any time. Your continued use of the website after any changes indicates your acceptance of the new terms.
          </p>
        </div>
      </div>

    </main>
  );
}
