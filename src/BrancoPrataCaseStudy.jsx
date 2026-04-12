import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./CaseStudyPage.css";
import {
  brancoPrataHeroImage,
  brancoPrataMeta,
  brancoPrataSections,
  brancoPrataSummary,
} from "./caseStudies/brancoPrataCaseStudyContent.js";

function BrancoPrataCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/" navigate={navigate} />
      <main className="case-study-page">
        <article className="case-study-page__inner">
          <header className="case-study-hero">
            <img
              className="case-study-hero__image"
              src={brancoPrataHeroImage}
              alt="BrancoPrata case study hero"
            />
            <div className="case-study-hero__copy">
              <h1 className="case-study-hero__title">BrancoPrata</h1>
              <p className="case-study-hero__summary">{brancoPrataSummary}</p>
            </div>
          </header>

          <section className="case-study-meta-grid" aria-label="Case study overview">
            {brancoPrataMeta.map((item) => (
              <article className="case-study-meta-card" key={item.title}>
                <div className="case-study-meta-card__heading">
                  <h2 className="case-study-meta-card__title">{item.title}</h2>
                </div>
                <p className="case-study-meta-card__value">{item.value}</p>
              </article>
            ))}
          </section>

          <div className="case-study-content">
            {brancoPrataSections.map((section) => (
              <section className="case-study-section" key={section.title}>
                <div className="case-study-section__header">
                  <div className="case-study-section__intro">
                    <h2 className="case-study-section__title">{section.title}</h2>
                    <p className="case-study-section__subtitle">{section.subtitle}</p>
                  </div>
                </div>
                <div className="case-study-section__column">
                  <div className="case-study-section__body">
                    {section.blocks.map((block) => (
                      <div className="case-study-block" key={block.label || block.body[0]}>
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

export default BrancoPrataCaseStudy;
