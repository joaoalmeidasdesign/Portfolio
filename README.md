# Port

Personal portfolio website for Joao Silva, built with React and Vite.

The site is a small frontend-only app focused on presenting product design work through a custom landing page, case study cards, and an About page. It uses a lightweight custom router instead of `react-router` and includes a GSAP-powered interactive dot-grid background in the hero section.

## Stack

- React 19
- Vite 7
- ESLint 9
- GSAP

## Getting Started

Make sure you are inside the project folder first:

```bash
cd /Users/joaosilva/Documents/GitHub/Port
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

## Project Structure

```text
src/
  App.jsx                  App shell and minimal pathname-based routing
  main.jsx                 Browser entry point
  Home.jsx                 Homepage and portfolio sections
  About.jsx                About page
  Nav.jsx                  Shared navigation bar
  DotGrid.jsx              Interactive GSAP canvas background
  CaptureHomeMobile.jsx    Utility page for mobile-frame capture/export
  components/
    CaseStudyCard.jsx      Reusable case study card component
    System.jsx             Reusable process/design cards
  assets/                  Static images and supporting assets
```

## Routes

- `/` homepage
- `/about` about page
- `/home-mobile` utility view used to capture the homepage inside a fixed mobile frame

## Notes

- The app currently uses a small custom router in `src/App.jsx` instead of a routing library.
- Most portfolio content is hardcoded in component data arrays, which keeps the project simple and easy to edit.
- Visual assets now live locally in `src/assets/` and `public/`.

## Build Status

The project currently builds and lints successfully:

```bash
npm run build
npm run lint
```
