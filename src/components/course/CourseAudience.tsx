import type { CourseWithDetail } from "../../data/courseDetails";
import "./CourseAudience.css";

interface CourseAudienceProps {
  audience: CourseWithDetail["audience"];
  requirements: CourseWithDetail["requirements"];
}

export function CourseAudience({
  audience,
  requirements,
}: CourseAudienceProps) {
  return (
    <section
      className="course-section course-audience"
      aria-label="Who it’s for and requirements"
    >
      <div>
        <h2 id="audience-title">Who it’s for</h2>
        <p className="course-audience__intro">Perfect if you...</p>
        <ul aria-labelledby="audience-title">
          {audience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 id="requirements-title">Requirements</h2>
        <ul aria-labelledby="requirements-title">
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
