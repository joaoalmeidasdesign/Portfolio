import brancoPrataBase from "../assets/brancoprata-base.svg";
import { getCaseStudyText } from "../utils/readTime.js";

export const brancoPrataHeroImage = brancoPrataBase;
export const brancoPrataSummary =
  "A marketing site redesign focused on making the studio easier to understand, trust, and contact.";

export const brancoPrataMeta = [
  {
    title: "My Role",
    value: "Product Designer and Webflow builder",
  },
  {
    title: "Delivery",
    value:
      "Information architecture, messaging hierarchy, responsive marketing pages, and conversion-focused content structure.",
  },
  {
    title: "Team Context",
    value:
      "Independent studio context with direct iteration, fast feedback loops, and a strong emphasis on clarity and credibility.",
  },
];

export const brancoPrataSections = [
  {
    title: "Case Study In Progress",
    subtitle:
      "The full BrancoPrata breakdown is being turned into a complete public case study.",
    align: "left",
    blocks: [
      {
        body: [
          "BrancoPrata is a marketing site for a Portuguese design studio. The work focused on improving how quickly visitors understand the offer, why the studio feels credible, and what they should do next.",
        ],
      },
      {
        label: "What this page will cover",
        body: [
          "The final case study will document the structure decisions behind the site, the messaging changes that improved clarity, and the design and build choices that made the experience feel more polished and more trustworthy.",
        ],
      },
    ],
  },
];

export const brancoPrataCaseStudyCard = {
  slug: "brancoprata",
  hidden: true,
  img: brancoPrataHeroImage,
  readTimeColor: "#060010",
  title: "BrancoPrata",
  tags: ["Website", "In Development"],
  description:
    "Marketing site for a Portuguese design studio, designed and built to improve clarity, credibility, and lead generation.",
  readTimeSource: getCaseStudyText({
    summary: brancoPrataSummary,
    meta: brancoPrataMeta,
    sections: brancoPrataSections,
  }),
};
