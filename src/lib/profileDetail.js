/**
 * Profile detail page content (/products/<brand>/<profile>), from the `profiles`
 * row. Edited in the dashboard under Products -> Edit Product
 * (sql/2026-11-11_profile_detail.sql). Only saved content is used: empty
 * fields and lists hide their element or section.
 */

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const list = (v) => (Array.isArray(v) ? v : []);

/** Text with blank lines between paragraphs -> ['para 1', 'para 2'] */
export function paragraphs(text) {
  return str(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** profiles row -> the shape ProfileDetailClient renders */
export function profileDetailContent(row) {
  const title = str(row?.title);
  return {
    title,
    description: str(row?.description),
    image: str(row?.image_url),
    overview: {
      label: str(row?.overview_label),
      heading: str(row?.overview_heading),
      lead: str(row?.overview_lead),
      paragraphs: paragraphs(row?.overview_description),
      highlights: list(row?.overview_highlights).map(str).filter(Boolean),
    },
    features: {
      label: str(row?.features_label),
      title: str(row?.features_title).replace(/\{title\}/gi, title),
      items: list(row?.features)
        .map((f) => ({ icon: str(f?.icon), title: str(f?.title), description: str(f?.description) }))
        .filter((f) => f.title || f.description),
    },
    specs: {
      title: str(row?.specs_title),
      items: list(row?.specifications)
        .map((s) => ({ label: str(s?.label), value: str(s?.value) }))
        .filter((s) => s.label || s.value),
    },
    applications: {
      title: str(row?.applications_title),
      items: list(row?.applications).map(str).filter(Boolean),
    },
    gallery: {
      title: str(row?.gallery_title),
      items: list(row?.gallery)
        .map((g) => ({ src: str(g?.src), alt: str(g?.alt) }))
        .filter((g) => g.src),
    },
    about: {
      heading: str(row?.about_heading),
      intro: str(row?.about_intro),
      blocks: list(row?.about_blocks)
        .map((b) => ({ title: str(b?.title), paragraphs: paragraphs(b?.description) }))
        .filter((b) => b.title || b.paragraphs.length),
    },
  };
}
