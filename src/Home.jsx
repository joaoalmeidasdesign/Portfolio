import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Nav from "./Nav.jsx";
import DesignSystem from "./components/System.jsx";
import CaseStudyCard from "./components/CaseStudyCard.jsx";
import DotGrid from "./DotGrid.jsx";
import Footer from "./Footer.jsx";
import arrow from "./assets/arrow.png";
import arrowFlip from "./assets/arrow_f.png";
import searchDiscovery from "./assets/Search & Discovery.png";
import strategyPlanning from "./assets/Strategy & Planning.png";
import designPrototype from "./assets/Design & Prototype.png";
import collaborateIterate from "./assets/Collaborate & iterate.png";
import visitPlannCover from "./assets/visitplann-cover.png";
import brancoPrataBase from "./assets/brancoprata-base.svg";
import brancoPrataOverlay from "./assets/brancoprata-overlay.svg";
import knightCover from "./assets/knight-cover.png";
import { withBasePath } from "./pathUtils.js";
import { getReadTimeLabel } from "./utils/readTime.js";
import { visitPlannCaseStudyCard } from "./caseStudies/visitPlannCaseStudyContent.js";
import { brancoPrataCaseStudyCard } from "./caseStudies/brancoPrataCaseStudyContent.js";
import { knightCaseStudyCard } from "./caseStudies/knightCaseStudyContent.js";

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
const caseStudyDefinitions = [
  {
    ...visitPlannCaseStudyCard,
    img: visitPlannCaseStudyCard.img || caseStudyImages.visitPlann,
  },
  {
    ...brancoPrataCaseStudyCard,
    img: brancoPrataCaseStudyCard.img || caseStudyImages.brancoPrataBase,
    overlayImg:
      brancoPrataCaseStudyCard.overlayImg || caseStudyImages.brancoPrataOverlay,
    overlayClassName:
      brancoPrataCaseStudyCard.overlayClassName || "case-overlay-devices",
  },
  {
    ...knightCaseStudyCard,
    img: knightCaseStudyCard.img || caseStudyImages.knight,
  },
];

const caseStudies = caseStudyDefinitions.map((study) => ({
  ...study,
  time: getReadTimeLabel(study.readTimeSource ?? study.description),
}));

const visibleCaseStudies = caseStudies.filter((study) => !study.hidden);

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

  const handleAboutNavigation = (event) => {
    if (!navigate) {
      window.location.href = withBasePath("/about");
      return;
    }

    event.preventDefault();
    navigate("/about");
  };

  return (
    <>
      <Nav currentPath="/" navigate={navigate} />

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
                onClick={handleAboutNavigation}
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
            {processItems.map((item) => (
              <DesignSystem
                key={item.title}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="selected-work" id="work">
        <div className="caseStudy">
          <div className="case-column">
            {visibleCaseStudies.slice(0, 1).map((study) => (
              <CaseStudyCard
                key={study.title}
                {...study}
                href={withBasePath(`/case-studies/${study.slug}`)}
              />
            ))}
          </div>
          <div className="case-column case-column-offset">
            {visibleCaseStudies.slice(1, 2).map((study) => (
              <CaseStudyCard
                key={study.title}
                {...study}
                href={withBasePath(`/case-studies/${study.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </>
  );
}

export default Home;
