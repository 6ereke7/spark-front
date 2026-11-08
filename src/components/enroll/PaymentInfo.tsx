import { paymentMethods, paymentReferenceInstruction } from "../../data/payment";
import "./PaymentInfo.css";

export function PaymentInfo() {
  return (
    <section
      className="payment-info card"
      aria-labelledby="payment-info-title"
    >
      <h2 id="payment-info-title">Payment instructions</h2>
      <div className="payment-info__methods">
        {paymentMethods.map((method) => (
          <article className="payment-method" key={method.type}>
            <h3>{method.type}</h3>
            {method.bankName && (
              <p>
                <span>Bank</span>
                <strong>{method.bankName}</strong>
              </p>
            )}
            {method.accountName && (
              <p>
                <span>Account name</span>
                <strong>{method.accountName}</strong>
              </p>
            )}
            {method.accountNumber && (
              <p>
                <span>Account number</span>
                <strong>{method.accountNumber}</strong>
              </p>
            )}
            {method.mobileMoneyNumber && (
              <p>
                <span>Mobile money number</span>
                <strong>{method.mobileMoneyNumber}</strong>
              </p>
            )}
          </article>
        ))}
      </div>
      <p className="payment-info__reference">{paymentReferenceInstruction}</p>
    </section>
  );
}
