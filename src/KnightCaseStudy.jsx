import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./CaseStudyPage.css";
import metaDeliveryIcon from "./assets/meta-delivery-icon.svg";
import metaTeamIcon from "./assets/meta-team-icon.svg";
import metaRoleIcon from "./assets/meta-role-icon.svg";
import {
  knightBetaNote,
  knightHeroImage,
  knightMeta,
  knightSections,
  knightSummary,
} from "./caseStudies/knightCaseStudyContent.js";

function CaseStudyMetaIcon({ kind }) {
  const iconSrc =
    kind === "delivery"
      ? metaDeliveryIcon
      : kind === "team"
        ? metaTeamIcon
        : metaRoleIcon;

  return (
    <img
      aria-hidden="true"
      className="case-study-meta-card__icon-svg"
      src={iconSrc}
      alt=""
    />
  );
}

function CaseStudyBlock({ label, body }) {
  return (
    <div className="case-study-block">
      {label ? <h3 className="case-study-block__label">{label}</h3> : null}
      {body.map((paragraph) => (
        <p className="case-study-block__copy" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function HiddenKnightMediaRow({ leftCaption, rightCaption, rowLabel }) {
  void leftCaption;
  void rightCaption;
  void rowLabel;
  return null;
}

function KnightCaseStudy({ navigate }) {
  const [planningSection, systemSection] = knightSections;
  const [introBlock, optionsBlock, decisionBlock] = planningSection.blocks;
  const [systemDecisionBlock, systemTradeoffBlock] = systemSection.blocks;

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

          <section className="case-study-meta-grid" aria-label="Case study overview">
            {knightMeta.map((item) => (
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
            <section className="case-study-knight-intro">
              <div className="case-study-knight-intro__lead">
                <p className="case-study-block__copy">{introBlock.body[0]}</p>
              </div>
              <div className="case-study-split-section__columns case-study-split-section__columns--compact">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={optionsBlock.label}
                      body={optionsBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={decisionBlock.label}
                      body={decisionBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <HiddenKnightMediaRow
              rowLabel="Knight Planning Mockups"
              leftCaption="Planned planning-flow mockup caption."
              rightCaption="Planned supporting mockup caption."
            />

            <section className="case-study-split-section">
              <div className="case-study-split-section__columns case-study-split-section__columns--compact">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={systemDecisionBlock.label}
                      body={systemDecisionBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={systemTradeoffBlock.label}
                      body={systemTradeoffBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <HiddenKnightMediaRow
              rowLabel="Knight System Mockups"
              leftCaption="Planned resource-system mockup caption."
              rightCaption="Planned tracker mockup caption."
            />
          </div>
        </article>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

export default KnightCaseStudy;
