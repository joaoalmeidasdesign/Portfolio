import Nav from "./Nav.jsx";
import "./About.css";
import aboutHeroPhoto from "./assets/about-hero-photo.jpg";
import aboutGalleryPhoto from "./assets/about-gallery-photo.jpg";
import strengthClarityIcon from "./assets/about-strength-clarity.svg";
import strengthSystemIcon from "./assets/about-strength-system.svg";
import strengthEngineersIcon from "./assets/about-strength-engineers.svg";
import strengthQualityIcon from "./assets/about-strength-quality.svg";

const strengths = [
  {
    icon: strengthClarityIcon,
    title: "Clarity first",
    description: "I turn complex requirements into clear flows and priorities.",
  },
  {
    icon: strengthSystemIcon,
    title: "System thinking",
    description: "I reuse patterns and components to keep products consistent.",
  },
  {
    icon: strengthEngineersIcon,
    title: "Build with engineers",
    description:
      "I design with constraints in mind and iterate during implementation.",
  },
  {
    icon: strengthQualityIcon,
    title: "Quality & detail",
    description:
      "I care about hierarchy, spacing, and states that make products feel solid.",
  },
];

const beyondTheScreenItems = [
  "Capturing the night sky through astrophotography",
  "Developing film in my makeshift darkroom",
  "Doing some kind of sport",
  "Riding my motorcycle through mountain roads",
];

const galleryItems = Array.from({ length: 4 }, (_, index) => ({
  id: `gallery-${index + 1}`,
  src: aboutGalleryPhoto,
}));

function About({ navigate }) {
  return (
    <>
      <Nav currentPath="/about" navigate={navigate} />
      <main className="about-page">
        <section className="about-intro">
          <div className="about-photo-frame">
            <img
              className="about-photo"
              src={aboutHeroPhoto}
              alt="Joao Silva sitting outdoors"
            />
          </div>

          <div className="about-copy">
            <h1 className="about-title">
              <span className="about-title-accent">About me, </span>
              <span className="about-title-muted">
                my story and my experience
              </span>
            </h1>

            <p className="about-lead">
              I&apos;m João Silva, a Product Designer based in Portugal. With a
              computer science foundation, I design and ship mobile and web
              products, turning complex requirements into clear flows,
              high-quality UI, and scalable design systems with engineers.
            </p>

            <div className="about-story-grid">
              <article className="about-story-block">
                <h2 className="about-story-title">How I got here</h2>
                <p className="about-story-body">
                  I studied Computer Science for two years before moving into
                  design because I cared more about how products feel and behave
                  for users. The technical foundation wasn&apos;t wasted: it helps
                  me reason about feasibility, communicate tradeoffs with
                  engineering, and design systems that stay consistent as
                  products evolve.
                </p>
              </article>

              <article className="about-story-block">
                <h2 className="about-story-title">Beyond the Screen</h2>
                <p className="about-story-body about-story-body-intro">
                  When I&apos;m not designing, you&apos;ll find me:
                </p>
                <ul className="about-list">
                  {beyondTheScreenItems.map((item) => (
                    <li className="about-list-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="about-strengths">
          <div className="about-strengths-heading">
            <h2 className="about-strengths-title">My strengths</h2>
          </div>

          <div className="about-strengths-grid">
            {strengths.map((strength) => (
              <article className="about-strength-card" key={strength.title}>
                <div className="about-strength-header">
                  <span className="about-strength-icon-wrap" aria-hidden="true">
                    <img
                      className="about-strength-icon"
                      src={strength.icon}
                      alt=""
                    />
                  </span>
                  <h3 className="about-strength-title">{strength.title}</h3>
                </div>
                <p className="about-strength-copy">{strength.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-gallery" aria-label="About page photography">
          {galleryItems.map((item) => (
            <div className="about-gallery-item" key={item.id}>
              <img
                className="about-gallery-image"
                src={item.src}
                alt=""
                aria-hidden="true"
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default About;
