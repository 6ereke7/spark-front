import { Link } from "react-router-dom";
import "./FinalCta.css";

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__inner">
        <div>
          <p className="final-cta__eyebrow">Your journey starts here</p>
          <h2 id="final-cta-title">Curiosity can make a difference.</h2>
          <p>Take the first step toward understanding how to keep systems safer.</p>
        </div>
        <Link className="final-cta__link" to="/enroll">
          Enroll today <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
