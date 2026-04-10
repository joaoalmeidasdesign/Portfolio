import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./CaseStudyPage.css";
import {
  visitPlannHeroImage,
  visitPlannMeta,
  visitPlannSections,
  visitPlannSummary,
} from "./caseStudies/visitPlannCaseStudyContent.js";

function CaseStudyMetaIcon({ kind }) {
  if (kind === "delivery") {
    return (
      <svg
        aria-hidden="true"
        className="case-study-meta-card__icon-svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M6 17.5 9.5 21 18 12.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M18 7h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (kind === "team") {
    return (
      <svg
        aria-hidden="true"
        className="case-study-meta-card__icon-svg"
        viewBox="0 0 24 24"
      >
        <circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle
          cx="16.5"
          cy="10"
          r="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4.5 19c0-2.8 2.5-4.5 5.5-4.5s5.5 1.7 5.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="case-study-meta-card__icon-svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 4v16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M7 9.5c0-2.8 2.2-5 5-5s5 2.2 5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M7 14.5c0 2.8 2.2 5 5 5s5-2.2 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function VisitPlannCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/" navigate={navigate} />
      <main className="case-study-page">
        <article className="case-study-page__inner">
          <header className="case-study-hero">
            <img
              className="case-study-hero__image"
              src={visitPlannHeroImage}
              alt="VisitPlann app mockups on a yellow background"
            />
            <div className="case-study-hero__copy">
              <h1 className="case-study-hero__title">VisitPlann</h1>
              <p className="case-study-hero__summary">
                {visitPlannSummary}
              </p>
            </div>
          </header>

          <section className="case-study-meta-grid" aria-label="Case study overview">
            {visitPlannMeta.map((item) => (
              <article className="case-study-meta-card" key={item.title}>
                <div className="case-study-meta-card__heading">
                  <span className="case-study-meta-card__icon">
                    <CaseStudyMetaIcon
                      kind={
                        item.title === "Delivery"
                          ? "delivery"
                          : item.title === "Team Context"
                            ? "team"
                            : "role"
                      }
                    />
                  </span>
                  <h2 className="case-study-meta-card__title">{item.title}</h2>
                </div>
                <p className="case-study-meta-card__value">{item.value}</p>
              </article>
            ))}
          </section>

          <div className="case-study-content">
            {visitPlannSections.map((section, sectionIndex) => (
              <section
                className={[
                  "case-study-section",
                  section.align === "right" ? "case-study-section--right" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={`${section.title || "section"}-${sectionIndex}`}
              >
                <div className="case-study-section__column">
                  <div className="case-study-section__intro">
                    {section.title ? (
                      <h2 className="case-study-section__title">{section.title}</h2>
                    ) : null}
                    {section.subtitle ? (
                      <p className="case-study-section__subtitle">{section.subtitle}</p>
                    ) : null}
                  </div>
                  <div className="case-study-section__body">
                    {section.blocks.map((block) => (
                      <div
                        className="case-study-block"
                        key={`${block.label || "block"}-${block.body[0]}`}
                      >
                        {block.label ? (
                          <h3 className="case-study-block__label">{block.label}</h3>
                        ) : null}
                        {block.body.map((paragraph) => (
                          <p className="case-study-block__copy" key={paragraph}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

export default VisitPlannCaseStudy;
