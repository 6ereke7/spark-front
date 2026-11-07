import { Link } from "react-router-dom";
import "./AwarenessTeaser.css";

export function AwarenessTeaser() {
  return (
    <section className="awareness-section" aria-labelledby="awareness-title">
      <div className="awareness-card">
        <div>
          <p className="awareness-card__eyebrow">Knowledge is your first defense</p>
          <h2 id="awareness-title">A safer digital world starts with awareness.</h2>
          <p>Explore practical guidance for spotting risks and protecting yourself online.</p>
        </div>
        <Link className="awareness-card__link" to="/awareness">
          Visit awareness center <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
