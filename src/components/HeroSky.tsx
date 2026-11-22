import React, { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 uv;
  uniform vec2 resolution;
  uniform float time;

  float random(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(random(i), random(i + vec3(1, 0, 0)), f.x),
          mix(random(i + vec3(0, 1, 0)), random(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(random(i + vec3(0, 0, 1)), random(i + vec3(1, 0, 1)), f.x),
          mix(random(i + vec3(0, 1, 1)), random(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }

  void main() {
    float aspect = resolution.x / max(resolution.y, 1.0);
    vec2 screen = (uv - 0.5) * vec2(aspect, 1.0);
    vec3 direction = normalize(vec3(screen * 1.4, 1.0));
    vec3 p = direction * 3.2 + vec3(time * 0.018, time * 0.009, time * 0.012);
    float clouds = noise(p) * 0.57 + noise(p * 2.0) * 0.28 + noise(p * 4.0) * 0.15;
    vec3 sky = mix(vec3(0.93, 0.95, 0.98), vec3(0.96, 0.97, 0.99), uv.y);
    sky = mix(sky, vec3(0.97, 0.96, 0.99), smoothstep(0.25, 0.85, clouds) * 0.25);
    sky = mix(sky, vec3(1.0), smoothstep(0.42, 0.75, clouds) * 0.3);
    gl_FragColor = vec4(sky, 1.0);
  }
`;

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error("Could not create the hero sky shader.");
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Could not compile the hero sky shader:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    console.error("Could not create the hero sky shader program.");
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not link the hero sky shader:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const HeroSky: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) {
      console.warn("WebGL is unavailable; using the static hero sky.");
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let resolution: WebGLUniformLocation | null = null;
    let time: WebGLUniformLocation | null = null;
    let frame: number | null = null;
    let visible = true;
    let contextLost = false;
    let elapsed = 0;
    let previousTime: number | null = null;

    const stop = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    };

    const initialize = () => {
      program = createProgram(gl);
      if (!program) return false;
      buffer = gl.createBuffer();
      if (!buffer) {
        console.error("Could not create the hero sky vertex buffer.");
        gl.deleteProgram(program);
        program = null;
        return false;
      }
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      resolution = gl.getUniformLocation(program, "resolution");
      time = gl.getUniformLocation(program, "time");
      return true;
    };

    const draw = (timestamp: number) => {
      frame = null;
      if (!program || contextLost || !visible || document.hidden) return;
      if (previousTime !== null) elapsed += Math.min(timestamp - previousTime, 100);
      previousTime = timestamp;
      const bounds = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, elapsed / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = "1";
      if (!motion.matches) frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame === null && visible && !document.hidden && !contextLost) draw(performance.now());
    };
    const onMotionChange = () => { stop(); start(); };
    const onVisibilityChange = () => { if (document.hidden) stop(); else start(); };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      canvas.style.opacity = "0";
      stop();
    };
    const onContextRestored = () => {
      contextLost = false;
      program = null;
      buffer = null;
      if (initialize()) start();
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(start);

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", start);
    observer?.observe(canvas);
    resizeObserver?.observe(canvas);
    if (initialize()) start();

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", start);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-sky" />;
};

export default HeroSky;
