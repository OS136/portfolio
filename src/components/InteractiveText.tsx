import React, { useEffect, RefObject } from "react";

const REPEL_RADIUS = 90;
const MAX_DISPLACEMENT = 28;
export const TYPING_INTERVAL = 25;
const LETTER_REVEAL_DURATION = 25;
export const SWEEP_DURATION = 1200;

export const getTypingDuration = (text: string, interval = TYPING_INTERVAL) =>
  Math.max(0, Array.from(text).length - 1) * interval + LETTER_REVEAL_DURATION;

interface InteractiveTextProps {
  text: string;
  animated?: boolean;
  gradient?: boolean;
  animationDelay?: number;
  sweepReveal?: boolean;
}

export function useTextRepulsion(containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const words = Array.from(
      container.querySelectorAll<HTMLElement>(".hero-interactive-word")
    );
    let movedLetters = new Set<HTMLElement>();
    let frame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const reset = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      movedLetters.forEach((letter) => {
        letter.style.transform = "";
      });
      movedLetters.clear();
    };

    const updateLetters = () => {
      frame = null;
      const containerBounds = container.getBoundingClientRect();
      if (
        pointerX < containerBounds.left - REPEL_RADIUS ||
        pointerX > containerBounds.right + REPEL_RADIUS ||
        pointerY < containerBounds.top - REPEL_RADIUS ||
        pointerY > containerBounds.bottom + REPEL_RADIUS
      ) {
        reset();
        return;
      }

      const positions: Array<{ letter: HTMLElement; x: number; y: number }> = [];
      const nextMovedLetters = new Set<HTMLElement>();

      words.forEach((word) => {
        const bounds = word.getBoundingClientRect();
        if (
          pointerX < bounds.left - REPEL_RADIUS ||
          pointerX > bounds.right + REPEL_RADIUS ||
          pointerY < bounds.top - REPEL_RADIUS ||
          pointerY > bounds.bottom + REPEL_RADIUS
        ) {
          return;
        }

        word.querySelectorAll<HTMLElement>(".hero-interactive-letter-slot").forEach((slot) => {
          const letter = slot.firstElementChild;
          if (!(letter instanceof HTMLElement)) return;

          const rect = slot.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - pointerX;
          const dy = rect.top + rect.height / 2 - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance >= REPEL_RADIUS) return;

          const strength = MAX_DISPLACEMENT * (1 - distance / REPEL_RADIUS);
          positions.push({
            letter,
            x: distance === 0 ? 0 : (dx / distance) * strength,
            y: distance === 0 ? -strength : (dy / distance) * strength,
          });
          nextMovedLetters.add(letter);
        });
      });

      movedLetters.forEach((letter) => {
        if (!nextMovedLetters.has(letter)) letter.style.transform = "";
      });
      positions.forEach(({ letter, x, y }) => {
        letter.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      movedLetters = nextMovedLetters;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === null) frame = window.requestAnimationFrame(updateLetters);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) reset();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    reducedMotion.addEventListener("change", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      reducedMotion.removeEventListener("change", reset);
      reset();
    };
  }, [containerRef]);
}

const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  animated = false,
  gradient = false,
  animationDelay = 700,
  sweepReveal = false,
}) => {
  const words = text.split(" ");
  let characterIndex = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={sweepReveal ? "hero-sweep-reveal" : undefined}
        style={sweepReveal ? {
          animationDelay: `${animationDelay}ms`,
          animationDuration: `${SWEEP_DURATION}ms`,
        } : undefined}
      >
        {words.map((word, wordIndex) => {
          const firstCharacterIndex = characterIndex;
          characterIndex += Array.from(word).length + 1;
          return (
            <React.Fragment key={wordIndex}>
              <span className="hero-interactive-word">
                {Array.from(word).map((letter, letterIndex) => (
                  <span
                    className={`hero-interactive-letter-slot${animated ? " hero-typing-letter" : ""}`}
                    style={animated ? {
                      animationDelay: `${animationDelay + (firstCharacterIndex + letterIndex) * TYPING_INTERVAL}ms`,
                    } : undefined}
                    key={letterIndex}
                  >
                    <span className={`hero-interactive-letter${gradient ? " text-gradient" : ""}`}>
                      {letter}
                    </span>
                  </span>
                ))}
              </span>
              {wordIndex < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </span>
    </>
  );
};

export default InteractiveText;
