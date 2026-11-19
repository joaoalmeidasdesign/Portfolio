// Knight Training case study (Figma 588:66). Copy is verbatim from Figma.
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import {
  BulletList,
  CaseStudyConclusion,
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudySection,
  Columns,
  FeedbackTable,
  NextCaseStudy,
  PhonePanel,
  StepRow,
  TextBlock,
} from "./components/caseStudy/CaseStudyParts.jsx";
import LoopDiagram from "./components/caseStudy/LoopDiagram.jsx";
import { TagList } from "./components/Tag.jsx";
import heroImage from "./assets/knight/hero.png";
import plan1 from "./assets/knight/plan-1.png";
import plan2 from "./assets/knight/plan-2.png";
import plan3 from "./assets/knight/plan-3.png";
import practice1 from "./assets/knight/practice-1.png";
import practice2 from "./assets/knight/practice-2.png";
import practice3 from "./assets/knight/practice-3.png";
import record1 from "./assets/knight/record-1.png";
import record2 from "./assets/knight/record-2.png";
import record3 from "./assets/knight/record-3.png";
import reflect1 from "./assets/knight/reflect-1.png";
import reflect2 from "./assets/knight/reflect-2.png";
import reflect3 from "./assets/knight/reflect-3.png";
import adjust1 from "./assets/knight/adjust-1.png";
import adjust2 from "./assets/knight/adjust-2.png";
import adjust3 from "./assets/knight/adjust-3.png";
import planEditable from "./assets/knight/plan-editable.png";
import planLocked from "./assets/knight/plan-locked.png";
import resources1 from "./assets/knight/resources-1.png";
import resources2 from "./assets/knight/resources-2.png";
import recordResource1 from "./assets/knight/record-resource-1.png";
import recordResource2 from "./assets/knight/record-resource-2.png";
import visitPlannCover from "./assets/cards/visitplann-card.png";

const built = (label) => ({ label, status: "built" });
const proposed = (label) => ({ label, status: "proposed" });
const phone = (src, alt, width = 158, height = 343, position) => ({
  src,
  alt,
  width,
  height,
  position,
});

const loopSteps = [
  {
    number: 1,
    title: "Plan",
    blocks: [
      {
        heading: "What the product does",
        body: "The player sets goals for the week, for example 60 puzzles, two rapid games and 30 minutes of analysis. They can build the plan by hand, start from one of five templates, or ask Knight Training to suggest one.",
      },
      {
        heading: "The design decision",
        soft: true,
        body: "I added the estimated time per week to every template so people commit to something they can actually finish. “Suggest a plan” also asks which site and time control the rating comes from, because the same number means different things in different places.",
      },
    ],
    tags: [built("Built"), built("Templates and rating chips redesigned")],
    panel: {
      height: 420,
      label: "Template list",
      images: [
        phone(plan1, "“Choose a template” list showing Tactics first, Slow games deep review and Endgame foundations, each with its weekly time."),
        phone(plan2, "“Suggest a plan” screen asking for time per week, what to work on, rating source and time control."),
        phone(plan3, "“Here’s your plan” result listing 30 puzzles, 3 games and weekly hours for endgames and openings."),
      ],
    },
  },
  {
    number: 2,
    title: "Practice",
    blocks: [
      {
        heading: "What the product does",
        body: "The timer runs against a goal and Home shows what is left for today. When the goal time is reached, a quiet “A few more minutes?” appears.",
      },
      {
        heading: "The design decision",
        soft: true,
        body: "I kept it discreet on purpose, because some players want to keep going and shouldn’t be argued with. I’ve also proposed that Stop simply pauses the timer, instead of interrupting with an “End session?” pop-up.",
      },
    ],
    tags: [built("Nudge built"), proposed("Stop-pauses proposed")],
    panel: {
      height: 420,
      label: "A few more minutes",
      images: [
        phone(practice1, "Training timer screen running against the session goal.", 123, 267),
        phone(practice2, "The quiet “A few more minutes?” prompt shown when the goal time is reached.", 228, 267),
        phone(practice3, "Home showing what is left to train today.", 123, 267),
      ],
    },
  },
  {
    number: 3,
    title: "Record",
    blocks: [
      {
        heading: "What the product does",
        body: "After a session there is one review screen: what kind of work it was, how much, which resource was used, and which goal it counts toward.",
      },
      {
        heading: "The design decision",
        soft: true,
        body: "It is the only place where a session gets saved or thrown away, so there is never doubt about whether something counted. I’ve proposed moving notes here as well, so nobody has to type in the middle of a game.",
      },
    ],
    tags: [built("Review built"), proposed("Notes placement proposed")],
    panel: {
      height: 420,
      label: "Session review screen",
      images: [
        phone(record1, "Session review screen choosing the kind of work done."),
        phone(record2, "Session review screen with the amount, the resource used and the goal it counts toward."),
        phone(record3, "Session review screen with save and discard actions."),
      ],
    },
  },
  {
    number: 4,
    title: "Reflect",
    blocks: [
      {
        heading: "What the product does",
        body: "At the end of the week the player answers four questions: what went well, what held me back, what I wish I had done, and what I intend for next week. Their profile shows their Lichess or Chess.com rating, an activity heatmap and milestones.",
      },
      {
        heading: "The design decision",
        soft: true,
        body: "I rebuilt the heatmap as a component with square cells that fill the width, in sizes from 4x9 to 7x16, and gave ratings the gold accent so they read as results and not as more activity.",
      },
    ],
    tags: [built("Built"), built("Heatmap and charts restyled")],
    panel: {
      height: 420,
      label: "Weekly review questions",
      images: [
        phone(reflect1, "Weekly review with the four reflection questions.", 158, 343, "top"),
        phone(reflect2, "Profile showing the player’s rating in the gold accent."),
        phone(reflect3, "Profile activity heatmap with square cells and milestones.", 158, 343, "top"),
      ],
    },
  },
  {
    number: 5,
    title: "Adjust",
    blocks: [
      {
        heading: "What the product does",
        body: "Last week’s reflection stays on screen while the player plans the next week. Home tiles let each person choose which numbers they see every day. An on-device coach tip can set a focus and retarget a goal.",
      },
      {
        heading: "Where the loop closes",
        soft: true,
        body: [
          "This is where the loop closes, because the suggestions are built from everything the earlier steps collected:",
          <BulletList
            key="sources"
            items={[
              "the work the player has actually been doing",
              "the work they said they were going to do",
              "data imported automatically from Lichess, including where Lichess thinks their weaknesses are",
              "their own comments and notes",
            ]}
          />,
          "We then use on-device AI to turn that into the suggested plan.",
        ],
      },
    ],
    tags: [built("Tiles built"), proposed("Coach tip is TestFlight-only for now")],
    panel: {
      height: 420,
      label: "Planning screen with last week",
      images: [
        phone(adjust1, "Planning screen with last week’s reflection kept on screen."),
        phone(adjust2, "Home tiles the player can choose to see every day."),
        phone(adjust3, "On-device coach tip setting a focus and retargeting a goal.", 158, 343, "top"),
      ],
    },
  },
];

const feedbackRows = [
  { said: "Couldn’t cancel a session right after starting", changed: "Cancel flow added", status: built("Shipped") },
  { said: "Starting Saturday put the review on Sunday", changed: "Two-day gap before the first review", status: built("Shipped") },
  { said: "A saved plan couldn’t be edited", changed: "Editable for 2 sessions, then locks", status: built("Shipped") },
  { said: "Couldn’t add a resource to a planned activity", changed: "Resources can always be attached", status: built("Shipped") },
  { said: "Couldn’t add study items outside the plan", changed: "Add to plan at any time", status: built("Shipped") },
  { said: "Training blocks all looked the same", changed: "Blocks can be named", status: built("Shipped") },
  { said: "Wanted reminders for an activity", changed: "Reminders", status: proposed("In progress") },
  { said: "Quick Play skipped the activity choice", changed: "Choose activity first", status: proposed("In progress") },
  { said: "Wanted to review a plan before committing", changed: "Review plan screen", status: proposed("Open") },
];

function KnightCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/case-studies/knight" navigate={navigate} />
      <main className="cs-page">
        <CaseStudyHero
          image={{
            src: heroImage,
            width: 2007,
            height: 1152,
            alt: "Knight Training on two iPhones: the Resources library with books and articles, and Home with the weekly plan, progress per activity and a Continue Training button.",
          }}
          title={
            <>
              Knight
              <br />
              Training
            </>
          }
          lead="A weekly self-improvement loop for club chess players."
          sub="In closed beta since August 2026, with 10 testers shaping the product."
          tags={[built("iOS · SwiftUI"), built("Closed beta"), built("Product design"), built("2025 – now")]}
          stats={[
            { value: "5", label: "steps in the loop I designed" },
            { value: "10", label: "beta testers" },
            { value: "6", label: "changes shipped from feedback, month one" },
            { value: "1 + 1", label: "designer + developer" },
          ]}
        />

        <CaseStudyOverview
          roles={[
            { label: "01 · My role", text: "Product Designer. The only designer, working with one developer." },
            {
              label: "02 · Delivery",
              text: "The self-improvement loop and flow structure; plan, timer, session review and weekly review flows; Home tiles and activity heatmap; clickable Figma prototype.",
            },
            { label: "03 · Team context", text: "1 designer, 1 developer. Small team, low budget." },
          ]}
          problem={[
            {
              text: "Most adult club players, somewhere between 1000 and 2000 rated, know they should train. Very few of them track what they do, so they have no way of telling whether any of it is moving their rating.",
            },
            {
              text: "A timer doesn’t fix that. It tells you how long you sat at the board. It doesn’t tell you whether Tuesday’s puzzles had anything to do with the points you gained this month.",
            },
            {
              soft: true,
              text: "My job on Knight Training was to connect the two: what you did, and what happened because of it. I designed the first screens for the beta build. Once testers were in, feedback arrived faster than I could redraw screens, so the developer used the UI kit and design directions I had written to produce quick fixes with Claude Code. No screen was published without my approval. The engineering is the developer’s work. The loop the product is organised around, the flow structure and the decisions below are mine.",
            },
          ]}
        />

        <CaseStudySection
          id="loop"
          eyebrow="01 — HERO DECISION"
          title="The self-improvement loop"
          intro="Each week of training should shape the next one. Every screen has one job: move the player to the next step."
        >
          <div className="cs-loop">
            <div className="cs-loop__diagram" data-loop>
              <LoopDiagram />
            </div>
            <div className="cs-loop__intro" data-reveal>
              <p>
                I designed Knight Training around one idea: each week of training should shape the
                next one. That became a five-step loop, and every screen in the app has one job,
                which is to move the player to the next step.
              </p>
              <p className="cs-text--soft">
                I created the loop myself, and the project’s stakeholder, who is also its developer,
                reviewed and approved it as the structure for the product.
              </p>
              <TagList tags={[built("Built"), proposed("Proposed")]} />
            </div>
          </div>

          <ol className="cs-steps">
            {loopSteps.map((step, index) => (
              <StepRow key={step.number} {...step} reverse={index % 2 === 1} />
            ))}
          </ol>

          <Columns>
            <TextBlock
              heading="Why the loop turns weekly"
              body="I looked at daily and monthly first. Daily planning is precise, but it punishes people: miss one day and you are already behind, which is the wrong feeling for someone who trains two or three times a week. Monthly gives so much room that the routine disappears. A week is long enough to absorb a missed session and short enough that the plan still means something. One month into the beta, most testers were still coming back week after week."
            />
            <TextBlock
              heading="Where the loop is still weak"
              body="Adjust is the least automatic step. The reflection informs the next plan, but nothing fills the plan in for the player yet, and the coach that turns a reflection into a concrete target is not in everyone’s hands. My next iteration ends the weekly review with one tap: “Keep this plan”, “Push harder” or “Take it easier”, with next week filled in from the answer. After that I want to test whether people who finish a review are more likely to start the next week’s plan."
            />
          </Columns>
        </CaseStudySection>

        <CaseStudySection id="plan-flex" tone="surface" eyebrow="02" title="How much should a saved plan bend?">
          <div data-reveal>
            <TextBlock
              heading="What testers told us"
              body="In the first weeks of beta the same complaint kept coming back: once a plan was saved, it could not be changed at all. People wanted control over the week they had committed to."
            />
          </div>
          <Columns count={3}>
            <TextBlock
              heading="How we worked it out"
              body="The stakeholder and I took this on together. The two extremes were easy to name: open editing completely, so anyone can change anything at any time, or keep plans locked and protect the weekly commitment while ignoring what testers were telling us. I did the desk research and came back with a few possibilities that sat between them, each one meant to fit both what he wanted for the product and what testers were asking for. We went through them in a brainstorm and chose one."
            />
            <TextBlock
              heading="What we chose"
              body="Plans can be edited for the first two sessions. After that they lock, and the app says so clearly instead of quietly blocking the player. Adding is always allowed: a resource can be attached to a planned activity and new things to study can be added at any point, because adding work doesn’t weaken the commitment."
            />
            <TextBlock
              heading="What it costs"
              body="Someone who wants to rewrite their week on Thursday can’t. We accepted that. A plan you can rewrite at any moment stops being a commitment, and the loop depends on the week meaning something."
            />
          </Columns>
          <PhonePanel
            height={520}
            caption="Editable for 2 sessions, then locked with a message"
            images={[
              phone(planEditable, "“Edit This Week’s Plan” while still editable, with goals for puzzles, endgames and openings.", 214, 464),
              phone(planLocked, "The same plan after two sessions, locked, with a message explaining why it can no longer be edited.", 214, 464),
            ]}
          />
          <div className="cs-group" data-reveal>
            <h3 className="cs-subtitle">The same month, from the same feedback</h3>
            <p className="cs-text__body cs-text--soft-copy">
              We added a two-day gap between creating a plan and the first weekly review, because
              people who started on a Saturday were being asked to review on Sunday. A session can
              now be cancelled right after it starts. Training blocks can be named instead of all
              looking the same. Six changes shipped from tester feedback in the first month. Two
              more are in progress (reminders for an activity, and Quick Play asking which activity
              before the timer opens) and one is still open: letting people review a plan before
              they commit to it.
            </p>
          </div>
          <FeedbackTable
            caption="Beta feedback and what changed"
            columns={["What testers said", "What changed", "Status"]}
            rows={feedbackRows}
          />
        </CaseStudySection>

        <CaseStudySection id="resources" eyebrow="03" title="Resources: how much to build for v1">
          <div className="cs-columns cs-columns--2 cs-columns--wide-gap">
            <div className="cs-stack" data-reveal>
              <TextBlock
                heading="What I designed"
                body="Players study from books, courses, videos and puzzle sets. A library that sits apart from training is just a list, so I designed Resources as part of the plan: someone working through a book sets a chapter target for the week and that progress counts alongside their sessions."
              />
              <TextBlock
                heading="What the beta changed"
                body="With real people using the app, the question became whether that much linking belongs in a first version, while the core loop is still proving itself."
              />
              <TextBlock
                heading="Where it stands"
                body="The lighter half is in the app: a resource can be attached to a planned activity, and to a session when it is recorded. The heavier half, weekly chapter targets that feed the tracker, is still an open scope question for v1."
              />
              <TextBlock
                heading="What we are testing now"
                body="Most chess study still happens in physical books, and typing a title into a form is enough friction for people to skip it. We are currently testing adding a physical book with the phone’s camera, so the book on the shelf gets into the library in a few seconds."
              />
              <TextBlock
                heading="What it costs either way"
                body="Building all of it adds complexity that the beta hasn’t shown people need. Cutting it removes something that could set Knight Training apart before anyone has tried it. I would sooner show this as undecided than present it as finished."
              />
            </div>
            <div className="cs-stack cs-stack--tight">
              <PhonePanel
                height={360}
                tag={proposed("Scope under review")}
                caption="Resources library screen"
                className="cs-figure--no-caption"
                images={[
                  phone(resources1, "Resources library with Books and Articles, each item showing a reading status.", 140, 304),
                  phone(resources2, "Books grid with reading and completed labels.", 140, 304),
                ]}
              />
              <PhonePanel
                height={260}
                tag={built("Live")}
                caption="Record screen with a resource attached"
                className="cs-figure--no-caption"
                images={[
                  phone(recordResource1, "“Link a Resource” list for attaching a book to a session.", 94, 204),
                  phone(recordResource2, "Session record screen with a book attached and progress shown.", 94, 204, "top"),
                ]}
              />
            </div>
          </div>
        </CaseStudySection>

        <CaseStudyConclusion
          paragraphs={[
            "Knight Training is one designer and one developer, and about a year of part-time work to reach closed beta. The beta is small, 10 testers, and in the first month six changes shipped directly from their feedback.",
            "The loop holds from Plan through Reflect. Adjust is where I’m working next, and it is the step that decides whether Knight Training helps people improve or only records that they tried. The visual design and the design system are being redone, so I have left them out of this version on purpose.",
          ]}
          stats={[
            { value: "10", label: "beta testers" },
            { value: "6", label: "feedback changes shipped in month one" },
          ]}
        />

        <NextCaseStudy
          slug="visitplann"
          title="Visitplann"
          text="Offline-first guided visits inside centuries-old walls."
          image={{ src: visitPlannCover, width: 1320, height: 938 }}
          navigate={navigate}
        />
      </main>
      <Footer />
    </>
  );
}

export default KnightCaseStudy;
