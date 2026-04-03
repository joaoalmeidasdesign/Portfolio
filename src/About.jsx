import Nav from "./Nav.jsx";
import "./About.css";
import aboutImage from "./assets/about-portrait.svg";

// Local portrait placeholder used until the final portrait asset is added to the repo.

// Personal interests shown in the "Beyond the Screen" section.
const beyondTheScreenItems = [
  "Capturing the night sky through astrophotography",
  "Developing film in my makeshift darkroom",
  "Documenting underground metal concerts as a photographer",
  "Riding my motorcycle through mountain roads",
];

function About({ navigate }) {
  return (
    <>
      {/* Shared navigation with About marked as the active page. */}
      <Nav currentPath="/about" navigate={navigate} />
      <main className="about-page">
        {/* Main headline block from the About Figma layout. */}
        <section className="about-heading">
          <h1 className="about-title">
            <span className="about-title-accent">About me, </span>
            <span className="about-title-muted">my story and my experience</span>
          </h1>
        </section>

        {/* Two-column intro: text/story on the left and portrait on the right. */}
        <section className="about-intro-section">
          <div className="about-intro-copy">
            <p className="about-body">
              I&apos;m a Product Designer in Portugal who designs mobile and web
              apps for FinTech, SaaS, and blockchain products. My Computer
              Science background means I understand what developers need to
              build my designs and I speak their language.
            </p>

            <div className="about-story-block">
              <h2 className="about-subtitle">How I got here</h2>
              <p className="about-body">
                I studied Computer Science for two years before switching to
                design. Turns out, I cared more about what users see than what
                happens under the hood.
              </p>
              <p className="about-body">
                But those two years weren&apos;t wasted. Understanding code,
                constraints, and how things actually get built shaped how I
                design. I think in systems, I know what&apos;s feasible, and I
                can have real conversations with engineers about trade-offs.
              </p>
              <p className="about-body">
                After finishing my Multimedia Design degree, I&apos;ve spent three
                years working on projects like Film Tail, a film photography
                guide, and Kinfi, an AI blockchain research tool. Each one
                taught me something different about solving problems people
                actually have.
              </p>
            </div>
          </div>

          <div className="about-image-wrap">
            <img className="about-image" src={aboutImage} alt="Joao Silva portrait" />
          </div>
        </section>

        {/* Personal interests / personality section. */}
        <section className="about-beyond">
          <div className="about-beyond-title-wrap">
            <h2 className="about-beyond-title">Beyond the Screen</h2>
          </div>

          <div className="about-beyond-copy">
            <p className="about-body">When I&apos;m not designing interfaces, you&apos;ll find me:</p>
            <ul className="about-list">
              {beyondTheScreenItems.map((item) => (
                <li className="about-list-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="about-body">
              Photography taught me to see light and composition. Film
              development taught me that good work takes time and precision. The
              motorcycle stuff? That&apos;s just fun.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
