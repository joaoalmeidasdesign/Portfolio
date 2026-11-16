import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./CaseStudyPage.css";
import {
  CaseStudyBlock,
  CaseStudyMetaGrid,
} from "./components/CaseStudyParts.jsx";
import {
  knightBetaNote,
  knightHeroImage,
  knightMeta,
  knightSections,
  knightSummary,
} from "./caseStudies/knightCaseStudyContent.js";

// Each section renders its unlabeled blocks as a full-width lead, followed by
// its labeled blocks in the two-column grid. Section titles and subtitles are
// intentionally not displayed in this layout.
function KnightSection({ section }) {
  const blocks = section.blocks ?? [];
  const leadBlocks = blocks.filter((block) => !block.label);
  const columnBlocks = blocks.filter((block) => block.label);
  const hasLead = leadBlocks.length > 0;

  return (
    <section
      className={hasLead ? "case-study-knight-intro" : "case-study-split-section"}
    >
      {hasLead ? (
        <div className="case-study-knight-intro__lead">
          {leadBlocks.flatMap((block) =>
            (block.body ?? []).map((paragraph) => (
              <p className="case-study-block__copy" key={paragraph}>
                {paragraph}
              </p>
            ))
          )}
        </div>
      ) : null}

      {columnBlocks.length > 0 ? (
        <div className="case-study-split-section__columns case-study-split-section__columns--compact">
          {columnBlocks.map((block) => (
            <div className="case-study-split-section__column" key={block.label}>
              <div className="case-study-section__body">
                <CaseStudyBlock label={block.label} body={block.body} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function KnightCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/" navigate={navigate} />
      <main className="case-study-page">
        <article className="case-study-page__inner">
          <header className="case-study-hero">
            <img
              className="case-study-hero__image"
              src={knightHeroImage}
              alt="Knight app hero showing the resources library and weekly training planner"
            />
            <div className="case-study-hero__copy">
              <h1 className="case-study-hero__title">Knight</h1>
              <p className="case-study-hero__summary">{knightSummary}</p>
              <p className="case-study-hero__meta-note">{knightBetaNote}</p>
            </div>
          </header>

          <CaseStudyMetaGrid items={knightMeta} />

          <div className="case-study-content">
            {knightSections.map((section) => (
              <KnightSection section={section} key={section.title} />
            ))}
          </div>
        </article>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

export default KnightCaseStudy;
