import { Link } from "react-router-dom";
import type { CohortStatus } from "../../hooks/useCohort";
import type { CourseWithDetail } from "../../types/course";
import "./CourseEnrollmentCard.css";

interface CourseEnrollmentCardProps {
  course: CourseWithDetail;
  cohortStatus: CohortStatus;
}

export function CourseEnrollmentCard({
  course,
  cohortStatus,
}: CourseEnrollmentCardProps) {
  const cohortReady = cohortStatus === "ready";
  const cohortLoading = cohortStatus === "loading";
  const cohortUnavailable = cohortStatus === "error";
  const noCohort = cohortStatus === "none";
  const isFull = cohortReady && course.seatsLeft === 0;

  return (
    <aside className="course-enrollment" aria-label="Enroll in this cohort">
      <p className="course-enrollment__label">Cohort enrollment</p>
      <p className="course-enrollment__price">
        {cohortReady && typeof course.priceEtb === "number"
          ? `ETB ${course.priceEtb.toLocaleString("en-US")}`
          : "Price unavailable"}
      </p>
      <dl className="course-enrollment__details">
        <div>
          <dt>Starts</dt>
          <dd>
            {cohortReady
              ? course.startDate
              : cohortLoading
                ? "Loading..."
                : "Unavailable"}
          </dd>
        </div>
        <div>
          <dt>Seats left</dt>
          <dd>
            {cohortReady
              ? `${course.seatsLeft} of ${course.totalSeats}`
              : cohortLoading
                ? "Loading..."
                : "Unavailable"}
          </dd>
        </div>
      </dl>
      {cohortLoading ? (
        <button className="course-enrollment__button" type="button" disabled>
          Checking availability...
        </button>
      ) : cohortUnavailable ? (
        <button className="course-enrollment__button" type="button" disabled>
          Enrollment unavailable
        </button>
      ) : noCohort ? (
        <button className="course-enrollment__button" type="button" disabled>
          Registration closed
        </button>
      ) : isFull ? (
        <button className="course-enrollment__button" type="button" disabled>
          Cohort full
        </button>
      ) : (
        <Link
          className="hero-action-button course-enrollment__button"
          to={`/enroll?course=${course.slug}`}
        >
          Enroll now
        </Link>
      )}
    </aside>
  );
}
