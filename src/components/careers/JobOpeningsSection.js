'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActiveCareers } from '@/services/supabase';

export default function JobOpeningsSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="openings" className="bg-white pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-8 mb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 
            className="font-aloevera text-3xl sm:text-4xl mb-4"
            style={{ color: '#C83C64', fontWeight: 900 }}
          >
            Current Openings
          </h2>
          <p className="font-lato text-gray-600 text-sm sm:text-base max-w-xl" style={{ fontWeight: 500 }}>
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
            {jobs.map((job) => (
              <div 
                key={job.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
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
