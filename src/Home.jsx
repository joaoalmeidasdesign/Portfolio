import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Nav from "./Nav.jsx";
import DesignSystem from "./components/System.jsx";
import Button from "./components/Button.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import DotGrid from "./DotGrid.jsx";
import Footer from "./Footer.jsx";
import arrow from "./assets/arrow.png";
import arrowFlip from "./assets/arrow_f.png";
import searchDiscovery from "./assets/Search & Discovery.png";
import strategyPlanning from "./assets/Strategy & Planning.png";
import designPrototype from "./assets/Design & Prototype.png";
import collaborateIterate from "./assets/Collaborate & iterate.png";
import { withBasePath } from "./pathUtils.js";
import {
  aiSavingsProject,
  knightProject,
  visitPlannProject,
} from "./caseStudies/projectCards.js";

// Local icons used in the design-process section.
const processIcons = {
  shipped: searchDiscovery,
  flow: strategyPlanning,
  quality: designPrototype,
  execution: collaborateIterate,
};

// Content model for the process cards.
const processItems = [
  {
    img: processIcons.shipped,
    title: "Shipped product work",
    description: "Design work that reaches production—not just prototypes.",
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

  // Smooth-scroll to an on-page section, respecting reduced motion.
  const scrollToSection = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const openCaseStudy = (event, slug) => {
    if (!navigate) return;
    event.preventDefault();
    navigate(`/case-studies/${slug}`);
  };

  const renderCard = (project, className) => (
    <ProjectCard
      project={project}
      className={className}
      href={withBasePath(`/case-studies/${project.slug}`)}
      onClick={(event) => openCaseStudy(event, project.slug)}
    />
  );

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
            <p className="hero-greeting" data-hero-item>João Silva</p>
            <h1 className="hero-title" data-hero-item>Product Designer</h1>
            <p className="hero-subtitle" data-hero-item>
              With a computer science foundation
            </p>
          </div>
          <div className="hero-details">
            <div className="hero-copy-block" data-hero-item>
              <p className="hero-description">
                I design and ship mobile and web products—turning complex
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
            <div className="hero-actions" data-hero-item>
              <Button
                href="#work"
                variant="primary"
                onClick={(event) => scrollToSection(event, "work")}
              >
                View Work
              </Button>
              <Button
                href="#contact"
                variant="secondary"
                onClick={(event) => scrollToSection(event, "contact")}
              >
                Contact
              </Button>
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

      <section className="selected-work" id="work" aria-labelledby="work-title">
        <SectionHeader
          className="selected-work__header"
          title="Selected work"
          id="work-title"
        />
        <div className="selected-work__grid">
          <div className="selected-work__column">
            {renderCard(knightProject, "selected-work__card--knight")}
            {renderCard(aiSavingsProject, "selected-work__card--ai")}
          </div>
          <div className="selected-work__column selected-work__column--offset">
            {renderCard(visitPlannProject, "selected-work__card--visitplann")}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
