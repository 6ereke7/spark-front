import { useEffect, useRef, useState } from "react";
import {
  getEnrollment,
  listCohorts,
  moveEnrollment,
  updateEnrollment,
  type AdminCohort,
  type AdminCourseListItem,
  type AdminEnrollment,
} from "../../lib/adminApi";

interface EnrollmentDetailDialogProps {
  enrollmentId: number | null;
  courses: AdminCourseListItem[];
  onClose: () => void;
  onUpdated: () => void;
}

function isPdf(url: string): boolean {
  try {
    return new URL(url).pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return url.toLowerCase().split("?")[0]?.endsWith(".pdf") ?? false;
  }
}

export function EnrollmentDetailDialog({
  enrollmentId,
  courses,
  onClose,
  onUpdated,
}: EnrollmentDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loadedEnrollment, setEnrollment] = useState<AdminEnrollment | null>(
    null,
  );
  const [adminNote, setAdminNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [availableCohorts, setAvailableCohorts] = useState<AdminCohort[]>([]);
  const [moveCohortId, setMoveCohortId] = useState("");
  const [moving, setMoving] = useState(false);
  const [moveError, setMoveError] = useState("");
  const [requestError, setRequestError] = useState<{
    id: number;
    message: string;
  } | null>(null);
  const enrollment =
    loadedEnrollment?.id === enrollmentId ? loadedEnrollment : null;
  const error = requestError?.id === enrollmentId ? requestError.message : "";
  const loading = enrollmentId !== null && enrollment === null && !error;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (enrollmentId === null) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    let active = true;
    getEnrollment(enrollmentId)
      .then((item) => {
        if (!active) return;
        setRequestError(null);
        setEnrollment(item);
        setAdminNote(item.adminNote ?? "");
        setRejectionReason(item.rejectionReason ?? "");
      })
      .catch((requestError: unknown) => {
        if (active) {
          setRequestError({
            id: enrollmentId,
            message:
              requestError instanceof Error
                ? requestError.message
                : "Could not load enrollment details.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [enrollmentId]);

  useEffect(() => {
    if (enrollmentId === null) return;
    let active = true;
    listCohorts()
      .then((rows) => {
        if (active) setAvailableCohorts(rows);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setMoveError(
            requestError instanceof Error
              ? requestError.message
              : "Could not load cohorts.",
          );
        }
      });
    return () => {
      active = false;
    };
  }, [enrollmentId]);

  async function saveUpdate(update: Parameters<typeof updateEnrollment>[1]) {
    if (!enrollment) return;
    setSaving(true);
    setRequestError(null);
    try {
      const updated = await updateEnrollment(enrollment.id, update);
      setEnrollment(updated);
      setAdminNote(updated.adminNote ?? "");
      setRejectionReason(updated.rejectionReason ?? "");
      onUpdated();
    } catch (requestError) {
      setRequestError({
        id: enrollment.id,
        message:
          requestError instanceof Error
            ? requestError.message
            : "Could not update enrollment.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function moveStudent() {
    if (!enrollment || !moveCohortId) return;
    const target = availableCohorts.find(
      (item) => item.id === Number(moveCohortId),
    );
    if (!target) return;
    if (
      !window.confirm(
        `Move ${enrollment.fullName} to ${target.label || target.startDate}?`,
      )
    ) {
      return;
    }

    setMoving(true);
    setMoveError("");
    try {
      const updated = await moveEnrollment(enrollment.id, target.id);
      setEnrollment(updated);
      setMoveCohortId("");
      onUpdated();
    } catch (requestError) {
      setMoveError(
        requestError instanceof Error
          ? requestError.message
          : "Could not move enrollment.",
      );
    } finally {
      setMoving(false);
    }
  }

  const imageReceipt =
    enrollment?.receiptType === "upload" &&
    enrollment.receiptRef !== null &&
    !isPdf(enrollment.receiptRef);

  return (
    <dialog
      className="admin-dialog"
      ref={dialogRef}
      aria-labelledby="admin-detail-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="admin-dialog__content">
        <header className="admin-dialog__header">
          <h2 id="admin-detail-title">Enrollment details</h2>
          <button
            className="invert"
            type="button"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </header>
        {loading && <p role="status">Loading enrollment...</p>}
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        {enrollment && (
          <>
            {enrollment.possibleDuplicate && (
              <p className="admin-warning" role="status">
                Possible duplicate: another enrollment shares this phone or
                receipt link.
              </p>
            )}
            <dl className="admin-detail-grid">
              <div>
                <dt>Enrollment ID</dt>
                <dd>{enrollment.id}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{enrollment.fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{enrollment.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{enrollment.phone}</dd>
              </div>
              <div>
                <dt>Telegram</dt>
                <dd>{enrollment.telegram}</dd>
              </div>
              <div>
                <dt>Course</dt>
                <dd>
                  {courses.find((course) => course.slug === enrollment.courseSlug)?.title ?? enrollment.courseSlug} ({enrollment.courseSlug})
                </dd>
              </div>
              <div>
                <dt>Cohort ID</dt>
                <dd>{enrollment.cohortId}</dd>
              </div>
              <div>
                <dt>Cohort</dt>
                <dd>{enrollment.startDate}</dd>
              </div>
              <div>
                <dt>Seat limit</dt>
                <dd>{enrollment.totalSeats}</dd>
              </div>
              <div>
                <dt>Cohort open</dt>
                <dd>{enrollment.isOpen ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span
                    className={`admin-badge admin-badge--${enrollment.status}`}
                  >
                    {enrollment.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Submitted</dt>
                <dd>{new Date(enrollment.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt>Reviewed</dt>
                <dd>
                  {enrollment.reviewedAt
                    ? new Date(enrollment.reviewedAt).toLocaleString()
                    : "Not reviewed"}
                </dd>
              </div>
              <div>
                <dt>Receipt type</dt>
                <dd>
                  {enrollment.createdByAdmin ? (
                    <span className="admin-badge admin-badge--manual">
                      Manual
                    </span>
                  ) : (
                    enrollment.receiptType
                  )}
                </dd>
              </div>
            </dl>
            {enrollment.receiptType === "manual" ? (
              <p className="admin-empty">
                Manual enrollment; no receipt attached.
              </p>
            ) : (
              <section className="admin-receipt" aria-label="Payment receipt">
                <h3>Payment receipt</h3>
                {imageReceipt ? (
                  <a
                    href={enrollment.receiptRef ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={enrollment.receiptRef ?? ""}
                      alt="Uploaded payment receipt"
                    />
                  </a>
                ) : enrollment.receiptType === "upload" ? (
                  <a
                    href={enrollment.receiptRef ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open PDF
                  </a>
                ) : (
                  <a
                    href={enrollment.receiptRef ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open receipt link
                  </a>
                )}
              </section>
            )}
            <section className="admin-move">
              <label className="admin-field">
                Move to another cohort
                <select
                  value={moveCohortId}
                  disabled={moving || saving}
                  onChange={(event) =>
                    setMoveCohortId(event.currentTarget.value)
                  }
                >
                  <option value="">Choose a cohort</option>
                  {availableCohorts
                    .filter(
                      (item) =>
                        item.courseSlug === enrollment.courseSlug &&
                        item.id !== enrollment.cohortId,
                    )
                    .map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.label || item.startDate}
                        {item.isOpen ? "" : " (closed)"}
                      </option>
                    ))}
                </select>
              </label>
              {moveError && (
                <p className="admin-error" role="alert">
                  {moveError}
                </p>
              )}
              <button
                type="button"
                className="invert"
                disabled={!moveCohortId || moving || saving}
                onClick={() => void moveStudent()}
              >
                {moving ? "Moving..." : "Move student"}
              </button>
            </section>
            <label className="admin-field">
              Admin note
              <textarea
                value={adminNote}
                maxLength={5000}
                onChange={(event) => setAdminNote(event.currentTarget.value)}
              />
            </label>
            <button
              type="button"
              className="invert"
              disabled={saving}
              onClick={() => void saveUpdate({ adminNote })}
            >
              Save note
            </button>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={enrollment.telegramInvited}
                disabled={saving}
                onChange={(event) =>
                  void saveUpdate({
                    telegramInvited: event.currentTarget.checked,
                  })
                }
              />
              Telegram invite sent
            </label>
            <label className="admin-field">
              Rejection reason
              <textarea
                value={rejectionReason}
                maxLength={2000}
                onChange={(event) =>
                  setRejectionReason(event.currentTarget.value)
                }
              />
            </label>
            {enrollment.status !== "verified" && (
              <button
                type="button"
                disabled={saving}
                onClick={() => void saveUpdate({ status: "verified" })}
              >
                {saving ? "Saving..." : "Verify"}
              </button>
            )}
            {enrollment.status !== "rejected" && (
              <button
                className="danger"
                type="button"
                disabled={saving || !rejectionReason.trim()}
                onClick={() => {
                  if (
                    window.confirm(
                      `Reject enrollment for ${enrollment.fullName}?`,
                    )
                  ) {
                    void saveUpdate({ status: "rejected", rejectionReason });
                  }
                }}
              >
                {saving ? "Saving..." : "Reject"}
              </button>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
