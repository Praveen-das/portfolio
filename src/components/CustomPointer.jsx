import { useEffect, useRef } from "react";

const MAGNETIC_RADIUS = 40; // px — distance to trigger snap
const SNAP_SIZE = 48; // px — diameter of the circle when snapped
const PROJECT_SIZE = 80; // px — diameter when hovering a project
const HEADER_RADIUS = 50; // px — proximity to start shrinking near header links

export default function CustomPointer() {
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isOverProject = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = dotRef.current;
    if (!el) return;

    const findNearest = (mx, my) => {
      const icons = document.querySelectorAll(".social-icon");
      let best = null;
      let bestDist = Infinity;

      icons.forEach((icon) => {
        const r = icon.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);

        if (dist < bestDist) {
          bestDist = dist;
          best = { cx, cy, dist };
        }
      });

      return best;
    };

    /** Find nearest header link edge distance */
    const findNearestHeader = (mx, my) => {
      const links = document.querySelectorAll(".header-nav a, .header-logo");
      let bestDist = Infinity;

      links.forEach((link) => {
        const r = link.getBoundingClientRect();
        // Distance to nearest edge of the rect, not center
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top - my, 0, my - r.bottom);
        const dist = Math.hypot(dx, dy);
        if (dist < bestDist) bestDist = dist;
      });

      return bestDist;
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;
      isOverProject.current = !!(target && target.closest && target.closest(".project-layout"));
    };

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const nearest = findNearest(mx, my);

      let targetX = mx;
      let targetY = my;
      let isSnapped = false;

      if (nearest && nearest.dist < MAGNETIC_RADIUS) {
        // Fully snap to icon center
        targetX = nearest.cx;
        targetY = nearest.cy;
        isSnapped = true;

        const half = SNAP_SIZE / 2;
        el.style.width = `${SNAP_SIZE}px`;
        el.style.height = `${SNAP_SIZE}px`;
        el.style.top = `${-half}px`;
        el.style.left = `${-half}px`;
        if (textRef.current) textRef.current.style.opacity = 0;
      } else {
        // Check header proximity for progressive shrink
        const headerDist = findNearestHeader(mx, my);
        const DEFAULT_SIZE = 15;

        if (headerDist < HEADER_RADIUS) {
          const strength = headerDist / HEADER_RADIUS; // 0 at link, 1 at edge
          const size = DEFAULT_SIZE * strength;
          const half = size / 2;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.top = `${-half}px`;
          el.style.left = `${-half}px`;
        } else if (isOverProject.current) {
          const half = PROJECT_SIZE / 2;
          el.style.width = `${PROJECT_SIZE}px`;
          el.style.height = `${PROJECT_SIZE}px`;
          el.style.top = `${-half}px`;
          el.style.left = `${-half}px`;
          if (textRef.current) textRef.current.style.opacity = 1;
        } else {
          el.style.width = `${DEFAULT_SIZE}px`;
          el.style.height = `${DEFAULT_SIZE}px`;
          el.style.top = "-6px";
          el.style.left = "-6px";
        }
        if (!isOverProject.current && textRef.current) textRef.current.style.opacity = 0;
      }

      // Faster lerp when snapping, slower when returning to free movement
      const ease = isSnapped ? 0.25 : 0.35;
      pos.current.x += (targetX - pos.current.x) * ease;
      pos.current.y += (targetY - pos.current.y) * ease;

      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: "-6px",
        left: "-6px",
        width: "15px",
        height: "15px",
        backgroundColor: "white",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        willChange: "transform",
        transition: "width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        ref={textRef}
        className="sub-font"
        style={{
          color: "black",
          fontSize: "10px",
          fontWeight: "bold",
          letterSpacing: "1px",
          whiteSpace: "nowrap",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        VIEW
      </span>
    </div>
  );
}
