import "./Primitives.css";

/**
 * CS/Stat (Figma 588:61): big number + label.
 * - variant "tile": boxed, used in case study hero stat rows
 * - variant "inline": compact, used inside project cards
 */
function Stat({ value, label, variant = "tile" }) {
  return (
    <div className={`stat stat--${variant}`}>
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export default Stat;
