import "./Button.css";

/**
 * The one button style (Figma 705:307).
 * - variant: "primary" (filled) | "secondary" (outline)
 * - size: "large" | "small"
 * Renders an <a> when `href` is set, a <button> otherwise, or a plain
 * <span> when `as="span"` (decorative use inside another link).
 */
function Button({
  as,
  children,
  className = "",
  external = false,
  href,
  size = "large",
  variant = "primary",
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (as === "span") {
    return (
      <span className={classes} aria-hidden="true" {...rest}>
        {children}
      </span>
    );
  }

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noreferrer" }
      : {};
    return (
      <a className={classes} href={href} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
