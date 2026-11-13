import { CoursePreview } from "../home/CoursePreview";
import { useCourses } from "../../hooks/useCourses";
import "./RelatedCourses.css";

interface RelatedCoursesProps {
  currentSlug: string;
}

export function RelatedCourses({ currentSlug }: RelatedCoursesProps) {
  const { data: courses } = useCourses();
  const relatedCourses = courses.filter(
    (course) => course.slug !== currentSlug,
  );

  return (
    <section className="course-related" aria-label="Related courses">
      <CoursePreview coursesToShow={relatedCourses} showAllLink={false} />
    </section>
  );
}
