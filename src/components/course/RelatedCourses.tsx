import { CoursePreview } from "../home/CoursePreview";
import { useCourses } from "../../hooks/useCourses";
import "./RelatedCourses.css";

interface RelatedCoursesProps {
  currentSlug: string;
}

export function RelatedCourses({ currentSlug }: RelatedCoursesProps) {
  const { data: courses, status } = useCourses();
  const relatedCourses = courses.filter(
    (course) => course.slug !== currentSlug,
  );
  const message =
    status === "loading"
      ? "Loading related courses..."
      : status === "error" || status === "notfound"
        ? "Related courses are temporarily unavailable."
        : undefined;

  if (status === "ready" && relatedCourses.length === 0) {
    return null;
  }

  return (
    <section className="course-related" aria-label="Related courses">
      <CoursePreview
        coursesToShow={relatedCourses}
        showAllLink={false}
        message={message}
      />
    </section>
  );
}
