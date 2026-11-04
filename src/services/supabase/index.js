/**
 * Supabase Services
 * Barrel export for all Supabase-related service functions
 */

export { subscribeToNewsletter } from './newsletter.service';
export { submitContactForm } from './contact.service';
export { getActiveCareers, getCareerById } from './careers.service';
export { getPublishedBlogs, getBlogBySlug } from './blogs.service';

export { submitQuoteRequest } from './quotes.service';
export { getActiveProjects, getActiveProjectsPage, getHomeFeaturedProjects } from './projects.service';
export { getTestimonials } from './testimonials.service';
export {
  getHomePageSeo,
  getAboutPageSeo,
  getBlogPageSeo,
  getCareersPageSeo,
  getProjectPageSeo,
  getBlogPostSeo,
  getCareerSeo,
} from './pageSeo.service';
export { getHomeContent } from './homePage.service';
export { getAboutContent } from './aboutPage.service';
export { getProjectPageContent } from './projectPage.service';
export { getBlogPageContent } from './blogPage.service';
export { getCareersPageContent } from './careersPage.service';
export { getMediaAlts } from './mediaAlt.service';
