import Nav from "./Nav.jsx";
import "./CaseStudyNotice.css";

function CaseStudyNotice({ navigate }) {
  return (
    <>
      <Nav currentPath="/" navigate={navigate} />
      <main className="case-study-notice">
        <section className="case-study-notice__card">
          <p className="case-study-notice__eyebrow">Case studies</p>
          <h1 className="case-study-notice__title">
            All case studies will be available until April 3rd
          </h1>
          <p className="case-study-notice__copy">
            The full project breakdowns are being prepared for private review.
          </p>
          <a
            className="case-study-notice__button"
            href="/#work"
            onClick={(event) => {
              if (!navigate) return;
              event.preventDefault();
              navigate("/", { hash: "work", behavior: "smooth" });
            }}
          >
            Back to work
          </a>
        </section>
      </main>
    </>
  );
}

export default CaseStudyNotice;
