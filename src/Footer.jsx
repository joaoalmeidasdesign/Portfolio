import "./Footer.css";
import DotGrid from "./DotGrid.jsx";
import { withBasePath } from "./pathUtils.js";

const CONTACT_HREF = "mailto:joaoalmeidas.design@gmail.com";
const CV_HREF =
  "https://1drv.ms/b/c/902868921bb862fd/EUibngL2MWhBtZUnwByhWCQBVbMmWpby9EBiJsfv59ac-A?e=hD8nGa";
const LINKEDIN_HREF = "https://www.linkedin.com/in/imjoaosilva/";

function Footer({ navigate }) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (event, nextPath, options) => {
    if (!navigate) return;
    event.preventDefault();
    navigate(nextPath, options);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-grid-background" aria-hidden="true">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2a1362"
          activeColor="#7F5AF0"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="site-footer-inner">
        <div className="site-footer-hero" aria-labelledby="footer-title">
          <h2 className="site-footer-title" id="footer-title">
            <span className="site-footer-title-line">
              Let’s build something that ships,{" "}
              <a className="site-footer-title-link" href={CONTACT_HREF}>
                say hi.
              </a>
            </span>
          </h2>
          <p className="site-footer-copy">
            Open to Product Designer roles and select freelance—mobile, web, and
            design systems.
          </p>
        </div>

        <div className="site-footer-meta">
          <section className="site-footer-column" aria-label="Copyright">
            <h3 className="site-footer-label">Copyright</h3>
            <p className="site-footer-note">© {currentYear} Joao Silva</p>
          </section>

          <section className="site-footer-column" aria-label="Contact">
            <h3 className="site-footer-label">Contact</h3>
            <a className="site-footer-meta-link" href={CONTACT_HREF}>
              joaoalmeidas.design@gmail.com
            </a>
          </section>

          <section className="site-footer-column" aria-label="Explore">
            <h3 className="site-footer-label">Explore</h3>
            <div className="site-footer-link-list">
              <a
                className="site-footer-meta-link"
                href={`${withBasePath("/")}#work`}
                onClick={(event) =>
                  handleNavigate(event, "/", {
                    hash: "work",
                    behavior: "smooth",
                  })
                }
              >
                Work
              </a>
              <a
                className="site-footer-meta-link"
                href={withBasePath("/about")}
                onClick={(event) => handleNavigate(event, "/about")}
              >
                About
              </a>
              <a
                className="site-footer-meta-link"
                href={CV_HREF}
                target="_blank"
                rel="noreferrer"
              >
                Get CV
              </a>
            </div>
          </section>

          <section className="site-footer-column" aria-label="Let's connect">
            <h3 className="site-footer-label">Let&apos;s connect</h3>
            <div className="site-footer-link-list">
              <a
                className="site-footer-meta-link"
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
