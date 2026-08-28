// The projects page itself is a client component, so its metadata lives here.
export const metadata = {
  title: 'Projects',
  description:
    'See Luxume steel roofing in place — completed residential, commercial, and industrial projects showcasing our profiles, finishes, and colour range.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsLayout({ children }) {
  return children;
}
