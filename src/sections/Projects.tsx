import { useLayoutEffect, useRef, useCallback } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';

type Project = {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Book Publishing App',
    tag: 'MERN · Razorpay · GSAP',
    description:
      'Full-stack platform where authors submit manuscripts, track publishing status, and manage their catalogue. Integrated Razorpay for payments and GSAP for buttery UI transitions.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay', 'GSAP'],
    live: 'https://book-publishing-app-ui.vercel.app',
    repo: 'https://github.com/abhireddy0/BOOK-PUBLISHING-APP',
    accent: '#00E5FF',
  },
  {
    title: 'Professional Email Generator',
    tag: 'Gmail Integration · AI',
    description:
      'Gmail-integrated tool that generates polished, professional emails from a short prompt. Eliminates the "how do I phrase this?" problem for every developer who hates writing emails.',
    stack: ['JavaScript', 'Gmail API', 'Node.js', 'OAuth 2.0'],
    repo: 'https://github.com/abhireddy0',
    accent: '#FF2EC4',
  },
  {
    title: 'Neon Portfolio',
    tag: 'This site',
    description:
      'React portfolio with a canvas particle field (mouse-reactive), GSAP scroll animations, glitch + text-scramble effects, pinned horizontal project scroll, and Lenis smooth scroll.',
    stack: ['React', 'Vite', 'GSAP', 'Tailwind', 'TypeScript'],
    repo: 'https://github.com/abhireddy0',
    accent: '#a78bfa',
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const section = rootRef.current!;
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth + 80),
          invalidateOnRefresh: true,
        },
      });
      return () => { scrollTween.scrollTrigger?.kill(); scrollTween.kill(); };
    }, rootRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => { clearTimeout(t); ctx.revert(); };
  }, []);

  return (
    <section ref={rootRef} id="projects" className="relative h-[100svh] overflow-hidden">
      <div className="absolute top-10 md:top-16 left-6 md:left-10 z-10 pointer-events-none">
        <p className="font-mono text-xs text-fg/40 uppercase tracking-widest mb-2">Selected work</p>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Things I've shipped.
        </h2>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 z-10 pointer-events-none font-mono text-xs text-fg/30 uppercase tracking-widest">
        ← scroll →
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 h-full pl-[8vw] pr-[8vw] pt-40 pb-16"
        style={{ width: 'max-content' }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current!;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 9;
    const rotX = ((y - cy) / cy) * -7;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;

    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(350px circle at ${x}px ${y}px, ${project.accent}12, transparent 65%)`;
    }
  }, [project.accent]);

  const onLeave = useCallback(() => {
    const card = cardRef.current!;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spotRef.current) spotRef.current.style.background = 'none';
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex-shrink-0 w-[85vw] md:w-[62vw] lg:w-[48vw] h-[72vh] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
      style={{
        boxShadow: `0 0 80px -30px ${project.accent}35`,
        transition: 'transform 0.12s ease-out',
        background: `radial-gradient(ellipse at 0% 0%, ${project.accent}0a 0%, transparent 55%), #07080e`,
      }}
    >
      {/* spotlight */}
      <div ref={spotRef} className="pointer-events-none absolute inset-0 z-0 transition-all duration-100" />

      {/* top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 70%)` }}
      />

      {/* corner number — big faded */}
      <span
        className="absolute top-6 right-8 font-display font-bold text-[7rem] leading-none select-none pointer-events-none opacity-[0.04]"
        style={{ color: project.accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        {/* top row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="font-mono text-[0.65rem] uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}10` }}
            >
              {project.tag}
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all" aria-label="GitHub">
                <Github className="w-4 h-4 text-fg/60" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all" aria-label="Live site">
                <ExternalLink className="w-4 h-4 text-fg/60" />
              </a>
            )}
          </div>
        </div>

        {/* bottom content */}
        <div>
          <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] mb-4 tracking-tight">
            {project.title}
          </h3>
          <p className="font-body text-fg/55 text-base md:text-lg max-w-xl mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t}
                className="font-mono text-xs px-3 py-1 rounded-full border border-white/10 text-fg/45 bg-white/[0.03]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
