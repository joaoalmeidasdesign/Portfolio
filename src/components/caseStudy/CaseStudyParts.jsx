// Shared case study template (Figma: Knight Training 588:66, Visitplann 613:133,
// AI Savings Assistant 589:109). Pages supply content; these blocks own the layout.
import "./CaseStudy.css";
import Stat from "../Stat.jsx";
import { TagList } from "../Tag.jsx";
import { withBasePath } from "../../pathUtils.js";

/* ---------- Hero ---------- */
export function CaseStudyHero({ image, title, lead, sub, tags, stats, variant = "major" }) {
  return (
    <header className={`cs-hero cs-hero--${variant}`}>
      {image ? (
        <img
          className="cs-hero__image"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          fetchPriority="high"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      ) : null}
      <div className="cs-hero__title-row">
        <h1 className="cs-hero__title" data-hero-item>
          {title}
        </h1>
        <div className="cs-hero__meta">
          <p className="cs-hero__lead" data-hero-item>
            {lead}
          </p>
          {sub ? (
            <p className="cs-hero__sub" data-hero-item>
              {sub}
            </p>
          ) : null}
          {tags?.length ? (
            <div data-hero-item>
              <TagList tags={tags} />
            </div>
          ) : null}
        </div>
      </div>
      {stats?.length ? <StatRow stats={stats} /> : null}
    </header>
  );
}

export function StatRow({ stats, className = "" }) {
  return (
    <ul className={`cs-stats ${className}`.trim()} data-reveal-stagger>
      {stats.map((stat) => (
        <li key={stat.label}>
          <Stat value={stat.value} label={stat.label} />
        </li>
      ))}
    </ul>
  );
}

/* ---------- Overview: role cards + the problem ---------- */
export function CaseStudyOverview({ roles, problemTitle = "The problem", problem }) {
  return (
    <section className="cs-band cs-band--surface" aria-labelledby="cs-problem-title">
      <div className="cs-band__inner cs-overview">
        <ul className="cs-roles" data-reveal-stagger>
          {roles.map((role) => (
            <li className="cs-card" key={role.label}>
              <h2 className="cs-card__label">{role.label}</h2>
              <p className="cs-card__text">{role.text}</p>
            </li>
          ))}
        </ul>
        <div className="cs-problem" data-reveal>
          <h2 className="cs-problem__title" id="cs-problem-title">
            {problemTitle}
          </h2>
          <div className="cs-problem__text">
            {problem.map((paragraph) => (
              <p
                key={paragraph.text}
                className={paragraph.soft ? "cs-text--soft" : undefined}
              >
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section shell ---------- */
export function CaseStudySection({ id, eyebrow, title, intro, tone = "bg", children }) {
  const headingId = `${id}-title`;
  return (
    <section
      className={`cs-band cs-band--${tone}`}
      id={id}
      aria-labelledby={headingId}
    >
      <div className="cs-band__inner cs-section">
        <header className="cs-section__header" data-reveal>
          {eyebrow ? <p className="cs-section__eyebrow">{eyebrow}</p> : null}
          <h2 className="section-title" id={headingId}>
            {title}
          </h2>
          {intro ? <p className="cs-section__intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

/* ---------- Text ---------- */
// Grey bold heading over light body text. `body` may be a string, an array of
// paragraphs, or JSX. `soft` uses the softer body colour.
export function TextBlock({ heading, body, soft = false, className = "", headingLevel = 3 }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  let headingEl = null;
  if (heading) {
    headingEl =
      headingLevel === 4 ? (
        <h4 className="cs-text__heading">{heading}</h4>
      ) : (
        <h3 className="cs-text__heading">{heading}</h3>
      );
  }
  return (
    <div className={`cs-text ${soft ? "cs-text--soft" : ""} ${className}`.trim()}>
      {headingEl}
      {paragraphs.map((paragraph, index) =>
        typeof paragraph === "string" ? (
          <p className="cs-text__body" key={index}>
            {paragraph}
          </p>
        ) : (
          <div className="cs-text__body" key={index}>
            {paragraph}
          </div>
        )
      )}
    </div>
  );
}

export function BulletList({ items }) {
  return (
    <ul className="cs-bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// Two or three text columns that stack below 768px.
export function Columns({ children, count = 2, className = "" }) {
  return (
    <div className={`cs-columns cs-columns--${count} ${className}`.trim()} data-reveal>
      {children}
    </div>
  );
}

// Boxed text card (e.g. "What proved it").
export function BoxedText({ heading, body, className = "" }) {
  return (
    <div className={`cs-box ${className}`.trim()} data-reveal>
      <TextBlock heading={heading} body={body} />
    </div>
  );
}

/* ---------- Images ---------- */
// Phone screens on a surface-raised panel. Each image carries its Figma
// display size; the panel scrolls horizontally if the phones don't fit.
export function PhonePanel({ images, height, caption, tag, className = "" }) {
  return (
    <figure className={`cs-figure ${className}`.trim()} data-reveal>
      {tag ? <TagList tags={[tag]} /> : null}
      <div
        className="cs-panel"
        style={{ "--panel-h": `${height}px` }}
        tabIndex={0}
        role="group"
        aria-label={caption || "Screens"}
      >
        <div className="cs-panel__track">
          {images.map((image) => (
            <img
              key={image.src}
              className="cs-phone"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{
                "--phone-w": `${image.width}px`,
                "--phone-h": `${image.height}px`,
                objectPosition: image.position || "center",
              }}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
      {caption ? <figcaption className="cs-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}

// A single flat image (diagram, board, cover) inside the panel style.
export function FlatImage({ image, caption, className = "", panel = true }) {
  return (
    <figure className={`cs-figure ${className}`.trim()} data-reveal>
      <img
        className={`cs-flat ${panel ? "cs-flat--panel" : ""}`.trim()}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      {caption ? <figcaption className="cs-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}

/* ---------- Loop step row (Knight Training) ---------- */
export function StepRow({ number, title, blocks, tags, panel, reverse = false }) {
  return (
    <li className={`cs-step ${reverse ? "cs-step--reverse" : ""}`.trim()} data-reveal>
      <div className="cs-step__text">
        <h3 className="cs-step__title">
          <span className="cs-step__number" aria-hidden="true">
            {number}
          </span>
          <span className="visually-hidden">Step {number}: </span>
          {title}
        </h3>
        {blocks.map((block) => (
          <TextBlock
            key={block.heading}
            heading={block.heading}
            body={block.body}
            soft={block.soft}
            headingLevel={4}
          />
        ))}
        <TagList tags={tags} />
      </div>
      <PhonePanel
        images={panel.images}
        height={panel.height}
        caption={panel.label}
        className="cs-step__media cs-figure--no-caption"
      />
    </li>
  );
}

/* ---------- Table ---------- */
export function FeedbackTable({ caption, columns, rows }) {
  return (
    <div className="cs-table-wrap" data-reveal>
      <table className="cs-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.said}>
              <td className="cs-table__said">{row.said}</td>
              <td className="cs-table__changed">{row.changed}</td>
              <td className="cs-table__status">
                <TagList tags={[row.status]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Conclusion ---------- */
export function CaseStudyConclusion({ title = "Where it stands", paragraphs, stats, children }) {
  return (
    <section className="cs-band cs-band--surface" aria-labelledby="cs-conclusion-title">
      <div className="cs-band__inner cs-section">
        <h2 className="section-title" id="cs-conclusion-title" data-reveal>
          {title}
        </h2>
        <div className="cs-conclusion" data-reveal>
          <div className="cs-conclusion__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {children}
          </div>
          {stats?.length ? <StatRow stats={stats} className="cs-stats--stacked" /> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- Next case study ---------- */
export function NextCaseStudy({ slug, title, text, image, navigate }) {
  const href = withBasePath(`/case-studies/${slug}`);
  const handleClick = (event) => {
    if (!navigate) return;
    event.preventDefault();
    navigate(`/case-studies/${slug}`);
  };
  return (
    <section className="cs-band cs-band--bg" aria-label="Next case study">
      <div className="cs-band__inner">
        <a className="cs-next" href={href} onClick={handleClick} data-reveal>
          <span className="cs-next__text">
            <span className="eyebrow">Next case study</span>
            <span className="cs-next__title">{title} →</span>
            <span className="cs-next__desc">{text}</span>
          </span>
          <img
            className="cs-next__image"
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </section>
  );
}
