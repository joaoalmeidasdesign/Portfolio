# Portfolio — project notes

Living reference for future updates to joaosilva.design. Read this before
changing anything. Last updated: 2026-11-20.

## Ground rules

- **Pushing deploys the live site.** Every push to `main` runs
  `.github/workflows/deploy.yml` (build → GitHub Pages). Commit freely; push only
  when João asks.
- Work inside the existing stack: React 19 + Vite 7, plain CSS, no router
  library, no UI library, no Tailwind. GSAP is used only by the dot grid.
- **Tokens only.** Components use `--color-*`, `--space-*`, `--radius-*` and the
  other variables in `src/tokens.css`. No raw hex or px in component CSS (media
  queries are the exception). If Figma needs a value off the scale, add a named
  token to the "Component metrics" block in `tokens.css`.
- **Copy is verbatim from Figma** (case studies, cards, About, CV). Don't
  rewrite, shorten or "fix tone".
- Run `npx eslint src && npm run build` before every commit.
- `node_modules/` and `dist/` are gitignored and untracked. Keep it that way.

## Figma

- File: `UUzMZLM6w7KYshZlwVGhV1` (Porfolio). Only the **"Current site"** section
  is in scope; ignore "Earlier drafts", "Reference" and "Archive".

| Frame | Node |
| --- | --- |
| Home | 389:462 |
| About | 688:338 |
| Case study — Knight Training (major) | 588:66 |
| Case study — Visitplann (major) | 613:133 |
| Case study — AI Savings Assistant (small) | 589:109 |
| Components section | 616:131 |
| CV overlay — desktop over Home | 734:351 |
| CV overlay — desktop full content | 734:457 |
| CV overlay — phone sheet | 734:560 |

Components inside 616:131: Button 705:307, Nav link 710:340, project cards
701:194 / 701:258 / 701:321, CS/Tag 588:59, CS/Stat 588:61.

Figma variable collection "Portfolio" → `src/tokens.css` (same names).

## Routes

Custom pathname switching in `src/App.jsx` (no router).

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/case-studies/knight` | Knight Training |
| `/case-studies/visitplann` | Visitplann |
| `/case-studies/ai-savings` | AI Savings Assistant |
| `/case-studies/brancoprata` | Branco Prata (old layout, **not linked**, kept on purpose) |
| `/cv` | CV overlay on top of a page (Home on direct visit) |
| `/home-mobile` | Utility route for Figma capture only |

Deep links on GitHub Pages go through `public/404.html` → `/?redirect=…` →
`restoreRedirectPath()` in `src/pathUtils.js`. Vite builds with `base: './'`;
always build URLs with `withBasePath()`.

## File map

```
src/
  tokens.css            design tokens (Figma vars + derived fills + metrics + type scale)
  index.css             globals, focus ring, .section-title, .visually-hidden
  motion.js / motion.css  hero entrance + scroll reveals (see Motion)
  siteLinks.js          LinkedIn, contact email, CV route/PDF, AI Savings prototype URL
  pathUtils.js          withBasePath, getAppPathname, isPlainClick
  App.jsx               routing, CV state (/cv), popstate, motion setup
  Nav.jsx/.css          nav + phone menu (collapses < 768px)
  Footer.jsx/.css       contact band + footer, shared by every page
  Home.jsx/.css         hero (dot grid), process cards, Selected work
  About.jsx/.css
  KnightCaseStudy.jsx, VisitPlannCaseStudy.jsx, AiSavingsCaseStudy.jsx
  components/
    Button, Tag (+TagList), Stat, SectionHeader, ProjectCard, Primitives.css
    caseStudy/CaseStudyParts.jsx  the case study template blocks
    caseStudy/LoopDiagram.jsx     Knight loop, inline SVG
    caseStudy/CaseStudy.css
    System.jsx          process card (Home)
  cv/CvOverlay.jsx/.css, cv/CvContext.js
  data/cv.json          CV content (must match the PDF)
  caseStudies/projectCards.js   Home card data
  assets/<page>/        images exported from Figma
public/
  joao-silva-cv.pdf     the CV PDF (keep this exact file name)
  404.html, jsdesign.svg
```

## Shared components (current state)

- **Button** (`components/Button.jsx`): `variant` primary | secondary, `size`
  large | small. Renders `<a>` with `href`, `<button>` otherwise, or a decorative
  `<span aria-hidden>` with `as="span"`. Frosted `backdrop-filter: blur(12px)`,
  1px accent border, 8px radius. Primary = accent 70% → 100% on hover; Secondary
  = transparent → accent 16% on hover. 150ms ease-out, `scale(0.98)` on active.
  Min height 44px. `external` adds `target=_blank rel=noreferrer`; extra props
  (e.g. `download`, `onClick`) pass through.
- **Nav link** (`Nav.jsx` NavLink): white (or accent for "Get CV"); hover/focus/
  current = accent (accent-light for Get CV) + 2px underline growing left → right.
  Current state comes from `aria-current`: About uses `"page"`; **Work is only
  active (`"location"`) while `#work` is on screen on Home** (IntersectionObserver,
  middle 10% band). Nav padding/gap follow each frame: Home 50px / 16px, other
  pages 80px / 32px (`.navbar--home`). Logo is `src/assets/logo.svg` (the "JS"
  mark cropped from `public/jsdesign.svg`, 75px tall).
- **Tag** (`components/Tag.jsx`): `status` built (purple) | proposed (gold).
  Purple = built / live / shipped. Gold = proposed / in progress / in testing /
  scope under review / open. Keep tag wording exactly as in Figma.
- **Stat** (`components/Stat.jsx`): `variant` tile | inline; `size="sm"` (40px
  number) for long values like "10→300km", "iOS + Android". Plain integers count
  up from 0 in view (800ms); anything else stays static.
- **ProjectCard**: whole card is one `<a>`; "Read case study →" is a decorative
  span (no nested interactive elements). Hover: inset 2px accent border (overlay,
  height never changes), lift 4px, cover scales 1.03, button fades/slides in after
  60ms. Touch devices: button always visible, no lift.
- **SectionHeader**: optional eyebrow + uppercase Poppins Black title.
- **Footer** = contact band ("Open to Product Designer roles" + Contact / Get CV,
  buttons centred on the title row) + footer row (LinkedIn, Email, Get CV).
  `#contact` is on every page; the nav "Contact" link scrolls to it.

## Case study template (`components/caseStudy/CaseStudyParts.jsx`)

Blocks: `CaseStudyHero` (variant `major`/`bottom`), `StatRow`,
`CaseStudyOverview` (3 role cards + "The problem"), `CaseStudySection`
(numbered eyebrow + title + intro, `tone` bg|surface, `tight` = 56px gaps),
`TextBlock` (grey bold heading over light body; `soft`), `BulletList`,
`Columns` (2/3, stack < 768px), `BoxedText` (accent left rule), `PhonePanel`
(phone screens on surface-raised panel, each image carries its Figma width/height,
scrolls horizontally when it doesn't fit), `FlatImage` (`box` = Figma frame
size, `fit` cover|contain), `StepRow`, `FeedbackTable` (real `<table>`),
`CaseStudyConclusion`, `NextCaseStudy` (`tone`).

- Major layout: Knight, Visitplann. Small layout: AI Savings (`.cs-page--small`,
  96px bands, 56px titles) built from the same parts plus a few local classes.
- Section backgrounds alternate bg / surface following each Figma frame.
- Contact band + footer follow the "Next case study" block on every case study
  (the Figma frames omit the band; the brief asked for it).
- Hero title is 128px max (matches Figma at 1440), not the 150–176px in the
  original brief.
- Knight loop diagram: inline SVG, positions from Figma node 588:138 (updated
  2026-11-19: Plan label lower, Practice/Adjust labels above their circles,
  solid triangle arrowheads). Step 5 uses `--color-accent-light`.
- The Knight Section 2 tester quote card is **intentionally omitted** until João
  provides a real quote.

## CV overlay

- Opened by every "Get CV" (nav, phone menu, contact band, footer) via
  `useCv().openCv` from `cv/CvContext.js`. Opening pushes `/cv`; direct `/cv`
  opens over Home; Back / Esc / close button / scrim close it; focus returns to
  the trigger (falls back to the menu button, then the logo).
- `role="dialog"`, `aria-modal`, labelled by "CV — João Silva"; focus trap;
  `#root` is `inert` and the body doesn't scroll while open.
- Content renders from `src/data/cv.json`. Keep its `_note` field and don't
  render it. **Update `cv.json` and `public/joao-silva-cv.pdf` together**; keep the
  PDF file name so `/joao-silva-cv.pdf` never changes. Download name:
  `Joao-Silva-Product-Designer-CV.pdf`. Source files live in
  `~/Documents/Claude/Projects/CV`.
- Layout: desktop ≥ 1024 centred 960px modal; tablet full width − 48px with the
  sidebar stacked above; phone < 768 full-screen sheet, one column in Figma order,
  sticky bottom "Download PDF ↓", no "Open in new tab".
- Motion: desktop scrim 200ms + modal fade/scale 0.97→1 240ms, close 160ms;
  phone sheet slides 280ms. Nothing animates inside the document.

## Motion (`src/motion.js`, `src/motion.css`)

Opt-in via data attributes, only `transform`/`opacity` (plus the loop arrows'
`stroke-dashoffset`), all behind `.motion-ready`, which is only added when
`prefers-reduced-motion` is not `reduce`.

- `data-hero-item`: fade up 16px, 500ms, 60ms apart, once on load.
- `data-reveal`: fade up 24px, 600ms when 15% in view, once.
- `data-reveal-stagger`: children fade up 24px, 80ms apart.
- `data-loop`: Knight diagram circles pop (0.6 → 1, 80ms apart), then arrows draw.
- **Keep as they are (don't touch):** the Home dot-grid background (`DotGrid.jsx`,
  its colours included) and the Home process cards + arrows animation. They
  (and the pulsing availability dot) still animate under reduced motion. João
  confirmed that's fine.

## Responsive

Breakpoints ~1280, 1024, 768, 390. Two-column text stacks < 768. Home cards go
to one column < 1024 in the order Knight → Visitplann → AI Savings (no offset).
Four-card rows: 2 columns at tablet, 1 on phone. Stat rows with long values stack
on phones. Case study body copy drops to 16px on phones. All hit areas ≥ 44px
(the CV close button is 40px by design). No horizontal scroll at any width
(verified 1280 / 1024 / 768 / 390).

## Images

- Exported from Figma as **PNG at 2× display size** into `src/assets/<page>/`
  (João's choice). Don't use `sips` to make AVIF: Chrome can't decode its output.
- Every `<img>` has width/height (or aspect-ratio) to avoid layout shift,
  real alt text, and `loading="lazy"` below the fold.
- Known trade-off: images total ~19 MB, so Lighthouse performance is ~70
  (accessibility 100, CLS < 0.03). Converting to WebP would fix most of it.

## Links and data

- Contact email: `joaoalmeidas.design@gmail.com` (confirmed). LinkedIn:
  `https://www.linkedin.com/in/imjoaosilva/`. Both in `src/siteLinks.js`.
- AI Savings "Open prototype →" opens the Figma prototype URL in `siteLinks.js`
  in a new tab.
- In-app links only intercept plain left clicks (`isPlainClick`), so
  Cmd/Ctrl/middle-click still opens a new tab.

## Open items

- Knight Training tester quote (Section 2): waiting on João.
- Optional: convert images to WebP for performance.

## QA checklist for future changes

1. `npx eslint src && npm run build`
2. Compare the page with its Figma frame at 1440 (and 390 for phone layouts).
3. Keyboard: Tab through, visible focus ring everywhere, cards open on Enter.
4. Reduced motion on: nothing new moves; content fully visible.
5. No horizontal scroll at 1280 / 1024 / 768 / 390.
6. Commit with a clear message; push only when asked.
