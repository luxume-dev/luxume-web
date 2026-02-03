'use client';

export default function VideoSection() {
  return (
    <section className="bg-[#0a0a1a] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
            controls
            poster="/images/Luxume 1920x1080 1 1.png"
          >
            <source src="/images/LUXUME 20 SEC.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
