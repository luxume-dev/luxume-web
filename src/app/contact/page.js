import ContactSection from '@/components/contact/ContactSection';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Luxume Roofing for product enquiries, dealer partnerships, and project quotes. Call, email, or send us a message.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
