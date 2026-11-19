// AI Savings Assistant case study, small layout (Figma 589:109). Copy is verbatim from Figma.
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import Button from "./components/Button.jsx";
import { TagList } from "./components/Tag.jsx";
import {
  Columns,
  FlatImage,
  NextCaseStudy,
  PhonePanel,
  StatRow,
  TextBlock,
} from "./components/caseStudy/CaseStudyParts.jsx";
import { PROTOTYPE_AI_SAVINGS_HREF } from "./siteLinks.js";
import cover from "./assets/ai-savings/cover.png";
import journey from "./assets/ai-savings/journey.png";
import aiWorkflow from "./assets/ai-savings/ai-workflow.png";
import prototypeHome from "./assets/ai-savings/prototype-home.png";
import prototypeAdjust from "./assets/ai-savings/prototype-adjust.png";
import knightCover from "./assets/cards/knight-card.png";

const built = (label) => ({ label, status: "built" });

const roles = [
  { label: "01 · My role", text: "Product Designer, working solo with AI tools." },
  {
    label: "02 · Delivery",
    text: "User journey, six mobile screens, a small design system, a clickable prototype, an AI log, a research summary and a handoff spec for one component.",
  },
  { label: "03 · Team context", text: "Solo. Fictional bank, fictional customer, sample data." },
];

const decisions = [
  {
    number: "01",
    title: "The AI suggests, Sofia decides",
    body: "Nothing moves until she approves. The review screen lists every transfer, and the AI can’t act outside the plan she agreed to.",
    note: "I based this on CFPB and OECD guidance and on WCAG 2.2 (SC 3.3.4), which asks for a review step before financial commitments.",
  },
  {
    number: "02",
    title: "She corrects the AI in her own words",
    body: "The AI asks about what it can’t see, and Sofia tells it about a €100 insurance payment. The plan recalculates, and the earlier plan stays on screen so she can see what changed.",
    note: "An early version offered a suggestion chip here instead; I replaced it, because a chip only lets her pick from what the AI already guessed.",
  },
  {
    number: "03",
    title: "One slider, honest results",
    body: "The monthly amount is the only thing she controls. The ready-by date and the money left over are shown as results, each flagged against her own limits.",
    note: "It took three versions to get here; the first was a stepper with several inputs that made every number look like something she could set.",
  },
];

const overrules = [
  "Claude’s first journey had no moment where Sofia corrects the AI. I rebuilt it around that moment.",
  "Stitch drew a chart with contributions and her limit on the same axis, so the fix looked worse than the problem. The mistake came from my prompt.",
  "Claude’s build was heavier than it needed to be. I lightened the visuals and rewrote copy, including replacing “tight” with the actual rule it meant.",
];

function AiSavingsCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/case-studies/ai-savings" navigate={navigate} />
      <main className="cs-page cs-page--small">
        <header className="cs-hero cs-small-hero">
          <div className="cs-split">
            <div className="cs-small-hero__text">
              <p className="eyebrow" data-hero-item>
                Small project · Design challenge
              </p>
              <h1 className="cs-small-hero__title" data-hero-item>
                AI Savings Assistant
              </h1>
              <p className="cs-small-hero__lead" data-hero-item>
                A savings assistant that explains, suggests, and waits for your approval.
              </p>
              <p className="cs-small-hero__sub" data-hero-item>
                Take-home design challenge, 2026. About 8 hours against a suggested 4 to 6, revised
                after I submitted it.
              </p>
              <div data-hero-item>
                <TagList
                  tags={[built("Mobile banking"), built("AI-first"), built("Prototype"), built("Handoff spec")]}
                />
              </div>
            </div>
            <img
              className="cs-small-hero__image"
              src={cover}
              alt="Two banking app screens: Hello, Sofia with her balance and the AI assistant prompt “Saving for something?”, and the “Adjust your plan” sheet set to €250 a month."
              width="1224"
              height="765"
              fetchPriority="high"
            />
          </div>
          <StatRow
            stats={[
              { value: "~8h", label: "time spent" },
              { value: "6", label: "key screens" },
              { value: "16", label: "prototype states" },
              { value: "3", label: "AI tools, judged by me" },
            ]}
          />
          <ul className="cs-roles cs-roles--surface" data-reveal-stagger>
            {roles.map((role) => (
              <li className="cs-card" key={role.label}>
                <h2 className="cs-card__label">{role.label}</h2>
                <p className="cs-card__text">{role.text}</p>
              </li>
            ))}
          </ul>
        </header>

        <section className="cs-band cs-band--surface" aria-labelledby="brief-title">
          <div className="cs-band__inner cs-brief" data-reveal>
            <h2 className="cs-small-title cs-brief__title" id="brief-title">
              The brief
            </h2>
            <div className="cs-brief__text">
              <p>
                The challenge asked for an AI-first banking experience: a customer describes a goal
                in their own words, and an assistant turns it into a plan they can adjust and
                approve. It also asked how I used AI to do the work, so that part is in here too.
              </p>
              <p className="cs-brief__rule">
                Money is the one place where people least want software deciding for them. So I set
                myself one rule before drawing anything: the AI can explain and suggest, but the
                person decides.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-band cs-band--bg" aria-labelledby="journey-title">
          <div className="cs-band__inner cs-small-section">
            <header className="cs-small-header" data-reveal>
              <h2 className="cs-small-title" id="journey-title">
                The journey
              </h2>
              <p className="cs-small-intro">
                Sofia wants €3,000 for a summer holiday. She has already saved €600 and wants to keep
                at least €200 free every month. The assistant shows her usual month first (€2,200
                in, €1,750 out, €450 left), works out what she can afford, takes a correction it had
                no way of knowing, and sets nothing up until she approves.
              </p>
            </header>
            <FlatImage
              box={[1280, 507]}
              panel
              image={{
                src: journey,
                width: 2247,
                height: 890,
                alt: "The six-step journey on phone screens: 1 Express intent on Home, 2 Understand in the assistant chat, 3 Add context about a €100 insurance payment, 4 Adjust the plan with the slider, 5 Review and approve every transfer, 6 Confirm that the plan is set.",
              }}
            />
            <ul className="cs-decisions" data-reveal-stagger>
              {decisions.map((decision) => (
                <li className="cs-decision" key={decision.number}>
                  <p className="cs-decision__number" aria-hidden="true">
                    {decision.number}
                  </p>
                  <h3 className="cs-decision__title">
                    <span className="visually-hidden">Decision {decision.number}: </span>
                    {decision.title}
                  </h3>
                  <p className="cs-decision__body">{decision.body}</p>
                  <p className="cs-decision__note">{decision.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cs-band cs-band--surface" aria-labelledby="ai-title">
          <div className="cs-band__inner cs-small-section">
            <header className="cs-small-header" data-reveal>
              <h2 className="cs-small-title" id="ai-title">
                How I used AI
              </h2>
              <p className="cs-small-intro">
                Most of the Figma file was built by Claude, working from my decisions. The journey,
                the three decisions above and the final refinements are mine. I used Claude to
                critique my plan and check the numbers, Perplexity for desk research (twelve
                sources, kept only the four findings that changed a screen), Google Stitch for
                greyscale wireframes, and Claude in Figma to build the tokens, components, screens
                and prototype.
              </p>
            </header>
            <div className="cs-split cs-split--top" data-reveal>
              <div className="cs-ai-checks">
                <p className="cs-text__body">
                  I checked every output against four questions: do the numbers trace back to the
                  plan, does each element help her decide, is anything invented, and would any
                  visual mislead if read literally. That is how I caught the problems:
                </p>
                <h3 className="cs-text__heading">Where I overruled it</h3>
                <ul className="cs-overrules">
                  {overrules.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <figure className="cs-figure cs-ai-workflow">
                <img
                  className="cs-flat"
                  src={aiWorkflow}
                  alt="Three stages of one screen: a visual reference, the Google Stitch greyscale wireframe, and the final Hello, Sofia home screen."
                  width="1224"
                  height="830"
                  style={{ aspectRatio: "612 / 415", objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="cs-ai-workflow__text">
                  The design system is Material 3 with tokens on a 4-point scale, so my time went
                  into what is new here: messages, result flags, a “What happens” disclosure and the
                  plan slider. I wrote a handoff spec for the slider as a React and TypeScript
                  component, with the maths kept in normal code and never in the language model.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="cs-band cs-band--bg" aria-labelledby="change-title">
          <div className="cs-band__inner cs-small-section">
            <header className="cs-small-header" data-reveal>
              <h2 className="cs-small-title" id="change-title">
                What I’d change
              </h2>
            </header>
            <p className="cs-small-intro" data-reveal>
              I scored the work against the challenge’s five criteria after submitting it. Two things
              stand out.
            </p>
            <Columns>
              <TextBlock
                heading="The choice is softer than it looks."
                body="€250 a month is the only plan that meets both of Sofia’s limits, so the slider mostly confirms what the AI already suggested. Next time I’d let her trade the deadline against her limit, so the decision is really hers."
              />
              <TextBlock
                heading="The balance between me and the AI was off."
                body="AI built most of the file and I edited it. Next time I’d build the core components myself and use AI for variants and exploration. The visual identity also reads as a well-made Material 3 app more than a distinct product."
              />
            </Columns>
          </div>
        </section>

        <section className="cs-band cs-band--surface" aria-labelledby="try-title">
          <div className="cs-band__inner cs-split" data-reveal>
            <div className="cs-try">
              <h2 className="cs-small-title" id="try-title">
                Try the prototype
              </h2>
              <p className="cs-text__body">
                The whole journey is clickable, from Home to a confirmed plan, including the branch
                where Sofia keeps €240 against the AI’s advice. Tap the slider on the Adjust screen
                to see the plan change.
              </p>
              <Button href={PROTOTYPE_AI_SAVINGS_HREF} external variant="primary">
                Open prototype →<span className="visually-hidden"> (opens in a new tab)</span>
              </Button>
            </div>
            <PhonePanel
              height={520}
              caption="Prototype preview"
              className="cs-figure--no-caption cs-try__panel"
              images={[
                {
                  src: prototypeHome,
                  width: 210,
                  height: 456,
                  alt: "Prototype home screen: Hello, Sofia, total balance €1,884.50 and the AI assistant card.",
                },
                {
                  src: prototypeAdjust,
                  width: 210,
                  height: 456,
                  alt: "Prototype Adjust your plan sheet: €250 a month, ready by 26 Aug 2027, with Save €250.",
                },
              ]}
            />
          </div>
        </section>

        <NextCaseStudy
          slug="knight"
          title="Knight Training"
          text="A weekly self-improvement loop for club chess players."
          image={{ src: knightCover, width: 1320, height: 757 }}
          navigate={navigate}
        />
      </main>
      <Footer />
    </>
  );
}

export default AiSavingsCaseStudy;
