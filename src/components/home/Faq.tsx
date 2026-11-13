import { faqs } from "../../data/faqs";
import type { Faq as FaqItem } from "../../types/faq";
import "./Faq.css";

interface FaqProps {
  items?: FaqItem[];
}

export function Faq({ items = faqs.map(({ question, answer }) => ({
  q: question,
  a: answer,
})) }: FaqProps) {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-section__container">
        <div className="faq-section__heading">
          <p className="faq-section__eyebrow">Good questions</p>
          <h2 id="faq-title">Frequently asked.</h2>
        </div>
        <div className="faq-list">
          {items.map((faq) => (
            <details className="faq-item" key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
