import { useEffect } from "react";
import "./CaptureHomeMobile.css";

function CaptureHomeMobile() {
  useEffect(() => {
    // Makes the browser tab easy to identify while exporting to Figma.
    document.title = "home-mobile";

    return () => {
      document.title = "Hi! I'm João!";
    };
  }, []);

  return (
    // Utility page used only to capture the home page inside a fixed mobile frame.
    <main className="capture-mobile-page">
      <div className="capture-mobile-frame">
        <iframe
          className="capture-mobile-iframe"
          title="home-mobile"
          src="/"
        />
      </div>
    </main>
  );
}

export default CaptureHomeMobile;
