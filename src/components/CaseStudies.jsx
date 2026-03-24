import "./CaseStudies.css";

function caseStudy(props) {
  return (
    // Reusable portfolio card with support for read-time, tags, and optional image overlays.
    <article className="case">
      <div className="case-header">
        <img src={props.img} alt={props.title} />
        {props.overlayImg ? (
          <img
            src={props.overlayImg}
            alt=""
            aria-hidden="true"
            className={`case-overlay ${props.overlayClassName || ""}`.trim()}
          />
        ) : null}
        <p className="read-time">{props.time}</p>
        {props.tags?.length ? (
          <div className="case-tags">
            {props.tags.map((tag) => (
              <span className="case-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="case-info">
        <p className="case-title">{props.title}</p>
        <p className="case-description">{props.description}</p>
      </div>
    </article>
  );
}

export default caseStudy;
