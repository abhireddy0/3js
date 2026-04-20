import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { ChevronDown } from 'lucide-react';
import ParticleField from '../components/ParticleField';

const ROLES = [
  { text: 'Full-Stack Developer', color: '#F5F5F7' },
  { text: 'React Native Engineer', color: '#00E5FF' },
  { text: 'NestJS Architect', color: '#FF2EC4' },
  { text: 'AI Graduate', color: '#a78bfa' },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [animClass, setAnimClass] = useState('role-enter');

  // Role carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('role-exit');
      setTimeout(() => {
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
        setAnimClass('role-enter');
      }, 320);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // GSAP intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-title] span', { y: 120, opacity: 0, duration: 1.1, stagger: 0.08, delay: 0.3 })
        .from('[data-hero-meta]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
        .from('[data-hero-cue]', { opacity: 0, duration: 0.8 }, '-=0.3');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const name = ['ABHISHEK', 'REDDY'];

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-bg"
    >
      <div className="absolute inset-0">
        <ParticleField />
      </div>

      {/* scanline */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-neon/60 to-transparent pointer-events-none z-20"
        style={{ animation: 'scanline 2s ease-in-out 0.5s forwards' }}
      />

      <div className="relative z-10 h-full w-full flex flex-col justify-between px-6 md:px-10 pt-28 pb-10">
        <div />

        <div>
          {/* name */}
          <h1
            data-hero-title
            className="font-display font-bold leading-[0.88] text-[clamp(3.5rem,12vw,11rem)] tracking-tight text-fg"
          >
            {name.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span className={`inline-block ${i === 0 ? 'animate-glitch' : 'animate-glitch-delay'}`}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* role carousel */}
          <div data-hero-meta className="mt-5 flex items-center gap-3 overflow-hidden h-8">
            <span className="font-mono text-xs text-fg/35 uppercase tracking-widest shrink-0">— Role</span>
            <div className="relative h-full flex items-center overflow-hidden">
              <span
                key={roleIdx}
                className={`absolute font-display font-semibold text-xl md:text-2xl tracking-tight ${animClass}`}
                style={{ color: ROLES[roleIdx].color }}
              >
                {ROLES[roleIdx].text}
              </span>
            </div>
          </div>

          {/* tagline + explore */}
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-6xl">
            <p data-hero-meta className="font-body text-fg/55 text-base md:text-lg max-w-md leading-relaxed">
              Building scalable products at{' '}
              <span className="text-cyan-neon font-medium">ComponentBuy.com</span> with NestJS,
              Prisma, PostgreSQL &amp; React Native.
            </p>
            <div data-hero-meta className="flex items-center gap-6 font-mono text-xs text-fg/35">
              <span>Bangalore, IN</span>
              <span className="text-fg/20">·</span>
              <span>AI Graduate · EPCE</span>
            </div>
          </div>
        </div>

        <div data-hero-cue className="flex items-center gap-2 text-fg/35 font-mono text-xs pointer-events-none">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span>keep going</span>
        </div>
      </div>
    </section>
  );
}
