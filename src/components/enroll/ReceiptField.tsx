import type { ChangeEvent } from "react";
import "./ReceiptField.css";

export type ReceiptMethod = "upload" | "link";

interface ReceiptFieldProps {
  method: ReceiptMethod;
  file: File | null;
  link: string;
  error: string;
  onMethodChange: (method: ReceiptMethod) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLinkChange: (value: string) => void;
}

export function ReceiptField({
  method,
  file,
  link,
  error,
  onMethodChange,
  onFileChange,
  onLinkChange,
}: ReceiptFieldProps) {
  return (
    <fieldset className="receipt-field">
      <legend>Payment receipt <span aria-hidden="true">*</span></legend>
      <div className="receipt-field__toggle" aria-label="Choose receipt type">
        <button
          className={method === "upload" ? "" : "invert"}
          type="button"
          aria-pressed={method === "upload"}
          onClick={() => onMethodChange("upload")}
        >
          Upload file
        </button>
        <button
          className={method === "link" ? "" : "invert"}
          type="button"
          aria-pressed={method === "link"}
          onClick={() => onMethodChange("link")}
        >
          Paste link
        </button>
      </div>
      {method === "upload" ? (
        <div>
          <label htmlFor="receipt-file">Receipt file (image or PDF, up to 5 MB)</label>
          <input
            id="receipt-file"
            name="receiptFile"
            type="file"
            accept="image/*,.pdf,application/pdf"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "receipt-error" : "receipt-help"}
            onChange={onFileChange}
          />
          <small id="receipt-help">Accepted formats: image or PDF. Maximum size: 5 MB.</small>
          {file && <small className="receipt-field__filename">{file.name}</small>}
          {error && (
            <small className="form-error" id="receipt-error" role="alert">
              {error}
            </small>
          )}
        </div>
      ) : (
        <div>
          <label htmlFor="receipt-link">Receipt link</label>
          <input
            id="receipt-link"
            name="receiptLink"
            type="url"
            placeholder="https://..."
            value={link}
            required
            onChange={(event) => onLinkChange(event.currentTarget.value)}
          />
          <small>Make sure the receipt link can be viewed by our team.</small>
        </div>
      )}
    </fieldset>
  );
}
