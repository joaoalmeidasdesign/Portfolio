import knightCover from "../assets/knight-cover.png";
import { getCaseStudyText } from "../utils/readTime.js";

export const knightHeroImage = knightCover;
export const knightSummary =
  "A chess learning product built around structured practice, feedback, and long-term skill development.";

export const knightMeta = [
  {
    title: "My Role",
    value: "Product Designer",
  },
  {
    title: "Delivery",
    value:
      "Learning flow design, product framing, practice structure, and beta direction for a mobile-first training experience.",
  },
  {
    title: "Team Context",
    value:
      "Early-stage product definition with evolving priorities, rapid iteration, and a focus on meaningful skill progression.",
  },
];

export const knightSections = [
  {
    title: "Case Study In Progress",
    subtitle:
      "The Knight case study is being expanded into a full public walkthrough.",
    align: "left",
    blocks: [
      {
        body: [
          "Knight is a chess learning app centered on structured practice instead of passive content. The work focuses on how to help players improve through repeated, intentional training sessions.",
        ],
      },
      {
        label: "What this page will cover",
        body: [
          "The final version will explain the product direction, how the learning flow is designed to support skill growth, and how the beta is being shaped around clarity, progression, and player motivation.",
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
