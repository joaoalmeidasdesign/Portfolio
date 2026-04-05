import { StrictMode, useEffect, useRef, useState } from "react";
import "./Home.css";
import Nav from "./Nav.jsx";
import DesignSystem from "./components/System.jsx";
import CaseStudyCard from "./components/CaseStudyCard.jsx";
import DotGrid from "./DotGrid.jsx";
import arrow from "./assets/arrow.png";
import arrowFlip from "./assets/arrow_f.png";
import searchDiscovery from "./assets/Search & Discovery.png";
import strategyPlanning from "./assets/Strategy & Planning.png";
import designPrototype from "./assets/Design & Prototype.png";
import collaborateIterate from "./assets/Collaborate & iterate.png";
import visitPlannCover from "./assets/visitplann-cover.svg";
import brancoPrataBase from "./assets/brancoprata-base.svg";
import brancoPrataOverlay from "./assets/brancoprata-overlay.svg";
import knightCover from "./assets/knight-cover.svg";
import { withBasePath } from "./pathUtils.js";

// Local icons used in the design-process section.
const processIcons = {
  shipped: searchDiscovery,
  flow: strategyPlanning,
  quality: designPrototype,
  execution: collaborateIterate,
};

// Local case-study imagery. The original Figma MCP asset links are no longer available.
const caseStudyImages = {
  visitPlann: visitPlannCover,
  brancoPrataBase,
  brancoPrataOverlay,
  knight: knightCover,
};

// Content model for the process cards.
const processItems = [
  {
    img: processIcons.shipped,
    title: "Shipped product work",
    description: "Design work that reaches production, not just prototypes.",
  },
  {
    img: processIcons.flow,
    title: "Flow & IA clarity",
    description:
      "Turning complex requirements into simple, usable workflows.",
  },
  {
    img: processIcons.quality,
    title: "Quality + consistency",
    description: "Component-driven UI that scales across screens.",
  },
  {
    img: processIcons.execution,
    title: "Pragmatic execution",
    description:
      "Fast cycles, clear tradeoffs, and tight collaboration with engineering.",
  },
];

// Content model for the selected work cards.
const caseStudies = [
  {
    slug: "visitplann",
    img: caseStudyImages.visitPlann,
    time: "8min read",
    readTimeColor: "#FFFFFE",
    title: "VisitPlann",
    tags: ["Mobile App", "Shipped", "Product Design"],
    description:
      "Guided tourism experience with computer vision: discover points of interest, access rich content, and plan routes. Full case study focused on shipping under constraints and building consistency.",
  },
  {
    slug: "brancoprata",
    img: caseStudyImages.brancoPrataBase,
    overlayImg: caseStudyImages.brancoPrataOverlay,
    overlayClassName: "case-overlay-devices",
    time: "3min read",
    readTimeColor: "#060010",
    title: "BrancoPrata",
    tags: ["Website", "In Development"],
    description:
      "Marketing site for a Portuguese design studio, designed and built in Webflow to improve clarity, credibility, and lead generation.",
  },
  {
    slug: "knight",
    img: caseStudyImages.knight,
    time: "4min read",
    readTimeColor: "#FFFFFE",
    title: "Knight",
    tags: ["Mobile App", "In Production", "Product Design"],
    description:
      "Chess learning app focused on building skill through structured practice. Mini case study covering the current product direction and upcoming closed beta goals.",
  },
];

// Main landing page of the portfolio.
function Home({ navigate }) {
  const designSystemRef = useRef(null);
  // Used to reveal the process section only once when it scrolls into view.
  const [isDesignSystemVisible, setIsDesignSystemVisible] = useState(false);

  useEffect(() => {
    // Triggers the process-section animation when the section becomes visible.
    const section = designSystemRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDesignSystemVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Shared top navigation. */}
      <StrictMode>
        <Nav currentPath="/" navigate={navigate} />
      </StrictMode>

      {/* Hero section. The dot-grid can bleed full-width while the text stays centered. */}
      <section className="hero" id="top">
        <div className="dot-grid-background">
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
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-greeting">Joao Silva</div>
            <div className="hero-title">Product Designer</div>
            <div className="hero-subtitle">
              With a computer science foundation
            </div>
          </div>
          <div className="hero-details">
            <div className="hero-copy-block">
              <p className="hero-description">
                I design and ship mobile and web products, turning complex
                requirements into clear flows, high-quality UI, and scalable
                design systems with engineers.
              </p>
              <div className="hero-availability">
                <span className="hero-availability-dot" />
                <span className="hero-availability-text">
                  Open to Product Designer roles
                </span>
              </div>
            </div>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#work">
                View Work
              </a>
              <a
                // Secondary CTA sends the user to the About page.
                className="hero-button hero-button-secondary"
                href={withBasePath("/about")}
                onClick={(event) => {
                  if (!navigate) {
                    window.location.href = withBasePath("/about");
                    return;
                  }
                  event.preventDefault();
                  navigate("/about");
                }}
              >
                About Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Design-process section. */}
      <section
        className={`design-system ${isDesignSystemVisible ? "is-visible" : ""}`}
        id="about"
        ref={designSystemRef}
      >
        <div className="design-system-inner">
          <div className="design-steps">
            {/* Decorative arrows used on larger layouts. */}
            <img className="design-arrow design-arrow-top-left" src={arrow} alt="" />
            <img className="design-arrow design-arrow-bottom-center" src={arrowFlip} alt="" />
            <img className="design-arrow design-arrow-top-right" src={arrow} alt="" />
            {processItems.map((item, index) => (
              <DesignSystem
                key={item.title}
                img={item.img}
                title={item.title}
                description={item.description}
                // Kept available in case direction-based styling is reintroduced later.
                arrowDirection={index % 2 === 0 ? "up" : "down"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Selected work section. */}
      <section className="selected-work" id="work">
        <h2 className="selected-work-title">Selected Work</h2>
        <div className="caseStudy">
          <div className="case-column">
            {caseStudies.slice(0, 2).map((study) => (
              <CaseStudyCard
                key={study.title}
                {...study}
                href={withBasePath(`/case-studies/${study.slug}`)}
              />
            ))}
          </div>
          <div className="case-column case-column-offset">
            <CaseStudyCard
              {...caseStudies[2]}
              href={withBasePath(`/case-studies/${caseStudies[2].slug}`)}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
