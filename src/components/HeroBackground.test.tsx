import React, { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import HeroBackground from "./HeroBackground";

const TestHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <section ref={heroRef}>
      <HeroBackground heroRef={heroRef} />
      <button>View my work</button>
    </section>
  );
};

describe("hero background", () => {
  let reducedMotion: boolean;
  let motionChange: (() => void) | undefined;
  let frames: Map<number, FrameRequestCallback>;
  let nextFrameId: number;
  let context: CanvasRenderingContext2D;

  beforeEach(() => {
    reducedMotion = false;
    motionChange = undefined;
    frames = new Map();
    nextFrameId = 0;
    context = {
      setTransform: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context);
    window.matchMedia = jest.fn().mockImplementation(() => ({
      get matches() {
        return reducedMotion;
      },
      addEventListener: jest.fn((_, callback) => { motionChange = callback; }),
      removeEventListener: jest.fn(),
    }));
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrameId;
      frames.set(id, callback);
      return id;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      frames.delete(id);
    });
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      left: 0, top: 0, right: 100, bottom: 100,
      width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}),
    });
  });

  afterEach(() => jest.restoreAllMocks());

  function flushFrames() {
    const callbacks = Array.from(frames.values());
    frames.clear();
    callbacks.forEach((callback) => callback(0));
  }

  function movePointer(element: Element, pointerType: string) {
    const event = new MouseEvent("pointermove", {
      bubbles: true, clientX: 20, clientY: 20,
    });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    fireEvent(element, event);
    flushFrames();
  }

  it("moves decorative particles on mouse movement and resets them on leave", () => {
    const { container, getByRole } = render(<TestHero />);
    const hero = container.querySelector("section")!;
    const background = container.querySelector(".hero-background")!;
    const particle = background.querySelector<HTMLElement>(".hero-particle")!;

    expect(background.getAttribute("aria-hidden")).toBe("true");
    expect(background.querySelectorAll(".hero-particle")).toHaveLength(96);
    expect(getByRole("button", { name: "View my work" })).toBeTruthy();
    movePointer(hero, "mouse");
    expect(particle.style.transform).toMatch(/^translate3d/);
    fireEvent.pointerLeave(hero);
    expect(particle.style.transform).toBe("");
  });

  it("ignores touch and reduced motion and resets when the preference changes", () => {
    const { container } = render(<TestHero />);
    const hero = container.querySelector("section")!;
    const particle = container.querySelector<HTMLElement>(".hero-particle")!;

    movePointer(hero, "touch");
    expect(particle.style.transform).toBe("");
    movePointer(hero, "mouse");
    expect(particle.style.transform).toMatch(/^translate3d/);
    reducedMotion = true;
    motionChange?.();
    expect(particle.style.transform).toBe("");
    movePointer(hero, "mouse");
    expect(particle.style.transform).toBe("");
  });

  it("draws extra connections near the pointer and returns to the baseline on leave", () => {
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      if (this.classList.contains("hero-particle-glow")) {
        const index = Array.from(this.parentElement!.parentElement!.querySelectorAll(".hero-particle"))
          .indexOf(this.parentElement!);
        const left = index === 0 ? 100 : index === 1 ? 300 : index === 2 ? 145 : 3000 + index * 300;
        return { left, top: 100, right: left + 4, bottom: 104, width: 4, height: 4, x: left, y: 100, toJSON: () => ({}) };
      }
      return { left: 0, top: 0, right: 1000, bottom: 800, width: 1000, height: 800, x: 0, y: 0, toJSON: () => ({}) };
    });
    const { container } = render(<TestHero />);
    const hero = container.querySelector("section")!;
    expect(context.stroke).toHaveBeenCalledTimes(2);
    jest.mocked(context.stroke).mockClear();

    const event = new MouseEvent("pointermove", { bubbles: true, clientX: 200, clientY: 100 });
    Object.defineProperty(event, "pointerType", { value: "mouse" });
    fireEvent(hero, event);
    flushFrames();
    expect(context.stroke).toHaveBeenCalledTimes(3);

    jest.mocked(context.stroke).mockClear();
    fireEvent.pointerLeave(hero);
    flushFrames();
    expect(context.stroke).toHaveBeenCalledTimes(2);
  });

  it("distributes particles across the hero and forms varied closed shapes", () => {
    const { container } = render(<TestHero />);
    const positions = Array.from(container.querySelectorAll<HTMLElement>(".hero-particle")).map((particle) => ({
      x: parseFloat(particle.style.left) * 10,
      y: parseFloat(particle.style.top) * 8,
    }));
    const connected = (a: number, b: number) =>
      Math.hypot(positions[a].x - positions[b].x, positions[a].y - positions[b].y) < 165;
    let triangles = 0;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (!connected(i, j)) continue;
        for (let k = j + 1; k < positions.length; k++) {
          if (connected(i, k) && connected(j, k)) {
            const area = Math.abs(
              (positions[j].x - positions[i].x) * (positions[k].y - positions[i].y) -
              (positions[j].y - positions[i].y) * (positions[k].x - positions[i].x)
            );
            if (area > 100) triangles++;
          }
        }
      }
    }
    expect(triangles).toBeGreaterThan(30);
    expect(new Set(positions.map((position) => Math.round(position.x))).size).toBeGreaterThan(50);
  });

  it("draws a static network without scheduling animation for reduced motion", () => {
    reducedMotion = true;
    render(<TestHero />);
    expect(context.clearRect).toHaveBeenCalled();
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    fireEvent(window, new Event("resize"));
    expect(context.clearRect).toHaveBeenCalledTimes(2);
  });
});
