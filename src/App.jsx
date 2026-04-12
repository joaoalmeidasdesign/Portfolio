import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import About from "./About.jsx";
import CaptureHomeMobile from "./CaptureHomeMobile.jsx";
import CaseStudyNotice from "./CaseStudyNotice.jsx";
import VisitPlannCaseStudy from "./VisitPlannCaseStudy.jsx";
import BrancoPrataCaseStudy from "./BrancoPrataCaseStudy.jsx";
import KnightCaseStudy from "./KnightCaseStudy.jsx";
import {
  getAppPathname,
  restoreRedirectPath,
  withBasePath,
} from "./pathUtils.js";

const caseStudyPages = {
  visitplann: VisitPlannCaseStudy,
  brancoprata: BrancoPrataCaseStudy,
  knight: KnightCaseStudy,
};

// Scroll helper used after navigation when we want to land on a specific section.
function scrollToHash(hash, behavior = "auto") {
  if (!hash) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior, block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

function getInitialPathname() {
  // GitHub Pages can bounce deep links through 404.html before the SPA boots.
  restoreRedirectPath();
  return getAppPathname();
}

function App() {
  // The app uses pathname switching instead of a dedicated router dependency.
  const [pathname, setPathname] = useState(getInitialPathname);
  const isCaseStudyRoute = pathname.startsWith("/case-studies");
  const caseStudySlug = isCaseStudyRoute
    ? pathname.replace("/case-studies/", "").split("/")[0]
    : "";
  const ActiveCaseStudyPage = caseStudyPages[caseStudySlug];

  useEffect(() => {
    // Sync UI when users navigate with browser back/forward buttons.
    const handlePopState = () => {
      setPathname(getAppPathname());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Shared navigation helper passed down to pages and the navbar.
  const navigate = (nextPath, options = {}) => {
    const nextLocation = withBasePath(nextPath);
    const nextUrl = options.hash
      ? `${nextLocation}#${options.hash}`
      : nextLocation;

    if (nextPath !== pathname) {
      window.history.pushState({}, "", nextUrl);
      setPathname(nextPath);
      requestAnimationFrame(() => scrollToHash(options.hash, options.behavior));
      return;
    }

    window.history.pushState({}, "", nextUrl);
    scrollToHash(options.hash, options.behavior);
  };

  if (isCaseStudyRoute) {
    if (ActiveCaseStudyPage) {
      return <ActiveCaseStudyPage navigate={navigate} />;
    }

    return <CaseStudyNotice navigate={navigate} />;
  }

  if (pathname === "/about") {
    return <About navigate={navigate} />;
  }

  // Utility route used only when exporting a mobile frame to Figma.
  if (pathname === "/home-mobile") {
    return <CaptureHomeMobile />;
  }

  return <Home navigate={navigate} />;
}

export default App;
