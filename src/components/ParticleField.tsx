import { useEffect, useRef } from 'react';

type P = { x: number; y: number; vx: number; vy: number; r: number; color: string; pulse: number; pulseSpeed: number; };
type Blob = { x: number; y: number; vx: number; vy: number; r: number; hue: string; };
type Ripple = { x: number; y: number; r: number; maxR: number; alpha: number; };

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let W = 0, H = 0;
    const particles: P[] = [];

    // slow-moving colour blobs (nebula clouds)
    const blobs: Blob[] = [
      { x: 0, y: 0, vx: 0.15, vy: 0.08, r: 0, hue: '0,229,255' },
      { x: 0, y: 0, vx: -0.10, vy: 0.12, r: 0, hue: '255,46,196' },
      { x: 0, y: 0, vx: 0.08, vy: -0.14, r: 0, hue: '100,80,255' },
    ];

    function makeParticle(): P {
      const roll = Math.random();
      const color = roll < 0.55 ? '0,229,255' : roll < 0.85 ? '245,245,247' : '255,46,196';
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        color,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.008,
      };
    }

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles.length = 0;
      const n = Math.min(Math.floor((W * H) / 7000), 150);
      for (let i = 0; i < n; i++) particles.push(makeParticle());

      // spread blobs across canvas
      blobs[0].x = W * 0.2; blobs[0].y = H * 0.3; blobs[0].r = Math.min(W, H) * 0.45;
      blobs[1].x = W * 0.75; blobs[1].y = H * 0.6; blobs[1].r = Math.min(W, H) * 0.38;
      blobs[2].x = W * 0.55; blobs[2].y = H * 0.15; blobs[2].r = Math.min(W, H) * 0.32;
    }

    function drawBlobs() {
      ctx.globalCompositeOperation = 'source-over';
      for (const b of blobs) {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.hue},0.07)`);
        g.addColorStop(0.5, `rgba(${b.hue},0.025)`);
        g.addColorStop(1, `rgba(${b.hue},0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    }

    function drawRipples() {
      ctx.globalCompositeOperation = 'lighter';
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 6;
        rip.alpha *= 0.93;
        if (rip.alpha < 0.005) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,229,255,${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.r > rip.maxR * 0.4) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,46,196,${rip.alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      drawBlobs();
      drawRipples();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const REPEL = 120;
      const CONNECT = 145;

      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        // mouse repulsion
        const dx = a.x - mx, dy = a.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL && d2 > 0) {
          const d = Math.sqrt(d2);
          const f = ((REPEL - d) / REPEL) * 1.6;
          a.vx += (dx / d) * f * 0.14;
          a.vy += (dy / d) * f * 0.14;
        }

        const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
        if (spd > 3) { a.vx = (a.vx / spd) * 3; a.vy = (a.vy / spd) * 3; }
        a.vx *= 0.991; a.vy *= 0.991;

        a.x += a.vx; a.y += a.vy;
        if (a.x < 0) a.x = W; else if (a.x > W) a.x = 0;
        if (a.y < 0) a.y = H; else if (a.y > H) a.y = 0;

        a.pulse += a.pulseSpeed;
        const glow = 0.6 + Math.sin(a.pulse) * 0.4;
        const radius = a.r * (1 + Math.sin(a.pulse) * 0.45);

        // halo
        const grad = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, radius * 5);
        grad.addColorStop(0, `rgba(${a.color},${glow * 0.7})`);
        grad.addColorStop(1, `rgba(${a.color},0)`);
        ctx.beginPath(); ctx.arc(a.x, a.y, radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();

        // core
        ctx.beginPath(); ctx.arc(a.x, a.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.color},${glow})`; ctx.fill();

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const ex = a.x - b.x, ey = a.y - b.y;
          const ed = ex * ex + ey * ey;
          if (ed < CONNECT * CONNECT) {
            const t = 1 - Math.sqrt(ed) / CONNECT;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color},${t * t * 0.22})`;
            ctx.lineWidth = t * 1.4; ctx.stroke();
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      ripplesRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, maxR: 200, alpha: 0.9 });
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onClick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
