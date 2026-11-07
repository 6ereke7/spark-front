import { Link } from "react-router-dom";
import type { CourseWithDetail } from "../../data/courseDetails";
import "./CourseHeader.css";

interface CourseHeaderProps {
  course: CourseWithDetail;
}

export function CourseHeader({ course }: CourseHeaderProps) {
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
        <span>Next cohort: {course.startDate}</span>
        <span>
          {course.seatsLeft} seats left
        </span>
      </p>
    </header>
  );
}
