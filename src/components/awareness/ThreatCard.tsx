import type { Threat } from "../../types/awareness";

interface ThreatCardProps {
  threat: Threat;
}

export function ThreatCard({ threat }: ThreatCardProps) {
  return (
    <article className="awareness-threat card" aria-labelledby={`${threat.slug}-title`}>
      <h3 id={`${threat.slug}-title`}>{threat.title}</h3>
      <p className="awareness-threat__summary">{threat.summary}</p>
      <blockquote className="awareness-threat__example">“{threat.example}”</blockquote>

      <div className="awareness-threat__group">
        <h4>Red flags</h4>
        <ul>
          {threat.redFlags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </div>

      <div className="awareness-threat__group">
        <h4>What to do</h4>
        <ul>
          {threat.whatToDo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
