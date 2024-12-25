import React, { useState, JSX } from "react";
import "./CryptoPaymentSelector.css";
import { Shield, Info } from "lucide-react";

export interface CryptoOption {
  name: string;
  symbol: string;
  fee: string;
  icon: string;
  color: string;
}

interface PaymentOptionProps extends CryptoOption {
  isSelected?: boolean;
  onSelect?: (symbol: string) => void;
}

interface PaymentSelectorProps {
  onPaymentSelect?: (symbol: string) => void;
  onSubmit?: () => void;
  options?: CryptoOption[];
}

// export type CryptoId = CryptoOption["id"];

const PaymentOption: React.FC<PaymentOptionProps> = ({
  name,
  symbol,
  fee,
  icon,
  color,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`payment-option ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect?.(symbol)}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
    >
      <div className="crypto-info">
        <div className={`crypto-icon ${color}`}>
          <img src={icon} style={{ width: 50, height: 50 }} />
        </div>
        <div>
          <h3 className="crypto-name">{name}</h3>
          <span className="crypto-symbol">{symbol}</span>
        </div>
      </div>
      <div className="fee-info">
        <div className="fee-label">Network Fee</div>
        <div className="fee-amount">{fee}</div>
      </div>
    </div>
  );
};

const CryptoPaymentSelector: React.FC<PaymentSelectorProps> = ({
  onPaymentSelect,
  onSubmit,
  options = [],
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const handleSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    onPaymentSelect?.(symbol);
  };

  const handleSubmit = () => {
    if (selectedSymbol) {
      onSubmit?.();
    }
  };

  return (
    <div className="payment-container">
      <div style={{ padding: "1.4rem" }}>
        <div className="payment-header">
          <h2 className="payment-title">Select Payment Method</h2>
        </div>

        <div className="payment-grid">
          {options.map((option) => (
            <PaymentOption
              key={option.symbol}
              {...option}
              isSelected={selectedSymbol === option.symbol}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <button
          className={`submit-button ${!selectedSymbol ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={!selectedSymbol}
        >
          Continue with Payment
        </button>

        <p className="security-note">
          <Info className="w-4 h-4" />
          Your funds are protected by our secure payment system
        </p>
      </div>
    </div>
  );
};

export default CryptoPaymentSelector;
