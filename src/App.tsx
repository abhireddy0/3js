import { useEffect, useRef } from 'react';
import { useLenis } from './lib/useLenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Noise from './components/Noise';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Milestones from './sections/Milestones';
import Contact from './sections/Contact';

function useScrollSpy() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            history.replaceState(null, '', id === 'hero' ? '/' : `#${id}`);
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useLenis();
  useScrollSpy();

  const spotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight — direct DOM, zero re-renders
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(700px at ${e.clientX}px ${e.clientY}px, rgba(0,229,255,0.04), transparent 60%)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* global cursor spotlight */}
      <div ref={spotRef} className="pointer-events-none fixed inset-0 z-[1] transition-all duration-75" />

      {/* scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left" style={{ transformOrigin: 'left' }}>
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0"
          style={{ background: 'linear-gradient(90deg, #00E5FF, #FF2EC4)', transformOrigin: 'left' }}
        />
      </div>

      <Noise />
      <CustomCursor />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Milestones />
        <Contact />
      </main>
    </>
  );
}
