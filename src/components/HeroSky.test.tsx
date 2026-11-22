import React from "react";
import { fireEvent, render } from "@testing-library/react";
import HeroSky from "./HeroSky";

describe("hero sky", () => {
  let reducedMotion: boolean;
  let motionChange: (() => void) | undefined;
  let gl: WebGLRenderingContext;
  let frames: Map<number, FrameRequestCallback>;
  let nextFrame: number;

  beforeEach(() => {
    reducedMotion = false;
    motionChange = undefined;
    frames = new Map();
    nextFrame = 0;
    window.matchMedia = jest.fn().mockImplementation(() => ({
      get matches() { return reducedMotion; },
      addEventListener: jest.fn((_, callback) => { motionChange = callback; }),
      removeEventListener: jest.fn(),
    }));
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => { frames.delete(id); });
    gl = {
      createShader: jest.fn(() => ({})),
      shaderSource: jest.fn(),
      compileShader: jest.fn(),
      getShaderParameter: jest.fn(() => true),
      deleteShader: jest.fn(),
      createProgram: jest.fn(() => ({})),
      attachShader: jest.fn(),
      linkProgram: jest.fn(),
      getProgramParameter: jest.fn(() => true),
      createBuffer: jest.fn(() => ({})),
      useProgram: jest.fn(),
      bindBuffer: jest.fn(),
      bufferData: jest.fn(),
      getAttribLocation: jest.fn(() => 0),
      enableVertexAttribArray: jest.fn(),
      vertexAttribPointer: jest.fn(),
      viewport: jest.fn(),
      getUniformLocation: jest.fn(() => ({})),
      uniform2f: jest.fn(),
      uniform1f: jest.fn(),
      drawArrays: jest.fn(),
      deleteBuffer: jest.fn(),
      deleteProgram: jest.fn(),
    } as unknown as WebGLRenderingContext;
    jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(gl);
  });

  afterEach(() => jest.restoreAllMocks());

  it("renders and animates the sky, then releases resources on unmount", () => {
    const { unmount } = render(<HeroSky />);
    expect(gl.drawArrays).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(1);
    const callback = Array.from(frames.values())[0];
    frames.clear();
    callback(performance.now() + 16);
    expect(gl.drawArrays).toHaveBeenCalledTimes(2);
    unmount();
    expect(frames.size).toBe(0);
    expect(gl.deleteBuffer).toHaveBeenCalled();
    expect(gl.deleteProgram).toHaveBeenCalled();
  });

  it("renders a static sky for reduced motion and responds to preference changes", () => {
    reducedMotion = true;
    render(<HeroSky />);
    expect(gl.drawArrays).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
    fireEvent(window, new Event("resize"));
    expect(gl.drawArrays).toHaveBeenCalledTimes(2);
    reducedMotion = false;
    motionChange?.();
    expect(frames.size).toBe(1);
    reducedMotion = true;
    motionChange?.();
    expect(frames.size).toBe(0);
  });

  it("keeps the CSS fallback when WebGL is unavailable", () => {
    jest.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
    const warning = jest.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<HeroSky />);
    expect(container.querySelector(".hero-sky")).not.toBeNull();
    expect(warning).toHaveBeenCalled();
    expect(frames.size).toBe(0);
  });

  it("shows the fallback during context loss and restores the sky", () => {
    const { container } = render(<HeroSky />);
    const canvas = container.querySelector("canvas")!;
    expect(canvas.style.opacity).toBe("1");
    fireEvent(canvas, new Event("webglcontextlost", { cancelable: true }));
    expect(canvas.style.opacity).toBe("0");
    expect(frames.size).toBe(0);
    fireEvent(canvas, new Event("webglcontextrestored"));
    expect(canvas.style.opacity).toBe("1");
    expect(frames.size).toBe(1);
  });
});
