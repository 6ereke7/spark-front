import type { CourseWithDetail } from "../../data/courseDetails";
import "./CourseInstructors.css";

interface CourseInstructorsProps {
  instructors: CourseWithDetail["instructors"];
}

export function CourseInstructors({
  instructors,
}: CourseInstructorsProps) {
  return (
    <section className="course-section" aria-labelledby="instructors-title">
      <h2 id="instructors-title">Instructors</h2>
      <div className="course-instructors">
        {instructors.map((instructor, index) => (
          <article className="course-instructor" key={`${instructor.role}-${index}`}>
            <div className="course-instructor__avatar" aria-hidden="true">
              {instructor.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <h3>{instructor.name}</h3>
              <p className="course-instructor__role">{instructor.role}</p>
              <p className="course-instructor__bio">{instructor.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
