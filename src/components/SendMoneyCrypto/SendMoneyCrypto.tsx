import React, { useState, useCallback } from "react";
import "./SendMoneyCrypto.css";

export interface SendMoneyCryptoProps {
  initialAmount?: string;
  onAmountChange?: (amount: string) => void;
  onNextClick?: () => void;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
}

export interface ReceiveMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ExchangeFees {
  amount: string;
  currency: string;
}

const BankIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const ChevronIcon: React.FC = () => (
  <svg
    className="chevron-icon"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const DEFAULT_EXCHANGE_RATE: CurrencyRate = {
  from: "CAD",
  to: "BTC",
  rate: 0.0009,
};

const DEFAULT_RECEIVE_METHOD: ReceiveMethod = {
  id: "bank-account",
  label: "Bank Account",
  icon: <BankIcon />,
};

const SendMoneyCrypto: React.FC<SendMoneyCryptoProps> = ({
  initialAmount = "100.00",
  onAmountChange,
  onNextClick,
}) => {
  const [amount, setAmount] = useState<string>(initialAmount);
  const [selectedMethod] = useState<ReceiveMethod>(DEFAULT_RECEIVE_METHOD);

  const handleAmountChange = useCallback(
    (newAmount: string) => {
      setAmount(newAmount);
      onAmountChange?.(newAmount);
    },
    [onAmountChange]
  );

  const handleNextClick = useCallback(() => {
    onNextClick?.();
  }, [onNextClick]);

  const formatCurrency = (value: string, currency: string): string => {
    return `${value} ${currency}`;
  };

  return (
    <div className="crypto-container">
      <div>
        {/* Send Section */}
        <div className="section-card">
          <h2 className="section-title">You send</h2>
          <div className="amount-display">
            <span className="amount">{amount}</span>
            <div className="currency-badge">
              <div className="btc-icon">₿</div>
              <span className="currency-code">BTC</span>
            </div>
          </div>
          <div className="exchange-rate">
            {`${formatCurrency("1.00", DEFAULT_EXCHANGE_RATE.from)} = ${formatCurrency(
              DEFAULT_EXCHANGE_RATE.rate.toString(),
              DEFAULT_EXCHANGE_RATE.to
            )}`}
          </div>
        </div>

        {/* Receive Section */}
        <div className="section-card">
          <h2 className="section-title">They receive</h2>
          <div className="amount-display">
            <span className="amount">{amount}</span>
            <div className="currency-badge">
              <img
                src="/api/placeholder/24/24"
                alt="Canadian flag"
                className="flag-icon"
              />
              <span className="currency-code">CAD</span>
            </div>
          </div>
        </div>

        {/* Receive Method Section */}
        <div className="receive-method">
          <h2 className="method-title">Receive Method</h2>
          <button className="method-button">
            <div className="method-label">
              <div className="bank-icon">{selectedMethod.icon}</div>
              {selectedMethod.label}
            </div>
            <ChevronIcon />
          </button>
        </div>
      </div>

      <div>
        {/* Total Section */}
        <div className="section-card total-section">
          <div className="fee-row">
            <span className="fee-label">Total fees</span>
            <span>{formatCurrency("0.00", "CAD")}</span>
          </div>
          <div className="fee-row">
            <span className="fee-label">Total amount</span>
            <span className="total-amount">
              {formatCurrency(amount, "CAD")}
            </span>
          </div>
          <button className="next-button" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyCrypto;
