import ProfileDetailClient from '@/components/products/ProfileDetailClient';

export const metadata = {
  title: 'Trapezoidal Roofing Profile',
  description:
    'Luxume trapezoidal roofing profile: high-rib colour-coated steel sheets with strong load capacity, fast installation and reliable water drainage.',
  alternates: { canonical: '/profile-detail' },
};

export default function ProfileDetailPage() {
  return <ProfileDetailClient />;
}
