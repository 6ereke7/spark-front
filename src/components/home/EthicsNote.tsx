import "./EthicsNote.css";

export function EthicsNote() {
  return (
    <section className="ethics-note" aria-label="Responsible learning">
      <span className="ethics-note__icon" aria-hidden="true">!</span>
      <p>
        Learn to secure, not to harm. All techniques must be used legally and only
        on systems you own or have explicit authorization to test.
      </p>
    </section>
  );
}
