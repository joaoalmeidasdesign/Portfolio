import { getCaseStudyText } from "../utils/readTime.js";

export const visitPlannHeroImage =
  "https://www.figma.com/api/mcp/asset/3c2ba1ac-7fc4-4574-a1b8-d37e790f706e";

export const visitPlannSummary =
  "Most tourism apps are designed for people standing on a street corner with full signal. VisitPlann is used inside centuries-old stone walls, where there’s almost none.";

export const visitPlannMeta = [
  {
    title: "My Role",
    value: "Product Designer",
  },
  {
    title: "Delivery",
    value:
      "Detection and information flow, search, favorites, routes, component library and design tokens, scoped route-navigation decisions.",
  },
  {
    title: "Team Context",
    value:
      "No PM, shifting requirements week to week, dev-led decisions, inconsistent design patterns across the product.",
  },
];

export const visitPlannSections = [
  {
    title: "Offline Visits Flow",
    subtitle:
      "Designing for a use context where the app’s core assumption was wrong.",
    align: "left",
    blocks: [
      {
        body: [
          "VisitPlann is a guided visit app designed primarily for use inside monuments, exactly the kind of place where mobile connectivity drops out or disappears entirely. During client demos held on-site, the app failed consistently: content stalled mid-visit, screens would not load, and the guided flow broke down at the moments that mattered most. The entire visit experience had been designed assuming network access, and that assumption was wrong.",
        ],
      },
      {
        label: "Options Considered",
        body: [
          "Three directions were on the table. Full offline mode would have solved the problem completely, but storage costs and content licensing complexity made it impractical to build responsibly. Shipping without offline support meant the core use case, a guided visit inside a monument, would fail every time a user stepped inside. That was not a degraded experience, it was no experience. Selective offline was the middle path: guarantee a minimum content set, let users choose what else to download.",
        ],
      },
    ],
  },
  {
    align: "right",
    blocks: [
      {
        label: "The Decision",
        body: [
          "I designed a selective offline model with two layers. A locked minimum downloads automatically and is always present, so the visit never fails silently. Beyond that, users can choose what to download before their visit: additional images, audio guides, video, and 3D models. This kept storage and licensing manageable while ensuring the core experience held.",
          "The offline model also required rethinking object recognition. The computer vision detection downloads as part of the locked minimum, but in testing it failed inconsistently enough that we could not rely on it as the sole access point. Rather than ship a feature that worked most of the time and failed silently the rest, I added a tap-to-identify fallback so users can manually select objects from a list to access the same information. It is slower and less elegant, but it guarantees access regardless of whether the CV model performs.",
        ],
      },
      {
        label: "The Tradeoff",
        body: [
          "Adding this changed the visit flow and made it longer. Where users previously opened the app and started exploring, they now move through a mode selection step, a download step, and then the visit. It consumes upfront data and occupies device storage. I traded flow simplicity for reliability: the visit works inside the monument, but it costs the user more before they get there.",
        ],
      },
      {
        label: "What Proved It",
        body: [
          "The decision came directly from what the demos showed. Inside real monuments, with real clients watching, content failed to load mid-visit. There was no ambiguity about the problem or where it happened. Connectivity inside those spaces could not be assumed, and the architecture had to change to reflect that.",
        ],
      },
    ],
  },
  {
    title: "Map Performance vs Completeness",
    subtitle:
      "Balancing what the map shows against what the devices it runs on can handle.",
    align: "right",
    blocks: [
      {
        label: "The Tension",
        body: [
          "The map is the product’s core discovery surface, so what loads on it, and when, directly shapes whether users trust the app as a travel companion. Loading every monument at once caused performance problems on low-end devices, which make up a significant portion of the tourism demographic. But thinning the map too aggressively made it feel sparse and unreliable. Neither extreme worked, and the fix could not just be technical. It had to feel intentional to users and hold up to scrutiny from the B2B clients whose monuments depend on it.",
        ],
      },
      {
        label: "Options Considered",
        body: [
          "The straightforward options were clustering, which groups nearby POIs into a single marker at low zoom, or setting a hard cap on total POIs rendered. Clustering is a common pattern but it obscures individual monuments, which works against discovery in a context where users are browsing, not searching. A hard cap was blunt and would have required arbitrary cutoffs with no logic a client could understand or appeal to.",
        ],
      },
    ],
  },
  {
    align: "left",
    blocks: [
      {
        label: "The Decision",
        body: [
          "I introduced a priority tier system. High-priority POIs, monuments with complete visit content and higher engagement, render at all zoom levels. Lower-priority entries load only when the user zooms in. Priority is determined by two criteria: client contract tier and visit count. This means the most commercially relevant and most-visited monuments are always visible, while newer or lower-performing entries appear as users zoom in and signal intent by doing so.",
        ],
      },
      {
        label: "The Tradeoff",
        body: [
          "A monument that does not meet the priority threshold is invisible at the default city-exploration view. For patrimony managers whose sites did not qualify, that is a real reduction in discovery exposure, and in a B2B product those managers are clients. I accepted that tradeoff because the alternative was degrading the experience for every user on a lower-end device. The priority criteria are also transparent and improvable: a manager can work toward higher visit counts or upgrade their contract tier.",
        ],
      },
    ],
  },
  {
    title: "Route Scope Expansion",
    subtitle:
      "From short day trails to long expeditions without splitting the product into two experiences.",
    align: "right",
    blocks: [
      {
        body: [
          "The product started with short local trails under 10km. The client then needed to support multi-day expeditions of 300km or more, routes that require day-by-day staging, progress tracking, editable itineraries, and live condition reporting. The functional gap between a two-hour walk and a five-day expedition is enormous. The design risk was splitting the app into two experiences, one for casual walkers and one for expedition planners, and forcing users to classify themselves before they had seen a single route.",
        ],
      },
      {
        label: "What was considered?",
        body: [
          "The obvious solution was a fork: separate entry points or product modes for short trails versus multi-day routes. That would have given each user type a cleaner path, but it introduced a classification problem. Users would need to self-identify before they had even seen a route. The alternative was a unified surface where complexity revealed itself based on what the route actually required.",
        ],
      },
    ],
  },
  {
    align: "left",
    blocks: [
      {
        label: "The Decision",
        body: [
          "I kept a single entry point for all routes. Every trail looks and behaves the same at first contact. For multi-day routes, the planning layer unlocks progressively: users are prompted to set a day count, which surfaces staging controls, an editable itinerary, daily recap pages, and a progress-tracking widget. Route detail pages absorbed significantly more information density, including condition data, staging breakpoints, and planning controls, without restructuring the core flow that short-trail users already navigate.",
          "I also designed an alert-reporting system requested by the client that lets users flag trail conditions while on-route. Those reports feed directly into a back-office dashboard that patrimony managers use to monitor route status in real time.",
        ],
      },
      {
        label: "The Tradeoff",
        body: [
          "Keeping the entry point unified put more weight on the planning layer. Users who want complex staging have to discover it progressively rather than being guided to it upfront. The system rewards exploration, but it does not announce itself. Someone who never taps into day-count setup might not realize the full planning toolkit is there. That is a discoverability cost I accepted in exchange for not fragmenting the experience at the surface level.",
        ],
      },
    ],
  },
  {
    title: "Design System",
    subtitle:
      "Built after field testing revealed the gap between what I designed and what shipped.",
    align: "right",
    blocks: [
      {
        label: "What Broke?",
        body: [
          "After the MVP launch, field testing revealed that the front-end build had drifted from the designs in ways that mattered. Buttons were undersized on several devices, spacing was doubled on some screens and collapsed to zero on others, causing components to overlap. When I sat down with the developers the same day, the cause was clear: the documentation was not specific enough for them to apply the system correctly across device sizes. The problem was not their execution. It was mine.",
        ],
      },
    ],
  },
  {
    align: "left",
    blocks: [
      {
        label: "What I Built",
        body: [
          "I locked in a minimum touch target of 44px and documented it explicitly rather than leaving it implied. I built a spacing scale using tokens and enforced it across the library, so values could not be applied ad hoc at the point of implementation. I added states and annotations to every existing component, then built a coded prototype so developers could reference actual behaviour instead of interpreting static screens.",
        ],
      },
      {
        label: "The Tradeoff",
        body: [
          "The annotation and token work took time I had not budgeted for post-launch. Moving fast on the MVP meant the handoff layer had been thin. This was the cost of that choice. What I gave up was momentum. What I got back was a library that functioned as a shared source of truth rather than a design reference developers had to interpret and guess at.",
        ],
      },
    ],
  },
];

export const visitPlannCaseStudyCard = {
  slug: "visitplann",
  img: visitPlannHeroImage,
  readTimeColor: "#060010",
  title: "VisitPlann",
  tags: ["Mobile App", "Shipped", "Product Design"],
  description:
    "Guided tourism experience with computer vision: discover points of interest, access rich content, and plan routes. Full case study focused on shipping under constraints and building consistency.",
  readTimeSource: getCaseStudyText({
    summary: visitPlannSummary,
    meta: visitPlannMeta,
    sections: visitPlannSections,
  }),
};
