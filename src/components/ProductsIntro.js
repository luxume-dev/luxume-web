export default function ProductsIntro({ label, title, description }) {
  if (!label && !title && !description) return null;

  return (
    <section className="w-full py-12 bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        {label && (
          <h3
            className="text-[14px] font-normal tracking-widest uppercase mb-4 font-lato"
            style={{ color: 'var(--primary)' }}
          >
            {label}
          </h3>
        )}

        {title && (
          <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-6" style={{ color: 'var(--secondary)' }}>
            {title}
          </h2>
        )}

        {description && (
          <p
            className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px] mb-8 whitespace-pre-line"
            style={{ color: 'var(--text-description)' }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
