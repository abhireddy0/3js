import { useRef, useEffect, useState } from 'react';

type Entry = {
  role: string;
  org: string;
  orgShort: string;
  location: string;
  period: string;
  current?: boolean;
  blurbs: string[];
  stack: string[];
};

const ENTRIES: Entry[] = [
  {
    role: 'Full Stack Developer',
    org: 'SR Integrated Circuits Pvt Ltd',
    orgShort: 'SRIC',
    location: 'Bangalore',
    period: 'Mar 30, 2025 — Present',
    current: true,
    blurbs: [
      "Building backend systems and mobile features for ComponentBuy.com — one of South Asia's largest platforms for ECE products.",
      'Shipping typed, tested services with NestJS + Prisma on PostgreSQL, and cross-platform mobile with React Native.',
      'Owning schema design, migrations, and API surface across the full product stack.',
    ],
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'React Native', 'TypeScript'],
  },
  {
    role: 'Software Engineer',
    org: 'Gravita Oasis Review Solutions',
    orgShort: 'GORS',
    location: 'Bangalore',
    period: 'Aug 2024 — Jan 28, 2025',
    blurbs: [
      'Shipped full-stack features across a MERN codebase — REST APIs in Express, React frontends, MongoDB schemas.',
      'Collaborated on review workflows, authentication flows, and admin tooling.',
      'Learned to move fast in production without breaking things.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
];

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)' } };
}

export default function Experience() {
  const heading = useFadeIn(0);
  const card0 = useFadeIn(0.1);
  const card1 = useFadeIn(0.2);
  const cardRefs = [card0, card1];

  return (
    <section id="experience" className="relative py-32 md:py-48 overflow-hidden">
      {/* ghost background text */}
      <span className="pointer-events-none select-none absolute -right-8 top-1/2 -translate-y-1/2 font-display font-bold text-[28vw] leading-none text-fg/[0.025] uppercase tracking-tighter">
        WORK
      </span>

      <div className="relative px-6 md:px-10 max-w-7xl mx-auto">
        <div ref={heading.ref} style={heading.style}>
          <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mb-3">Career</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-16 max-w-3xl">
            The path so far.
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {ENTRIES.map((e, i) => (
            <div key={i} ref={cardRefs[i].ref} style={cardRefs[i].style}>
              <ExperienceCard entry={e} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ entry }: { entry: Entry }) {
  const accent = entry.current ? '#00E5FF' : '#FF2EC4';

  return (
    <div
      className="group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-[1.005]"
      style={{
        borderColor: `${accent}30`,
        background: `radial-gradient(ellipse at 0% 0%, ${accent}07, transparent 55%), #07080e`,
      }}
    >
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)` }} />

      {/* company watermark */}
      <span
        className="pointer-events-none select-none absolute right-6 bottom-2 font-display font-bold leading-none uppercase tracking-tighter"
        style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: accent, opacity: 0.03 }}
      >
        {entry.orgShort}
      </span>

      <div className="relative p-8 md:p-10">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-display font-bold text-2xl md:text-3xl">{entry.role}</h3>
              {entry.current && (
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-widest px-2.5 py-1 rounded-full border flex items-center gap-1.5"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                  Current
                </span>
              )}
            </div>
            <p className="font-body text-fg/50">
              <span className="text-fg/80">{entry.org}</span>
              <span className="mx-2 text-fg/20">·</span>
              {entry.location}
            </p>
          </div>
          <span className="font-mono text-xs text-fg/35 uppercase tracking-widest mt-1 shrink-0">
            {entry.period}
          </span>
        </div>

        {/* bullets */}
        <ul className="space-y-2.5 mb-6 max-w-3xl">
          {entry.blurbs.map((b, j) => (
            <li key={j} className="text-fg/60 font-body flex gap-3 text-base">
              <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ background: accent }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* stack */}
        <div className="flex flex-wrap gap-2">
          {entry.stack.map((s) => (
            <span key={s} className="font-mono text-xs px-3 py-1 rounded-full border border-white/10 text-fg/45 bg-white/[0.03]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
