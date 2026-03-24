import { StrictMode, useEffect, useRef, useState } from "react";
import "./Home.css";
import Nav from "./Nav.jsx";
import DesignSystem from "./components/System.jsx";
import CaseStudyCard from "./components/CaseStudyCard.jsx";
import DotGrid from "./DotGrid.jsx";
import arrow from "./assets/arrow.png";
import arrowFlip from "./assets/arrow_f.png";

// Figma-exported icons used in the design-process section.
const processIcons = {
  shipped: "https://www.figma.com/api/mcp/asset/7a26a5e1-68e9-43a3-880a-88f5841c37b8",
  flow: "https://www.figma.com/api/mcp/asset/a84cd394-45a1-48e0-aab7-e20cdd91102c",
  quality: "https://www.figma.com/api/mcp/asset/2bfdc636-3b95-4a2d-8b14-f551e5554939",
  execution: "https://www.figma.com/api/mcp/asset/12da8429-7338-4bf8-860a-f13a2e7f699d",
};

// Figma-exported imagery used by the case-study cards.
const caseStudyImages = {
  visitPlann:
    "https://www.figma.com/api/mcp/asset/f764a13a-a729-42a3-9e51-35ccdf9d1a37",
  brancoPrataBase:
    "https://www.figma.com/api/mcp/asset/1bbac50d-517b-4e66-9ef4-6c3f9abf4c59",
  brancoPrataOverlay:
    "https://www.figma.com/api/mcp/asset/83e7cadf-352e-449d-ac5c-da5c6707272e",
  knight:
    "https://www.figma.com/api/mcp/asset/c8f37c4d-557c-46b3-a821-717ab7de8514",
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
    title: "BrancoPrata",
    tags: ["Website", "In Development"],
    description:
      "Marketing site for a Portuguese design studio, designed and built in Webflow to improve clarity, credibility, and lead generation.",
  },
  {
    slug: "knight",
    img: caseStudyImages.knight,
    time: "4min read",
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
                href="/about"
                onClick={(event) => {
                  if (!navigate) {
                    window.location.href = "/about";
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
                href={`/case-studies/${study.slug}`}
              />
            ))}
          </div>
          <div className="case-column case-column-offset">
            <CaseStudyCard
              {...caseStudies[2]}
              href={`/case-studies/${caseStudies[2].slug}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
