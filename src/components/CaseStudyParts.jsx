import metaDeliveryIcon from "../assets/meta-delivery-icon.svg";
import metaTeamIcon from "../assets/meta-team-icon.svg";
import metaRoleIcon from "../assets/meta-role-icon.svg";

const META_ICONS = {
  role: metaRoleIcon,
  delivery: metaDeliveryIcon,
  team: metaTeamIcon,
};

export function CaseStudyMetaIcon({ kind }) {
  return (
    <img
      aria-hidden="true"
      className="case-study-meta-card__icon-svg"
      src={META_ICONS[kind] ?? metaRoleIcon}
      alt=""
    />
  );
}

export function CaseStudyMetaGrid({ items }) {
  return (
    <section className="case-study-meta-grid" aria-label="Case study overview">
      {items.map((item) => (
        <article className="case-study-meta-card" key={item.title}>
          <div className="case-study-meta-card__heading">
            <span className="case-study-meta-card__icon">
              <CaseStudyMetaIcon kind={item.icon} />
            </span>
            <h2 className="case-study-meta-card__title">{item.title}</h2>
          </div>
          <p className="case-study-meta-card__value">{item.value}</p>
        </article>
      ))}
    </section>
  );
}

export function CaseStudyBlock({ label, body = [] }) {
  return (
    <div className="case-study-block">
      {label ? <h3 className="case-study-block__label">{label}</h3> : null}
      {body.map((paragraph) => (
        <p className="case-study-block__copy" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
