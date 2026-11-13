import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ApiError, submitEnrollment } from "../../lib/api";
import { useCohort } from "../../hooks/useCohort";
import { getCourseDetail } from "../../data/courseDetails";
import { ReceiptField, type ReceiptMethod } from "./ReceiptField";
import type { Course } from "../../types/course";
import "./EnrollForm.css";

interface EnrollFormProps {
  initialCourseSlug: string;
  courses: Course[];
}

interface EnrollmentFormValues {
  fullName: string;
  email: string;
  phone: string;
  telegramUsername: string;
  courseSlug: string;
  receiptMethod: ReceiptMethod;
  receiptFile: File | null;
  receiptLink: string;
  receiptError: string;
  agreedToEthics: boolean;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const emptyForm: EnrollmentFormValues = {
  fullName: "",
  email: "",
  phone: "",
  telegramUsername: "",
  courseSlug: "",
  receiptMethod: "upload",
  receiptFile: null,
  receiptLink: "",
  receiptError: "",
  agreedToEthics: false,
};

const allowedReceiptTypes = ["application/pdf"];
const allowedImageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".heic",
];
const maxReceiptSize = 5 * 1024 * 1024;

function isAllowedReceipt(file: File): boolean {
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0] ?? "";
  return (
    file.type.startsWith("image/") ||
    allowedReceiptTypes.includes(file.type) ||
    allowedImageExtensions.includes(extension) ||
    extension === ".pdf"
  );
}

function getSubmitErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return "Something went wrong. Please check your connection and try again.";
  }

  if (
    error.status === 413 ||
    (error.status === 400 &&
      /receipt files must be 5 MB or smaller/i.test(error.message))
  ) {
    return "That file is too large. Maximum size is 5 MB.";
  }
  if (error.status === 429) {
    return "Too many attempts. Please try again later.";
  }
  if (error.status === 400 || error.status === 409) return error.message;
  return "Something went wrong. Please check your connection and try again.";
}

export function EnrollForm({
  initialCourseSlug,
  courses,
}: EnrollFormProps) {
  const [form, setForm] = useState<EnrollmentFormValues>({
    ...emptyForm,
    courseSlug: initialCourseSlug,
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const submitting = useRef(false);
  const selectedCourse = courses.find((course) => course.slug === form.courseSlug);
  const staticCohort = form.courseSlug
    ? getCourseDetail(form.courseSlug)
    : undefined;
  const { cohort, status: cohortStatus } = useCohort(form.courseSlug);
  const seatsLeft =
    cohortStatus === "ready" && cohort
      ? cohort.seatsLeft
      : staticCohort?.seatsLeft;
  const totalSeats =
    cohortStatus === "ready" && cohort
      ? cohort.totalSeats
      : staticCohort?.totalSeats;
  const startDate =
    cohortStatus === "ready" && cohort
      ? cohort.startDate
      : staticCohort?.startDate;
  const priceText =
    cohortStatus === "ready" && cohort
      ? cohort.priceEtb !== null
        ? `ETB ${cohort.priceEtb.toLocaleString("en-US")}`
        : staticCohort
          ? `ETB ${staticCohort.priceEtb.toLocaleString("en-US")}`
          : (selectedCourse?.price ?? "Price unavailable")
      : staticCohort
        ? `ETB ${staticCohort.priceEtb.toLocaleString("en-US")}`
        : (selectedCourse?.price ?? "Price unavailable");
  const isFull = seatsLeft === 0;
  const registrationClosed =
    Boolean(form.courseSlug) && cohortStatus === "none";

  function updateForm(values: Partial<EnrollmentFormValues>) {
    setForm((current) => ({ ...current, ...values }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;
    if (!file) {
      updateForm({ receiptFile: null, receiptError: "" });
      return;
    }

    if (!isAllowedReceipt(file)) {
      event.currentTarget.value = "";
      updateForm({
        receiptFile: null,
        receiptError: "Choose an image or PDF receipt.",
      });
      return;
    }

    if (file.size > maxReceiptSize) {
      event.currentTarget.value = "";
      updateForm({
        receiptFile: null,
        receiptError: "The receipt file must be 5 MB or smaller.",
      });
      return;
    }

    updateForm({ receiptFile: file, receiptError: "" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSubmitStatus("submitting");
    setSubmitError("");

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("telegram", form.telegramUsername);
    formData.append("courseSlug", form.courseSlug);
    formData.append("receiptType", form.receiptMethod);
    formData.append("agreedToTerms", String(form.agreedToEthics));

    if (form.receiptMethod === "upload" && form.receiptFile) {
      formData.append("receipt", form.receiptFile);
    } else if (form.receiptMethod === "link") {
      formData.append("receiptLink", form.receiptLink);
    }

    try {
      await submitEnrollment(formData);
      setForm(emptyForm);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitError(getSubmitErrorMessage(error));
      setSubmitStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <section
      className="enroll-form-card card"
      aria-labelledby="enroll-form-title"
    >
      <div className="enroll-order-summary" aria-live="polite">
        <p className="enroll-order-summary__label">Order summary</p>
        {selectedCourse ? (
          <dl>
            <div>
              <dt>Course</dt>
              <dd>{selectedCourse.title}</dd>
            </div>
            <div>
              <dt>Starts</dt>
              <dd>{startDate}</dd>
            </div>
            <div>
              <dt>Seats left</dt>
              <dd>
                {registrationClosed
                  ? "Registration closed"
                  : `${seatsLeft} of ${totalSeats}`}
              </dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>
                {priceText}
              </dd>
            </div>
          </dl>
        ) : (
          <p>Choose a course below to see your cohort summary.</p>
        )}
      </div>

      {submitStatus === "success" ? (
        <div className="enroll-success" role="status">
          <h2 id="enroll-form-title">Registration received</h2>
          <p>
            Registration received. We&apos;ll verify your payment and send your
            Telegram invite within 24 hours.
          </p>
        </div>
      ) : (
        <>
          <h2 id="enroll-form-title">Your details</h2>
          {isFull && (
            <p className="enroll-notice" role="status">
              This cohort is full. Choose another course to continue.
            </p>
          )}
          {registrationClosed && (
            <p className="enroll-notice" role="status">
              Registration closed
            </p>
          )}
          <form className="enrollment-form" onSubmit={handleSubmit}>
            <div className="enrollment-form__field">
              <label htmlFor="full-name">Full name</label>
              <input
                autoComplete="name"
                id="full-name"
                name="fullName"
                type="text"
                value={form.fullName}
                pattern="\p{L}+(?:[\-']\p{L}+)* \p{L}+(?:[\-']\p{L}+)*(?: \p{L}+(?:[\-']\p{L}+)*)*"
                title="Enter your first and last name using letters only, separated by a space"
                required
                onChange={(event) =>
                  updateForm({ fullName: event.currentTarget.value })
                }
              />
            </div>
            <div className="enrollment-form__field">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="email"
                id="email"
                name="email"
                type="email"
                value={form.email}
                required
                onChange={(event) =>
                  updateForm({ email: event.currentTarget.value })
                }
              />
            </div>
            <div className="enrollment-form__field">
              <label htmlFor="phone">Phone</label>
              <input
                autoComplete="tel"
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                required
                onChange={(event) =>
                  updateForm({ phone: event.currentTarget.value })
                }
              />
            </div>
            <div className="enrollment-form__field">
              <label htmlFor="telegram-username">Telegram username</label>
              <input
                autoComplete="off"
                id="telegram-username"
                name="telegramUsername"
                type="text"
                value={form.telegramUsername}
                pattern="@[A-Za-z0-9_]{5,32}"
                title="Enter a Telegram username starting with @ (5–32 characters)."
                placeholder="@username"
                required
                onChange={(event) =>
                  updateForm({ telegramUsername: event.currentTarget.value })
                }
              />
            </div>
            <div className="enrollment-form__field">
              <label htmlFor="course">Course</label>
              <select
                id="course"
                name="course"
                value={form.courseSlug}
                required
                onChange={(event) =>
                  updateForm({ courseSlug: event.currentTarget.value })
                }
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option value={course.slug} key={course.slug}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <ReceiptField
              method={form.receiptMethod}
              file={form.receiptFile}
              link={form.receiptLink}
              error={form.receiptError}
              onMethodChange={(method) => updateForm({ receiptMethod: method })}
              onFileChange={handleFileChange}
              onLinkChange={(receiptLink) => updateForm({ receiptLink })}
            />
            <div className="enrollment-form__consent">
              <input
                id="ethics-agreement"
                name="ethicsAgreement"
                type="checkbox"
                checked={form.agreedToEthics}
                required
                onChange={(event) =>
                  updateForm({ agreedToEthics: event.currentTarget.checked })
                }
              />
              <label htmlFor="ethics-agreement">
                I agree to use what I learn only for legal, authorized purposes
              </label>
            </div>
            {submitError && (
              <p className="enroll-notice" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={
                isFull || registrationClosed || submitStatus === "submitting"
              }
            >
              {submitStatus === "submitting"
                ? "Submitting..."
                : "Submit enrollment"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
