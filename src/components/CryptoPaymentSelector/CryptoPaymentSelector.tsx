import React, { useState } from "react";
import "./CryptoPaymentSelector.css";

export interface CryptoOption {
  id: "btc" | "eth" | "usdt";
  name: string;
  symbol: string;
  price?: string;
  icon: string;
}

export type CryptoId = CryptoOption["id"];

const CryptoPaymentSelector: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoId | null>(null);

  const cryptoOptions: CryptoOption[] = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: "45,000",
      icon: "₿",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: "2,800",
      icon: "Ξ",
    },
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      price: "1.00",
      icon: "$",
    },
  ];

  const handleCryptoSelect = (cryptoId: CryptoId): void => {
    setSelectedCrypto(cryptoId);
  };

  const getSelectedCryptoName = (): string => {
    if (!selectedCrypto) return "Payment";
    const selected = cryptoOptions.find((c) => c.id === selectedCrypto);
    return selected ? selected.name : "Payment";
  };

  return (
    <div className="crypto-container">
      <div className="crypto-title">Select Payment Method</div>

      <div className="crypto-options">
        {cryptoOptions.map((crypto) => (
          <div
            key={crypto.id}
            className={`crypto-option ${selectedCrypto === crypto.id ? "selected" : ""}`}
            onClick={() => handleCryptoSelect(crypto.id)}
          >
            <div className="crypto-option-content">
              <div className="crypto-info">
                <span className={`crypto-icon crypto-icon-${crypto.id}`}>
                  {crypto.icon}
                </span>
                <div>
                  <h3 className="crypto-name">{crypto.name}</h3>
                  <p className="crypto-symbol">{crypto.symbol}</p>
                </div>
              </div>
              <div className="crypto-price">
                <p className="crypto-price-amount">${crypto.price}</p>
                <p className="crypto-price-label">Current Price</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="continue-button"
        disabled={!selectedCrypto}
        onClick={() => console.log(`Selected crypto: ${selectedCrypto}`)}
      >
        Continue with {getSelectedCryptoName()}
      </button>
    </div>
  );
};

export default CryptoPaymentSelector;
