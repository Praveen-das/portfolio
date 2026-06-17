import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * Reusable Lenis smooth scroll hook.
 *
 * @param {object}  [options]
 * @param {React.RefObject} [options.wrapperRef] - Ref to a scrollable container.
 *   Omit for a global (window-level) instance.
 * @param {number}  [options.lerp=0.075] - Interpolation factor.
 * @param {boolean} [options.enabled=true] - Start / stop the instance reactively.
 * @returns {React.MutableRefObject<Lenis | null>} lenisRef
 */
export function useLenis({ wrapperRef, contentRef, lerp = 0.075, enabled = true } = {}) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // Create / destroy
  useEffect(() => {
    // For scoped usage, wait until the wrapper DOM node exists
    if (wrapperRef && !wrapperRef.current) return;

    const config = { lerp };

    if (wrapperRef?.current) {
      config.wrapper = wrapperRef.current;
      config.content = contentRef?.current || wrapperRef.current;
    }

    const lenis = new Lenis(config);
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
    // wrapperRef is a ref object – stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lerp, wrapperRef]);

  // Start / stop reactively
  useEffect(() => {
    if (!lenisRef.current) return;
    if (enabled) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [enabled]);

  return lenisRef;
}
