import { useEffect, useRef, useState } from "react";
import "./Primitives.css";
import { prefersReducedMotion } from "../motion.js";

const COUNT_DURATION = 800;
const isPlainInteger = (value) => /^\d+$/.test(String(value));

// Counts a plain integer up from 0 the first time it enters the viewport.
// Anything else ("300km", "~8h", "1 + 1") stays static.
function useCountUp(value) {
  const ref = useRef(null);
  const target = isPlainInteger(value) ? Number(value) : null;
  const animate =
    target !== null &&
    typeof window !== "undefined" &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion();
  const [display, setDisplay] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate || !ref.current) return undefined;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / COUNT_DURATION);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animate, target]);

  return [ref, display, animate];
}

/**
 * CS/Stat (Figma 588:61): big number + label.
 * - variant "tile": boxed, used in case study hero stat rows
 * - variant "inline": compact, used inside project cards
 * - size "sm": smaller number for long values ("10→300km")
 */
function Stat({ value, label, variant = "tile", size }) {
  const [ref, display, animated] = useCountUp(value);
  return (
    <div className={`stat stat--${variant} ${size === "sm" ? "stat--sm" : ""}`.trim()} ref={ref}>
      {animated ? (
        <>
          <span className="stat__value" aria-hidden="true">
            {display}
          </span>
          <span className="visually-hidden">{value}</span>
        </>
      ) : (
        <span className="stat__value">{value}</span>
      )}
      <span className="stat__label">{label}</span>
    </div>
  );
}

export default Stat;
