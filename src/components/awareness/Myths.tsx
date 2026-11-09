interface MythFact {
  myth: string;
  fact: string;
}

interface MythsProps {
  items: MythFact[];
}

export function Myths({ items }: MythsProps) {
  return (
    <section className="awareness-section" id="myths" aria-labelledby="myths-title">
      <div className="awareness-section__inner">
        <div className="awareness-section__heading">
          <p className="awareness-eyebrow">Straight answers</p>
          <h2 id="myths-title">Myth vs fact</h2>
        </div>

        <div className="awareness-myths__list">
          {items.map((item) => (
            <details className="awareness-myth" key={item.myth}>
              <summary>{item.myth}</summary>
              <p>{item.fact}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
