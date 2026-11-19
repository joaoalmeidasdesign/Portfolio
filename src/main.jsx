import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./motion.css";
import { initMotion } from "./motion.js";
import App from "./App.jsx";

// Main browser entry point for the portfolio.
initMotion();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
