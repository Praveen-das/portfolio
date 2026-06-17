import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import heroBg1 from "../assets/hero-bg.png";
import heroBg2 from "../assets/hero-bg2.png";

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform sampler2D u_image1;
  uniform sampler2D u_image2;
  uniform vec2 u_imageRes;
  uniform float u_blend;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_globalOpacity;
  varying vec2 vUv;

  float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 ratio = vec2(
      min((u_resolution.x / u_resolution.y) / (u_imageRes.x / u_imageRes.y), 1.0),
      min((u_resolution.y / u_resolution.x) / (u_imageRes.y / u_imageRes.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Motion Blur Wipe Logic
    float wipeHeight = 0.2; // Width of the blur zone
    float progress = u_blend * (1.0 + wipeHeight) - wipeHeight;
    float edge = 1.0 - progress; // Top to bottom wipe
    
    float distToEdge = uv.y - edge;
    float inZone = smoothstep(wipeHeight, 0.0, abs(distToEdge));
    
    // Vertical stretching effect in the blur zone
    float stretch = inZone * 0.5;
    vec2 stretchUv = uv;
    stretchUv.y += distToEdge * stretch;

    // Multi-sample for vertical blur
    vec4 color1 = vec4(0.0);
    vec4 color2 = vec4(0.0);
    
    const int SAMPLES = 8;
    for(int i = 0; i < SAMPLES; i++) {
        float offset = (float(i) / float(SAMPLES) - 0.5) * wipeHeight * inZone;
        vec2 sampleUv = vec2(uv.x, uv.y + offset);
        color1 += texture2D(u_image1, sampleUv);
        color2 += texture2D(u_image2, sampleUv);
    }
    color1 /= float(SAMPLES);
    color2 /= float(SAMPLES);

    // Hard wipe logic with blur zone mixing
    float mixFactor = smoothstep(-wipeHeight/2.0, wipeHeight/2.0, distToEdge);
    vec4 finalColor = mix(color1, color2, mixFactor);

    vec3 bgColor = vec3(0.039, 0.039, 0.039); 
    gl_FragColor = vec4(mix(bgColor, finalColor.rgb, u_globalOpacity), 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function CanvasBackground({ transitionProgress, aboutProgress }) {
  const canvasRef = useRef(null);

  // Transition progress from 0 (Hero) to 1 (About)
  // aboutProgress goes from 0 (About top at viewport bottom) to 1 (About bottom at viewport top)
  // We want the blend to happen as About comes into view.
  const blend = useTransform(aboutProgress, [0, 0.4], [0, 1]);

  // Fade out the background as we leave the About section
  const opacity = useTransform(aboutProgress, [0.7, 0.9], [1, 0]);

  const glRef = useRef(null);
  const uniformsRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const u_imageRes = gl.getUniformLocation(program, "u_imageRes");
    const u_blend = gl.getUniformLocation(program, "u_blend");
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_globalOpacity = gl.getUniformLocation(program, "u_globalOpacity");

    uniformsRef.current = { u_blend, u_globalOpacity, u_time, u_imageRes };

    const tex1 = gl.createTexture();
    const tex2 = gl.createTexture();

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const imageSize = { width: 0, height: 0 };

    const loadTexture = (url, tex, unit) => {
      const img = new Image();
      img.onload = () => {
        if (unit === gl.TEXTURE0) {
          imageSize.width = img.width;
          imageSize.height = img.height;
        }
        gl.activeTexture(unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      };
      img.src = url;
    };

    const u_image1_loc = gl.getUniformLocation(program, "u_image1");
    const u_image2_loc = gl.getUniformLocation(program, "u_image2");

    loadTexture(heroBg1, tex1, gl.TEXTURE0);
    gl.uniform1i(u_image1_loc, 0);

    loadTexture(heroBg2, tex2, gl.TEXTURE1);
    gl.uniform1i(u_image2_loc, 1);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u_resolution, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrameId;
    const render = (time) => {
      gl.uniform1f(u_blend, blend.get());
      gl.uniform1f(u_globalOpacity, opacity.get());
      gl.uniform1f(u_time, time * 0.001);
      gl.uniform2f(uniformsRef.current.u_imageRes, imageSize.width || canvas.width, imageSize.height || canvas.height);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteTexture(tex1);
      gl.deleteTexture(tex2);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []); // Re-run if needed, but textures are static

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
