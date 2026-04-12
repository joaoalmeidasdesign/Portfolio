import "./System.css";

function DesignSystem({ description, img, title }) {
  return (
    // Reusable card used for each item in the design-process section.
    <article className="card">
      <div className="card-header">
        <div className="card-icon-wrap">
          {img ? <img src={img} alt="" className="card-icon" /> : null}
        </div>
        <p className="card-title">{title}</p>
      </div>
      <div className="card-description">
        <p>{description}</p>
      </div>
    </article>
  );
}

export default DesignSystem;
