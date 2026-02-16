'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getActiveCareers } from '@/services/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JobOpeningsSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    async function fetchCareers() {
      const { data, error } = await getActiveCareers();
      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    }
    fetchCareers();
  }, []);

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
            className="font-aloevera text-3xl sm:text-4xl mb-4 opacity-0"
            style={{ color: '#C83C64', fontWeight: 900 }}
          >
            Current Openings
          </h2>
          <p 
            ref={introRef}
            className="font-lato text-gray-600 text-sm sm:text-base max-w-xl opacity-0" 
            style={{ fontWeight: 500 }}
          >
            Luxume Pvt. Ltd. an upcoming company dealing in building materials, head quartered at Ernakulam, Kerala is looking for an Assistant Manager - Marketing for its operations. The basic Job Description for this position is as mentioned below:
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 text-gray-500">Loading openings...</div>
        )}

        {/* No Openings */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">No openings available at the moment.</div>
        )}

        {/* Job Cards Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div 
                key={job.id}
                ref={el => cardsRef.current[index] = el}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 opacity-0"
              >
                {/* Job Header */}
                <div className="flex justify-between items-start mb-3">
                  <Link href={`/careers/${job.id}`} className="hover:opacity-80">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      {job.title}{job.department ? ` - ${job.department}` : ''}
                    </h3>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </Link>
                  <Link 
                    href={`/careers/${job.id}`}
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#C83C64' }}
                  >
                    Apply Now
                  </Link>
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
