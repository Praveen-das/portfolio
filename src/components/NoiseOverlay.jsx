import { useEffect, useRef, memo } from "react";

// ── Shaders ────────────────────────────────────────────────────────────
const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// mediump is sufficient for noise hash — faster on mobile GPUs
const FRAG = `
  precision mediump float;
  uniform vec2 u_offset;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    float n = step(0.5, hash(gl_FragCoord.xy + u_offset));
    gl_FragColor = vec4(vec3(n), 1.0);
  }
`;

// ── Helpers ────────────────────────────────────────────────────────────
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ── Constants ──────────────────────────────────────────────────────────
const GRAIN_SCALE = 0.7; // Half-res — 60% fewer pixels, grain still reads well via CSS upscale
const FRAME_INTERVAL = 1000 / 24; // ~24fps cinematic cadence
const RESIZE_DEBOUNCE_MS = 150;

// Hoisted — avoids object re-creation on every render
const CANVAS_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 100,
  opacity: 0.2,
  mixBlendMode: "soft-light",
  willChange: "transform", // Promotes to own compositing layer
};

// Fullscreen quad data — allocated once, shared across mounts
const QUAD_VERTICES = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

// ── Component ──────────────────────────────────────────────────────────
const NoiseOverlay = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha: false — CSS opacity handles blending, no need for GL alpha compositing
    const gl = canvas.getContext("webgl", {
      alpha: false,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power", // Prefer integrated GPU for this lightweight effect
    });

    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uOffset = gl.getUniformLocation(program, "u_offset");

    // Debounced resize — prevents GL viewport thrashing during drag-resize
    let resizeTimer = 0;
    const applyResize = () => {
      const w = Math.round(window.innerWidth * GRAIN_SCALE);
      const h = Math.round(window.innerHeight * GRAIN_SCALE);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyResize, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", onResize);
    applyResize();

    // Render loop — rAF only scheduled after a frame is drawn to avoid wasted callbacks
    let animationId = 0;
    let lastTime = 0;

    const loop = (time) => {
      const delta = time - lastTime;

      if (delta >= FRAME_INTERVAL) {
        lastTime = time - (delta % FRAME_INTERVAL); // Drift-corrected timing
        gl.uniform2f(uOffset, Math.random() * 1000, Math.random() * 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} style={CANVAS_STYLE} />;
});

NoiseOverlay.displayName = "NoiseOverlay";

export default NoiseOverlay;
