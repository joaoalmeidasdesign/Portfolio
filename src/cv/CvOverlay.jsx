// CV overlay (Figma 734:351 desktop, 734:457 full content, 734:560 phone).
// Renders from src/data/cv.json, which must match the PDF word for word.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./CvOverlay.css";
import Button from "../components/Button.jsx";
import cv from "../data/cv.json";
import closeIcon from "../assets/icon-close.svg";
import { CV_DOWNLOAD_NAME, CV_PDF_HREF } from "../siteLinks.js";
import { prefersReducedMotion } from "../motion.js";

const TITLE_ID = "cv-dialog-title";
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function closeDuration() {
  if (prefersReducedMotion()) return 0;
  return window.matchMedia("(max-width: 767px)").matches ? 280 : 160;
}

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const websiteHref = (site) => (site.startsWith("http") ? site : `https://${site}`);
const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Label({ children }) {
  return <h3 className="cv-label">{children}</h3>;
}

function ListSection({ label, items, className }) {
  return (
    <section className={`cv-section cv-list ${className}`}>
      <Label>{label}</Label>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function CvDocument() {
  const { contact } = cv;
  return (
    <div className="cv-body">
      <div className="cv-sidebar">
        <section className="cv-section cv-list cv-contact">
          <Label>Contact</Label>
          <ul>
            <li>
              <a href={telHref(contact.phone)}>{contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>{contact.location}</li>
            <li>
              <a href={websiteHref(contact.website)} target="_blank" rel="noreferrer">
                {contact.website}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                {displayUrl(contact.linkedin)}
              </a>
            </li>
          </ul>
        </section>
        <ListSection label="Skills" items={cv.skills} className="cv-skills" />
        <ListSection label="Tools" items={cv.tools} className="cv-tools" />
        <ListSection label="Languages" items={cv.languages} className="cv-languages" />
        <section className="cv-section cv-education">
          <Label>Education</Label>
          {cv.education.map((item) => (
            <div className="cv-edu" key={item.degree}>
              <p className="cv-edu__degree">{item.degree}</p>
              <p className="cv-edu__meta">
                {item.school} · {item.dates}
              </p>
              <p className="cv-edu__note">{item.note}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="cv-main">
        <header className="cv-header">
          <h2 className="cv-name">{cv.name}</h2>
          <p className="cv-title">{cv.title}</p>
        </header>
        <section className="cv-section cv-summary">
          <Label>Summary</Label>
          <p>{cv.summary}</p>
        </section>
        <section className="cv-section cv-experience">
          <Label>Experience</Label>
          {cv.experience.map((job) => (
            <article className="cv-job" key={`${job.company}-${job.dates}`}>
              <div className="cv-role-row">
                <h4 className="cv-role">
                  {job.role} · {job.company}
                </h4>
                <p className="cv-dates">{job.dates}</p>
              </div>
              <p className="cv-meta">{job.location}</p>
              <ul className="cv-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <section className="cv-section cv-projects">
          <Label>Projects</Label>
          {cv.projects.map((project) => (
            <article className="cv-project" key={project.name}>
              <h4 className="cv-role">{project.name}</h4>
              <p className="cv-meta">{project.meta}</p>
              <p className="cv-project__desc">{project.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

/**
 * The dialog. `open` drives it; when it turns false the overlay plays its
 * exit animation, then unmounts. `onClose` is called by the close button,
 * Esc and scrim clicks.
 */
function CvOverlay({ open, onClose }) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);

  // Mount on open; on close, wait for the exit animation before unmounting.
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return undefined;
    }
    if (!mounted) return undefined;
    setClosing(true);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, closeDuration());
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  // While open: lock page scroll, make the page inert, move focus in.
  useEffect(() => {
    if (!open || !mounted) return undefined;
    const root = document.getElementById("root");
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previous = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    if (root) root.inert = true;
    dialogRef.current?.focus();

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      if (root) root.inert = false;
    };
  }, [open, mounted]);

  // Esc closes; Tab stays inside the dialog.
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="cv-overlay" data-state={closing ? "closing" : "open"}>
      <div className="cv-scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="cv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        ref={dialogRef}
        onKeyDown={handleKeyDown}
      >
        <div className="cv-toolbar">
          <h2 className="cv-toolbar__title" id={TITLE_ID}>
            CV — {cv.name}
          </h2>
          <Button
            href={CV_PDF_HREF}
            external
            size="small"
            variant="secondary"
            className="cv-toolbar__open"
          >
            Open in new tab
          </Button>
          <Button
            href={CV_PDF_HREF}
            download={CV_DOWNLOAD_NAME}
            size="small"
            variant="primary"
            className="cv-toolbar__download"
          >
            Download PDF ↓
          </Button>
          <button type="button" className="cv-close" aria-label="Close CV" onClick={onClose}>
            <img src={closeIcon} alt="" width="24" height="24" />
          </button>
        </div>

        <div className="cv-scroll">
          <CvDocument />
        </div>

        <div className="cv-bottombar">
          <Button
            href={CV_PDF_HREF}
            download={CV_DOWNLOAD_NAME}
            size="large"
            variant="primary"
            className="cv-bottombar__download"
          >
            Download PDF ↓
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CvOverlay;
