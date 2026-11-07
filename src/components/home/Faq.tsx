import { faqs } from "../../data/faqs";
import "./Faq.css";

export function Faq() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-section__container">
        <div className="faq-section__heading">
          <p className="faq-section__eyebrow">Good questions</p>
          <h2 id="faq-title">Frequently asked.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
