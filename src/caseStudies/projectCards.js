// Home "Selected work" cards. Copy is taken verbatim from Figma (701:194, 701:258, 701:321).
import knightCard from "../assets/cards/knight-card.avif";
import visitPlannCard from "../assets/cards/visitplann-card.avif";
import aiSavingsCard from "../assets/cards/ai-savings-card.avif";

export const knightProject = {
  slug: "knight",
  title: "Knight Training",
  description:
    "A weekly self-improvement loop for club chess players. In closed beta since August 2026, with 10 testers shaping the product.",
  cover: {
    src: knightCard,
    width: 1320,
    height: 757,
    alt: "Two Knight Training iPhone screens: the resources library and the weekly training plan.",
  },
  readTime: "8min read",
  readTimeTone: "light",
  badges: ["iOS · SwiftUI", "Closed beta", "Full case study"],
  stats: [
    { value: "5", label: "steps in the loop" },
    { value: "6", label: "changes from feedback" },
  ],
};

export const visitPlannProject = {
  slug: "visitplann",
  title: "Visitplann",
  description:
    "A guided visit app for places where the signal stops at the door. Live on iOS and Android, used by Barcelos Municipality.",
  cover: {
    src: visitPlannCard,
    width: 1320,
    height: 938,
    position: "center 40%",
    alt: "Two Visitplann phone screens: the home feed of routes and nearby monuments, and the map of Barcelos with points of interest.",
  },
  readTime: "7min read",
  readTimeTone: "dark",
  badges: ["Flutter · iOS + Android", "Live", "Full case study"],
  stats: [
    { value: "14", label: "tokenized components" },
    { value: "300km", label: "longest route, one entry" },
  ],
};

export const aiSavingsProject = {
  slug: "ai-savings",
  title: "AI Savings Assistant",
  description:
    "A savings assistant that explains, suggests, and waits for your approval. Take-home design challenge, 2026. About 8 hours against a suggested 4 to 6, revised after I submitted it.",
  cover: {
    src: aiSavingsCard,
    width: 1320,
    height: 825,
    alt: "Two banking app screens: the account home with the AI assistant prompt, and the “Adjust your plan” savings sheet.",
  },
  readTime: "4min read",
  readTimeTone: "dark",
  badges: ["Mobile banking", "Design challenge", "Small project"],
  stats: [
    { value: "~8h", label: "time spent" },
    { value: "16", label: "prototype states" },
  ],
};
