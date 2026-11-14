import { AwarenessTeaser } from "../components/home/AwarenessTeaser";
import { CoursePreview } from "../components/home/CoursePreview";
import { EthicsNote } from "../components/home/EthicsNote";
import { Faq } from "../components/home/Faq";
import { Features } from "../components/home/Features";
import { FinalCta } from "../components/home/FinalCta";
import { Hero } from "../components/home/Hero";
import { HowItWorks } from "../components/home/HowItWorks";
import { TrustStrip } from "../components/home/TrustStrip";
import { useCourses } from "../hooks/useCourses";

export function Home() {
  const { data: courses, status } = useCourses();
  const coursesMessage =
    status === "loading"
      ? "Loading courses..."
      : status === "error" || status === "notfound"
        ? "Courses are temporarily unavailable. Please try again later."
        : undefined;

  return (
    <main>
      <Hero />
      <TrustStrip />
      <Features />
      <CoursePreview
        coursesToShow={courses.slice(0, 3)}
        message={coursesMessage}
      />
      <HowItWorks />
      <AwarenessTeaser />
      <EthicsNote />
      <Faq />
      <FinalCta />
    </main>
  );
}
