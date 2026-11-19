import "./ProjectCard.css";
import Button from "./Button.jsx";
import Stat from "./Stat.jsx";
import badgeIcon from "../assets/badge-icon.svg";

/**
 * Home project card (Figma 701:194 / 701:258 / 701:321).
 * The whole card is one link; the "Read case study →" button is decorative.
 */
function ProjectCard({ project, href, onClick, className = "" }) {
  const {
    title,
    description,
    cover,
    readTime,
    readTimeTone = "light",
    badges,
    stats,
  } = project;

  return (
    <a
      className={`project-card ${className}`.trim()}
      href={href}
      onClick={onClick}
    >
      <div className="project-card__cover">
        <img
          className="project-card__image"
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          style={cover.position ? { objectPosition: cover.position } : undefined}
          loading="lazy"
          decoding="async"
        />
        <p className={`project-card__read-time project-card__read-time--${readTimeTone}`}>
          {readTime}
        </p>
        <ul className="project-card__badges">
          {badges.map((badge) => (
            <li className="project-card__badge" key={badge}>
              <img src={badgeIcon} alt="" width="16" height="16" />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <div className="project-card__stats">
          <div className="project-card__stat-group">
            {stats.map((stat) => (
              <Stat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                variant="inline"
              />
            ))}
          </div>
          <Button as="span" size="small" variant="primary" className="project-card__cta">
            Read case study →
          </Button>
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
