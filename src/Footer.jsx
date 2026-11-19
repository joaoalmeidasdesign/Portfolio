import "./Footer.css";
import Button from "./components/Button.jsx";
import { CONTACT_HREF, CV_ROUTE, LINKEDIN_HREF } from "./siteLinks.js";
import { withBasePath } from "./pathUtils.js";
import { useCv } from "./cv/CvContext.js";

// Contact band + footer (Figma "Page end" 701:384). Shared by every page.
function Footer() {
  const { openCv } = useCv();
  const cvHref = withBasePath(CV_ROUTE);
  return (
    <div className="page-end">
      <section className="contact-band" id="contact" aria-labelledby="contact-title">
        <div className="contact-band__inner" data-reveal>
          <div className="contact-band__text">
            <p className="eyebrow">Contact</p>
            <h2 className="contact-band__title" id="contact-title">
              Open to Product Designer roles
            </h2>
          </div>
          <div className="contact-band__actions">
            <Button href={CONTACT_HREF} variant="primary">
              Contact
            </Button>
            <Button href={cvHref} variant="secondary" onClick={openCv}>
              Get CV
            </Button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p className="site-footer__name">João Silva · Product Designer</p>
        <ul className="site-footer__links">
          <li>
            <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={CONTACT_HREF}>Email</a>
          </li>
          <li>
            <a href={cvHref} onClick={openCv}>
              Get CV
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
