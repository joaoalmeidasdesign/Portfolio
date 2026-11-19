import "./Primitives.css";

// Optional eyebrow (e.g. "01 · Overview") over a Poppins Black uppercase title.
function SectionHeader({ eyebrow, title, level = 2, id, className = "", reveal = false }) {
  const heading =
    level === 1 ? (
      <h1 className="section-title" id={id}>{title}</h1>
    ) : (
      <h2 className="section-title" id={id}>{title}</h2>
    );
  return (
    <header className={`section-header ${className}`.trim()} data-reveal={reveal || undefined}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {heading}
    </header>
  );
}

export default SectionHeader;
