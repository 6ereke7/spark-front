import { learningSteps } from "../../data/homeContent";
import "./HowItWorks.css";

export function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="steps-title">
      <div className="how-it-works__container">
        <div className="how-it-works__heading">
          <p className="how-it-works__eyebrow">Your next steps</p>
          <h2 id="steps-title">Learn at your own pace.</h2>
          <p>A simple, guided route from first principles to confident practice.</p>
        </div>
        <ol className="steps-grid">
          {learningSteps.map((step) => (
            <li className="step-card" key={step.number}>
              <span className="step-card__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
