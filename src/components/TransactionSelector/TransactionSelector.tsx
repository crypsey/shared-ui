import React, { useState, useCallback } from "react";
import { Search, AlertCircle } from "lucide-react";

import "./TransactionSelector.css";

interface TransactionSelection {
  country: string;
  stablecoin: string;
}
interface TransactionSelectorProps {
  onComplete?: (selection: TransactionSelection) => void;
  initialCountry?: string;
  initialStablecoin?: string;
  availableCountries?: { name: string; icon: string }[];
  availableStablecoins?: { name: string; icon: string }[];
  className?: string;
}

type SelectionType = "country" | "stablecoin";

interface Country {
  name: string;
  icon: string;
}

interface Stablecoin {
  name: string;
  icon: string;
}

const DEFAULT_COUNTRIES: Country[] = [
  {
    name: "United States",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
  {
    name: "United Kingdom",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
  {
    name: "Canada",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
];

const DEFAULT_STABLECOINS: Stablecoin[] = [
  {
    name: "USDT (Tether)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
  },
  {
    name: "USDC (USD Coin)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
  },
  {
    name: "BUSD (Binance USD)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
  },
];

export const TransactionSelector: React.FC<TransactionSelectorProps> = ({
  onComplete,
  initialCountry = "",
  initialStablecoin = "",
  availableCountries,
  availableStablecoins,
  className = "",
}) => {
  // Use default values if props are not provided
  const countries = availableCountries || DEFAULT_COUNTRIES;
  const stablecoins = availableStablecoins || DEFAULT_STABLECOINS;

  // State management
  const [countrySearch, setCountrySearch] = useState<string>("");
  const [stablecoinSearch, setStablecoinSearch] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    initialCountry || null
  );
  const [selectedStablecoin, setSelectedStablecoin] = useState<string | null>(
    initialStablecoin || null
  );
  // const [activeField, setActiveField] = useState<SelectionType>("country");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStablecoins = stablecoins.filter((coin) =>
    coin.name.toLowerCase().includes(stablecoinSearch.toLowerCase())
  );

  // Handlers
  const handleSelection = useCallback(
    (type: SelectionType, value: string): void => {
      if (type === "country") {
        setSelectedCountry(value);
        setCountrySearch("");
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

  // const handleSearchFocus = useCallback((type: SelectionType): void => {
  //   setActiveField(type);
  // }, []);

  const isReadyForTransaction = selectedCountry && selectedStablecoin;

  return (
    <div className={`transaction-container ${className}`.trim()}>
      <div className="transaction-selector-header">
        <h1>Create Transaction</h1>
        <p>Select country and preferred stablecoin</p>
      </div>

      <div className="selection-summary">
        <div>
          <div className="label-name">Country</div>
          <div className="summary-card">
            <div
              className={`selection-status ${selectedCountry ? "status-selected" : "status-pending"}`}
            >
              {selectedCountry ? (
                <>
                  <img
                    src={
                      countries.find(
                        (country) => country.name === selectedCountry
                      )?.icon
                    }
                    alt={selectedCountry}
                    className="country-flag"
                  />
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
        </div>

        <div>
          <div className="label-name">Stablecoin</div>
          <div className="summary-card">
            <div
              className={`selection-status ${selectedStablecoin ? "status-selected" : "status-pending"}`}
            >
              {selectedStablecoin ? (
                <>
                  <img
                    src={
                      stablecoins.find(
                        (coin) => coin.name === selectedStablecoin
                      )?.icon
                    }
                    alt={selectedStablecoin}
                    className="country-flag"
                  />
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
      </div>

      <div className="search-section">
        <div className={`search-container`}>
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => handleSearchChange("country", e)}
            // onFocus={() => handleSearchFocus("country")}
            placeholder="Search for country..."
            className="search-input"
          />
          <Search className="search-icon" size={20} />
          {countrySearch && (
            <div className="results-dropdown">
              {filteredCountries.map((country, index) => (
                <div
                  key={`country-${index}`}
                  className="result-item"
                  onClick={() => handleSelection("country", country.name)}
                >
                  <img
                    src={country.icon}
                    alt={country.name}
                    className="country-flag"
                  />
                  <div className="item-name">{country.name}</div>
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="no-results">No countries found</div>
              )}
            </div>
          )}
        </div>
        <div className={`search-container`}>
          <input
            type="text"
            value={stablecoinSearch}
            onChange={(e) => handleSearchChange("stablecoin", e)}
            // onFocus={() => handleSearchFocus("stablecoin")}
            placeholder="Search for  a stablecoin..."
            className="search-input"
          />

          <Search className="search-icon" size={20} />
          {stablecoinSearch && (
            <div className="results-dropdown">
              {filteredStablecoins.map((coin, index) => (
                <div
                  key={`stablecoin-${index}`}
                  className="result-item"
                  onClick={() => handleSelection("stablecoin", coin.name)}
                >
                  <img
                    src={coin.icon}
                    alt={coin.name}
                    className="country-flag"
                  />
                  <div className="item-name">{coin.name}</div>
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
