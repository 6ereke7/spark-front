import { useSearchParams } from "react-router-dom";
import { EnrollForm } from "../components/enroll/EnrollForm";
import { EnrollSteps } from "../components/enroll/EnrollSteps";
import { PaymentInfo } from "../components/enroll/PaymentInfo";
import { useCourses } from "../hooks/useCourses";
import "./Enroll.css";

export function Enroll() {
  const [searchParams] = useSearchParams();
  const courseSlug = searchParams.get("course");
  const { data: courses } = useCourses();
  const initialCourse = courses.find((course) => course.slug === courseSlug);

  return (
    <main className="enroll-page">
      <header className="enroll-page__heading">
        <p className="enroll-page__eyebrow">Join a cohort</p>
        <h1>Enroll in a course</h1>
        <p>Reserve your place by completing payment and sending us your receipt.</p>
      </header>
      <div className="enroll-page__layout">
        <div className="enroll-page__instructions">
          <EnrollSteps />
          <PaymentInfo />
        </div>
        <EnrollForm
          key={`${courseSlug ?? "no-course"}:${initialCourse?.slug ?? ""}`}
          initialCourseSlug={initialCourse?.slug ?? ""}
          courses={courses}
        />
      </div>
    </main>
  );
}
