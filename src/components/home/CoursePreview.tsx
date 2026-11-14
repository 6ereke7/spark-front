import { Link } from "react-router-dom";
import type { Course } from "../../types/course";
import "./CoursePreview.css";

interface CoursePreviewProps {
  coursesToShow?: Course[];
  showAllLink?: boolean;
  message?: string;
}

export function CoursePreview({
  coursesToShow = [],
  showAllLink = true,
  message,
}: CoursePreviewProps) {
  return (
    <section
      className="course-preview"
      id="courses"
      aria-labelledby="courses-title"
    >
      <div className="course-preview__container">
        <div className="course-preview__heading">
          <div>
            <p className="course-preview__eyebrow">Start exploring</p>
            <h2 id="courses-title">A path for every curious mind.</h2>
            <p>Short, focused courses to help you build real understanding.</p>
          </div>
          {showAllLink && (
            <Link className="course-preview__all-link" to="/#courses">
              See all courses <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        {message ? (
          <p className="course-preview__message" role="status">
            {message}
          </p>
        ) : (
          <div className="course-grid">
            {coursesToShow.map((course) => (
              <article className="course-card" key={course.slug}>
                <div className="course-card__badges">
                  <span className="course-card__level">{course.level}</span>
                  {course.tag && (
                    <span className="course-card__tag">{course.tag}</span>
                  )}
                </div>
                <h3>{course.title}</h3>
                <p className="course-card__description">
                  {course.description}
                </p>
                {course.skills && (
                  <ul
                    className="course-card__skills"
                    aria-label="Skills covered"
                  >
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
                  <Link
                    className="course-card__link"
                    to={`/courses/${course.slug}`}
                  >
                    View course <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
