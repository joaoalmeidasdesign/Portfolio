import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./CaseStudyPage.css";
import flowDiagramImage from "./assets/Flow Diagram.png";
import figmaDocImage from "./assets/figma doc.png";
import mapDensityImage from "./assets/Mapa.png";
import routeExpansionImage from "./assets/Rotas.png";
import offlineMockupImage from "./assets/Offline Mockup.png";
import mapMockupImage from "./assets/Map Mockup.png";
import widgetImage from "./assets/Widget.png";
import metaDeliveryIcon from "./assets/meta-delivery-icon.svg";
import metaTeamIcon from "./assets/meta-team-icon.svg";
import metaRoleIcon from "./assets/meta-role-icon.svg";
import {
  visitPlannHeroImage,
  visitPlannMeta,
  visitPlannSections,
  visitPlannSummary,
} from "./caseStudies/visitPlannCaseStudyContent.js";

const visitPlannOfflineMockupsImage = offlineMockupImage;
const visitPlannFallbackMapImage = mapMockupImage;
const visitPlannOfflineFlowDiagramImage = flowDiagramImage;
const visitPlannMapDensityImage = mapDensityImage;
const visitPlannRouteExpansionImage = routeExpansionImage;
const visitPlannDesignSystemPreviewImage = widgetImage;
const visitPlannDesignSystemSystemImage = figmaDocImage;

function CaseStudyMetaIcon({ kind }) {
  const iconSrc =
    kind === "delivery"
      ? metaDeliveryIcon
      : kind === "team"
        ? metaTeamIcon
        : metaRoleIcon;

  return <img aria-hidden="true" className="case-study-meta-card__icon-svg" src={iconSrc} alt="" />;
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

function VisitPlannCaseStudy({ navigate }) {
  const [
    offlineOverviewSection,
    offlineDecisionSection,
    offlineEvidenceSection,
    mapOverviewSection,
    mapDecisionSection,
    routeOverviewSection,
    routeDecisionSection,
    designSystemIntroSection,
    designSystemBuildSection,
  ] = visitPlannSections;

  const offlineDecisionBlock = offlineDecisionSection.blocks[0];
  const offlineTradeoffBlock = offlineEvidenceSection.blocks[0];
  const offlineProofBlock = offlineEvidenceSection.blocks[1];
  const mapTensionBlock = mapOverviewSection.blocks[0];
  const mapOptionsBlock = mapOverviewSection.blocks[1];
  const mapDecisionBlock = mapDecisionSection.blocks[0];
  const mapTradeoffBlock = mapDecisionSection.blocks[1];
  const routeOverviewBlock = routeOverviewSection.blocks[0];
  const routeOptionsBlock = routeOverviewSection.blocks[1];
  const routeDecisionBlock = routeDecisionSection.blocks[0];
  const routeTradeoffBlock = routeDecisionSection.blocks[1];
  const designSystemBrokeBlock = designSystemIntroSection.blocks[0];
  const designSystemBuiltBlock = designSystemBuildSection.blocks[0];
  const designSystemTradeoffBlock = designSystemBuildSection.blocks[1];

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
            <section className="case-study-split-section">
              <div className="case-study-section__header">
                <div className="case-study-section__intro">
                  <h2 className="case-study-section__title">
                    {offlineOverviewSection.title}
                  </h2>
                  <p className="case-study-section__subtitle">
                    {offlineOverviewSection.subtitle}
                  </p>
                </div>
              </div>
              <div className="case-study-split-section__columns">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    {offlineOverviewSection.blocks.map((block) => (
                      <CaseStudyBlock
                        key={`${block.label || "block"}-${block.body[0]}`}
                        label={block.label}
                        body={block.body}
                      />
                    ))}
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={offlineDecisionBlock.label}
                      body={offlineDecisionBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <figure className="case-study-media-grid">
              <div className="case-study-media-grid__primary">
                <div className="case-study-media-grid__frame">
                  <img
                    className="case-study-media-grid__image case-study-media-grid__image--fixed-height"
                    src={visitPlannOfflineMockupsImage}
                    alt="VisitPlann offline flow screens showing mode selection and download choices"
                  />
                </div>
                <figcaption className="case-study-media-grid__caption">
                  The offline model — mode selection, content download, and
                  fallback navigation.
                </figcaption>
              </div>
              <div className="case-study-media-grid__secondary">
                <div className="case-study-media-grid__frame case-study-media-grid__frame--right">
                  <img
                    className="case-study-media-grid__image case-study-media-grid__image--fixed-height"
                    src={visitPlannFallbackMapImage}
                    alt="VisitPlann indoor map fallback screen with manual point-of-interest selection"
                  />
                </div>
                <figcaption className="case-study-media-grid__caption">
                  Indoor map fallback — when CV detection fails, users tap a POI
                  to surface the information card manually.
                </figcaption>
              </div>
            </figure>

            <section className="case-study-split-section">
              <div className="case-study-split-section__columns">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={offlineTradeoffBlock.label}
                      body={offlineTradeoffBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={offlineProofBlock.label}
                      body={offlineProofBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <figure className="case-study-media-diagram">
              <img
                className="case-study-media-diagram__image"
                src={visitPlannOfflineFlowDiagramImage}
                alt="Before and after flow diagram for the VisitPlann offline model"
              />
              <figcaption className="case-study-media-diagram__caption">
                The offline model added steps before the visit to eliminate
                failure during it.
              </figcaption>
            </figure>

            <section className="case-study-split-section case-study-split-section--bottom">
              <div className="case-study-section__header">
                <div className="case-study-section__intro">
                  <h2 className="case-study-section__title">
                    {mapOverviewSection.title}
                  </h2>
                  <p className="case-study-section__subtitle">
                    {mapOverviewSection.subtitle}
                  </p>
                </div>
              </div>
              <div className="case-study-split-section__columns">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={mapTensionBlock.label}
                      body={mapTensionBlock.body}
                    />
                    <CaseStudyBlock
                      label={mapOptionsBlock.label}
                      body={mapOptionsBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={mapDecisionBlock.label}
                      body={mapDecisionBlock.body}
                    />
                    <CaseStudyBlock
                      label={mapTradeoffBlock.label}
                      body={mapTradeoffBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <figure className="case-study-media-diagram">
              <img
                className="case-study-media-diagram__image"
                src={visitPlannMapDensityImage}
                alt="VisitPlann map density comparison showing default zoom and zoomed-in point-of-interest states"
              />
              <figcaption className="case-study-media-diagram__caption case-study-media-diagram__caption--split">
                <span>
                  Left image: zoomed-in view, where lower-priority POIs appear
                  as users signal intent by zooming.
                </span>
                <span>
                  Right image: default country view, where only high-priority
                  monuments stay visible for performance on low-end devices.
                </span>
              </figcaption>
            </figure>

            <section className="case-study-route-section">
              <div className="case-study-section__header">
                <div className="case-study-section__intro">
                  <h2 className="case-study-section__title">
                    {routeOverviewSection.title}
                  </h2>
                  <p className="case-study-section__subtitle">
                    {routeOverviewSection.subtitle}
                  </p>
                </div>
              </div>
              <div className="case-study-route-grid">
                <div className="case-study-route-grid__left">
                  <div className="case-study-section__body">
                    <CaseStudyBlock body={routeOverviewBlock.body} />
                    <CaseStudyBlock
                      label={routeOptionsBlock.label}
                      body={routeOptionsBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-route-grid__right">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={routeDecisionBlock.label}
                      body={routeDecisionBlock.body}
                    />
                    <CaseStudyBlock
                      label={routeTradeoffBlock.label}
                      body={routeTradeoffBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <figure className="case-study-media-diagram">
              <img
                className="case-study-media-diagram__image"
                src={visitPlannRouteExpansionImage}
                alt="VisitPlann route examples showing the same visual language adapting to different information density"
              />
              <figcaption className="case-study-media-diagram__caption">
                Same visual language, different information load — the system
                scales without splitting.
              </figcaption>
            </figure>

            <section className="case-study-feature-section">
              <div className="case-study-section__header">
                <div className="case-study-section__intro">
                    <h2 className="case-study-section__title">
                      {designSystemIntroSection.title}
                    </h2>
                    <p className="case-study-section__subtitle">
                      {designSystemIntroSection.subtitle}
                    </p>
                </div>
              </div>
              <div className="case-study-feature-row case-study-feature-row--reverse">
                <section className="case-study-feature-row__content">
                  <div className="case-study-section__column">
                    <div className="case-study-section__body">
                      <CaseStudyBlock
                        label={designSystemBrokeBlock.label}
                        body={designSystemBrokeBlock.body}
                      />
                    </div>
                  </div>
                </section>
                <figure className="case-study-feature-row__media">
                  <img
                    className="case-study-feature-row__image"
                    src={visitPlannDesignSystemPreviewImage}
                    alt="VisitPlann component annotations after the field test"
                  />
                  <figcaption className="case-study-feature-row__caption">
                    Component annotations after the field test
                  </figcaption>
                </figure>
              </div>
            </section>

            <section className="case-study-split-section">
              <div className="case-study-split-section__columns">
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={designSystemBuiltBlock.label}
                      body={designSystemBuiltBlock.body}
                    />
                  </div>
                </div>
                <div className="case-study-split-section__column">
                  <div className="case-study-section__body">
                    <CaseStudyBlock
                      label={designSystemTradeoffBlock.label}
                      body={designSystemTradeoffBlock.body}
                    />
                  </div>
                </div>
              </div>
            </section>

            <figure className="case-study-media-diagram">
              <img
                className="case-study-media-diagram__image"
                src={visitPlannDesignSystemSystemImage}
                alt="VisitPlann design system documentation with states, annotations, and token references"
              />
              <figcaption className="case-study-media-diagram__caption">
                States, annotations, and token references documented — the
                library went from a design reference to a shared source of
                truth.
              </figcaption>
            </figure>
          </div>
        </article>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

export default VisitPlannCaseStudy;
