import { Link } from "react-router-dom";
import type { Course } from "../../types/course";
import "./CourseCard.css";
interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="course-card" aria-label={course.title}>
      <div className="course-card__badges">
        <span className="course-card__level">{course.level}</span>
        {course.tag && <span className="course-card__tag">{course.tag}</span>}
      </div>

      <h3>{course.title}</h3>
      <p className="course-card__description">{course.description}</p>

      {course.skills && (
        <ul className="course-card__skills" aria-label="Skills covered">
          {course.skills.slice(0, 4).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      )}

      <ul className="course-card__meta" aria-label="Course details">
        <li>{course.duration}</li>
        <li>{course.sessions} sessions</li>
        <li>{course.labs} labs</li>
      </ul>

      <div className="course-card__footer">
        <span className="course-card__price">{course.price}</span>
        <Link className="course-card__link" to={`/courses/${course.slug}`}>
          View course <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
