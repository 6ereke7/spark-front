import { Link } from "react-router-dom";
import type { CohortStatus } from "../../hooks/useCohort";
import type { CourseWithDetail } from "../../types/course";
import "./CourseHeader.css";

interface CourseHeaderProps {
  course: CourseWithDetail;
  cohortStatus: CohortStatus;
}

export function CourseHeader({
  course,
  cohortStatus,
}: CourseHeaderProps) {
  const cohortLoading = cohortStatus === "loading";
  const cohortUnavailable = cohortStatus === "error";
  const noCohort = cohortStatus === "none";
  return (
    <header className="course-detail-header">
      <nav className="course-detail-header__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/#courses">Courses</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{course.title}</span>
      </nav>
      <div className="course-detail-header__badges">
        <span className="course-card__level">{course.level}</span>
        {course.tag && <span className="course-card__tag">{course.tag}</span>}
      </div>
      <h1>{course.title}</h1>
      <p className="course-detail-header__description">{course.description}</p>
      <ul className="course-detail-header__meta" aria-label="Course details">
        <li>{course.duration}</li>
        <li>{course.sessions} sessions</li>
        <li>{course.labs} labs</li>
      </ul>
      <p className="course-detail-header__cohort">
        <span>
          Next cohort:{" "}
          {cohortLoading
            ? "Loading..."
            : cohortUnavailable
              ? "Unavailable"
              : noCohort
                ? "Not scheduled"
                : course.startDate}
        </span>
        <span>
          {cohortLoading
            ? "Checking availability..."
            : cohortUnavailable
              ? "Enrollment unavailable"
              : noCohort
                ? "Registration closed"
                : `${course.seatsLeft} seats left`}
        </span>
      </p>
    </header>
  );
}
