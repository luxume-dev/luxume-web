'use client';

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="font-aloevera text-4xl sm:text-5xl mb-4"
            style={{ color: '#C83C64' }}
          >
            Get in Touch
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about our products or need technical specifications? Our team is here to help you find the right roofing solution.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Contact Info Cards */}
          <div className="w-full lg:w-2/5 space-y-4">
            {/* Visit Us Card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Luxume Manufacturing Facility<br />
                    Industrial Park, Sector 42<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sales: +91 22 1234 5678<br />
                    Support: +91 22 8765 4321<br />
                    Toll Free: 1800 123 4567
                  </p>
                </div>
              </div>
            </div>

            {/* Email Us Card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    info@luxume.com<br />
                    sales@luxume.com<br />
                    support@luxume.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaClock className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="w-full lg:w-3/5 border rounded-xl px-10 py-12 md:px-14 md:py-14 border-gray-200">
            <h2 className="font-semibold text-2xl text-gray-800 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                <input 
                  type="text" 
                  placeholder=""
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Message *</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 rounded-lg text-white font-medium transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#0a0a2e' }}
              >
                Send Message
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
