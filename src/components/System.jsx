import "./System.css";

function DesignSystem(props) {
  return (
    // Reusable card used for each item in the design-process section.
    <article className="card">
      <div className="card-header">
        <div className="card-icon-wrap">
          {props.img ? <img src={props.img} alt="" className="card-icon" /> : null}
        </div>
        <p className="card-title">{props.title}</p>
      </div>
      <div className="card-description">
        <p>{props.description}</p>
      </div>
    </article>
  );
}

export default DesignSystem;
