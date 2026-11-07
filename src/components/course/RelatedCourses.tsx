import { CoursePreview } from "../home/CoursePreview";
import { courses } from "../../data/courses";
import type { Course } from "../../types/course";
import "./RelatedCourses.css";

interface RelatedCoursesProps {
  currentSlug: string;
}

export function RelatedCourses({ currentSlug }: RelatedCoursesProps) {
  const relatedCourses: Course[] = courses.filter(
    (course) => course.slug !== currentSlug,
  );

  return (
    <section className="course-related" aria-label="Related courses">
      <CoursePreview coursesToShow={relatedCourses} showAllLink={false} />
    </section>
  );
}
