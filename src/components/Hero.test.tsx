import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { portfolioData } from "../data/content";

jest.mock("./HeroSky", () => () => null);

describe("hero interactive text", () => {
  let reducedMotion: boolean;
  let nextFrame: FrameRequestCallback | undefined;
  const originalResizeObserver = global.ResizeObserver;

  beforeEach(() => {
    reducedMotion = false;
    nextFrame = undefined;
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      setTransform: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D);
    window.matchMedia = jest.fn().mockImplementation(() => ({
      get matches() {
        return reducedMotion;
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      nextFrame = callback;
      return 1;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
  });

  afterEach(() => jest.restoreAllMocks());
  afterAll(() => { global.ResizeObserver = originalResizeObserver; });

  function movePointer(pointerType: string) {
    const event = new MouseEvent("pointermove", {
      bubbles: true,
      clientX: 40,
      clientY: 40,
    });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    fireEvent(window, event);
    if (nextFrame) {
      const callback = nextFrame;
      nextFrame = undefined;
      callback(0);
    }
  }

  it("offers the existing PDF resume download in the hero", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: "Download Resume (PDF)" });
    expect(link.getAttribute("href")).toBe("/portfolio/Olena_Shereiko_Full_Stack_Developer_CV.pdf");
    expect(link.getAttribute("download")).toBe("Olena_Shereiko_Full_Stack_Developer_CV.pdf");
  });

  it("shows the supplied portrait alongside the introduction", () => {
    const { container } = render(<Hero />);
    const image = screen.getByRole("img", { name: "Olena Shereiko sitting with a laptop" });
    expect(image.getAttribute("src")).toBe(`${process.env.PUBLIC_URL || ""}/olena-shereiko-portrait-refined.png`);
    expect(image.parentElement?.classList.contains("hero-portrait")).toBe(true);
    expect(container.querySelector(".hero-portrait-frame")).toBeNull();
  });

  it("keeps the full name grouped in the heading", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    const name = heading.querySelector(".hero-full-name");
    expect(name?.querySelector(".sr-only")?.textContent).toBe(portfolioData.personal.name);
    expect(name?.querySelectorAll(".hero-interactive-word")).toHaveLength(2);
  });

  it("preserves the destinations and accessible names of the social links", () => {
    render(<Hero />);
    const links = [
      { name: "GitHub", href: portfolioData.personal.github },
      { name: "LinkedIn", href: portfolioData.personal.linkedin },
      { name: "Email", href: `mailto:${portfolioData.personal.email}` },
    ];
    links.forEach(({ name, href }) => {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(href);
      expect(link.classList.contains("hero-social-link")).toBe(true);
    });
  });

  it("navigates to projects and contact using the hero buttons", () => {
    render(<Hero />);
    const projects = document.createElement("section");
    const contact = document.createElement("section");
    projects.id = "projects";
    contact.id = "contact";
    projects.scrollIntoView = jest.fn();
    contact.scrollIntoView = jest.fn();
    document.body.append(projects, contact);

    fireEvent.click(screen.getByRole("button", { name: "View My Work" }));
    fireEvent.click(screen.getByRole("button", { name: "Get In Touch" }));
    expect(projects.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(contact.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    projects.remove();
    contact.remove();
  });

  it("moves letters in each requested text and returns them when scrolling", () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      portfolioData.personal.name
    );
    const eyebrow = container.querySelector(".hero-eyebrow");
    expect(eyebrow?.querySelector(".sr-only")?.textContent).toBe(portfolioData.personal.title);
    expect(container.querySelector(".hero-role")).toBeNull();
    expect(eyebrow?.textContent).not.toContain("Software development");

    const textBlocks = [
      screen.getByRole("heading", { level: 1 }),
      eyebrow,
      container.querySelector(".hero-summary"),
      container.querySelector(".hero-interactive-details"),
    ];
    const letters = textBlocks.map((block) =>
      block?.querySelector<HTMLElement>(".hero-interactive-letter")
    );
    expect(letters.every(Boolean)).toBe(true);

    movePointer("mouse");
    letters.forEach((letter) =>
      expect(letter?.style.transform).toMatch(/^translate3d/)
    );
    fireEvent.scroll(window);
    letters.forEach((letter) => expect(letter?.style.transform).toBe(""));
  });

  it("does not move letters for touch or reduced motion", () => {
    const { container } = render(<Hero />);
    const letters = Array.from(container.querySelectorAll<HTMLElement>(".hero-interactive-letter"));
    expect(letters.length).toBeGreaterThan(0);
    movePointer("touch");
    expect(letters.every((letter) => letter.style.transform === "")).toBe(true);
    reducedMotion = true;
    movePointer("mouse");
    expect(letters.every((letter) => letter.style.transform === "")).toBe(true);
  });

  it("sweeps the full summary between the typed text blocks", () => {
    const { container } = render(<Hero />);
    const detailBlocks = Array.from(container.querySelectorAll(".hero-interactive-details > li"));
    const blocks = [
      container.querySelector(".hero-eyebrow"),
      screen.getByRole("heading", { level: 1 }),
      container.querySelector(".hero-summary"),
      ...detailBlocks,
    ];

    blocks.forEach((block, index) => {
      if (index === 2) return;
      const slots = block?.querySelectorAll<HTMLElement>(".hero-interactive-letter-slot");
      expect(slots?.length).toBeGreaterThan(1);
      slots?.forEach((slot) => {
        expect(slot.classList.contains("hero-typing-letter")).toBe(true);
      });
      expect(parseFloat(slots?.[1].style.animationDelay || "0") -
        parseFloat(slots?.[0].style.animationDelay || "0")).toBe(25);
      expect(block?.classList.contains("animate-slide-up")).toBe(false);
    });

    const headingLetters = screen.getByRole("heading", { level: 1 })
      .querySelectorAll<HTMLElement>(".hero-interactive-letter-slot");
    const greetingDelay = 400 + portfolioData.personal.title.length * 25 + 150;
    expect(headingLetters[6].style.animationDelay).toBe(`${greetingDelay + 200}ms`);

    for (let index = 1; index < blocks.length; index++) {
      const previous = blocks[index - 1]?.querySelectorAll<HTMLElement>(".hero-typing-letter, .hero-sweep-reveal");
      const current = blocks[index]?.querySelector<HTMLElement>(".hero-typing-letter, .hero-sweep-reveal");
      expect(previous?.length).toBeGreaterThan(0);
      expect(current).not.toBeNull();
      const lastPrevious = previous?.[previous.length - 1];
      expect(parseFloat(current?.style.animationDelay || "0"))
        .toBeGreaterThanOrEqual(parseFloat(lastPrevious?.style.animationDelay || "0") + (index === 3 ? 1200 : 25));
    }

    const summaryReveal = blocks[2]?.querySelector<HTMLElement>(".hero-sweep-reveal");
    expect(summaryReveal?.style.animationDuration).toBe("1200ms");
    expect(summaryReveal?.querySelectorAll(".hero-interactive-word").length)
      .toBe(portfolioData.personal.summary.split(" ").length);
    expect(blocks[2]?.querySelector(".hero-typing-letter")).toBeNull();
    const lastAvailability = blocks[4]?.querySelectorAll<HTMLElement>(".hero-typing-letter");
    expect(parseFloat(lastAvailability?.[lastAvailability.length - 1].style.animationDelay || "0") + 25)
      .toBeLessThan(6000);
  });

  it("reveals each hero icon alongside its corresponding text", () => {
    const { container } = render(<Hero />);
    const detailBlocks = Array.from(container.querySelectorAll(".hero-interactive-details > li"));
    const locationIcon = detailBlocks[0]?.querySelector<SVGElement>("svg");
    const locationText = detailBlocks[0]?.querySelector<HTMLElement>(".hero-interactive-word .hero-typing-letter");
    const availabilityIcon = detailBlocks[1]?.querySelector<HTMLElement>("span.hero-typing-letter");
    const availabilityText = detailBlocks[1]?.querySelector<HTMLElement>(".hero-interactive-word .hero-typing-letter");

    expect(locationIcon?.style.animationDelay).toBe(locationText?.style.animationDelay);
    expect(availabilityIcon?.style.animationDelay).toBe(availabilityText?.style.animationDelay);
    expect(availabilityIcon?.classList.contains("animate-pulse")).toBe(false);
  });
});
