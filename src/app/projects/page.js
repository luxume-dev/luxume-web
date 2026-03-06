'use client';

import { useQuery } from '@tanstack/react-query';
import { getActiveProjects } from '@/services/supabase';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const FALLBACK_IMAGE = '/images/roof.jpg';

export default function ProjectsPage() {
    const { data: projectsData, isLoading, isError } = useQuery({
        queryKey: ['projects', 'active'],
        queryFn: async () => {
            const { data, error } = await getActiveProjects();
            if (error) throw new Error(error);
            return data || [];
        },
    });

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-24">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-gray-50 -z-10" />
            <div className="absolute -left-40 top-40 w-96 h-96 bg-[#C83C64]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h5 className="text-[#C83C64] uppercase tracking-widest font-medium text-sm mb-4">Portfolio</h5>
                        <h1 className="aloevera-light text-4xl md:text-5xl lg:text-6xl text-[#0a0a1a] mb-6">
                            Our <span className="font-medium">Projects</span>
                        </h1>
                        <p className="font-lato text-gray-600 text-lg">
                            Explore our complete collection of structural installations showcasing the strength, durability, and aesthetic perfection of Luxume premium roofing solutions.
                        </p>
                    </motion.div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={`skeleton-${index}`} className="rounded-2xl h-[400px] w-full bg-gray-200 animate-pulse relative overflow-hidden" />
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
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl flex flex-col h-auto md:h-[400px] transition-all duration-500"
                            >
                                {/* Image Container - fixed height on mobile, absolute full coverage on md+ */}
                                <div className="relative w-full h-[250px] md:h-full md:absolute md:inset-0 md:z-0 overflow-hidden">
                                    <div className="hidden md:block absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <Image
                                        src={project.image_url || FALLBACK_IMAGE}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                                    />
                                </div>

                                {/* Content Overlay/Section */}
                                {/* On mobile: static block below image. On md+: absolute overlay like on home page */}
                                <div className="flex-1 bg-white md:bg-transparent md:absolute md:inset-x-0 md:bottom-0 md:z-20 relative z-20">
                                    <div className="p-6 md:pt-32 md:pb-8 md:px-8 md:bg-gradient-to-t from-[#0B1120] via-[#0B1120]/90 to-transparent flex flex-col h-full justify-end">
                                        <div className="md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <h3 className="aloevera-medium text-gray-900 md:text-white text-xl md:text-2xl mb-2">{project.title}</h3>
                                            {project.location && (
                                                <div className="flex items-center text-gray-500 md:text-gray-300 font-lato text-sm mb-4">
                                                    <FaMapMarkerAlt className="text-[#C83C64] mr-2" />
                                                    {project.location}
                                                </div>
                                            )}
                                        </div>

                                        {/* Expanded description on md+, visible on mobile */}
                                        <div className="mt-2 md:mt-0 md:overflow-hidden md:transition-all md:duration-500 md:ease-out md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-40">
                                            <p className="font-lato text-gray-600 md:text-gray-400 text-sm leading-relaxed mb-0">
                                                {project.description || 'View details of this project.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
