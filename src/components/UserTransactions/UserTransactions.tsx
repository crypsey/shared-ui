import React from "react";
import "./UserTransactions.css";

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export interface TransactionProps {
  currency: string;
  status: TransactionStatus;
  _id: string;
  userId: string;
  amount: number;
  transactionType: any;
  description: string;
  paymentDetails: any;
  reference: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  formattedAmount: string;
  id: string;
}

export interface TransactionInfo {
  initials: string;
  receiver: string;
  created_at: string;
}

interface PaymentConfirmationProps {
  data: TransactionProps[];
  getTransactionInfo: (transaction: TransactionProps) => TransactionInfo;
  formatCurrency: (amount: number) => string;
  onTransactionClick?: (transaction: TransactionProps) => void;
}

export interface UserTransactionsProps {
  recentTransactions?: {
    data: TransactionProps[];
  };
  EmptyStateComponent?: React.ComponentType;
  getTransactionInfo: (transaction: TransactionProps) => TransactionInfo;
  formatCurrency: (amount: number) => string;
  onTransactionClick?: (transaction: TransactionProps) => void;
  title?: string;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  data,
  getTransactionInfo,
  formatCurrency,
  onTransactionClick,
}) => {
  const handleClick = (transaction: TransactionProps) => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    }
  };

  return (
    <div className="transaction-list">
      {data.map((transaction, i) => (
        <div
          key={i}
          className="user-transaction-item"
          onClick={() => handleClick(transaction)}
        >
          <div className="avatar">
            <span className="avatar-text">
              {getTransactionInfo(transaction).initials}
            </span>
          </div>

          <div className="transaction-content">
            <div className="transaction-details">
              <span className="transaction-text">sent</span>
              <span className="amount">
                {formatCurrency(transaction.amount)}
              </span>
              <span className="transaction-text">to</span>
              <span className="recipient">
                {getTransactionInfo(transaction).receiver}
              </span>
            </div>

            <div className="timestamp">
              {getTransactionInfo(transaction).created_at}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const UserTransactions: React.FC<UserTransactionsProps> = ({
  recentTransactions,
  EmptyStateComponent,
  getTransactionInfo,
  formatCurrency,
  onTransactionClick,
  title = "Recent Transactions",
}) => {
  if (!recentTransactions?.data?.length && EmptyStateComponent) {
    return <EmptyStateComponent />;
  }

  return (
    <div className="user-transactions">
      <div className="user-transactions-container">
        {!recentTransactions?.data?.length ? null : (
          <>
            <h3 className="userTrans-title">{title}</h3>
            <PaymentConfirmation
              data={recentTransactions.data}
              getTransactionInfo={getTransactionInfo}
              formatCurrency={formatCurrency}
              onTransactionClick={onTransactionClick}
            />
          </>
        )}
      </div>
    </div>
  );
};
