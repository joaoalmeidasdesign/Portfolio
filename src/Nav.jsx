import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import { withBasePath } from "./pathUtils.js";

const CONTACT_HREF = "mailto:joaoalmeidas.design@gmail.com";

function Nav({ currentPath = "/", navigate }) {
  const navRef = useRef(null);
  const logoSrc = withBasePath("/jsdesign.svg");
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
        if (window.scrollY > 10) {
          navRef.current.classList.add("navbar-blur");
        } else {
          navRef.current.classList.remove("navbar-blur");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    // Prevent page scrolling behind the fullscreen menu.
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        <a
          className="navbar-logo"
          href={withBasePath("/")}
          aria-label="Joao Silva portfolio home"
          onClick={(event) => handleNavigate(event, "/")}
        >
          <img
            src={logoSrc}
            alt="Joao Silva logo"
            style={{ height: "40px" }}
          />
        </a>
        <div className="navbar-buttons">
          <a
            className={`nav-btn ${currentPath === "/" ? "nav-btn-active" : ""}`}
            href={`${withBasePath("/")}#work`}
            onClick={(event) =>
              handleNavigate(event, "/", { hash: "work", behavior: "smooth" })
            }
          >
            Work
          </a>
          <a
            className={`nav-btn ${currentPath === "/about" ? "nav-btn-active" : ""}`}
            href={withBasePath("/about")}
            onClick={(event) => handleNavigate(event, "/about")}
          >
            About
          </a>
          <a className="nav-btn" href={CONTACT_HREF}>
            Contact
          </a>
          <a
            className="nav-btn nav-btn-accent"
            href="https://1drv.ms/b/c/902868921bb862fd/EUibngL2MWhBtZUnwByhWCQBVbMmWpby9EBiJsfv59ac-A?e=hD8nGa"
            target="_blank"
            rel="noreferrer"
          >
            Get CV
          </a>
        </div>
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
            <a
              className={`navbar-menu-link ${currentPath === "/" ? "nav-btn-active" : ""}`}
              href={`${withBasePath("/")}#work`}
              onClick={(event) =>
                handleNavigate(event, "/", { hash: "work", behavior: "smooth" })
              }
            >
              Work
            </a>
            <a
              className={`navbar-menu-link ${currentPath === "/about" ? "nav-btn-active" : ""}`}
              href={withBasePath("/about")}
              onClick={(event) => handleNavigate(event, "/about")}
            >
              About
            </a>
            <a
              className="navbar-menu-link"
              href={CONTACT_HREF}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              className="navbar-menu-link nav-btn-accent"
              href="https://1drv.ms/b/c/902868921bb862fd/EUibngL2MWhBtZUnwByhWCQBVbMmWpby9EBiJsfv59ac-A?e=hD8nGa"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Get CV
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Nav;
