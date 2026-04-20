import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'contact', label: 'Contact' },
];

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', `#${id}`);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-bg/60 border-b border-white/5' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-4 flex items-center justify-between">
        <a
          href="#hero"
          data-hover
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); history.replaceState(null, '', '/'); }}
          className="font-display font-bold text-lg tracking-tight text-fg hover:text-cyan-neon transition-colors"
        >
          Abhishek Reddy<span className="text-cyan-neon">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          {LINKS.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-hover
                onClick={(e) => { e.preventDefault(); smoothScrollTo(l.id); }}
                className="group relative text-fg/70 hover:text-fg transition-colors"
              >
                <span className="text-cyan-neon mr-1">0{i + 1}.</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-neon to-magenta-neon transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          data-hover
          className="hidden md:inline-block font-mono text-sm px-4 py-2 border border-cyan-neon/60 text-cyan-neon rounded-full hover:bg-cyan-neon hover:text-bg transition-colors"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
