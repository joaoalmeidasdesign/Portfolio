// Visitplann case study (Figma 613:133). Copy is verbatim from Figma.
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import {
  BoxedText,
  CaseStudyConclusion,
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudySection,
  Columns,
  FlatImage,
  NextCaseStudy,
  PhonePanel,
  TextBlock,
} from "./components/caseStudy/CaseStudyParts.jsx";
import heroImage from "./assets/visitplann/hero.png";
import offlineFlow from "./assets/visitplann/offline-flow.png";
import tapToIdentify from "./assets/visitplann/tap-to-identify.png";
import offlineBeforeAfter from "./assets/visitplann/offline-before-after.png";
import mapDefaultVsZoomed from "./assets/visitplann/map-default-vs-zoomed.png";
import routeShortVsMultiday from "./assets/visitplann/route-short-vs-multiday.png";
import planning1 from "./assets/visitplann/planning-1.png";
import planning2 from "./assets/visitplann/planning-2.png";
import planning3 from "./assets/visitplann/planning-3.png";
import planning4 from "./assets/visitplann/planning-4.png";
import componentAnnotations from "./assets/visitplann/component-annotations.png";
import library from "./assets/visitplann/library.png";
import prototypeFlows from "./assets/visitplann/prototype-flows.png";
import knightCover from "./assets/cards/knight-card.png";

const built = (label) => ({ label, status: "built" });
const planningPhone = (src, alt) => ({ src, alt, width: 122, height: 263 });

function VisitPlannCaseStudy({ navigate }) {
  return (
    <>
      <Nav currentPath="/case-studies/visitplann" navigate={navigate} />
      <main className="cs-page">
        <CaseStudyHero
          variant="bottom"
          image={{
            src: heroImage,
            width: 2560,
            height: 1820,
            alt: "Visitplann on two phones over a yellow brush-stroke background: the home screen with saved routes and nearby monuments, and the map of Barcelos with monument pins.",
          }}
          title="Visitplann"
          lead="A guided visit app for places where the signal stops at the door."
          sub="Live on iOS and Android, used by Barcelos Municipality."
          tags={[built("Flutter · iOS + Android"), built("Live"), built("Product design"), built("2023 – now")]}
          stats={[
            { value: "4", label: "key decisions" },
            { value: "10→300km", label: "routes, day walks to expeditions", size: "sm" },
            { value: "14", label: "tokenized components" },
            { value: "iOS + Android", label: "one Flutter app", size: "sm" },
          ]}
        />

        <CaseStudyOverview
          tight
          roles={[
            { label: "01 · My role", text: "Product Designer. The only designer on the team." },
            {
              label: "02 · Delivery",
              text: "Offline visit flow and object detection fallback; map priority tiers; route planning from day walks to multi-day expeditions; trail condition reporting; Material 3 design system and a full Figma prototype.",
            },
            {
              label: "03 · Team context",
              text: "5 people: 2 developers, 1 engineering consultant, 1 product stakeholder and me. Built in Flutter for iOS and Android.",
            },
          ]}
          problem={[
            {
              text: "Most tourism apps are designed for someone standing on a street corner with full signal. Visitplann is used inside monuments: churches, chapels and centuries-old stone walls, where the signal is weak or gone.",
            },
            {
              text: "That one fact shaped most of my decisions. If the app only works with a connection, it fails in the exact place people open it.",
            },
            {
              soft: true,
              text: "The engineering is the developers’ work. The flows, the trade-offs below and the design system are mine.",
            },
          ]}
        />

        <CaseStudySection id="offline" tight eyebrow="01" title="Offline visits">
          <div data-reveal>
            <TextBlock
              heading="What went wrong"
              body="We ran client demos inside real monuments, and the app failed every time. Content stalled mid-visit, screens didn’t load, and the guided flow broke at the moments that mattered most. The whole visit had been designed assuming a connection. That assumption was wrong."
            />
          </div>
          <Columns>
            <TextBlock
              heading="The options"
              body="Full offline mode would have solved it completely, but storage costs and content licensing made it impractical to build responsibly. Shipping without offline meant the core use case would fail every time someone stepped inside. That isn’t a weaker experience. It is no experience. Selective offline sat between them: guarantee a minimum, and let people choose the rest."
            />
            <TextBlock
              heading="What I chose"
              body={[
                "A selective offline model with two layers. A locked minimum downloads automatically and is always there, so the visit never fails silently. Before arriving, people choose what else to download: more images, audio guides, video, 3D models. That kept storage and licensing manageable while the core visit held.",
                "Object detection needed the same thinking. The detection model downloads as part of the locked minimum, but in testing it failed often enough that it couldn’t be the only way in. So I added tap-to-identify: when the camera doesn’t recognise an object, people pick it from a list and get the same information. It is slower, but it always works.",
              ]}
              className="cs-text--spaced"
            />
          </Columns>
          <div className="cs-image-row">
            <FlatImage
              style={{ "--grow": 860 }}
              box={[860, 645]}
              image={{
                src: offlineFlow,
                width: 1720,
                height: 1290,
                alt: "Offline flow on two phones: a monument detail screen with a download prompt, and the download options sheet with toggles for audio, images, video and 3D models.",
              }}
            />
            <FlatImage
              style={{ "--grow": 404 }}
              box={[404, 645]}
              image={{
                src: tapToIdentify,
                width: 808,
                height: 606,
                alt: "Tap-to-identify fallback: the floor plan of Ordem São Francisco with numbered objects to pick from a list.",
              }}
            />
          </div>
          <Columns>
            <TextBlock
              heading="What it costs"
              body="The visit got longer before it starts. People used to open the app and start exploring. Now they go through a mode choice and a download step first, which uses data and phone storage. I traded a simpler start for a visit that works inside the monument."
            />
            <BoxedText
              heading="What proved it"
              soft
              body="There was no guessing involved. The demos showed it: real monuments, real clients watching, content failing mid-visit. Connectivity inside those walls couldn’t be assumed, so the design had to stop assuming it."
            />
          </Columns>
          <FlatImage
            box={[1280, 710]}
            image={{
              src: offlineBeforeAfter,
              width: 2560,
              height: 1419,
              alt: "Flow diagrams. Before: open app, start visit, content loads from the network, and the visit fails when there is no connection. After: a mode choice, an automatic locked-minimum download and optional extras, then detection with a tap-to-identify fallback.",
            }}
          />
        </CaseStudySection>

        <CaseStudySection id="map" tight tone="surface" eyebrow="02" title="Map performance">
          <div data-reveal>
            <TextBlock
              heading="What went wrong"
              body="The map is where people discover what to visit, so what loads on it, and when, decides whether they trust the app. Loading every monument at once made the map slow on low-end phones, and a large part of this audience uses them. Thinning the map too hard made it look empty and unreliable. The fix also had to make sense to the municipalities and partners whose monuments appear on it."
            />
          </div>
          <Columns>
            <TextBlock
              heading="The options"
              body="Clustering, grouping nearby monuments into one marker when zoomed out. It’s a common pattern, but it hides individual monuments, and people here are browsing, not searching. Or a hard cap on how many points render. That was blunt: it needed arbitrary cut-offs that no client could understand or argue with."
            />
            <TextBlock
              heading="What I chose"
              body="Priority tiers. High-priority monuments, the ones with complete visit content and more engagement, show at every zoom level. Lower-priority ones load as people zoom in. Priority comes from two things: the client’s contract tier and the visit count. The most relevant monuments are always visible, and the rest appear when someone zooms in and shows they want more."
            />
          </Columns>
          <FlatImage
            box={[1280, 710]}
            fit="contain"
            image={{
              src: mapDefaultVsZoomed,
              width: 1920,
              height: 1440,
              alt: "The map at two zoom levels: the default city view showing only high-priority monuments, and a zoomed-in view where lower-priority monuments appear.",
            }}
          />
          <div data-reveal>
            <TextBlock
              heading="What it costs"
              body="A monument below the threshold doesn’t appear in the default city view. For the people who manage those sites, that is real lost exposure, and they are clients. I accepted it, because the alternative was a worse map for everyone on a low-end phone. The rules are also clear and fair: a site can move up by getting more visits or a higher contract tier."
            />
          </div>
        </CaseStudySection>

        <CaseStudySection id="routes" tight eyebrow="03" title="Route scope">
          <div data-reveal>
            <TextBlock
              heading="What changed"
              body="Visitplann started with short local trails, under 10km. Then the client needed multi-day expeditions of 300km or more, with day-by-day stages, progress tracking, editable itineraries and live trail conditions. A two-hour walk and a five-day expedition are very different things to plan."
            />
          </div>
          <Columns>
            <TextBlock
              heading="The options"
              body="The obvious move was a fork: one entry for short trails, another for expeditions. Each path would be cleaner, but people would have to decide what kind of walker they are before seeing a single route. The alternative was one entry for everything, with complexity showing up only when a route needs it."
            />
            <TextBlock
              heading="What I chose"
              className="cs-text--spaced"
              body={[
                "One entry point for every route. Every trail looks and behaves the same at first. For long routes, planning unlocks in layers: setting a number of days opens stage controls, an editable day-by-day itinerary, daily recaps and a progress widget. Route pages carry much more information (conditions, stages, planning controls) without changing the flow short-trail walkers already know.",
                "The client also asked for a way to report trail conditions on the route. I designed it so walkers can flag a problem while walking, and the report goes straight to a back-office dashboard that site managers use to follow route status as it happens.",
              ]}
            />
          </Columns>
          <FlatImage
            box={[1280, 710]}
            image={{
              src: routeShortVsMultiday,
              width: 1920,
              height: 1440,
              alt: "A short trail page next to a multi-day route page with stages, conditions and planning controls.",
            }}
          />
          <PhonePanel
            height={560}
            caption="Planning layer"
            className="cs-figure--no-caption"
            images={[
              planningPhone(planning1, "Route page with the number-of-days control that unlocks planning."),
              planningPhone(planning2, "Day-by-day stage controls for a multi-day route."),
              planningPhone(planning3, "Editable itinerary with daily recaps."),
              planningPhone(planning4, "Route progress widget and trail condition reporting."),
            ]}
          />
          <div data-reveal>
            <TextBlock
              heading="What it costs"
              body="One entry point puts more weight on discovery. Nobody is guided to the planning tools up front. Someone who never sets a number of days may not know they exist. I accepted that in exchange for not splitting the app in two."
            />
          </div>
        </CaseStudySection>

        <CaseStudySection id="design-system" tight tone="surface" eyebrow="04" title="Design system">
          <BoxedText
            tone="bg"
            heading="Why Material 3"
            body="When I rebuilt the design system, I built it on Material 3 instead of a custom system, for two reasons. First, the team builds in Flutter, which already works with Material 3, so the developers got a familiar starting point instead of a new system to learn. Second, internal documentation goes out of date quickly when a team moves fast. Material 3 is well documented outside our team, so the AI coding tools the developers use can still produce the right implementation even when our own docs fall behind."
          />
          <Columns>
            <TextBlock
              heading="What went wrong"
              body="After the MVP launched, field testing showed the build had drifted from the designs in ways that mattered. Buttons were too small on some phones. Spacing was doubled on some screens and gone on others, so components overlapped. I sat down with the developers the same day, and the cause was clear: my documentation wasn’t specific enough for them to apply the system across screen sizes. The problem wasn’t their execution. It was mine."
            />
            <FlatImage
              box={[620, 333]}
              image={{
                src: componentAnnotations,
                width: 1240,
                height: 666,
                alt: "Design system documentation header for Visitplann on Material 3, with the colour palette swatches.",
              }}
            />
          </Columns>
          <Columns>
            <TextBlock
              heading="What I built"
              body="14 tokenized components on Material 3 foundations, with a 44px minimum touch target written down explicitly instead of left implied, and state annotations on every component. Next to the library I built a full Figma prototype covering every flow. Developers can see how screens connect to each other, not only what each screen looks like. Static screens can’t answer that."
            />
            <TextBlock
              heading="What it costs"
              body="This work took time I hadn’t planned for after launch. Moving fast on the MVP meant the handoff layer had been thin, and this was the price of that choice. I gave up momentum. In return, the library became one source of truth the team works from, instead of a reference they had to interpret."
            />
          </Columns>
          <FlatImage
            box={[1280, 900]}
            image={{
              src: library,
              width: 2560,
              height: 1800,
              alt: "Component library: buttons in each state, chips, toggles, checkboxes and text fields with annotations.",
            }}
          />
          <FlatImage
            box={[1280, 1511]}
            image={{
              src: prototypeFlows,
              width: 1552,
              height: 1830,
              alt: "The full Figma prototype: rows of connected screens covering every flow in the app.",
            }}
          />
        </CaseStudySection>

        <CaseStudyConclusion
          tone="bg"
          tight
          className="cs-conclusion--gap"
          paragraphs={[
            "Visitplann is a five-person team building one app for iOS and Android in Flutter, now used by Barcelos Municipality. Most of the design work came down to one question: what happens when the conditions the app assumed aren’t there? No signal inside a monument, phones too slow for a full map, a walk that turns into a five-day expedition, a build that drifts from the design.",
            {
              soft: true,
              text: "Each answer cost something: a longer start, less exposure for some sites, planning tools people have to find, momentum after launch. I chose those costs on purpose, and I’d make most of the same choices again.",
            },
          ]}
          stats={[
            { value: "10→300km", label: "routes, one entry point", size: "sm" },
            { value: "14", label: "tokenized components" },
          ]}
        />

        <NextCaseStudy
          slug="knight"
          title="Knight Training"
          text="A weekly self-improvement loop for club chess players."
          image={{ src: knightCover, width: 1320, height: 757 }}
          navigate={navigate}
          tone="surface"
        />
      </main>
      <Footer />
    </>
  );
}

export default VisitPlannCaseStudy;
