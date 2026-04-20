import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import { GraduationCap, Trophy, Sparkles, Brain, BadgeCheck, Cpu } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    color: '#00E5FF',
    title: 'Skill India Hackathon',
    sub: 'National Level',
    desc: 'Competed in the government-backed Skill India initiative alongside developers across the country.',
  },
  {
    icon: Cpu,
    color: '#FF2EC4',
    title: 'College Hackathon',
    sub: 'Campus Level',
    desc: 'Built and shipped a working product under a tight deadline at the East Point campus hackathon.',
  },
  {
    icon: Sparkles,
    color: '#00E5FF',
    title: 'Tech Fest 2K25',
    sub: 'Bangalore',
    desc: 'Represented and attended the Bangalore Tech Fest 2025 — connecting with builders and emerging tech.',
  },
  {
    icon: Brain,
    color: '#a78bfa',
    title: 'Exp-Lore World',
    sub: 'AI Platforms Event',
    desc: 'Explored cutting-edge AI innovations and leading platforms at the Exp-Lore World AI conference.',
  },
];

const CERTS = [
  { label: 'AWS', sub: 'Cloud Certification', color: '#FF9900', bg: '#FF990018' },
  { label: 'Udemy', sub: 'Full-Stack Development', color: '#a435f0', bg: '#a435f018' },
  { label: 'Udemy', sub: 'Backend Development', color: '#a435f0', bg: '#a435f018' },
];

export default function Milestones() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="milestones"
      className="relative py-32 md:py-48 px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* ghost background */}
      <span className="pointer-events-none select-none absolute -left-4 top-1/3 font-display font-bold text-[22vw] leading-none text-fg/[0.025] uppercase tracking-tighter">
        LIFE
      </span>

      <h2
        data-reveal
        className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-16"
      >
        The full{' '}
        <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
          picture.
        </span>
      </h2>

      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6 mb-6">

        {/* Education card */}
        <div
          data-reveal
          className="relative rounded-2xl border border-white/10 p-8 overflow-hidden flex flex-col justify-between gap-8"
          style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(0,229,255,0.06), transparent 60%), #07080e' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #00E5FF80, transparent)' }}
          />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-neon/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-neon" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-neon">Education</span>
          </div>

          <div>
            <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mb-2">B.Tech · Artificial Intelligence</p>
            <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-2">
              East Point College of Engineering
            </h3>
            <p className="font-body text-fg/50 text-sm">Bangalore, Karnataka</p>
          </div>

          <p className="font-body text-fg/60 text-sm leading-relaxed">
            Specialised in AI — studying machine learning, neural networks, and intelligent systems
            while building full-stack products on the side.
          </p>
        </div>

        {/* Achievements grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              data-reveal
              className="group relative rounded-xl border border-white/8 p-5 overflow-hidden hover:border-white/20 transition-all duration-300"
              style={{ background: '#07080e' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${a.color}70, transparent)` }}
              />
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}15` }}
                >
                  <a.icon className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-base leading-tight">{a.title}</h4>
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: a.color }}>
                    {a.sub}
                  </p>
                </div>
              </div>
              <p className="font-body text-fg/50 text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications strip */}
      <div data-reveal className="rounded-2xl border border-white/8 p-6" style={{ background: '#07080e' }}>
        <div className="flex items-center gap-2 mb-5">
          <BadgeCheck className="w-4 h-4 text-fg/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-fg/40">Certifications</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {CERTS.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10"
              style={{ background: c.bg }}
            >
              <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: c.color }} />
              <div>
                <p className="font-mono text-sm font-semibold" style={{ color: c.color }}>{c.label}</p>
                <p className="font-body text-fg/50 text-xs">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
