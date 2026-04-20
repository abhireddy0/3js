import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.04, ease: 'none' });
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.72;
      ringPos.y += (mouse.y - ringPos.y) * 0.72;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ring.dataset.scale ?? 1})`;
      requestAnimationFrame(tick);
    };
    tick();

    const onEnter = () => {
      ring.dataset.scale = '2.2';
      ring.style.borderColor = '#FF2EC4';
    };
    const onLeave = () => {
      ring.dataset.scale = '1';
      ring.style.borderColor = '#00E5FF';
    };

    const hoverables = document.querySelectorAll('[data-hover], a, button');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block w-8 h-8 rounded-full border border-cyan-neon transition-[border-color,transform] duration-150"
        style={{ transformOrigin: 'center' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block w-1.5 h-1.5 bg-fg rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
