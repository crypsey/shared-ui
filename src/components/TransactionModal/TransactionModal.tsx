import React from "react";
import Modal from "@mui/material/Modal";
import { X, Clock } from "lucide-react";
import "./TransactionModal.css";

export interface TransactionDetails {
  amount: number | string;
  value: number | string;
  network: string;
  status: string;
  timestamp?: string;
  currency?: string;
  paymentDetails?: {
    accountNumber?: string;
    transitNumber?: string;
    institutionNumber?: string;

    // Optional fields for CREDIT_CARD
    cardNumber?: string;
    creditCardProdiver?: string;

    // Required fields for Cuba payment
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionDetails;
  onContinue?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onContinue,
}) => {
  const formatCAD = (amount: number | string) => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
      return ""; // Or handle invalid amount as needed
    }

    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: transaction.currency || "CAD",
    }).format(numericAmount);
  };

  const formatCrypto = (value: number | string) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return ""; // Or handle invalid value as needed
    }

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(numericValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-transaction-modal"
    >
      <div className="modal-container">
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="modal-title">Transaction Details</div>

        <div className="details-section">
          <div className="details-row">
            <div className="details-label">Sending to</div>
            <div className="details-value">
              {transaction.paymentDetails?.email ||
                transaction.paymentDetails?.accountNumber ||
                transaction.paymentDetails?.cardNumber}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">
              Amount {transaction.currency?.toLocaleUpperCase()}
            </div>
            <div className="details-value">{formatCAD(transaction.amount)}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Value in {transaction.network}</div>
            <div className="details-value">
              {formatCrypto(transaction.value)} {transaction.network}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">Status</div>
            <div
              className={`status-container ${transaction.status.toLocaleLowerCase() === "pending" ? "status-pending" : ""}`}
            >
              <Clock size={20} />
              <span>
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="button-section">
          {transaction.status.toLocaleLowerCase() === "pending" && (
            <button className="button-primary" onClick={onContinue}>
              Continue to Payment
            </button>
          )}
          <button className="button-secondary" onClick={onClose}>
            {transaction.status.toLocaleLowerCase() === "completed"
              ? "Close"
              : "Cancel"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
