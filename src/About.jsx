import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "./About.css";
import portrait from "./assets/about/portrait.png";
import photoMotorcycle from "./assets/about/photo-1.png";
import photoConcert from "./assets/about/photo-2.png";
import photoNightSky from "./assets/about/photo-3.png";
import photoRugby from "./assets/about/photo-4.png";

// Copy is verbatim from Figma (About, 688:338).
const strengths = [
  {
    label: "01 · Clarity first",
    text: "I turn complex requirements into clear flows and priorities.",
  },
  {
    label: "02 · System thinking",
    text: "I reuse patterns and components to keep products consistent.",
  },
  {
    label: "03 · Build with engineers",
    text: "I design with constraints in mind and iterate during implementation.",
  },
  {
    label: "04 · Quality & detail",
    text: "I care about hierarchy, spacing, and states that make products feel solid.",
  },
];

const beyondTheScreen = [
  "Capturing the night sky through astrophotography",
  "Developing film in my makeshift darkroom",
  "Doing some kind of sport",
  "Riding my motorcycle through mountain roads",
];

const photos = [
  {
    src: photoMotorcycle,
    alt: "A rider in black gear beside a motorcycle under a large tree on a cloudy day.",
  },
  {
    src: photoConcert,
    alt: "A crowd at a concert, silhouetted against bright blue stage lights.",
  },
  {
    src: photoNightSky,
    alt: "A person standing on a rock outcrop under the Milky Way at night.",
  },
  {
    src: photoRugby,
    alt: "Rugby players in green jerseys contesting a ruck on a grass pitch.",
  },
];

function About({ navigate }) {
  return (
    <>
      <Nav currentPath="/about" navigate={navigate} />
      <main className="about">
        <section className="about-hero" aria-labelledby="about-title">
          <img
            className="about-hero__portrait"
            src={portrait}
            alt="João smiling at a café table on a terrace in a historic Portuguese town."
            width="1120"
            height="1280"
            fetchPriority="high"
          />
          <div className="about-hero__text">
            <p className="eyebrow" data-hero-item>
              About
            </p>
            <h1 className="about-hero__title" id="about-title" data-hero-item>
              <span className="about-hero__accent">About me,</span> my story and
              my experience
            </h1>
            <p className="about-hero__intro" data-hero-item>
              I’m João Silva, a product designer based in Portugal who works
              close to the code. For four years I’ve designed consumer and B2B
              mobile products, from offline-first field apps to habit loops,
              with handoff that engineers build from directly: tokenized design
              systems and full prototypes. I studied computer science before I
              moved into design.
            </p>
          </div>
        </section>

        <section className="about-story" aria-label="Background">
          <div className="about-story__row" data-reveal>
            <div className="about-story__column">
              <h2 className="about-story__title">How I got here</h2>
              <p className="about-story__copy">
                I studied Computer Science for two years before moving into
                design—because I cared more about how products feel and behave
                for users. The technical foundation wasn’t wasted: it helps me
                reason about feasibility, communicate tradeoffs with
                engineering, and design systems that stay consistent as products
                evolve.
              </p>
            </div>
            <div className="about-story__column">
              <h2 className="about-story__title">Beyond the Screen</h2>
              <div className="about-story__copy">
                <p>When I’m not designing, you’ll find me:</p>
                <ul className="about-story__list">
                  {beyondTheScreen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="about-strengths" aria-labelledby="strengths-title">
          <h2 className="section-title" id="strengths-title" data-reveal>
            My strengths
          </h2>
          <ul className="about-strengths__grid" data-reveal-stagger>
            {strengths.map((item) => (
              <li className="about-strengths__card" key={item.label}>
                <h3 className="about-strengths__label">{item.label}</h3>
                <p className="about-strengths__text">{item.text}</p>
              </li>
            ))}
          </ul>
          <ul className="about-photos" data-reveal-stagger>
            {photos.map((photo) => (
              <li key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width="616"
                  height="840"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
