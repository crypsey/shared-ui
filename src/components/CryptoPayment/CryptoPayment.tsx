import React, { useState, useCallback, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import "./CryptoPayment.css";
import { QRCodeSVG } from "qrcode.react";

interface PaymentDetails {
  amount: string;
  address: string;
  amountInUSD: string;
  expiresIn: string;
  network?: string;
  icon?: string;
}

interface CryptoPaymentProps {
  details?: PaymentDetails;
  onCopy?: (address: string) => void;
  className?: string;
  initialTime: number;
  onTimeEnd?: () => void;
}

const defaultPaymentDetails: PaymentDetails = {
  amount: "0.5 ETH",
  address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  icon: "https://api.cryptapi.io/media/token_logos/bch.png",
  amountInUSD: "$1,250.00 USD",
  expiresIn: "24:00:00",
  network: "Ethereum",
};

const CryptoPayment: React.FC<CryptoPaymentProps> = ({
  details = defaultPaymentDetails,
  onCopy,
  className = "",
  initialTime = 60,
  onTimeEnd = () => {},
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(details.address);
      setCopied(true);
      onCopy?.(details.address);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [details.address, onCopy]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime: number) => {
          if (prevTime <= 1) {
            onTimeEnd?.();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeEnd]);

  const formatTime = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`crypto-container ${className}`}>
      <div className="crypto-card">
        <div className="crypto-header">
          <h1 className="crypto-title">Please send</h1>
          <p className="crypto-description">Send exactly {details.amount}</p>
        </div>

        <div className="crypto-content">
          {/* QR Code */}
          <div style={{ margin: "auto" }}>
            <QRCodeSVG
              value={details.address}
              size={192}
              level="H"
              imageSettings={{
                src: details?.icon || "",
                height: 60,
                width: 60,
                excavate: true,
              }}
            />
          </div>

          {/* Amount */}
          <div className="amount-container">
            <div className="amount">{details.amount}</div>
            <div className="amount-usd">{details.amountInUSD}</div>
          </div>

          {/* Address */}
          <div className="address-container">
            <label className="address-label">Send to this address:</label>
            <div className="address-content">
              <code className="address">{details.address}</code>
              <button
                className="copy-button"
                onClick={handleCopy}
                aria-label="Copy address to clipboard"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check
                    className="success-icon"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Timer */}
          <div className="timer-container">
            <p className="timer-label">Time remaining:</p>
            <div>{formatTime(timeLeft)}</div>
          </div>

          {/* Warning */}
          <div style={{ padding: "1rem" }}>
            <div className="warning" role="alert">
              <div className="warning-title">Important:</div>
              <ul className="warning-list">
                <li className="warning-item">
                  Send only {details.network} to this address
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPayment;
