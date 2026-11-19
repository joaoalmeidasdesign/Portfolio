import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import { withBasePath } from "./pathUtils.js";
import { CV_HREF } from "./siteLinks.js";
import logoSrc from "./assets/logo.svg";

// Nav link (Figma 710:340). The current page gets the hover style + aria-current.
function NavLink({ current = false, highlight = false, className, children, ...rest }) {
  const classes = [className, highlight ? "nav-link--highlight" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <a className={classes} aria-current={current ? "page" : undefined} {...rest}>
      <span className="nav-link__label">{children}</span>
    </a>
  );
}

function Nav({ currentPath = "/", navigate }) {
  const navRef = useRef(null);
  // Controls the fullscreen menu on tablet/mobile.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Shared navigation helper so desktop and mobile links behave the same way.
  const handleNavigate = (event, nextPath, options) => {
    if (!navigate) return;
    event.preventDefault();
    setIsMenuOpen(false);
    navigate(nextPath, options);
  };

  useEffect(() => {
    // Adds a blur treatment once the user scrolls away from the top.
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 10 && !isMenuOpen) {
          navRef.current.classList.add("navbar-blur");
        } else {
          navRef.current.classList.remove("navbar-blur");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    // Escape always closes the fullscreen menu.
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Route changes should also close the menu.
    setIsMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    // Lock scroll behind the fullscreen menu, including touch scrolling on iOS.
    if (!isMenuOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscrollBehavior =
      document.documentElement.style.overscrollBehavior;

    const preventScroll = (event) => {
      event.preventDefault();
    };

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    };
  }, [isMenuOpen]);

  // Every page ends with the contact band (#contact), so Contact scrolls there.
  const handleContact = (event) => {
    const target = document.getElementById("contact");
    if (!target) return;
    event.preventDefault();
    setIsMenuOpen(false);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const renderLinks = (className) => (
    <>
      <NavLink
        className={className}
        current={currentPath === "/"}
        href={`${withBasePath("/")}#work`}
        onClick={(event) =>
          handleNavigate(event, "/", { hash: "work", behavior: "smooth" })
        }
      >
        Work
      </NavLink>
      <NavLink
        className={className}
        current={currentPath === "/about"}
        href={withBasePath("/about")}
        onClick={(event) => handleNavigate(event, "/about")}
      >
        About
      </NavLink>
      <NavLink className={className} href="#contact" onClick={handleContact}>
        Contact
      </NavLink>
      <NavLink
        className={className}
        highlight
        href={CV_HREF}
        target="_blank"
        rel="noreferrer"
        onClick={() => setIsMenuOpen(false)}
      >
        Get CV
      </NavLink>
    </>
  );

  return (
    <nav
      className={`navbar ${currentPath === "/" ? "navbar--home" : ""} ${isMenuOpen ? "navbar-menu-open" : ""}`}
      ref={navRef}
      aria-label="Main"
    >
      <div className="navbar-inner">
        <a
          className="navbar-logo"
          href={withBasePath("/")}
          aria-label="João Silva, home"
          onClick={(event) => handleNavigate(event, "/")}
        >
          <img className="navbar-logo__img" src={logoSrc} alt="" />
        </a>
        <div className="navbar-buttons">{renderLinks("nav-link")}</div>
        <button
          // Hamburger / close control used below desktop widths.
          className={`nav-toggle ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-line nav-toggle-line-top" />
          <span className="nav-toggle-line nav-toggle-line-middle" />
          <span className="nav-toggle-line nav-toggle-line-bottom" />
        </button>
      </div>
      {isMenuOpen ? (
        // Fullscreen overlay menu. It is only rendered while open.
        <div className="navbar-menu is-open">
          <div className="navbar-menu-inner">
            {renderLinks("nav-link navbar-menu-link")}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Nav;
