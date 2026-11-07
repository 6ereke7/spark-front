import { trustFacts } from "../../data/homeContent";
import "./TrustStrip.css";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Our learning principles">
      <div className="trust-strip__items">
        {trustFacts.map((fact) => (
          <p className="trust-strip__item" key={fact}>
            <span aria-hidden="true">+</span>{fact}
          </p>
        ))}
      </div>
    </section>
  );
}
