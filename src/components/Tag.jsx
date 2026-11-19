import "./Primitives.css";

// Purple = built / live. Gold ("proposed") = proposed or in progress.
function Tag({ children, status = "built" }) {
  const modifier = status === "proposed" ? " tag--proposed" : "";
  return <span className={`tag${modifier}`}>{children}</span>;
}

export function TagList({ tags }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag.label}>
          <Tag status={tag.status}>{tag.label}</Tag>
        </li>
      ))}
    </ul>
  );
}

export default Tag;
