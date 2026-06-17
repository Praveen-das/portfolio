import { useEffect, useRef } from "react";
import { useTransform } from "framer-motion";
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
  uniform float u_globalOpacity;
  uniform vec2 u_mouseHistory[5];
  uniform float u_time;
  uniform float u_mouseStrength;
  uniform vec3 u_scaleOffset;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((u_resolution.x / u_resolution.y) / (u_imageRes.x / u_imageRes.y), 1.0),
      min((u_resolution.y / u_resolution.x) / (u_imageRes.y / u_imageRes.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Apply scaling and offsets
    float scale = u_scaleOffset.x;
    float offsetX = u_scaleOffset.y;
    float offsetY = u_scaleOffset.z;
    
    uv = (uv - 0.5) / scale + 0.5;
    uv.x -= offsetX;
    uv.y += offsetY;

    // Motion Blur Wipe Logic
    float wipeHeight = 0.4; 
    float progress = u_blend * (1.0 + wipeHeight) - wipeHeight;
    float edge = 1.0 - progress; 
    
    float distToEdge = uv.y - edge;
    float inZone = smoothstep(wipeHeight, 0.0, abs(distToEdge));
    
    float stretch = inZone * 0.05;
    vec2 stretchUv = uv;
    stretchUv.y += distToEdge * stretch;

    vec4 color1 = vec4(0.0);
    vec4 color2 = vec4(0.0);
    
    const int SAMPLES = 8;
    for(int i = 0; i < SAMPLES; i++) {
        float offset = (float(i) / float(SAMPLES) - 0.5) * wipeHeight * inZone;
        vec2 sampleUv = vec2(stretchUv.x, stretchUv.y + offset);
        color1 += texture2D(u_image1, sampleUv);
        color2 += texture2D(u_image2, sampleUv);
    }
    color1 /= float(SAMPLES);
    color2 /= float(SAMPLES);

    float mixFactor = smoothstep(-wipeHeight/2.0, wipeHeight/2.0, distToEdge);
    vec4 finalColor = mix(color1, color2, mixFactor);

    // Echoing Ghost Trails Logic
    for(int i = 0; i < 5; i++) {
       vec2 hMouse = u_mouseHistory[i];
       float dist = distance(vUv, hMouse);
       
       // Expanding radius for older ghosts
       float radius = 0.15 + float(i) * 0.05;
       float ghostStrength = smoothstep(radius, 0.0, dist) * u_mouseStrength;
       
       if (ghostStrength > 0.0) {
           // Sample from an offset UV to create the echo tear effect
           vec2 dir = normalize(vUv - hMouse);
           float offsetMag = ghostStrength * float(i) * 0.02;
           vec2 sampleUv = uv - dir * offsetMag; // Pull towards ghost center
           
           vec4 gColor1 = texture2D(u_image1, sampleUv);
           vec4 gColor2 = texture2D(u_image2, sampleUv);
           vec4 gColor = mix(gColor1, gColor2, mixFactor);
           
           // Fade out older ghosts
           float alpha = (1.0 - float(i)/5.0) * 0.6 * ghostStrength;
           
           // Chromatic shift for ghostly feel
           if (i == 1 || i == 4) gColor.r = mix(gColor.r, 1.0, 0.2); // slight red tint
           if (i == 2 || i == 3) gColor.b = mix(gColor.b, 1.0, 0.3); // slight blue tint

           vec3 gRgb = gColor.rgb * alpha;
           // Screen blend mode: A + B - A*B
           finalColor.rgb = finalColor.rgb + gRgb - (finalColor.rgb * gRgb);
       }
    }

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

export default function CanvasBackground({ scrollYProgress, aboutProgress }) {
  const canvasRef = useRef(null);

  const blend = useTransform(aboutProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(aboutProgress, [0.7, 0.9], [1, 0]);

  const glRef = useRef(null);
  const uniformsRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      console.error("WebGL context creation failed");
      return;
    }

    glRef.current = gl;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;
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
    const u_globalOpacity = gl.getUniformLocation(program, "u_globalOpacity");
    const u_mouseHistory = gl.getUniformLocation(program, "u_mouseHistory");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_mouseStrength = gl.getUniformLocation(program, "u_mouseStrength");
    const u_scaleOffset = gl.getUniformLocation(program, "u_scaleOffset");

    uniformsRef.current = {
      u_blend,
      u_globalOpacity,
      u_imageRes,
      u_mouseHistory,
      u_time,
      u_mouseStrength,
      u_scaleOffset,
    };

    const tex1 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    const tex2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const imageSize = { width: 0, height: 0 };

    const loadTexture = (url, tex, unit) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
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
      img.onerror = (e) => console.error("Error loading texture:", url, e);
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

    const targetMouse = { x: 0.5, y: 0.5, strength: 1.0 };
    const mice = Array(5)
      .fill()
      .map(() => ({ x: 0.5, y: 0.5 }));
    const historyFlat = new Float32Array(10);

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
      targetMouse.strength = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();

    let animationFrameId;
    let startTime = performance.now();

    const render = (now) => {
      const time = (now - startTime) * 0.001;

      // Spring chain for ghost trailing
      mice[0].x += (targetMouse.x - mice[0].x) * 0.15;
      mice[0].y += (targetMouse.y - mice[0].y) * 0.15;

      for (let i = 1; i < 5; i++) {
        mice[i].x += (mice[i - 1].x - mice[i].x) * 0.25;
        mice[i].y += (mice[i - 1].y - mice[i].y) * 0.25;
      }

      for (let i = 0; i < 5; i++) {
        historyFlat[i * 2] = mice[i].x;
        historyFlat[i * 2 + 1] = mice[i].y;
      }

      const isTouch = window.matchMedia("(pointer: coarse)").matches;

      const isMobile = window.innerWidth <= 768;
      const scale = isMobile ? 1.2 : 1.0;
      const offsetX = isMobile ? 0.015 : 0.0;
      const offsetY = isMobile ? 0.18 : 0.0;

      gl.uniform1f(u_blend, blend.get());
      gl.uniform1f(u_globalOpacity, opacity.get());
      gl.uniform2f(uniformsRef.current.u_imageRes, imageSize.width || canvas.width, imageSize.height || canvas.height);
      gl.uniform2fv(uniformsRef.current.u_mouseHistory, historyFlat);
      gl.uniform1f(uniformsRef.current.u_time, time);
      gl.uniform1f(uniformsRef.current.u_mouseStrength, isTouch ? 0.0 : 1.0);
      gl.uniform3f(uniformsRef.current.u_scaleOffset, scale, offsetX, offsetY);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteTexture(tex1);
      gl.deleteTexture(tex2);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      className="canvas-bg-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
