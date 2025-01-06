import React from "react";
import Modal from "@mui/material/Modal";
import { X, Clock } from "lucide-react";
import "./TransactionModal.css";

export interface TransactionDetails {
  recipient: string;
  amountCAD: number;
  amountCrypto: number;
  cryptoSymbol: string;
  status: "pending" | "completed";
  timestamp?: string;
  currency?: string;
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
  const formatCAD = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: transaction.currency || "CAD",
    }).format(amount);
  };

  const formatCrypto = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount);
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
            <div className="details-value">{transaction.recipient}</div>
          </div>

          <div className="details-row">
            <div className="details-label">
              Amount {transaction.currency?.toLocaleUpperCase()}
            </div>
            <div className="details-value">
              {formatCAD(transaction.amountCAD)}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">
              Value in {transaction.cryptoSymbol}
            </div>
            <div className="details-value">
              {formatCrypto(transaction.amountCrypto)}{" "}
              {transaction.cryptoSymbol}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">Status</div>
            <div
              className={`status-container ${transaction.status === "pending" ? "status-pending" : ""}`}
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
          {transaction.status === "pending" && (
            <button className="button-primary" onClick={onContinue}>
              Continue to Payment
            </button>
          )}
          <button className="button-secondary" onClick={onClose}>
            {transaction.status === "completed" ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
