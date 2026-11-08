import { useState, type ChangeEvent, type FormEvent } from "react";
import { courses } from "../../data/courses";
import {
  getCourseDetail,
  type CourseWithDetail,
} from "../../data/courseDetails";
import { ReceiptField, type ReceiptMethod } from "./ReceiptField";
import "./EnrollForm.css";

interface EnrollFormProps {
  initialCourseSlug: string;
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
  submitted: boolean;
}

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
  submitted: false,
};

const allowedReceiptTypes = ["application/pdf"];
const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"];
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

function getCourseOptions(): CourseWithDetail[] {
  return courses
    .map((course) => getCourseDetail(course.slug))
    .filter((course): course is CourseWithDetail => course !== undefined);
}

export function EnrollForm({ initialCourseSlug }: EnrollFormProps) {
  const [form, setForm] = useState<EnrollmentFormValues>({
    ...emptyForm,
    courseSlug: initialCourseSlug,
  });
  const courseOptions = getCourseOptions();
  const selectedCourse = form.courseSlug
    ? getCourseDetail(form.courseSlug)
    : undefined;
  const isFull = selectedCourse?.seatsLeft === 0;

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send to backend
    updateForm({ submitted: true });
  }

  return (
    <section className="enroll-form-card card" aria-labelledby="enroll-form-title">
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
              <dd>{selectedCourse.startDate}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>ETB {selectedCourse.priceEtb.toLocaleString("en-US")}</dd>
            </div>
          </dl>
        ) : (
          <p>Choose a course below to see your cohort summary.</p>
        )}
      </div>

      {form.submitted ? (
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
          <form className="enrollment-form" onSubmit={handleSubmit}>
            <div className="enrollment-form__field">
              <label htmlFor="full-name">Full name</label>
              <input
                autoComplete="name"
                id="full-name"
                name="fullName"
                type="text"
                value={form.fullName}
                required
                onChange={(event) => updateForm({ fullName: event.currentTarget.value })}
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
                onChange={(event) => updateForm({ email: event.currentTarget.value })}
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
                onChange={(event) => updateForm({ phone: event.currentTarget.value })}
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
                onChange={(event) => updateForm({ telegramUsername: event.currentTarget.value })}
              />
            </div>
            <div className="enrollment-form__field">
              <label htmlFor="course">Course</label>
              <select
                id="course"
                name="course"
                value={form.courseSlug}
                required
                onChange={(event) => updateForm({ courseSlug: event.currentTarget.value })}
              >
                <option value="">Choose a course</option>
                {courseOptions.map((course) => (
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
            <button type="submit" disabled={isFull}>
              Submit enrollment
            </button>
          </form>
        </>
      )}
    </section>
  );
}
