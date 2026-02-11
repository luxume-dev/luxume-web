'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaClock, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { getCareerById } from '@/services/supabase';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareer() {
      const { data, error } = await getCareerById(id);
      if (!error && data) {
        setJob(data);
      }
      setLoading(false);
    }
    if (id) fetchCareer();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Job not found.</p>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Header */}
      <section 
        className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-8"
        style={{
          backgroundImage: 'url(/images/luxumeteam.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(10, 10, 30, 0.85)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="font-aloevera font-bold text-white text-3xl sm:text-4xl mb-6">
            {job.title}{job.department ? ` - ${job.department}` : ''}
          </h1>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-white/90 text-sm">
            {job.employment_type && (
              <div className="flex items-center gap-2">
                <FaClock className="text-pink-500" />
                <span className="font-lato font-light">{job.employment_type}</span>
              </div>
            )}
            {job.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" />
                <span className="font-lato font-light">{job.location}</span>
              </div>
            )}
            {job.experience && (
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-pink-500" />
                <span className="font-lato font-light">{job.experience}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <section className="bg-white py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Responsibilities</h2>
              
              <ul className="space-y-4">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: '#C83C64' }}
                    />
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Preferred Candidate Profile */}
      {(job.gender || job.age || job.skills || job.experience || job.salary) && (
        <section className="bg-white pb-12 md:pb-16 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preferred Candidate Profile</h2>
              
              <div className="space-y-4">
                {(job.gender || job.age) && (
                  <div className="flex flex-wrap gap-8">
                    {job.gender && (
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">👤</span>
                        <span className="text-gray-700 font-medium">Gender:</span>
                        <span className="text-gray-600">{job.gender}</span>
                      </div>
                    )}
                    {job.age && (
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">👤</span>
                        <span className="text-gray-700 font-medium">Age:</span>
                        <span className="text-gray-600">{job.age}</span>
                      </div>
                    )}
                  </div>
                )}

                {job.skills && (
                  <div className="flex gap-2">
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: '#C83C64' }}
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Skills: </span>
                      <span className="text-gray-600 text-sm">{job.skills}</span>
                    </div>
                  </div>
                )}

                {job.experience && (
                  <div className="flex gap-2">
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: '#C83C64' }}
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Experience: </span>
                      <span className="text-gray-600 text-sm">{job.experience}</span>
                    </div>
                  </div>
                )}

                {job.salary && (
                  <div className="flex gap-2">
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: '#C83C64' }}
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Salary: </span>
                      <span className="text-gray-600 text-sm">{job.salary}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How to Apply Section */}
      {(job.email || job.whatsapp) && (
        <section className="bg-white pb-16 md:pb-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div 
              className="rounded-xl p-6 md:p-10"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h2 className="text-2xl font-semibold text-white mb-4">How to Apply</h2>
              <p className="text-gray-400 text-sm mb-6">
                Interested candidates may send their updated resume via:
              </p>

              <div className="space-y-3 mb-8">
                {job.email && (
                  <div 
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(200, 60, 100, 0.2)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#C83C64' }}
                    >
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400 text-sm">{job.email}</p>
                    </div>
                  </div>
                )}

                {job.whatsapp && (
                  <div 
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(200, 60, 100, 0.2)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#C83C64' }}
                    >
                      <FaWhatsapp className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-gray-400 text-sm">{job.whatsapp}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Apply Now Button */}
              <div className="text-center">
                <button 
                  className="px-8 py-3 rounded-[10px] text-white font-medium transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#C83C64' }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
