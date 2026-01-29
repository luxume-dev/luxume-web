'use client';

import { FaClock, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function JobDetailPage() {
  const job = {
    title: 'JD - Asst. Manager Marketing',
    type: 'Full time',
    location: 'Kochi, Kerala',
    experience: '4 - 5 years in advertising/ brand communication and in conducting BTL activities',
    responsibilities: [
      'Conceive marketing campaigns to promote a brand and contribute towards implementing them for a host of building materials across Kerala.',
      'Organize and conduct marketing activities or events to create brand awareness',
      'Plan multi-media advertising and promotional campaigns for products or services i.e. social media platforms, OOH, print etc. to maximise effectiveness while remaining within the allocated budget',
      'Source relevant vendors and coordinate with them to provide content for updating the Company\'s Website and Social Media campaigns to establish and continuously improve the brand\'s digital presence over a defined period.',
      'Conduct market research to identify opportunities for promotions that induce growth.',
      'Conduct BTL activities like dealer meetings, influencer meets etc. across different geographies and work in tandem with the field sales team in implementing them effectively.',
      'Source relevant vendors for designing, printing, fabricating/producing and wherever applicable erection of collateral such as Dealer Signage, Billboards, Brochures, Flyers, etc.',
      'Collaborate with managers in preparing budgets, monitoring expenses and ensuring the budgets are met.'
    ],
    profile: {
      gender: 'Male',
      age: '30-35 years',
      skills: 'Sound Communication skills with proficiency in English and Malayalam',
      experience: '4 - 5 years in advertising/ brand communication and in conducting BTL activities',
      salary: 'up to 35K based on experience. Expenses on actuals.'
    },
    contact: {
      email: 'info@suntree.co.in',
      whatsapp: '97789 20962'
    }
  };

  return (
    <main>
      {/* Hero Header */}
      <section 
        className="relative py-16 px-4 sm:px-8"
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
          <h1 className="font-aloevera text-white text-3xl sm:text-4xl mb-6 italic">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <FaClock className="text-pink-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-pink-500" />
              <span>{job.experience}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
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

      {/* Preferred Candidate Profile */}
      <section className="bg-white pb-12 md:pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-xl p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preferred Candidate Profile</h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-pink-500">👤</span>
                  <span className="text-gray-700 font-medium">Gender:</span>
                  <span className="text-gray-600">{job.profile.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink-500">👤</span>
                  <span className="text-gray-700 font-medium">Age:</span>
                  <span className="text-gray-600">{job.profile.age}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: '#C83C64' }}
                />
                <div>
                  <span className="text-gray-700 font-medium">Skills: </span>
                  <span className="text-gray-600 text-sm">{job.profile.skills}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: '#C83C64' }}
                />
                <div>
                  <span className="text-gray-700 font-medium">Experience: </span>
                  <span className="text-gray-600 text-sm">{job.profile.experience}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: '#C83C64' }}
                />
                <div>
                  <span className="text-gray-700 font-medium">Salary: </span>
                  <span className="text-gray-600 text-sm">{job.profile.salary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
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
              {/* Email */}
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
                  <p className="text-gray-400 text-sm">{job.contact.email}</p>
                </div>
              </div>

              {/* WhatsApp */}
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
                  <p className="text-gray-400 text-sm">{job.contact.whatsapp}</p>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            <div className="text-center">
              <button 
                className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#C83C64' }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
