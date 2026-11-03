'use client';

import Image from 'next/image';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

// The award columns are text columns holding JSON arrays that line up by index.
// Also accepts an already-parsed array or a plain string.
function parseList(value) {
  if (Array.isArray(value)) return value.map((v) => String(v ?? ''));
  if (typeof value !== 'string' || value.trim() === '') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((v) => String(v ?? ''));
  } catch {
    // not JSON: a single plain value
  }
  return [value];
}

// All content comes from the dashboard (home_page recognition_* / award_* fields).
// There are no static fallbacks: empty fields are hidden, and the whole
// section is skipped when there is no label, title, description or award.
export default function AwardsSection({
  label = '',
  title = '',
  description = '',
  awardTitles,
  awardDescriptions,
  awardImages,
}) {
  const getAlt = useAltLookup();

  const titleList = parseList(awardTitles);
  const descriptionList = parseList(awardDescriptions);
  const imageList = parseList(awardImages);
  const count = Math.max(titleList.length, descriptionList.length, imageList.length);
  const awards = Array.from({ length: count }, (_, i) => ({
    title: (titleList[i] ?? '').trim(),
    description: (descriptionList[i] ?? '').trim(),
    image: (imageList[i] ?? '').trim(),
  })).filter((award) => award.title || award.description || award.image);

  if (!label && !title && !description && awards.length === 0) return null;

  // One award is centred, two sit side by side, three or more go 3 per row
  const gridCols =
    awards.length === 1
      ? 'max-w-2xl'
      : awards.length === 2
        ? 'md:grid-cols-2 max-w-5xl'
        : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl';

  return (
    <section className="py-20 px-4 md:px-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {(label || title || description) && (
          <div className={`text-center ${awards.length > 0 ? 'mb-14' : ''}`}>
            {label && (
              <span
                className="inline-block text-sm font-lato font-semibold px-5 py-1.5 rounded-full mb-4 tracking-wide"
                style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}
              >
                {label}
              </span>
            )}
            {title && (
              <h2
                className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4 whitespace-pre-line [&_span]:text-[#C83C64]"
                style={{ color: '#1a1b4b' }}
              >
                {parseHtml(title)}
              </h2>
            )}
            {description && (
              <p className="font-lato text-gray-600 max-w-2xl mx-auto text-base md:text-lg whitespace-pre-line">
                {parseHtml(description)}
              </p>
            )}
          </div>
        )}

        {/* Awards Grid */}
        {awards.length > 0 && (
          <div className={`grid grid-cols-1 gap-8 mx-auto ${gridCols}`}>
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                style={{ border: '1px solid #e5e7eb' }}
              >
                {award.image && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={award.image}
                      alt={getAlt(award.image, award.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {(award.title || award.description) && (
                  <div className="p-5">
                    {award.title && (
                      <h3
                        className="font-aloevera text-lg md:text-xl font-bold mb-1"
                        style={{ color: '#1a1b4b' }}
                      >
                        {award.title}
                      </h3>
                    )}
                    {award.description && (
                      <p className="font-lato text-sm text-gray-500 whitespace-pre-line">
                        {parseHtml(award.description)}
                      </p>
                    )}
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
