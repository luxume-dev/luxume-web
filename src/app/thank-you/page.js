import Link from 'next/link';

export const metadata = {
  title: 'Thank You',
  description: 'Thanks for reaching out to Luxume Roofing. Our team will be in touch shortly.',
  robots: { index: false, follow: false },
};

// Copy per form. `?type=` is set by the form hooks after a successful submit.
const VARIANTS = {
  contact: {
    eyebrow: 'Message received',
    title: ['Thank you,', 'we’ve got it covered.'],
    body: 'Your message is safely with our team. A Luxume specialist will get back to you within one business day.',
    steps: ['Our team reviews your message', 'A specialist reaches out to you', 'We help you find the right roof'],
  },
  quote: {
    eyebrow: 'Quote request received',
    title: ['Your quote is', 'on its way.'],
    body: 'We’re reviewing your requirements and preparing pricing tailored to your project. Expect to hear from us within one business day.',
    steps: ['We review your requirements', 'We prepare a tailored quote', 'A specialist walks you through it'],
  },
  newsletter: {
    eyebrow: 'You’re subscribed',
    title: ['Welcome under', 'the Luxume roof.'],
    body: 'You’ll be the first to hear about new profiles, colours, project stories and roofing tips — no clutter, just the good stuff.',
    steps: null,
  },
};

// ---------------------------------------------------------------------------
// Scene geometry (SVG user units, viewBox 600 x 420): the same gable roof as
// the 404 page, now complete, with a seal of approval rising over the ridge.
// ---------------------------------------------------------------------------
const EAVE_LEFT = 90;
const EAVE_RIGHT = 510;
const EAVE_Y = 310;
const APEX = { x: 300, y: 170 };
const PANEL_W = 21;
const PANELS = Array.from(
  { length: (EAVE_RIGHT - EAVE_LEFT) / PANEL_W },
  (_, i) => EAVE_LEFT + i * PANEL_W
);
const ROOF_POINTS = `${EAVE_LEFT},${EAVE_Y} ${APEX.x},${APEX.y} ${EAVE_RIGHT},${EAVE_Y}`;
const SEAL = { x: 300, y: 92, r: 46 };

// Fixed positions so server and client markup agree
const STARS = [
  [6, 12, 2, 0], [14, 34, 1, 1.2], [22, 8, 1.5, 2.1], [31, 22, 1, 0.6],
  [42, 6, 2, 1.8], [55, 16, 1, 0.3], [63, 4, 1.5, 2.6], [71, 28, 1, 1.1],
  [79, 10, 2, 0.9], [88, 24, 1, 2.3], [94, 6, 1.5, 1.5], [9, 48, 1, 2.8],
  [91, 44, 1, 0.4], [4, 70, 1.5, 1.9], [96, 66, 1, 1.3], [48, 30, 1, 2.4],
];
// Sparks bursting from the seal: [angle deg, distance, size, colour]
const SPARKS = Array.from({ length: 14 }, (_, i) => [
  (360 / 14) * i + (i % 2 ? 8 : 0),
  i % 2 ? 78 : 64,
  i % 3 === 0 ? 3.5 : 2.5,
  ['#FFD39A', '#C83C64', '#E9ECF5'][i % 3],
]);

function Scene() {
  return (
    <svg viewBox="0 0 600 420" className="relative w-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="ty-roof">
          <polygon points={ROOF_POINTS} />
        </clipPath>
        <pattern id="ty-rib" width="7" height="10" patternUnits="userSpaceOnUse">
          <rect width="7" height="10" fill="#B8345B" />
          <rect width="2" height="10" fill="#E0638A" />
          <rect x="2" width="1" height="10" fill="#7E1F3D" />
        </pattern>
        <linearGradient id="ty-sheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="ty-glint" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ty-window" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFE2B0" />
          <stop offset="1" stopColor="#F4A259" />
        </linearGradient>
        <linearGradient id="ty-steel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E9ECF5" />
          <stop offset="1" stopColor="#9AA1B9" />
        </linearGradient>
        <radialGradient id="ty-halo">
          <stop offset="0" stopColor="#FFD39A" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#C83C64" stopOpacity="0.15" />
          <stop offset="1" stopColor="#C83C64" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ty-seal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#E0638A" />
          <stop offset="1" stopColor="#A82E52" />
        </linearGradient>
        <radialGradient id="ty-spill" cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#FFCF8A" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFCF8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground + warm light spilling from the house */}
      <ellipse cx="300" cy="404" rx="270" ry="12" fill="#000" opacity="0.25" />
      <ellipse className="ty-glow" cx="300" cy="400" rx="230" ry="26" fill="url(#ty-spill)" />

      {/* Walls, lit windows and door */}
      <rect x="125" y={EAVE_Y} width="350" height="90" fill="#262A6B" />
      {[322, 334, 346, 358, 370, 382].map((y) => (
        <line key={y} x1="125" x2="475" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.04" />
      ))}
      {[160, 390].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="326" width="58" height="48" rx="2" fill="#1A1D52" />
          <rect
            className="ty-light"
            x={x}
            y="330"
            width="50"
            height="40"
            fill="url(#ty-window)"
            style={{ animationDelay: `${1.6 + i * 0.25}s` }}
          />
          <line x1={x + 25} x2={x + 25} y1="330" y2="370" stroke="#1A1D52" strokeWidth="3" />
          <line x1={x} x2={x + 50} y1="350" y2="350" stroke="#1A1D52" strokeWidth="3" />
        </g>
      ))}
      <rect x="280" y="338" width="40" height="62" rx="2" fill="#C83C64" />
      <circle cx="311" cy="370" r="2" fill="#FFD39A" />

      {/* Complete roof: every panel drops in, then a glint sweeps across */}
      <polygon points={ROOF_POINTS} fill="#12143D" />
      <g clipPath="url(#ty-roof)">
        {PANELS.map((x, i) => (
          <g key={x} className="ty-panel" style={{ animationDelay: `${0.15 + i * 0.04}s` }}>
            <rect x={x} y={APEX.y - 2} width={PANEL_W} height={EAVE_Y - APEX.y + 2} fill="url(#ty-rib)" />
            <rect
              x={x}
              y={APEX.y - 2}
              width={PANEL_W}
              height={EAVE_Y - APEX.y + 2}
              fill={x >= APEX.x ? '#000' : '#fff'}
              fillOpacity={x >= APEX.x ? 0.22 : 0.05}
            />
            <rect x={x} y={APEX.y - 2} width={PANEL_W} height={EAVE_Y - APEX.y + 2} fill="url(#ty-sheen)" />
            <line x1={x} x2={x} y1={APEX.y} y2={EAVE_Y} stroke="#5E1630" strokeOpacity="0.6" />
          </g>
        ))}
        <rect className="ty-glint" x="-120" y={APEX.y - 10} width="90" height="160" fill="url(#ty-glint)" />
      </g>

      {/* Trim, ridge cap and gutter */}
      <polyline points={ROOF_POINTS} fill="none" stroke="url(#ty-steel)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M${APEX.x - 16} ${APEX.y + 11} L${APEX.x} ${APEX.y - 2} L${APEX.x + 16} ${APEX.y + 11}`} fill="none" stroke="#E9ECF5" strokeWidth="5" strokeLinejoin="round" />
      <rect x={EAVE_LEFT - 8} y={EAVE_Y - 1} width={EAVE_RIGHT - EAVE_LEFT + 16} height="7" rx="3" fill="url(#ty-steel)" />

      {/* Seal of approval over the ridge */}
      <g className="ty-seal">
        <circle className="ty-halo" cx={SEAL.x} cy={SEAL.y} r={SEAL.r * 2.4} fill="url(#ty-halo)" />
        {SPARKS.map(([a, d, s, c]) => (
          <g key={a} transform={`translate(${SEAL.x} ${SEAL.y}) rotate(${a})`}>
            <circle className="ty-spark" cx={d} cy="0" r={s} fill={c} style={{ '--d': `${d * 0.35}px` }} />
          </g>
        ))}
        <g className="ty-float">
          <circle cx={SEAL.x} cy={SEAL.y} r={SEAL.r + 8} fill="none" stroke="#ffffff" strokeOpacity="0.15" />
          <circle
            className="ty-ring"
            cx={SEAL.x}
            cy={SEAL.y}
            r={SEAL.r + 8}
            fill="none"
            stroke="#FFD39A"
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeDasharray="2 7"
          />
          <circle cx={SEAL.x} cy={SEAL.y} r={SEAL.r} fill="url(#ty-seal)" />
          <circle cx={SEAL.x} cy={SEAL.y} r={SEAL.r - 6} fill="none" stroke="#ffffff" strokeOpacity="0.25" />
          <path
            className="ty-check"
            d={`M${SEAL.x - 18} ${SEAL.y + 1} L${SEAL.x - 5} ${SEAL.y + 14} L${SEAL.x + 20} ${SEAL.y - 12}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
          />
        </g>
      </g>
    </svg>
  );
}

export default async function ThankYouPage({ searchParams }) {
  const { type } = (await searchParams) ?? {};
  const v = VARIANTS[type] ?? VARIANTS.contact;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14163F] text-white">
      <style>{`
        /* Full-bleed scene: hide the site navbar/footer while this page is shown */
        [data-site-nav], [data-site-footer] { display: none; }

        .ty-panel { transform-box: fill-box; animation: ty-drop .7s cubic-bezier(.2,.9,.25,1.15) both; }
        @keyframes ty-drop { from { transform: translateY(-46px); opacity: 0; } to { transform: none; opacity: 1; } }

        .ty-glint { animation: ty-glint 5.5s ease-in-out 1.4s infinite; }
        @keyframes ty-glint { 0% { transform: translateX(0); } 45%, 100% { transform: translateX(760px); } }

        .ty-light { opacity: .25; animation: ty-on .5s ease-out both; }
        @keyframes ty-on { 0% { opacity: .25; } 40% { opacity: .9; } 55% { opacity: .5; } 100% { opacity: 1; } }

        .ty-glow { animation: ty-pulse 5s ease-in-out 1.8s infinite both; }
        @keyframes ty-pulse { 0%, 100% { opacity: .7; } 50% { opacity: 1; } }

        .ty-seal { transform-box: view-box; transform-origin: 300px 92px; animation: ty-pop .8s cubic-bezier(.2,1.4,.4,1) 1.1s both; }
        @keyframes ty-pop { from { transform: scale(0) translateY(60px); opacity: 0; } to { transform: none; opacity: 1; } }

        .ty-float { animation: ty-float 6s ease-in-out 2s infinite; }
        @keyframes ty-float { 0%, 100% { transform: none; } 50% { transform: translateY(-6px); } }

        .ty-ring { transform-box: fill-box; transform-origin: center; animation: ty-spin 30s linear infinite; }
        @keyframes ty-spin { to { transform: rotate(360deg); } }

        .ty-halo { animation: ty-pulse 4s ease-in-out 2s infinite both; }

        .ty-check { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ty-draw .55s cubic-bezier(.65,0,.35,1) 1.65s forwards; }
        @keyframes ty-draw { to { stroke-dashoffset: 0; } }

        .ty-spark { opacity: 0; transform: translateX(calc(var(--d) * -1)); animation: ty-burst 1.1s cubic-bezier(.2,.8,.2,1) 1.6s both; }
        @keyframes ty-burst {
          0%   { opacity: 0; transform: translateX(calc(var(--d) * -1)) scale(.4); }
          30%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(0) scale(1); }
        }

        .ty-star { animation: ty-twinkle 3.2s ease-in-out infinite; }
        @keyframes ty-twinkle { 0%, 100% { opacity: .25; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.2); } }

        .ty-cloud { animation: ty-drift linear infinite; }
        @keyframes ty-drift { from { transform: translateX(-30vw); } to { transform: translateX(130vw); } }

        .ty-rise { animation: ty-rise .8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes ty-rise { from { transform: translateY(18px); opacity: 0; } to { transform: none; opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .ty-panel, .ty-glint, .ty-light, .ty-glow, .ty-seal, .ty-float, .ty-ring, .ty-halo,
          .ty-spark, .ty-star, .ty-cloud, .ty-rise { animation: none !important; }
          .ty-check { animation: none; stroke-dashoffset: 0; }
          .ty-light { opacity: 1; }
          .ty-cloud, .ty-glint { display: none; }
        }
      `}</style>

      {/* Sky: dusk glow warming toward the house, stars and slow clouds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 18%, rgba(200,60,100,0.28), transparent 70%), radial-gradient(70% 45% at 50% 105%, rgba(255,190,120,0.14), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgba(99,102,241,0.18), transparent 70%), linear-gradient(to bottom, #14163F, #1C1E54)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map(([left, top, size, delay]) => (
          <span
            key={`${left}-${top}`}
            className="ty-star absolute rounded-full bg-white"
            style={{ left: `${left}%`, top: `${top}%`, width: `${size * 2}px`, height: `${size * 2}px`, animationDelay: `${delay}s` }}
          />
        ))}
        <span className="ty-cloud absolute top-[14%] h-16 w-72 rounded-full bg-white/[0.04] blur-2xl" style={{ animationDuration: '70s' }} />
        <span className="ty-cloud absolute top-[38%] h-12 w-96 rounded-full bg-white/[0.03] blur-2xl" style={{ animationDuration: '95s', animationDelay: '-40s' }} />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative w-full max-w-md">
          <Scene />
        </div>

        <p className="ty-rise mt-6 font-lato text-xs font-bold uppercase tracking-[0.3em] text-[#C83C64]" style={{ animationDelay: '1.9s' }}>
          {v.eyebrow}
        </p>

        <h1 className="ty-rise aloevera-bold mt-4 text-4xl leading-tight sm:text-5xl" style={{ animationDelay: '2.05s' }}>
          {v.title[0]} <span className="text-[#C83C64]">{v.title[1]}</span>
        </h1>

        <p className="ty-rise mt-5 max-w-xl font-lato text-base text-white/70 sm:text-lg" style={{ animationDelay: '2.2s' }}>
          {v.body}
        </p>

        {v.steps && (
          <ol className="ty-rise mt-9 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3" style={{ animationDelay: '2.35s' }}>
            {v.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm"
              >
                <span className="aloevera-bold flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C83C64]/20 text-sm text-[#F08DAB] ring-1 ring-[#C83C64]/40">
                  {i + 1}
                </span>
                <span className="font-lato text-sm text-white/80">{step}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="ty-rise mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: '2.5s' }}>
          <Link
            href="/"
            className="aloevera-medium rounded-full bg-[#C83C64] px-8 py-3.5 text-sm text-white shadow-lg shadow-[#C83C64]/30 transition hover:-translate-y-0.5 hover:bg-[#b03256]"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="aloevera-medium rounded-full border border-white/25 px-8 py-3.5 text-sm text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5"
          >
            Explore products
          </Link>
        </div>
      </div>
    </main>
  );
}
