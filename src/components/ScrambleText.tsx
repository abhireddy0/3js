import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&<>/\\[]{}';

interface Props {
  text: string;
  trigger: boolean;
  delay?: number;
  className?: string;
  speed?: number;
}

export default function ScrambleText({ text, trigger, delay = 0, className, speed = 32 }: Props) {
  const [output, setOutput] = useState(() => text.replace(/[^ ]/g, '_'));
  const rafRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const startAt = performance.now() + delay * 1000;
    const duration = text.length * speed;

    const tick = (now: number) => {
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startAt) / duration, 1);
      const revealed = Math.floor(progress * text.length);

      setOutput(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text, delay, speed]);

  return <span className={className}>{output}</span>;
}

export function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}
