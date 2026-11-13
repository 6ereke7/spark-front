import axios from "axios";

export interface AdminCohortSummary {
  id: number;
  courseSlug: string;
  startDate: string;
  totalSeats: number;
  verified: number;
  seatsLeft: number;
}

export interface AdminCohort {
  id: number;
  courseSlug: string;
  label: string | null;
  startDate: string;
  totalSeats: number;
  priceEtb: number | null;
  schedule: string | null;
  isOpen: boolean;
  counts: {
    pending: number;
    verified: number;
    rejected: number;
  };
  seatsLeft: number;
}

export interface AdminCohortInput {
  courseSlug: string;
  label?: string;
  startDate: string;
  totalSeats: number;
  priceEtb: number;
  schedule: string;
  isOpen?: boolean;
}

export interface AdminCohortUpdate {
  courseSlug?: string;
  label?: string | null;
  startDate?: string;
  totalSeats?: number;
  priceEtb?: number | null;
  schedule?: string | null;
  isOpen?: boolean;
}

export interface ManualEnrollmentInput {
  cohortId: number;
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  status: "pending" | "verified";
  adminNote?: string;
}

export interface AdminSummary {
  pending: number;
  verified: number;
  rejected: number;
  cohorts: AdminCohortSummary[];
}

export type EnrollmentStatus = "pending" | "verified" | "rejected";
export type AdminCourseStatus = "draft" | "published" | "archived";
export type AdminCourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface AdminCourseContent {
  outcomes: string[];
  weeks: Array<{ title: string; topics: string[] }>;
  requirements: string[];
  audience: string[];
  instructors: Array<{ name: string; role: string; bio: string }>;
}

export interface AdminCourseListItem {
  slug: string;
  title: string;
  level: AdminCourseLevel;
  status: AdminCourseStatus;
  sortOrder: number;
  updatedAt: string;
  cohortCount: number;
  enrollmentCount: number;
}

export interface AdminCourse extends Omit<AdminCourseListItem, "cohortCount" | "enrollmentCount"> {
  duration: string;
  sessions: number;
  labs: number;
  tag: string | null;
  description: string;
  skills: string[];
  content: AdminCourseContent;
  createdAt: string;
}

export interface AdminCourseInput {
  slug: string;
  status?: AdminCourseStatus;
  sortOrder: number;
  title: string;
  level: AdminCourseLevel;
  duration: string;
  sessions: number;
  labs: number;
  tag?: string;
  description: string;
  skills: string[];
  content: AdminCourseContent;
}

export type AdminCourseUpdate = Omit<
  Partial<Omit<AdminCourseInput, "slug">>,
  "tag"
> & { tag?: string | null };

export interface AdminValidationIssue {
  path: string;
  message: string;
}

export class AdminApiError extends Error {
  readonly status: number;
  readonly issues: AdminValidationIssue[];

  constructor(
    status: number,
    message: string,
    issues: AdminValidationIssue[] = [],
  ) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.issues = issues;
  }
}

export interface AdminEnrollment {
  id: number;
  cohortId: number;
  courseSlug: string;
  startDate: string;
  totalSeats: number;
  isOpen: boolean;
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  receiptType: "upload" | "link" | "manual";
  receiptRef: string | null;
  status: EnrollmentStatus;
  createdAt: string;
  rejectionReason: string | null;
  adminNote: string | null;
  telegramInvited: boolean;
  reviewedAt: string | null;
  possibleDuplicate: boolean;
  createdByAdmin: boolean;
}

export interface EnrollmentFilters {
  status?: EnrollmentStatus;
  courseSlug?: string;
  cohortId?: number;
  q?: string;
  page?: number;
}

export interface EnrollmentPage {
  items: AdminEnrollment[];
  total: number;
  page: number;
  pageCount: number;
}

export interface EnrollmentUpdate {
  status?: EnrollmentStatus;
  rejectionReason?: string | null;
  adminNote?: string | null;
  telegramInvited?: boolean;
}

export interface BulkVerifyResult {
  verified: number[];
  skipped: Array<{ id: number; reason: string }>;
}

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "X-Requested-With": "admin" },
});

adminApi.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? "";
      if (!url.includes("/api/admin/login") && !url.includes("/api/admin/me")) {
        window.location.assign("/admin/login");
      }
    }
    return Promise.reject(error);
  },
);

function normalizedError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const body: unknown = error.response?.data;
    if (typeof body === "object" && body !== null) {
      const message =
        "message" in body && typeof body.message === "string"
          ? body.message
          : "The admin request failed. Please try again.";
      const issues =
        "issues" in body && Array.isArray(body.issues)
          ? body.issues.filter(
              (issue): issue is AdminValidationIssue =>
                typeof issue === "object" &&
                issue !== null &&
                "path" in issue &&
                typeof issue.path === "string" &&
                "message" in issue &&
                typeof issue.message === "string",
            )
          : [];
      return new AdminApiError(error.response?.status ?? 0, message, issues);
    }
    return new AdminApiError(
      error.response?.status ?? 0,
      "The admin request failed. Please try again.",
    );
  }
  return new AdminApiError(0, "The admin request failed. Please try again.");
}

async function request<T>(operation: () => Promise<{ data: T }>): Promise<T> {
  try {
    return (await operation()).data;
  } catch (error) {
    throw normalizedError(error);
  }
}

export function login(password: string): Promise<{ ok: true }> {
  return request(() =>
    adminApi.post<{ ok: true }>("/api/admin/login", { password }),
  );
}

export function logout(): Promise<{ ok: true }> {
  return request(() => adminApi.post<{ ok: true }>("/api/admin/logout"));
}

export function me(): Promise<{ ok: true }> {
  return request(() => adminApi.get<{ ok: true }>("/api/admin/me"));
}

export function getSummary(): Promise<AdminSummary> {
  return request(() => adminApi.get<AdminSummary>("/api/admin/summary"));
}

export function listCourses(): Promise<AdminCourseListItem[]> {
  return request(() =>
    adminApi.get<AdminCourseListItem[]>("/api/admin/courses"),
  );
}

export function getCourse(slug: string): Promise<AdminCourse> {
  return request(() =>
    adminApi.get<AdminCourse>(`/api/admin/courses/${encodeURIComponent(slug)}`),
  );
}

export function createCourse(course: AdminCourseInput): Promise<AdminCourse> {
  return request(() => adminApi.post<AdminCourse>("/api/admin/courses", course));
}

export function updateCourse(
  slug: string,
  changes: AdminCourseUpdate,
): Promise<AdminCourse> {
  return request(() =>
    adminApi.patch<AdminCourse>(
      `/api/admin/courses/${encodeURIComponent(slug)}`,
      changes,
    ),
  );
}

export function deleteCourse(slug: string): Promise<void> {
  return request(() =>
    adminApi.delete<void>(`/api/admin/courses/${encodeURIComponent(slug)}`),
  );
}

export function listCohorts(
  filters: {
    courseSlug?: string;
    isOpen?: boolean;
  } = {},
): Promise<AdminCohort[]> {
  return request(() =>
    adminApi.get<AdminCohort[]>("/api/admin/cohorts", {
      params: filters,
    }),
  );
}

export function createCohort(cohort: AdminCohortInput): Promise<AdminCohort> {
  return request(() =>
    adminApi.post<AdminCohort>("/api/admin/cohorts", cohort),
  );
}

export function updateCohort(
  id: number,
  changes: AdminCohortUpdate,
): Promise<AdminCohort> {
  return request(() =>
    adminApi.patch<AdminCohort>(`/api/admin/cohorts/${id}`, changes),
  );
}

export function deleteCohort(id: number): Promise<void> {
  return request(() => adminApi.delete<void>(`/api/admin/cohorts/${id}`));
}

export function listEnrollments(
  filters: EnrollmentFilters,
): Promise<EnrollmentPage> {
  return request(() =>
    adminApi.get<EnrollmentPage>("/api/admin/enrollments", { params: filters }),
  );
}

export function getEnrollment(id: number): Promise<AdminEnrollment> {
  return request(() =>
    adminApi.get<AdminEnrollment>(`/api/admin/enrollments/${id}`),
  );
}

export function updateEnrollment(
  id: number,
  update: EnrollmentUpdate,
): Promise<AdminEnrollment> {
  return request(() =>
    adminApi.patch<AdminEnrollment>(`/api/admin/enrollments/${id}`, update),
  );
}

export function bulkVerify(ids: number[]): Promise<BulkVerifyResult> {
  return request(() =>
    adminApi.post<BulkVerifyResult>("/api/admin/enrollments/bulk-verify", {
      ids,
    }),
  );
}

export function createEnrollment(
  enrollment: ManualEnrollmentInput,
): Promise<AdminEnrollment> {
  return request(() =>
    adminApi.post<AdminEnrollment>("/api/admin/enrollments", enrollment),
  );
}

export function moveEnrollment(
  id: number,
  cohortId: number,
): Promise<AdminEnrollment> {
  return request(() =>
    adminApi.post<AdminEnrollment>(`/api/admin/enrollments/${id}/move`, {
      cohortId,
    }),
  );
}

export async function exportCsv(filters: EnrollmentFilters): Promise<void> {
  try {
    const response = await adminApi.get<Blob>(
      "/api/admin/enrollments/export.csv",
      { params: filters, responseType: "blob" },
    );
    const objectUrl = URL.createObjectURL(response.data);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = "enrollments.csv";
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  } catch (error) {
    throw normalizedError(error);
  }
}
