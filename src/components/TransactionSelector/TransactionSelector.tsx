import React, { useState, useCallback } from "react";
import { Search, CheckCircle, AlertCircle } from "lucide-react";

import "./TransactionSelector.css";

interface TransactionSelection {
  country: string;
  stablecoin: string;
}
interface TransactionSelectorProps {
  onComplete?: (selection: TransactionSelection) => void;
  initialCountry?: string;
  initialStablecoin?: string;
  availableCountries?: string[];
  availableStablecoins?: string[];
  className?: string;
}

type SelectionType = "country" | "stablecoin";

interface SelectionStatus {
  isSelected: boolean;
  value: string | null;
}

const DEFAULT_COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "Switzerland",
  "Netherlands",
];

const DEFAULT_STABLECOINS = [
  "USDT (Tether)",
  "USDC (USD Coin)",
  "BUSD (Binance USD)",
  "DAI",
  "TUSD (TrueUSD)",
  "USDP (Pax Dollar)",
  "GUSD (Gemini Dollar)",
  "FRAX",
  "LUSD (Liquity USD)",
  "sUSD (Synthetix USD)",
];

export const TransactionSelector: React.FC<TransactionSelectorProps> = ({
  onComplete,
  initialCountry = "",
  initialStablecoin = "",
  availableCountries = DEFAULT_COUNTRIES,
  availableStablecoins = DEFAULT_STABLECOINS,
  className = "",
}) => {
  // State management
  const [countrySearch, setCountrySearch] = useState<string>("");
  const [stablecoinSearch, setStablecoinSearch] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    initialCountry || null
  );
  const [selectedStablecoin, setSelectedStablecoin] = useState<string | null>(
    initialStablecoin || null
  );
  const [activeField, setActiveField] = useState<SelectionType>("country");

  // Filtered results based on search
  const filteredCountries = availableCountries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStablecoins = availableStablecoins.filter((coin) =>
    coin.toLowerCase().includes(stablecoinSearch.toLowerCase())
  );

  // Handlers
  const handleSelection = useCallback(
    (type: SelectionType, value: string): void => {
      if (type === "country") {
        setSelectedCountry(value);
        setCountrySearch("");
        setActiveField("stablecoin");
      } else {
        setSelectedStablecoin(value);
        setStablecoinSearch("");
      }
    },
    []
  );

  const handleContinue = useCallback((): void => {
    if (selectedCountry && selectedStablecoin && onComplete) {
      const selection: TransactionSelection = {
        country: selectedCountry,
        stablecoin: selectedStablecoin,
      };
      onComplete(selection);
    }
  }, [selectedCountry, selectedStablecoin, onComplete]);

  const handleSearchChange = useCallback(
    (type: SelectionType, event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      if (type === "country") {
        setCountrySearch(value);
      } else {
        setStablecoinSearch(value);
      }
    },
    []
  );

  const handleSearchFocus = useCallback((type: SelectionType): void => {
    setActiveField(type);
  }, []);

  const isReadyForTransaction = selectedCountry && selectedStablecoin;

  return (
    <div className={`transaction-container ${className}`.trim()}>
      <div className="header">
        <h1>Create Transaction</h1>
        <p>Select your country and preferred stablecoin</p>
      </div>

      <div className="selection-summary">
        <div className="summary-card">
          <div className="label">Country</div>
          <div
            className={`selection-status ${selectedCountry ? "status-selected" : "status-pending"}`}
          >
            {selectedCountry ? (
              <>
                <CheckCircle size={20} />
                {selectedCountry}
              </>
            ) : (
              <>
                <AlertCircle size={20} />
                Not selected
              </>
            )}
          </div>
        </div>
        <div className="summary-card">
          <div className="label">Stablecoin</div>
          <div
            className={`selection-status ${selectedStablecoin ? "status-selected" : "status-pending"}`}
          >
            {selectedStablecoin ? (
              <>
                <CheckCircle size={20} />
                {selectedStablecoin}
              </>
            ) : (
              <>
                <AlertCircle size={20} />
                Not selected
              </>
            )}
          </div>
        </div>
      </div>

      <div className="search-section">
        {/* Country Search */}
        <div
          className={`search-container ${activeField !== "country" ? "inactive" : ""}`}
        >
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => handleSearchChange("country", e)}
            onFocus={() => handleSearchFocus("country")}
            placeholder="Search for your country..."
            className="search-input"
          />
          <Search className="search-icon" size={20} />
          {countrySearch && (
            <div className="results-dropdown">
              {filteredCountries.map((country, index) => (
                <div
                  key={`country-${index}`}
                  className="result-item"
                  onClick={() => handleSelection("country", country)}
                >
                  {country}
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="no-results">No countries found</div>
              )}
            </div>
          )}
        </div>

        {/* Stablecoin Search */}
        <div
          className={`search-container ${activeField !== "stablecoin" ? "inactive" : ""}`}
        >
          <input
            type="text"
            value={stablecoinSearch}
            onChange={(e) => handleSearchChange("stablecoin", e)}
            onFocus={() => handleSearchFocus("stablecoin")}
            placeholder="Search for a stablecoin..."
            className="search-input"
          />
          <Search className="search-icon" size={20} />
          {stablecoinSearch && (
            <div className="results-dropdown">
              {filteredStablecoins.map((coin, index) => (
                <div
                  key={`stablecoin-${index}`}
                  className="result-item"
                  onClick={() => handleSelection("stablecoin", coin)}
                >
                  {coin}
                </div>
              ))}
              {filteredStablecoins.length === 0 && (
                <div className="no-results">No stablecoins found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!isReadyForTransaction}
      >
        Continue with Transaction
      </button>
    </div>
  );
};

export default TransactionSelector;
