import axios from "axios";
import type { CourseContent, CourseLevel } from "../types/course";

export interface ApiCourseCard {
  slug: string;
  title: string;
  level: CourseLevel;
  duration: string;
  sessions: number;
  labs: number;
  tag: string | null;
  description: string;
  skills: string[];
  nextCohort: {
    startDate: string;
    label: string | null;
    priceEtb: number | null;
    seatsLeft: number;
  } | null;
}

export interface ApiCourseDetail {
  slug: string;
  title: string;
  level: CourseLevel;
  duration: string;
  sessions: number;
  labs: number;
  tag: string | null;
  description: string;
  skills: string[];
  content: CourseContent;
}

export interface Cohort {
  courseSlug: string;
  startDate: string;
  totalSeats: number;
  seatsLeft: number;
  priceEtb: number | null;
  schedule: string | null;
  label: string | null;
}

export interface EnrollmentResponse {
  id: number;
  status: "pending";
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

if (import.meta.env.DEV && !apiBaseUrl) {
  throw new Error("VITE_API_URL must be set in the frontend environment.");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
});

function toApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return new ApiError(0, "The request could not be completed.");
  }

  let message = "The request could not be completed.";
  const body: unknown = error.response?.data;

  if (typeof body === "object" && body !== null) {
    if ("message" in body && typeof body.message === "string") {
      message = body.message;
    } else if ("error" in body && typeof body.error === "string") {
      message = body.error;
    }
  }

  return new ApiError(error.response?.status ?? 0, message);
}

async function request<T>(operation: () => Promise<{ data: T }>): Promise<T> {
  try {
    return (await operation()).data;
  } catch (error) {
    throw toApiError(error);
  }
}

export function getCohort(slug: string, signal?: AbortSignal): Promise<Cohort> {
  return request(() =>
    api.get<Cohort>(`/api/cohorts/${encodeURIComponent(slug)}`, { signal }),
  );
}

export function submitEnrollment(
  formData: FormData,
): Promise<EnrollmentResponse> {
  return request(() => api.post<EnrollmentResponse>("/api/enroll", formData));
}

export function getCourses(signal?: AbortSignal): Promise<ApiCourseCard[]> {
  return request(() => api.get<ApiCourseCard[]>("/api/courses", { signal }));
}

export function getCourse(
  slug: string,
  signal?: AbortSignal,
): Promise<ApiCourseDetail> {
  return request(() =>
    api.get<ApiCourseDetail>(`/api/courses/${encodeURIComponent(slug)}`, {
      signal,
    }),
  );
}
