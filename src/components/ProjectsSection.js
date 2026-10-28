'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { useAltLookup } from '@/providers/AltTextProvider';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

// Fallback image if a project doesn't have an image_url
const FALLBACK_IMAGE = '/images/roof.jpg';
export default function ProjectsSection({ limit = 6, showViewAll = true }) {
  const { data: projectsData, isLoading, isError } = useProjects();
  const getAlt = useAltLookup();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#C83C64]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h5 className="text-[#C83C64] uppercase tracking-widest font-medium text-sm mb-4">Portfolio</h5>
            <h2 className="aloevera-light text-4xl md:text-5xl lg:text-6xl text-[#0a0a1a] mb-6">
              Featured <span className="font-medium">Projects</span>
            </h2>
            <p className="font-lato text-gray-600 text-lg">
              Explore our diverse range of structural installations showcasing the strength, durability, and aesthetic perfection of Luxume premium roofing solutions.
            </p>
          </motion.div>
        </div>

        {/* Loading State - Shimmer Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-2xl h-[400px] w-full bg-gray-200 animate-pulse relative overflow-hidden"
              >
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Bottom content skeleton */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900/60 to-transparent">
                  <div className="h-6 w-3/4 bg-gray-300 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-red-500 font-lato">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && projectsData?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-lato">No active projects found.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !isError && projectsData?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.slice(0, limit || projectsData.length).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-[400px]"
              >
                {/* Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={project.image_url || FALLBACK_IMAGE}
                    alt={getAlt(project.image_url || FALLBACK_IMAGE, project.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20">
                  <div className="bg-gradient-to-t from-[#0B1120] via-[#0B1120]/90 to-transparent pt-32 pb-8 px-8">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="aloevera-medium text-white text-xl md:text-2xl mb-2">{project.title}</h3>
                      {project.location && (
                        <div className="flex items-center text-gray-300 font-lato text-sm mb-4">
                          <FaMapMarkerAlt className="text-[#C83C64] mr-2" />
                          {project.location}
                        </div>
                      )}
                    </div>

                    {/* Expanded description (hidden by default, reveals smoothly on hover) */}
                    <div className="overflow-hidden transition-all duration-500 ease-out opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40">
                      <p className="font-lato text-gray-400 text-sm leading-relaxed mb-0">
                        {project.description || 'View details of this project.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {showViewAll && !isLoading && !isError && projectsData?.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center text-white aloevera-medium rounded-full transition-all hover:bg-opacity-90 hover:-translate-y-1 shadow-md"
              style={{ padding: '12px 32px', backgroundColor: '#C83C64', fontSize: '18px' }}
            >
              View All Projects
              <FaArrowRight className="ml-3" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
