import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Guarantee Terms & Conditions',
  description: '10-year limited guarantee for Luxume colour coated roofing and cladding products. Read the full terms and conditions.',
  alternates: { canonical: '/guarantee' },
};

/* ─── Content Data ─────────────────────────────────────────────── */

const warrantyIntro = {
  body: 'LUXUME hereby provides limited GUARANTEE to genuine buyers of colour coated coil/sheet for roofing and cladding application, from the date mentioned in the purchase invoice from authorised dealers, provided terms and conditions mentioned below are found in compliance. This Limited Guarantee applies to pre-painted products supplied by LUXUME, using the RMP paint system — 10 years against perforation for Luxume and 15 years against perforation for Luxume Plus. No previous guarantee shall apply to such product.',
};

const definitions = [
  {
    term: 'Film Integrity',
    definition:
      'Defined as the absence of peeling, chalking, chipping or cracking, except for such crazing or slight cracking as may occur on tightly roll-formed edges or brake bends at the time of forming pre-painted sheet.',
  },
  {
    term: 'Color Change',
    definition:
      'Defined as freedom from fade or change as warranted in ΔE Units calculated in accordance with ASTM D2244-93, CIEL a B", 10° Observer, secular included. Color Change is measured on an exposed painted surface that has been cleaned of surface soils and chalk and then compared to corresponding values measured on the original or unexposed coated surface.',
  },
  {
    term: 'Chalk / Oxidation',
    definition:
      'Defined as a numerical rating as warranted then measured in accordance with the standard procedures specified in ASTMD421789.',
  },
];

const generalTerms = [
  'Guarantee is not applicable if guard film is not removed at the time of installation.',
  'End user customer must clean the installed sheets on a regular 6-month basis.',
  'The coated metal must not be cleaned with abrasive or chemical cleaners and subjected to water infiltration due to improper packaging.',
  'Claims under this limited guarantee must be sent by the guarantee holder in writing to LUXUME and must be received within thirty (30) days after discovery of the initial condition giving rise to the claim.',
  'The exclusive remedy under this guarantee shall be, at the sole discretion of LUXUME, to either repaint the products or provide free of charge replacements (but not installation) for the products.',
  'LUXUME extends this guarantee solely to the original purchaser of the product. This Guarantee is non-transferable and non-assignable.',
  'No terms or conditions other than those stated herein shall be binding on LUXUME unless made in writing and signed by its authorised representative.',
  'This guarantee shall be governed by Indian regulations. Any litigation or dispute will be settled by the law Court of Ernakulam, India.',
];

const claimDocs = [
  'Purchase Receipt.',
  'Duly stamped Guarantee Certificate.',
];

const conditions = [
  'The limited guarantee shall extend for utilisation within 6 months from the date of shipment or 3 months after application, whichever occurs first.',
  'Non-uniform colour changes from unequal exposure to sunlight are not covered unless such change meets the definition of Color Change above.',
  'The durability of the paint is up to 10 years for residential, commercial and school buildings in rural or residential areas. This guarantee excludes industrial steel mills, power generating stations, oil fields, oil refineries, ore mines, chemical plants, paper mills, chimneys, or other unusual environmental exposure, or severe marine environments within 5,000 feet from salt water.',
  'The guarantee is valid and applicable for roofing and cladding end application only; wherein the installation is at an incline of not more than 75° from the vertical.',
];

const notCovered = [
  'Damage due to improper storage, packaging, handling, shipping, processing or installation.',
  'Improper forming, fabrication, cut edge exposure, corrosion of substrate or any coating degradation caused by deficiencies in metal pre-treatment.',
  'Acts of God, falling objects, external forces, explosions, fire, riots, civil commotions, acts of war, radiation, or similar occurrences beyond LUXUME\'s control.',
  'Contact with animals and/or animal waste, decomposed products, chemical fumes, or cement products.',
  'Deterioration caused by use of improper fastener material other than AS 3566 Class ¾ or equivalent.',
  'Damages occasioned, directly or indirectly, by moisture or other contamination due to improper storage prior to installation.',
];

const voidConditions = [
  'The product is stored or installed in a way which allows contact with animals and/or animal waste or chemical fumes or cement products.',
  'Deterioration caused by corrosive chemicals, improper fastener material, failure to remove debris, failure to provide free drainage of water including internal condensation from all surfaces, or misuse, wilful act or negligence.',
];

/* ─── Helper Components ─────────────────────────────────────────── */
function SectionCard({ title, accent = '#1a1b4b', children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-l-4" style={{ borderColor: accent, backgroundColor: '#f8f9fc' }}>
        <h2 className="font-aloevera font-bold text-lg md:text-xl" style={{ color: accent }}>{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function BulletItem({ text, icon = 'dot', color = '#1a1b4b' }) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
        style={{ backgroundColor: color + '18' }}
      >
        {icon === 'check' ? (
          <svg className="w-3 h-3" fill="none" stroke={color} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : icon === 'x' ? (
          <svg className="w-3 h-3" fill="none" stroke={color} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        )}
      </span>
      <span className="font-lato text-gray-700 text-sm leading-relaxed">{text}</span>
    </li>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function WarrantyPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1b4b 0%, #2d2f6b 60%, #C83C64 100%)' }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: '#C83C64' }} />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: '#ffffff' }} />

        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-lato font-semibold tracking-widest uppercase text-white/70 border border-white/20 mb-5">
          Product Assurance
        </span>
        <h1 className="font-aloevera font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Guarantee
        </h1>
        <p className="font-lato text-white/70 max-w-xl text-base md:text-lg">
          Terms &amp; Conditions for Luxume colour coated roofing and cladding products.
        </p>


      </section>

      {/* Guarantee Image */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 -mt-1 pt-12">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <Image
            src="/images/warranty-both.png"
            alt="Luxume Guarantee Certificate"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Intro banner */}
          <div className="rounded-2xl p-6 md:p-8 text-center" style={{ backgroundColor: '#1a1b4b' }}>
            <p className="font-lato text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              {warrantyIntro.body}
            </p>
          </div>

          {/* Definitions */}
          <SectionCard title="Definitions" accent="#C83C64">
            <div className="space-y-4">
              {definitions.map((d, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: '#C83C64' }} />
                  </div>
                  <div>
                    <span className="font-lato font-bold text-gray-800 text-sm">{d.term}: </span>
                    <span className="font-lato text-gray-600 text-sm leading-relaxed">{d.definition}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* General Terms */}
          <SectionCard title="Terms & Conditions" accent="#1a1b4b">
            <ul className="space-y-0">
              {generalTerms.map((t, i) => (
                <BulletItem key={i} text={t} icon="check" color="#1a1b4b" />
              ))}
            </ul>
          </SectionCard>

          {/* Claim Documents */}
          <SectionCard title="Required Documents for Claims" accent="#2BBAA4">
            <p className="font-lato text-gray-600 text-sm mb-4">
              In the event of a claim under this limited guarantee, the purchaser must provide the original copy of:
            </p>
            <ul className="space-y-0">
              {claimDocs.map((d, i) => (
                <BulletItem key={i} text={d} icon="check" color="#2BBAA4" />
              ))}
            </ul>
          </SectionCard>

          {/* Conditions */}
          <SectionCard title="Conditions" accent="#1a1b4b">
            <ul className="space-y-0">
              {conditions.map((c, i) => (
                <BulletItem key={i} text={c} color="#1a1b4b" />
              ))}
            </ul>
          </SectionCard>

          {/* Not Covered */}
          <SectionCard title="Not Covered Under This Guarantee" accent="#C83C64">
            <p className="font-lato text-gray-600 text-sm mb-4">
              This limited guarantee does not extend to or cover:
            </p>
            <ul className="space-y-0">
              {notCovered.map((n, i) => (
                <BulletItem key={i} text={n} icon="x" color="#C83C64" />
              ))}
            </ul>
          </SectionCard>

          {/* Guarantee Void */}
          <SectionCard title="Guarantee Void If" accent="#C83C64">
            <ul className="space-y-0">
              {voidConditions.map((v, i) => (
                <BulletItem key={i} text={v} icon="x" color="#C83C64" />
              ))}
            </ul>
          </SectionCard>

          {/* Congratulations / Footer note */}
          <div
            className="rounded-2xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, #1a1b4b, #2d2f6b)' }}
          >
            <div>
              <p className="font-aloevera font-bold text-xl text-white mb-1">
                Congratulations on becoming a LUXUME customer!
              </p>
              <p className="font-lato text-white/60 text-sm">
                We&apos;re committed to standing behind the quality of every product we make.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-block px-8 py-3 rounded-xl font-lato font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
