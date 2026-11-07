import { features } from "../../data/features";
import "./Features.css";

export function Features() {
  return (
    <section className="features-section" aria-labelledby="features-title">
      <div className="features-section__heading">
        <p className="features-section__eyebrow">A better way to learn</p>
        <h2 id="features-title">Security skills, built with purpose.</h2>
        <p>Get practical knowledge with responsibility built into every step.</p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.number}>
            <span className="feature-card__number">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
