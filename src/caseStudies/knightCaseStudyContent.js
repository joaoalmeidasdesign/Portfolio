import knightCover from "../assets/knight-cover.png";
import { getCaseStudyText } from "../utils/readTime.js";

export const knightHeroImage = knightCover;
export const knightSummary =
  "A chess learning product built around structured practice, feedback, and long-term skill development.";
export const knightBetaNote = "Closed beta planned Q2/Q3 2026";

export const knightMeta = [
  {
    title: "My Role",
    value: "Product Designer — sole designer on a small team",
  },
  {
    title: "Delivery",
    value:
      "Training planning flow; weekly goal-setting system; resources library connected to training tracker; design system foundations",
  },
  {
    title: "Team Context",
    value:
      "Small team, low budget;",
  },
];

export const knightSections = [
  {
    title: "Training Structure",
    subtitle:
      "Designing a planning system that builds habit without turning improvement into pressure.",
    blocks: [
      {
        body: [
          "Chess improvement is a genuinely contested problem. Players know they should study — openings, tactics, endgames, puzzles — but there's no agreed formula for how to balance those categories or how much time to spend on each. Knight needed to give users real structure without locking them into a single method. The harder part was choosing the right time horizon for planning. That one decision shapes whether the app feels like a training partner or a guilt machine.",
        ],
      },
      {
        label: "Options Considered",
        body: [
          "Daily planning offered the most precision — users could dial in exactly what they'd do each session. But it's punishing. Miss one day and you're already behind. For casual players studying two or three times a week, a daily structure would feel broken from the start. Monthly planning avoided that pressure but created a different problem: too much runway invites procrastination, and it erodes any sense of routine. Neither extreme designed well for the actual range of people who'd use this app — from someone fitting in 30 minutes on a Tuesday to someone with a serious daily practice.",
        ],
      },
      {
        label: "The Decision",
        body: [
          "Weekly planning. It's structured enough to build habit and loose enough to absorb a missed session without signalling failure. With that anchored, I built a hybrid model: users can construct a fully custom weekly training plan or start from a curated template and adjust it to fit their schedule and priorities.",
        ],
      },
    ],
  },
  {
    title: "System Design",
    subtitle:
      "Connecting planning, resources, and progress so the product feels like one training system.",
    blocks: [
      {
        label: "The System Decision",
        body: [
          "The Resources section tested the same tension at a component level. Users needed a personal library — articles, videos, books, puzzle sets — but a passive library doesn't connect to training. The decision was to wire resources directly into the weekly plan: a user working through a course can set a chapter target for the week, and that progress feeds the overall training tracker. One surface, two functions. The risk was complexity; the bet was that linking resources to goals would make both more useful than either would be alone.",
        ],
      },
      {
        label: "The Tradeoff",
        body: [
          "Weekly planning doesn't serve the most obsessive users as precisely as a daily structure would. A player who wants to track every individual session against a daily target will find the weekly view slightly blunt. That's a deliberate concession — designing for the daily-committed user would have made the app actively worse for everyone else.",
        ],
      },
    ],
  },
];

export const knightCaseStudyCard = {
  slug: "knight",
  img: knightHeroImage,
  readTimeColor: "#FFFFFE",
  title: "Knight",
  tags: ["Mobile App", "In Production", "Product Design"],
  description:
    "Chess learning app focused on building skill through structured practice and deliberate progression.",
  readTimeSource: getCaseStudyText({
    summary: knightSummary,
    meta: knightMeta,
    sections: knightSections,
  }),
};
