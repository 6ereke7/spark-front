import { Link, useParams } from "react-router-dom";
import { CourseAudience } from "../components/course/CourseAudience";
import { CourseEnrollmentCard } from "../components/course/CourseEnrollmentCard";
import { CourseFormat } from "../components/course/CourseFormat";
import { CourseHeader } from "../components/course/CourseHeader";
import { CourseInstructors } from "../components/course/CourseInstructors";
import { CourseSyllabus } from "../components/course/CourseSyllabus";
import { LearningOutcomes } from "../components/course/LearningOutcomes";
import { RelatedCourses } from "../components/course/RelatedCourses";
import { EthicsNote } from "../components/home/EthicsNote";
import { Faq } from "../components/home/Faq";
import { getCourseDetail } from "../data/courseDetails";
import "./CourseDetail.css";

export function CourseDetail() {
  const { slug } = useParams();
  const course = slug ? getCourseDetail(slug) : undefined;

  if (!course) {
    return (
      <main className="course-not-found">
        <h1>Course not found</h1>
        <Link to="/#courses">Browse courses</Link>
      </main>
    );
  }

  return (
    <main className="course-detail">
      <CourseHeader course={course} />
      <div className="course-detail__layout">
        <div className="course-detail__sections">
          <LearningOutcomes outcomes={course.outcomes} />
          <CourseFormat course={course} />
          <CourseSyllabus weeks={course.weeks} />
          <CourseAudience
            audience={course.audience}
            requirements={course.requirements}
          />
          <CourseInstructors instructors={course.instructors} />
          <EthicsNote />
          <Faq items={course.faqs} />
        </div>
        <CourseEnrollmentCard course={course} />
        <RelatedCourses currentSlug={course.slug} />
      </div>
    </main>
  );
}
