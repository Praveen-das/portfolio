import { useEffect, useRef } from "react";

// ── Shaders ────────────────────────────────────────────────────────────
const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform vec2 u_offset;

  // High-quality hash — produces sharp, film-like monochrome grain
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    // Binary black/white noise keyed to pixel coordinate + random offset
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

// ── Component ──────────────────────────────────────────────────────────
const GRAIN_SCALE = 0.8; // Render at native res for fine, smaller grain
const FPS = 24;

const NoiseOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    // Fullscreen quad (triangle strip)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uOffset = gl.getUniformLocation(program, "u_offset");

    // Resize — render below native res for larger grain
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * GRAIN_SCALE);
      canvas.height = Math.round(window.innerHeight * GRAIN_SCALE);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    // Render loop throttled to ~24fps for cinematic cadence
    let animationId;
    let lastTime = 0;

    const loop = (time) => {
      animationId = requestAnimationFrame(loop);

      if (time - lastTime < 1000 / FPS) return;
      lastTime = time;

      // Random 2D offset prevents diagonal sliding patterns and ensures complete randomness
      gl.uniform2f(uOffset, Math.random() * 1000, Math.random() * 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 100,
        opacity: 0.18,
        mixBlendMode: "soft-light",
      }}
    />
  );
};

export default NoiseOverlay;
