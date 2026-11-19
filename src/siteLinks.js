import { withBasePath } from "./pathUtils.js";

// Single source for external links used by the nav, contact band and footer.
export const LINKEDIN_HREF = "https://www.linkedin.com/in/imjoaosilva/";

export const CONTACT_EMAIL = "joaoalmeidas.design@gmail.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

// CV: the overlay lives at /cv; the PDF is public/joao-silva-cv.pdf.
// Keep that file name when replacing the PDF so the address stays the same.
export const CV_ROUTE = "/cv";
export const CV_PDF_HREF = withBasePath("/joao-silva-cv.pdf");
export const CV_DOWNLOAD_NAME = "Joao-Silva-Product-Designer-CV.pdf";

export const PROTOTYPE_AI_SAVINGS_HREF =
  "https://www.figma.com/proto/D2e3chxlrnaZdeVUCtCNSq/WIT---AI-Assisted-Design-Challenge?page-id=2%3A3&node-id=20-3&viewport=471%2C257%2C0.41&t=JcEeYmZKyzA719Py-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=20%3A3";
