import React from 'react';


export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Luxume Roofing collects, uses, and protects your personal information when you use our website or contact us.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="aloevera-bold text-4xl sm:text-5xl text-[#0F172B] mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 font-lato max-w-none">
          <p className="mb-4">Last Updated: February 2026</p>
          <p className="mb-6">
            At Luxume Roofing, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
          
          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you fill out contact forms, subscribe to our newsletter, or request a quote. This may include your name, email address, phone number, and any other details you choose to share.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Send you newsletters, updates, and promotional materials (if you have opted in).</li>
            <li>Improve our website and services based on user feedback and analytics.</li>
          </ul>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">4. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-medium text-[#0F172B]">
            Email: info@luxume.in<br />
            Phone: +91 97785 57752
          </p>
        </div>
      </div>

    </main>
  );
}
