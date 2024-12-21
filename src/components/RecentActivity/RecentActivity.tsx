import React from "react";
import { RingLoader } from "react-spinners";
import "./RecentActivity.css";

interface TransactionParticipant {
  name: string;
  initials: string;
}

export interface Transaction {
  sender: string;
  amount: number;
  recipient: string;
  timeAgo: string;
  created_at?: string;
}

export interface RecentTransactionInfo {
  sender: string;
  receiver: string;
  initials: string;
  created_at: string;
}

export interface RecentActivityProps {
  transactions?: Transaction[];
  isConnected?: boolean;
  formatCurrency?: (amount: number) => string;
  getTransactionInfo: (transaction: Transaction) => RecentTransactionInfo;
  LoadingComponent?: React.ComponentType<{ loading: boolean }>;
  onTransactionClick?: (transaction: Transaction) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  transactions = [],
  isConnected,
  formatCurrency = (amount) => `$${amount.toFixed(2)}`,
  getTransactionInfo,
  LoadingComponent = ({ loading }) => (
    <RingLoader color={"red"} size={100} loading={loading} />
  ),
  onTransactionClick,
}) => {
  const loading = !transactions?.length;

  const handleTransactionClick = (transaction: Transaction) => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    }
  };

  return (
    <div className="transactions-container">
      <div className="transactions-content">
        <h3 className="transactions-title">Live activity</h3>
        <LoadingComponent loading={loading} />

        <div className="transaction-list">
          {transactions.map((transaction: Transaction, i: number) => (
            <div
              key={i}
              className="recent-transaction-item"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="avatar">
                <span className="avatar-text">
                  {getTransactionInfo(transaction).initials}
                </span>
              </div>

              <div className="transaction-content">
                <div className="transaction-details">
                  <span className="sender">
                    {getTransactionInfo(transaction).sender}
                  </span>
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
      </div>
    </div>
  );
};
