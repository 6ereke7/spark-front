import type { Threat } from "../../types/awareness";
import { ThreatCard } from "./ThreatCard";

interface ThreatListProps {
  threats: Threat[];
}

export function ThreatList({ threats }: ThreatListProps) {
  return (
    <section className="awareness-section" id="threats" aria-labelledby="threats-title">
      <div className="awareness-section__inner">
        <div className="awareness-section__heading">
          <p className="awareness-eyebrow">Most common risks</p>
          <h2 id="threats-title">Top threats to watch for</h2>
        </div>

        <div className="awareness-threats__grid">
          {threats.map((threat) => (
            <ThreatCard key={threat.slug} threat={threat} />
          ))}
        </div>
      </div>
    </section>
  );
}
