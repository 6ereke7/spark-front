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
import { courseFaqs } from "../data/courseFaqs";
import { useCourse } from "../hooks/useCourse";
import { useCohort } from "../hooks/useCohort";
import "./CourseDetail.css";

export function CourseDetail() {
  const { slug } = useParams();
  const { data: course, status: courseStatus } = useCourse(slug ?? "");
  const { cohort, status: cohortStatus } = useCohort(course?.slug ?? "");
  const cohortFallback = slug ? getCourseDetail(slug) : undefined;
  const displayCourse = course
    ? {
        ...course,
        startDate:
          cohortStatus === "ready" && cohort
            ? cohort.startDate
            : (cohortFallback?.startDate ?? course.startDate),
        totalSeats:
          cohortStatus === "ready" && cohort
            ? cohort.totalSeats
            : (cohortFallback?.totalSeats ?? course.totalSeats),
        seatsLeft:
          cohortStatus === "ready" && cohort
            ? cohort.seatsLeft
            : (cohortFallback?.seatsLeft ?? course.seatsLeft),
        priceEtb:
          cohortStatus === "ready" && cohort
            ? (cohort.priceEtb ?? cohortFallback?.priceEtb ?? course.priceEtb)
            : (cohortFallback?.priceEtb ?? course.priceEtb),
        schedule:
          cohortStatus === "ready" && cohort
            ? (cohort.schedule ?? cohortFallback?.schedule ?? course.schedule)
            : (cohortFallback?.schedule ?? course.schedule),
      }
    : null;
  const registrationClosed = Boolean(course && cohortStatus === "none");

  if (!displayCourse && courseStatus === "loading") {
    return (
      <main className="course-not-found">
        <h1>Loading course...</h1>
      </main>
    );
  }

  if (!displayCourse) {
    return (
      <main className="course-not-found">
        <h1>Course not found</h1>
        <Link to="/#courses">Browse courses</Link>
      </main>
    );
  }

  return (
    <main className="course-detail">
      <CourseHeader
        course={displayCourse}
        registrationClosed={registrationClosed}
      />
      <div className="course-detail__layout">
        <div className="course-detail__sections">
          <LearningOutcomes outcomes={displayCourse.outcomes} />
          <CourseFormat course={displayCourse} />
          <CourseSyllabus weeks={displayCourse.weeks} />
          <CourseAudience
            audience={displayCourse.audience}
            requirements={displayCourse.requirements}
          />
          <CourseInstructors instructors={displayCourse.instructors} />
          <EthicsNote />
          <Faq items={courseFaqs} />
        </div>
        <CourseEnrollmentCard
          course={displayCourse}
          registrationClosed={registrationClosed}
        />
        <RelatedCourses currentSlug={displayCourse.slug} />
      </div>
    </main>
  );
}
