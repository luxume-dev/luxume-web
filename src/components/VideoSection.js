'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/images/luxume-video.mp4';

export default function VideoSection() {
  const videoRef = useRef(null);
  const isVisibleRef = useRef(false);

  // The file is ~1.7MB — by far the largest asset on the page. Holding the src
  // back until the section approaches the viewport means visitors who never
  // scroll this far never pay for it.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start fetching a little before the section is actually visible, so
    // playback is ready by the time the user arrives.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loader.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    loader.observe(video);

    const player = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // No-op until a src exists; onCanPlay covers that case.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    player.observe(video);

    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  // Once the source is ready, start playing if the section is still in view.
  const handleCanPlay = () => {
    if (isVisibleRef.current) {
      videoRef.current?.play().catch(() => {});
    }
  };

  return (
    <section className="bg-[#0a0a1a] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            className="w-full h-auto"
            muted
            loop
            playsInline
            controls
            preload="metadata"
            poster="/images/luxume-hero.webp"
            // src is set rather than a <source> child: React updating the
            // attribute triggers a load, whereas appending <source> would
            // additionally require calling video.load().
            src={shouldLoad ? VIDEO_SRC : undefined}
            onCanPlay={handleCanPlay}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
