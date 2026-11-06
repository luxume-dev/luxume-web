import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

// ---------------------------------------------------------------------------
// Scene geometry (SVG user units, viewBox 600 x 400).
// A gable roof of colour-coated steel panels; one panel is missing and is
// being lowered back into place by a crane.
// ---------------------------------------------------------------------------
const EAVE_LEFT = 90;
const EAVE_RIGHT = 510;
const EAVE_Y = 310;
const APEX = { x: 300, y: 170 };
const PANEL_W = 21;
const MISSING = 13;
const HANG_LIFT = 140; // how far above its slot the loose panel hangs

const PANELS = Array.from(
  { length: (EAVE_RIGHT - EAVE_LEFT) / PANEL_W },
  (_, i) => EAVE_LEFT + i * PANEL_W
);
const ROOF_POINTS = `${EAVE_LEFT},${EAVE_Y} ${APEX.x},${APEX.y} ${EAVE_RIGHT},${EAVE_Y}`;

// Height of the roof surface at a given x
const roofY = (x) =>
  APEX.y + (Math.abs(x - APEX.x) * (EAVE_Y - APEX.y)) / (APEX.x - EAVE_LEFT);

const GAP_L = PANELS[MISSING];
const GAP_R = GAP_L + PANEL_W;
const GAP_C = (GAP_L + GAP_R) / 2;
// Outline of the missing panel in its installed position
const LOOSE_POINTS = `${GAP_L},${roofY(GAP_L)} ${GAP_R},${roofY(GAP_R)} ${GAP_R},${EAVE_Y} ${GAP_L},${EAVE_Y}`;
const HOOK_Y = roofY(GAP_L) - HANG_LIFT - 22;

const CHIMNEY_X = 170;

// Fixed star field (percent positions) so server and client markup agree
const STARS = [
  [6, 12, 2, 0], [14, 34, 1, 1.2], [22, 8, 1.5, 2.1], [31, 22, 1, 0.6],
  [42, 6, 2, 1.8], [55, 16, 1, 0.3], [63, 4, 1.5, 2.6], [71, 28, 1, 1.1],
  [79, 10, 2, 0.9], [88, 24, 1, 2.3], [94, 6, 1.5, 1.5], [9, 48, 1, 2.8],
  [91, 44, 1, 0.4], [4, 70, 1.5, 1.9], [96, 66, 1, 1.3], [48, 30, 1, 2.4],
];

function Scene() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="relative w-full overflow-hidden"
      aria-hidden="true"
    >
      <defs>
        <filter id="nf-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id="nf-roof">
          <polygon points={ROOF_POINTS} />
        </clipPath>

        {/* Trapezoidal rib profile of a colour-coated steel sheet */}
        <pattern id="nf-rib" width="7" height="10" patternUnits="userSpaceOnUse">
          <rect width="7" height="10" fill="#B8345B" />
          <rect width="2" height="10" fill="#E0638A" />
          <rect x="2" width="1" height="10" fill="#7E1F3D" />
        </pattern>
        <linearGradient id="nf-sheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="nf-beam" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#FFD39A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFD39A" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nf-attic" cx="0.5" cy="1" r="0.6">
          <stop offset="0" stopColor="#FFCF8A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFCF8A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nf-window" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFE2B0" />
          <stop offset="1" stopColor="#F4A259" />
        </linearGradient>
        <linearGradient id="nf-steel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E9ECF5" />
          <stop offset="1" stopColor="#9AA1B9" />
        </linearGradient>
        <linearGradient id="nf-ground" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <ellipse cx="300" cy="402" rx="250" ry="10" fill="#000" opacity="0.25" />
      <rect x="0" y="400" width="600" height="1" fill="url(#nf-ground)" />

      {/* Chimney + smoke (drawn before the roof so the roof covers its base) */}
      <rect x={CHIMNEY_X} y="206" width="26" height="60" fill="#2C2F6E" />
      <rect x={CHIMNEY_X - 3} y="202" width="32" height="7" rx="1" fill="#3A3E85" />
      {[0, 1.6, 3.2].map((d) => (
        <circle
          key={d}
          className="nf-smoke"
          cx={CHIMNEY_X + 13}
          cy="196"
          r="7"
          fill="#ffffff"
          filter="url(#nf-blur)"
          style={{ animationDelay: `${d}s` }}
        />
      ))}

      {/* Walls, windows and door */}
      <rect x="125" y={EAVE_Y} width="350" height="90" fill="#262A6B" />
      {[322, 334, 346, 358, 370, 382].map((y) => (
        <line key={y} x1="125" x2="475" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.04" />
      ))}
      {[160, 390].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="326" width="58" height="48" rx="2" fill="#1A1D52" />
          <rect
            className={i === 1 ? 'nf-flicker' : undefined}
            x={x}
            y="330"
            width="50"
            height="40"
            fill="url(#nf-window)"
          />
          <line x1={x + 25} x2={x + 25} y1="330" y2="370" stroke="#1A1D52" strokeWidth="3" />
          <line x1={x} x2={x + 50} y1="350" y2="350" stroke="#1A1D52" strokeWidth="3" />
        </g>
      ))}
      <rect x="280" y="338" width="40" height="62" rx="2" fill="#C83C64" />
      <circle cx="311" cy="370" r="2" fill="#FFD39A" />

      {/* Attic interior, visible through the gap */}
      <polygon points={ROOF_POINTS} fill="#12143D" />
      <g clipPath="url(#nf-roof)">
        <ellipse cx={GAP_C} cy={EAVE_Y} rx="60" ry="70" fill="url(#nf-attic)" className="nf-glow" />
      </g>

      {/* Warm light escaping through the gap */}
      <polygon
        className="nf-beam"
        points={`${GAP_L},${EAVE_Y} ${GAP_R},${EAVE_Y} ${GAP_R + 60},20 ${GAP_L - 60},20`}
        fill="url(#nf-beam)"
      />

      {/* Roof panels drop in one at a time */}
      <g clipPath="url(#nf-roof)">
        {PANELS.map((x, i) =>
          i === MISSING ? null : (
            <g key={x} className="nf-panel" style={{ animationDelay: `${0.25 + i * 0.05}s` }}>
              <rect x={x} y={APEX.y - 2} width={PANEL_W} height={EAVE_Y - APEX.y + 2} fill="url(#nf-rib)" />
              <rect
                x={x}
                y={APEX.y - 2}
                width={PANEL_W}
                height={EAVE_Y - APEX.y + 2}
                fill={x >= APEX.x ? '#000' : '#fff'}
                fillOpacity={x >= APEX.x ? 0.22 : 0.05}
              />
              <rect x={x} y={APEX.y - 2} width={PANEL_W} height={EAVE_Y - APEX.y + 2} fill="url(#nf-sheen)" />
              <line x1={x} x2={x} y1={APEX.y} y2={EAVE_Y} stroke="#5E1630" strokeOpacity="0.6" />
            </g>
          )
        )}
      </g>

      {/* Barge trim, ridge cap and gutter */}
      <polyline
        points={ROOF_POINTS}
        fill="none"
        stroke="url(#nf-steel)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d={`M${APEX.x - 16} ${APEX.y + 11} L${APEX.x} ${APEX.y - 2} L${APEX.x + 16} ${APEX.y + 11}`} fill="none" stroke="#E9ECF5" strokeWidth="5" strokeLinejoin="round" />
      <rect x={EAVE_LEFT - 8} y={EAVE_Y - 1} width={EAVE_RIGHT - EAVE_LEFT + 16} height="7" rx="3" fill="url(#nf-steel)" />

      {/* The loose panel, hanging from the crane */}
      <g className="nf-arrive">
        <g className="nf-swing">
          <g className="nf-bob">
            {/* Cable runs far above the frame so it never shows an end while bobbing */}
            <line x1={GAP_C} x2={GAP_C} y1="-400" y2={HOOK_Y} stroke="#C9CEE0" strokeWidth="1.5" />
            <path
              d={`M${GAP_C} ${HOOK_Y} q0 9 -5 9 q-4 0 -4 -4`}
              fill="none"
              stroke="#E9ECF5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <g transform={`translate(0 ${-HANG_LIFT})`}>
              <line x1={GAP_C} y1={HOOK_Y + HANG_LIFT + 8} x2={GAP_L} y2={roofY(GAP_L)} stroke="#C9CEE0" strokeWidth="1" />
              <line x1={GAP_C} y1={HOOK_Y + HANG_LIFT + 8} x2={GAP_R} y2={roofY(GAP_R)} stroke="#C9CEE0" strokeWidth="1" />
              <polygon points={LOOSE_POINTS} fill="url(#nf-rib)" />
              <polygon points={LOOSE_POINTS} fill="url(#nf-sheen)" />
              <polygon points={LOOSE_POINTS} fill="none" stroke="#FFD39A" strokeOpacity="0.5" />
            </g>
          </g>
        </g>
      </g>

      {/* Crane jib reaching in from the right, with trolley above the gap */}
      <g className="nf-jib">
        <line x1="300" x2="640" y1="4" y2="4" stroke="#F2B544" strokeWidth="3" />
        <line x1="300" x2="640" y1="18" y2="18" stroke="#F2B544" strokeWidth="3" />
        <path
          d={Array.from({ length: 22 }, (_, i) => `M${300 + i * 16} 18 L${308 + i * 16} 4 L${316 + i * 16} 18`).join(' ')}
          fill="none"
          stroke="#F2B544"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        <rect x={GAP_C - 10} y="18" width="20" height="8" rx="2" fill="#E9ECF5" />
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14163F] text-white">
      <style>{`
        /* The navbar and footer come from the root layout; this style only
           exists while the 404 page is rendered, so it hides them here alone. */
        [data-site-nav], [data-site-footer] { display: none; }

        .nf-panel { transform-box: fill-box; animation: nf-drop .7s cubic-bezier(.2,.9,.25,1.15) both; }
        @keyframes nf-drop {
          from { transform: translateY(-46px); opacity: 0; }
          to   { transform: none; opacity: 1; }
        }

        .nf-jib { animation: nf-jib 1.2s cubic-bezier(.2,.8,.2,1) .2s both; }
        @keyframes nf-jib { from { transform: translateX(320px); } to { transform: none; } }

        .nf-arrive { animation: nf-arrive 1.6s cubic-bezier(.2,.8,.2,1) 1.2s both; }
        @keyframes nf-arrive { from { transform: translateY(-260px); } to { transform: none; } }

        .nf-swing {
          transform-box: view-box;
          transform-origin: ${GAP_C}px 22px;
          animation: nf-swing 3.6s ease-in-out infinite alternate;
        }
        @keyframes nf-swing { from { transform: rotate(-3.5deg); } to { transform: rotate(3.5deg); } }

        .nf-bob { animation: nf-bob 7s ease-in-out 2.8s infinite; }
        @keyframes nf-bob {
          0%, 100% { transform: none; }
          45%, 55% { transform: translateY(12px); }
        }

        .nf-beam { animation: nf-pulse 5s ease-in-out infinite; }
        .nf-glow { animation: nf-pulse 5s ease-in-out infinite; }
        @keyframes nf-pulse { 0%, 100% { opacity: .65; } 50% { opacity: 1; } }

        .nf-flicker { animation: nf-flicker 7s steps(1) infinite; }
        @keyframes nf-flicker { 0%, 100% { opacity: 1; } 62% { opacity: .75; } 64% { opacity: 1; } 66% { opacity: .85; } }

        .nf-smoke { transform-box: fill-box; transform-origin: center; animation: nf-smoke 4.8s ease-out infinite; opacity: 0; }
        @keyframes nf-smoke {
          0%   { transform: translate(0, 0) scale(.5); opacity: 0; }
          15%  { opacity: .35; }
          100% { transform: translate(-26px, -70px) scale(2.2); opacity: 0; }
        }

        .nf-star { animation: nf-twinkle 3.2s ease-in-out infinite; }
        @keyframes nf-twinkle { 0%, 100% { opacity: .25; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.2); } }

        .nf-cloud { animation: nf-drift linear infinite; }
        @keyframes nf-drift { from { transform: translateX(-30vw); } to { transform: translateX(130vw); } }

        .nf-steel-text {
          background: linear-gradient(110deg,
            rgba(255,255,255,.05) 35%, rgba(255,255,255,.32) 48%,
            rgba(200,60,100,.35) 52%, rgba(255,255,255,.05) 65%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.08);
          animation: nf-sheen 6s ease-in-out infinite;
        }
        @keyframes nf-sheen { 0% { background-position: 100% 0; } 60%, 100% { background-position: 0% 0; } }

        .nf-rise { animation: nf-rise .8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes nf-rise { from { transform: translateY(18px); opacity: 0; } to { transform: none; opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .nf-panel, .nf-jib, .nf-arrive, .nf-swing, .nf-bob, .nf-beam, .nf-glow,
          .nf-flicker, .nf-smoke, .nf-star, .nf-cloud, .nf-steel-text, .nf-rise {
            animation: none !important;
          }
          .nf-cloud { display: none; }
        }
      `}</style>

      {/* Night sky: glow, stars and slow clouds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 70% 10%, rgba(200,60,100,0.25), transparent 70%), radial-gradient(60% 50% at 15% 100%, rgba(99,102,241,0.2), transparent 70%), linear-gradient(to bottom, #14163F, #1C1E54)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map(([left, top, size, delay]) => (
          <span
            key={`${left}-${top}`}
            className="nf-star absolute rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size * 2}px`,
              height: `${size * 2}px`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        <span
          className="nf-cloud absolute top-[14%] h-16 w-72 rounded-full bg-white/[0.04] blur-2xl"
          style={{ animationDuration: '70s' }}
        />
        <span
          className="nf-cloud absolute top-[38%] h-12 w-96 rounded-full bg-white/[0.03] blur-2xl"
          style={{ animationDuration: '95s', animationDelay: '-40s' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative w-full max-w-lg">
          <span
            aria-hidden="true"
            className="nf-steel-text aloevera-bold pointer-events-none absolute inset-x-0 -top-4 select-none text-center leading-none tracking-tight sm:-top-8"
            style={{ fontSize: 'clamp(7rem, 28vw, 15rem)' }}
          >
            404
          </span>
          <Scene />
        </div>

        <p
          className="nf-rise mt-6 font-lato text-xs font-bold uppercase tracking-[0.3em] text-[#C83C64]"
          style={{ animationDelay: '1.6s' }}
        >
          Error 404 &middot; Page not found
        </p>

        <h1
          className="nf-rise aloevera-bold mt-4 text-4xl leading-tight sm:text-5xl"
          style={{ animationDelay: '1.75s' }}
        >
          Looks like a panel <span className="text-[#C83C64]">went missing.</span>
        </h1>

        <p
          className="nf-rise mt-5 max-w-xl font-lato text-base text-white/70 sm:text-lg"
          style={{ animationDelay: '1.9s' }}
        >
          Our crew is lifting it back into place. In the meantime, the page you&rsquo;re
          after may have moved or been renamed. Let&rsquo;s get you back under cover.
        </p>

        <div
          className="nf-rise mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: '2.05s' }}
        >
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
