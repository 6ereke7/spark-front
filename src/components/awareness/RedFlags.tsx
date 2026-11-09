interface RedFlagItem {
  title: string;
  line: string;
}

interface RedFlagsProps {
  items: RedFlagItem[];
}

export function RedFlags({ items }: RedFlagsProps) {
  return (
    <section className="awareness-section" id="red-flags" aria-labelledby="red-flags-title">
      <div className="awareness-section__inner">
        <div className="awareness-section__heading">
          <p className="awareness-eyebrow">Scam signs</p>
          <h2 id="red-flags-title">How to spot a scam</h2>
        </div>

        <div className="awareness-redflags__grid">
          {items.map((item) => (
            <article className="awareness-redflag card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
