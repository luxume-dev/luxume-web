import Link from 'next/link';

/**
 * Dark image hero shared by the location pages.
 * `crumbs` is [{ label, href? }]; the last crumb is the current page.
 */
export default function LocationHero({ image, eyebrow, heading, description, crumbs = [], children }) {
  return (
    <section className="relative min-h-[420px] lg:min-h-[520px] flex items-center bg-[#1a1b4b]">
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${JSON.stringify(image)})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-lato text-sm text-white/70">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-white mb-4 px-3 py-1 rounded-full bg-[#C83C64]">
            {eyebrow}
          </span>
        )}
        <h1 className="aloevera-bold text-white leading-tight drop-shadow-lg max-w-4xl text-4xl md:text-5xl lg:text-[64px]">
          {heading}
        </h1>
        {description && (
          <p className="font-lato text-white/85 text-lg leading-relaxed max-w-2xl mt-6">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
