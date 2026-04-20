import { useRef, useState, useEffect, useCallback } from 'react';
import { useReveal } from '../lib/useReveal';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';

const GROUPS = [
  {
    title: 'Frontend',
    Icon: Code2,
    accent: '#00E5FF',
    primary: ['React', 'TypeScript', 'Next.js', 'React Native'],
    secondary: ['Tailwind CSS', 'GSAP', 'Three.js'],
  },
  {
    title: 'Backend',
    Icon: Server,
    accent: '#FF2EC4',
    primary: ['NestJS', 'Node.js', 'Prisma', 'Java'],
    secondary: ['Express', 'Spring Boot', 'REST', 'JWT / OAuth'],
  },
  {
    title: 'Database',
    Icon: Database,
    accent: '#00E5FF',
    primary: ['PostgreSQL', 'MongoDB'],
    secondary: ['Redis', 'Mongoose', 'SQL'],
  },
  {
    title: 'Tools',
    Icon: Wrench,
    accent: '#FF2EC4',
    primary: ['Git', 'Docker', 'Linux'],
    secondary: ['Postman', 'Vercel', 'VS Code'],
  },
];

const MARQUEE = [
  'NestJS', 'Prisma', 'PostgreSQL', 'React Native', 'React', 'Node.js',
  'TypeScript', 'Java', 'Spring Boot', 'MongoDB', 'Express', 'Tailwind', 'Docker', 'Redis',
];

function SkillChip({
  text,
  accent,
  delay,
  bright,
}: {
  text: string;
  accent: string;
  delay: number;
  bright: boolean;
}) {
  const chipRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = chipRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={chipRef}
      className="font-mono text-xs px-2.5 py-1 rounded-md border transition-all duration-300 cursor-default select-none"
      style={
        bright
          ? { color: 'rgba(245,245,247,0.9)', borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.07)' }
          : { color: 'rgba(245,245,247,0.4)', borderColor: 'rgba(255,255,255,0.06)' }
      }
    >
      <ScrambleText text={text} trigger={visible} delay={delay} speed={28} />
    </span>
  );
}

function CardSpotlight({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${accent}14, transparent 70%)`;
    }
  }, [accent]);

  const onLeave = useCallback(() => {
    if (spotRef.current) spotRef.current.style.background = 'none';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
    >
      <div ref={spotRef} className="pointer-events-none absolute inset-0 transition-all duration-150" />
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${accent}90, transparent)` }}
      />
      {children}
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="skills" className="relative py-32 md:py-48 overflow-hidden">
      <span className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 font-display font-bold text-[28vw] leading-none text-fg/[0.025] uppercase tracking-tighter">
        STACK
      </span>
      {/* marquee band */}
      <div className="relative border-y border-white/8 py-5 mb-24 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee font-display font-bold text-3xl md:text-5xl tracking-tight select-none">
          {[...MARQUEE, ...MARQUEE].map((x, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 2 === 0 ? 'text-fg/25' : 'text-fg/10'}>{x}</span>
              <span className="text-cyan-neon/35 text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <h2 data-reveal className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-16 max-w-2xl">
          The tools I reach<br />for first.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROUPS.map((g) => (
            <CardSpotlight key={g.title} accent={g.accent}>
              {/* header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${g.accent}18` }}
                >
                  <g.Icon className="w-3.5 h-3.5" style={{ color: g.accent }} />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: g.accent }}>
                  {g.title}
                </h3>
              </div>

              {/* primary skills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {g.primary.map((skill, i) => (
                  <SkillChip key={skill} text={skill} accent={g.accent} delay={i * 0.08} bright />
                ))}
              </div>

              {/* secondary skills */}
              <div className="flex flex-wrap gap-1.5">
                {g.secondary.map((skill, i) => (
                  <SkillChip key={skill} text={skill} accent={g.accent} delay={g.primary.length * 0.08 + i * 0.07} bright={false} />
                ))}
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
