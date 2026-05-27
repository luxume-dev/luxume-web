'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCareers } from '@/hooks/useCareers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JobOpeningsSection() {
  const { data: jobs = [], isLoading: loading } = useCareers();

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  // Animation Effect
  useEffect(() => {
    if (loading) return; // Wait for content to load

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(introRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Cards Animation (if any exist)
      if (cardsRef.current.length > 0) {
        gsap.fromTo(cardsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1, // Stagger effect
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current[0], // Trigger when first card is near
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, jobs]); // Re-run when loading finishes and jobs change

  return (
    <section id="openings" ref={sectionRef} className="bg-white pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-8 mb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2
            ref={headingRef}
            className="aloevera-bold text-3xl sm:text-4xl mb-4 opacity-0"
            style={{ color: '#C83C64' }}
          >
            Current Openings
          </h2>
          <p
            ref={introRef}
            className="font-lato text-gray-600 text-sm sm:text-base max-w-xl opacity-0 font-medium"
          >
            Luxume Pvt. Ltd., an upcoming company dealing in building materials and headquartered in Ernakulam, Kerala, is always looking for talented individuals to join our growing team. Explore our current openings below and apply to be part of our journey.
          </p>
        </div>

        {/* Loading State — shimmer skeleton */}
        {loading && (
          <>
            <style>{`
              @keyframes shimmer {
                0%   { background-position: -600px 0; }
                100% { background-position:  600px 0; }
              }
              .shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 600px 100%;
                animation: shimmer 1.4s infinite linear;
                border-radius: 8px;
              }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1 mr-4">
                      <div className="shimmer h-5 w-3/4" />
                      <div className="shimmer h-3 w-1/3" />
                    </div>
                    <div className="shimmer h-9 w-24 rounded-lg flex-shrink-0" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="shimmer h-6 w-20 rounded-full" />
                    <div className="shimmer h-6 w-24 rounded-full" />
                    <div className="shimmer h-6 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Openings */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">No openings available at the moment.</div>
        )}

        {/* Job Cards Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                className="block"
              >
                <div
                  ref={el => cardsRef.current[index] = el}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 opacity-0 cursor-pointer"
                >
                  {/* Job Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-1">
                        {job.title}{job.department ? ` - ${job.department}` : ''}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">{job.location}</p>
                    </div>
                    <span
                      className="px-4 py-2 rounded-lg text-white text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#C83C64' }}
                    >
                      Apply Now
                    </span>
                  </div>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-[10px] md:text-xs border border-gray-300 rounded-full text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
