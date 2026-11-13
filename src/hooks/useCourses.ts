import { useEffect, useState } from "react";
import { courses as fallbackCourses } from "../data/courses";
import { ApiError, getCourses } from "../lib/api";
import { mapApiCourseCard } from "../lib/courseData";
import type { Course } from "../types/course";

export type CoursesStatus = "loading" | "ready" | "notfound" | "error";

interface CoursesState {
  data: Course[];
  status: CoursesStatus;
}

export function useCourses(): CoursesState {
  const [state, setState] = useState<CoursesState>({
    data: fallbackCourses,
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    getCourses(controller.signal)
      .then((courses) => {
        if (active) {
          setState({
            data: courses.map((course) =>
              mapApiCourseCard(
                course,
                fallbackCourses.find((item) => item.slug === course.slug),
              ),
            ),
            status: "ready",
          });
        }
      })
      .catch((error: unknown) => {
        if (active && !controller.signal.aborted) {
          setState(
            error instanceof ApiError && error.status === 404
              ? { data: [], status: "notfound" }
              : { data: fallbackCourses, status: "error" },
          );
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return state;
}