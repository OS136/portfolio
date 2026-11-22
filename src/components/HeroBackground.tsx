import React, { RefObject, useEffect, useRef } from "react";
import HeroSky from "./HeroSky";

const PARTICLE_COLUMNS = 12;
const PARTICLE_ROWS = 8;
const variation = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

const particles = Array.from({ length: PARTICLE_COLUMNS * PARTICLE_ROWS }, (_, index) => ({
  x: 4 + ((index % PARTICLE_COLUMNS + 0.1 + variation(index * 2 + 1) * 0.8) / PARTICLE_COLUMNS) * 92,
  y: 4 + ((Math.floor(index / PARTICLE_COLUMNS) + 0.1 + variation(index * 2 + 2) * 0.8) / PARTICLE_ROWS) * 92,
  size: 2 + (index % 3),
  duration: 5 + (index % 5),
  delay: -(index % 7),
}));

const REPEL_RADIUS = 150;
const MAX_DISPLACEMENT = 32;
const CONNECTION_DISTANCE = 165;
const ACTIVE_CONNECTION_DISTANCE = 260;
const POINTER_RADIUS = 220;

interface HeroBackgroundProps {
  heroRef: RefObject<HTMLElement>;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ heroRef }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const canvas = canvasRef.current;
    if (!hero || !background || !canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(background.querySelectorAll<HTMLElement>(".hero-particle"));
    const glows = Array.from(background.querySelectorAll<HTMLElement>(".hero-particle-glow"));
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Unable to initialize the hero particle connections.");
      return;
    }
    let frame: number | null = null;
    let drawingFrame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;
    let visible = true;

    const drawConnections = () => {
      const bounds = background.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      const width = Math.round(bounds.width * scale);
      const height = Math.round(bounds.height * scale);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);

      const positions = glows.map((glow) => {
        const rect = glow.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        };
      });
      const densityScale = Math.max(0.5, Math.min(1.15, Math.sqrt(bounds.width * bounds.height / 800000)));

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const a = positions[i];
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const nearPointer = pointerActive &&
            Math.hypot(a.x + bounds.left - pointerX, a.y + bounds.top - pointerY) < POINTER_RADIUS &&
            Math.hypot(b.x + bounds.left - pointerX, b.y + bounds.top - pointerY) < POINTER_RADIUS;
          const limit = (nearPointer ? ACTIVE_CONNECTION_DISTANCE : CONNECTION_DISTANCE) * densityScale;
          if (distance >= limit) continue;

          const opacity = (nearPointer ? 0.38 : 0.18) * (1 - distance / limit);
          context.strokeStyle = `rgba(99, 130, 210, ${opacity})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    };

    const drawFrame = () => {
      drawingFrame = null;
      if (!visible || document.hidden) return;
      drawConnections();
      if (!motion.matches) drawingFrame = window.requestAnimationFrame(drawFrame);
    };

    const startDrawing = () => {
      if (drawingFrame === null && visible && !document.hidden) {
        drawFrame();
      }
    };

    const reset = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      pointerActive = false;
      elements.forEach((element) => {
        element.style.transform = "";
      });
    };

    const updateParticles = () => {
      frame = null;
      const bounds = background.getBoundingClientRect();
      elements.forEach((element, index) => {
        const particle = particles[index];
        const dx = bounds.left + bounds.width * particle.x / 100 - pointerX;
        const dy = bounds.top + bounds.height * particle.y / 100 - pointerY;
        const distance = Math.hypot(dx, dy);

        if (distance >= REPEL_RADIUS) {
          element.style.transform = "";
          return;
        }

        const strength = MAX_DISPLACEMENT * (1 - distance / REPEL_RADIUS);
        const x = distance === 0 ? 0 : dx / distance * strength;
        const y = distance === 0 ? -strength : dy / distance * strength;
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || motion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
      if (frame === null) frame = window.requestAnimationFrame(updateParticles);
    };

    const onMotionChange = () => {
      reset();
      if (drawingFrame !== null) window.cancelAnimationFrame(drawingFrame);
      drawingFrame = null;
      startDrawing();
    };

    const onVisibilityChange = () => {
      if (document.hidden && drawingFrame !== null) {
        window.cancelAnimationFrame(drawingFrame);
        drawingFrame = null;
      } else {
        startDrawing();
      }
    };

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && drawingFrame !== null) {
        window.cancelAnimationFrame(drawingFrame);
        drawingFrame = null;
      } else {
        startDrawing();
      }
    });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(startDrawing);

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", startDrawing);
    document.addEventListener("visibilitychange", onVisibilityChange);
    observer?.observe(hero);
    resizeObserver?.observe(background);
    startDrawing();

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", startDrawing);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (drawingFrame !== null) window.cancelAnimationFrame(drawingFrame);
      reset();
    };
  }, [heroRef]);

  return (
    <div ref={backgroundRef} className="hero-background" aria-hidden="true">
      <HeroSky />
      <canvas ref={canvasRef} className="hero-connections" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="hero-particle"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
        >
          <span
            className="hero-particle-glow"
            style={{
              width: particle.size,
              height: particle.size,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
};

export default HeroBackground;
