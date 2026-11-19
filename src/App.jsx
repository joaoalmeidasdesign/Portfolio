import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setupPageMotion } from "./motion.js";
import CvOverlay from "./cv/CvOverlay.jsx";
import { CvContext } from "./cv/CvContext.js";
import { CV_ROUTE } from "./siteLinks.js";
import Home from "./Home.jsx";
import About from "./About.jsx";
import CaptureHomeMobile from "./CaptureHomeMobile.jsx";
import CaseStudyNotice from "./CaseStudyNotice.jsx";
import VisitPlannCaseStudy from "./VisitPlannCaseStudy.jsx";
import BrancoPrataCaseStudy from "./BrancoPrataCaseStudy.jsx";
import KnightCaseStudy from "./KnightCaseStudy.jsx";
import AiSavingsCaseStudy from "./AiSavingsCaseStudy.jsx";
import {
  getAppPathname,
  isPlainClick,
  restoreRedirectPath,
  withBasePath,
} from "./pathUtils.js";

const caseStudyPages = {
  visitplann: VisitPlannCaseStudy,
  brancoprata: BrancoPrataCaseStudy,
  knight: KnightCaseStudy,
  "ai-savings": AiSavingsCaseStudy,
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

// /cv shows the CV overlay on top of a page. The page underneath comes from
// history state when the overlay was opened in-app, or Home on a direct visit.
function getInitialState() {
  const initial = getInitialPathname();
  if (initial === CV_ROUTE) {
    return { pathname: window.history.state?.cvFrom ?? "/", cvOpen: true };
  }
  return { pathname: initial, cvOpen: false };
}

function App() {
  const [initialState] = useState(getInitialState);
  // The app uses pathname switching instead of a dedicated router dependency.
  const [pathname, setPathname] = useState(initialState.pathname);
  const [cvOpen, setCvOpen] = useState(initialState.cvOpen);
  // The element that opened the CV, so focus can return to it on close.
  const cvOpenerRef = useRef(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const isCaseStudyRoute = pathname.startsWith("/case-studies");
  const caseStudySlug = isCaseStudyRoute
    ? pathname.replace("/case-studies/", "").split("/")[0]
    : "";
  const ActiveCaseStudyPage = caseStudyPages[caseStudySlug];

  // Hero entrance and scroll reveals for whichever page is showing.
  useEffect(() => setupPageMotion(document.getElementById("root")), [pathname]);

  useEffect(() => {
    // Sync UI when users navigate with browser back/forward buttons.
    const handlePopState = () => {
      const nextPath = getAppPathname();
      if (nextPath === CV_ROUTE) {
        setCvOpen(true);
        return;
      }
      setCvOpen(false);
      // Closing the CV with Back keeps the page (and scroll) underneath.
      if (nextPath !== pathnameRef.current) {
        setPathname(nextPath);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openCv = useCallback((event) => {
    // Cmd/Ctrl-click etc. opens /cv in a new tab instead.
    if (!isPlainClick(event)) return;
    event?.preventDefault?.();
    cvOpenerRef.current = event?.currentTarget ?? document.activeElement;
    window.history.pushState({ cvFrom: pathnameRef.current }, "", withBasePath(CV_ROUTE));
    setCvOpen(true);
  }, []);

  const closeCv = useCallback(() => {
    if (window.history.state?.cvFrom !== undefined) {
      // Opened in-app: step back so Back/Forward stay consistent.
      window.history.back();
    } else {
      // Direct visit to /cv: swap the URL for the page underneath.
      window.history.replaceState({}, "", withBasePath(pathnameRef.current));
      setCvOpen(false);
    }
  }, []);

  // Return focus to whatever opened the CV once it closes.
  const wasCvOpen = useRef(cvOpen);
  useEffect(() => {
    if (wasCvOpen.current && !cvOpen) {
      const opener = cvOpenerRef.current;
      if (opener && document.contains(opener)) {
        opener.focus();
      } else {
        // The opener can disappear (e.g. "Get CV" in the closed phone menu):
        // fall back to the menu button, then the logo.
        const fallback = [".nav-toggle", ".navbar-logo"]
          .map((selector) => document.querySelector(selector))
          .find((el) => el && el.offsetParent !== null);
        fallback?.focus();
      }
      cvOpenerRef.current = null;
    }
    wasCvOpen.current = cvOpen;
  }, [cvOpen]);

  const cvContext = useMemo(() => ({ openCv }), [openCv]);

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

  let page;
  if (isCaseStudyRoute) {
    page = ActiveCaseStudyPage ? (
      <ActiveCaseStudyPage navigate={navigate} />
    ) : (
      <CaseStudyNotice navigate={navigate} />
    );
  } else if (pathname === "/about") {
    page = <About navigate={navigate} />;
  } else if (pathname === "/home-mobile") {
    // Utility route used only when exporting a mobile frame to Figma.
    page = <CaptureHomeMobile />;
  } else {
    page = <Home navigate={navigate} />;
  }

  return (
    <CvContext.Provider value={cvContext}>
      {page}
      <CvOverlay open={cvOpen} onClose={closeCv} />
    </CvContext.Provider>
  );
}

export default App;
