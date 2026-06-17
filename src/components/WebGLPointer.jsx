import { useEffect, useRef } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
} from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_velocity;
  varying vec2 vUv;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;
    
    // Correct for aspect ratio
    st.x *= u_resolution.x / u_resolution.y;
    mouse.x *= u_resolution.x / u_resolution.y;

    // Distance from pixel to mouse
    vec2 diff = st - mouse;
    float dist = length(diff);

    // Simple solid circle with minimal anti-aliasing
    float circle = 1.0 - smoothstep(0.004, 0.005, dist);
    
    gl_FragColor = vec4(vec3(1.0), circle);
  }
`;

export default function WebGLPointer() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Hide pointer on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = mountRef.current;
    if (!container) return;

    const renderer = new WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: new Vector2(window.innerWidth / 2, window.innerHeight / 2) },
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        u_time: { value: 0 },
        u_velocity: { value: new Vector2(0, 0) }
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let velX = 0;
    let velY = 0;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = window.innerHeight - e.clientY; // WebGL uses bottom-left origin
    };

    window.addEventListener("mousemove", onMouseMove);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resize);

    let frameId;
    let lastTime = performance.now();

    const render = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const prevX = mouseX;
      const prevY = mouseY;
      
      // Direct 1:1 mapping, no lerp delay
      mouseX = targetX;
      mouseY = targetY;

      // Calculate velocity for deformation
      velX = mouseX - prevX;
      velY = mouseY - prevY;

      // Normalize velocity uniform
      material.uniforms.u_mouse.value.set(mouseX, mouseY);
      material.uniforms.u_velocity.value.set(velX / window.innerWidth, velY / window.innerHeight);
      material.uniforms.u_time.value = time * 0.001;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999, // Ensure it's on top of everything
        mixBlendMode: "difference"
      }}
    />
  );
}
