import React from "react";
import "./PaymentSummary.css";

interface IPaymentSummaryProps {
  totalFees?: string;
  totalAmount: string;
  selectedPayment?: boolean;
  onNext?: () => void;
}

const PaymentSummary: React.FC<IPaymentSummaryProps> = ({
  totalFees = "0.00 CAD",
  totalAmount = "100.00 CAD",
  selectedPayment = false,
  onNext,
}) => {
  const handleNext = (): void => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="payment-summary">
      <div className="summary-item">
        <span className="summary-label">Total fees</span>
        <span className="summary-value">{totalFees}</span>
      </div>

      <div className="divider"></div>

      <div className="summary-item">
        <span className="summary-label">Total amount</span>
        <span className="summary-value summary-value--highlight">
          {totalAmount}
        </span>
      </div>

      <button
        className="next-button"
        onClick={handleNext}
        type="button"
        aria-label="Proceed to next step"
        disabled={!selectedPayment}
      >
        Next
      </button>
    </div>
  );
};

export default PaymentSummary;