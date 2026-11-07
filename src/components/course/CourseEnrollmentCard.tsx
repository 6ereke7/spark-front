import { Link } from "react-router-dom";
import type { CourseWithDetail } from "../../data/courseDetails";
import "./CourseEnrollmentCard.css";

interface CourseEnrollmentCardProps {
  course: CourseWithDetail;
}

export function CourseEnrollmentCard({ course }: CourseEnrollmentCardProps) {
  const isFull = course.seatsLeft === 0;

  return (
    <aside className="course-enrollment" aria-label="Enroll in this cohort">
      <p className="course-enrollment__label">Cohort enrollment</p>
      <p className="course-enrollment__price">
        ETB {course.priceEtb.toLocaleString("en-US")}
      </p>
      <dl className="course-enrollment__details">
        <div>
          <dt>Starts</dt>
          <dd>{course.startDate}</dd>
        </div>
        <div>
          <dt>Seats left</dt>
          <dd>{course.seatsLeft} of {course.totalSeats}</dd>
        </div>
      </dl>
      {isFull ? (
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
