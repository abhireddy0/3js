import { useRef, useState, useEffect } from 'react';
import { useReveal } from '../lib/useReveal';
import { ArrowRight } from 'lucide-react';

const PHOTOS = [
  { src: '/Abhishek Reddy.jpeg', alt: 'Abhishek Reddy', position: 'center top' },
  { src: '/TechFest -bangalore.jpeg', alt: 'Tech Fest Bangalore', position: 'center center' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(PHOTOS.map(() => false));
  useReveal(ref);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % PHOTOS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const markLoaded = (i: number) =>
    setLoaded((prev) => { const n = [...prev]; n[i] = true; return n; });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">

        {/* photo slideshow */}
        <div data-reveal className="relative">
          <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-cyan-neon/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-6 -right-4 w-40 h-40 rounded-full bg-magenta-neon/20 blur-3xl pointer-events-none" />

          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/12 bg-gradient-to-br from-white/[0.04] to-transparent shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            {PHOTOS.map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                onLoad={() => markLoaded(i)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === current && loaded[i] ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ objectPosition: photo.position }}
              />
            ))}

            {!loaded[current] && (
              <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[5rem] text-fg/10 select-none">
                AR
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-4 h-1.5 bg-cyan-neon' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 font-mono text-xs text-fg/40 flex items-center justify-between px-1">
            <span>Abhishek Reddy <span className="text-cyan-neon">·</span> 2026</span>
            <span className="text-fg/25">{current + 1} / {PHOTOS.length}</span>
          </div>
        </div>

        {/* copy */}
        <div>
          <h2
            data-reveal
            className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8"
          >
            From the field{' '}
            <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
              to the terminal.
            </span>
          </h2>

          <div className="space-y-5 text-fg/70 text-lg leading-relaxed max-w-xl font-body">
            <p data-reveal>
              I'm Abhishek — an AI graduate from{' '}
              <span className="text-fg">East Point College of Engineering, Bangalore</span>.
              My journey started with a strong ambition to become a professional athlete. That drive
              never left — it just found a new arena.
            </p>
            <p data-reveal>
              Today I channel that same competitive edge into building scalable software. I'm currently
              at <span className="text-fg">SR Integrated Circuits</span>, shipping backend systems
              and mobile features for{' '}
              <span className="text-cyan-neon">ComponentBuy.com</span> — one of South Asia's largest
              platforms for ECE products.
            </p>
            <p data-reveal>
              I care about clean schemas, fast feedback loops, and interfaces that feel alive.
              Outside the terminal I'm probably breaking something, fixing it, and calling it a feature.
            </p>
          </div>

          {/* currently building callout */}
          <div
            data-reveal
            className="mt-8 flex items-start gap-3 p-4 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.04]"
          >
            <div className="mt-0.5 w-2 h-2 rounded-full bg-cyan-neon shrink-0 shadow-[0_0_8px_#00E5FF] animate-pulse" />
            <div>
              <p className="font-mono text-xs text-cyan-neon uppercase tracking-widest mb-1">
                Currently building
              </p>
              <p className="font-body text-fg/80 text-sm leading-relaxed">
                Full-stack product development with{' '}
                <span className="text-fg">NestJS · Prisma · React Native · PostgreSQL</span>
                {' '}at <span className="text-cyan-neon">ComponentBuy.com</span>
              </p>
            </div>
          </div>

          <div data-reveal className="mt-10 grid grid-cols-3 gap-4 font-mono text-sm">
            <Stat label="Degree" value="B.Tech" suffix="AI · EPCE" />
            <Stat label="Companies" value="2" suffix="Bangalore" />
            <Stat label="Stacks" value="2" suffix="MERN · NestJS" />
          </div>

          <div data-reveal className="mt-8">
            <a
              href="#milestones"
              onClick={(e) => { e.preventDefault(); document.getElementById('milestones')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 font-mono text-sm text-fg/50 hover:text-cyan-neon transition-colors group"
            >
              <span>See my achievements</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="border-l-2 border-cyan-neon/60 pl-3">
      <div className="text-2xl md:text-3xl text-fg font-display font-semibold">{value}</div>
      <div className="text-[0.7rem] text-fg/50 uppercase tracking-widest">{label}</div>
      <div className="text-[0.7rem] text-fg/40">{suffix}</div>
    </div>
  );
}
