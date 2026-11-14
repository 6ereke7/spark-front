import type { ApiCourseCard, ApiCourseDetail } from "./api";
import type { Course, CourseWithDetail } from "../types/course";

export function mapApiCourseCard(course: ApiCourseCard): Course {
  const price = course.nextCohort
    ? course.nextCohort.priceEtb !== null
      ? `${course.nextCohort.priceEtb.toLocaleString("en-US")} ETB`
      : "Price unavailable"
    : "Registration closed";

  return {
    slug: course.slug,
    title: course.title,
    level: course.level,
    duration: course.duration,
    sessions: course.sessions,
    labs: course.labs,
    price,
    ...(course.tag ? { tag: course.tag } : {}),
    description: course.description,
    skills: course.skills,
  };
}

export function mapApiCourseDetail(course: ApiCourseDetail): CourseWithDetail {
  return {
    slug: course.slug,
    title: course.title,
    level: course.level,
    duration: course.duration,
    sessions: course.sessions,
    labs: course.labs,
    price: "Registration closed",
    ...(course.tag ? { tag: course.tag } : {}),
    description: course.description,
    skills: course.skills,
    ...(course.platform !== null ? { platform: course.platform } : {}),
    ...(course.language !== null ? { language: course.language } : {}),
    ...(course.cohortsPerYear !== null
      ? { cohortsPerYear: course.cohortsPerYear }
      : {}),
    outcomes: course.content.outcomes,
    weeks: course.content.weeks,
    requirements: course.content.requirements,
    audience: course.content.audience,
    instructors: course.content.instructors,
    startDate: "",
    totalSeats: 0,
    seatsLeft: 0,
    schedule: "",
  };
}