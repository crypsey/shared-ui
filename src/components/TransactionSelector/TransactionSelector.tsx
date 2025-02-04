import React, { useState, useCallback } from "react";
import { Search, AlertCircle } from "lucide-react";
import { RingLoader } from "react-spinners";

import "./TransactionSelector.css";

interface TransactionSelection {
  country: Country;
  stablecoin: Stablecoin;
}
interface TransactionSelectorProps {
  onComplete?: (selection: TransactionSelection) => void;
  initialCountry?: Country;
  initialStablecoin?: Stablecoin;
  availableCountries?: Country[];
  availableStablecoins?: Stablecoin[];
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
  coin: string;
  logo: string;
  ticker: string;
  minimum_transaction: number;
  minimum_transaction_coin: string;
  minimum_fee: number;
  minimum_fee_coin: string;
  fee_percent: string;
  network_fee_estimation: string;
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
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
  {
    name: "USDC (USD Coin)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
  {
    name: "BUSD (Binance USD)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
];

export const TransactionSelector: React.FC<TransactionSelectorProps> = ({
  onComplete,
  initialCountry = null,
  initialStablecoin = null,
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
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    initialCountry || null
  );
  const [selectedStablecoin, setSelectedStablecoin] =
    useState<Stablecoin | null>(initialStablecoin || null);
  // const [activeField, setActiveField] = useState<SelectionType>("country");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStablecoins = stablecoins.filter((coin) =>
    coin.name.toLowerCase().includes(stablecoinSearch.toLowerCase())
  );

  // Handlers
  // Handlers
  const handleSelection = useCallback(
    (type: SelectionType, value: Country | Stablecoin): void => {
      if (type === "country") {
        setSelectedCountry(value as Country);
        setCountrySearch("");
      } else {
        setSelectedStablecoin(value as Stablecoin);
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

  const isReadyForTransaction = selectedCountry && selectedStablecoin;

  const loading = !countries?.length || !stablecoins?.length;

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RingLoader color={"red"} size={80} loading={loading} />
        </div>
      ) : (
        <div className={`transaction-container ${className}`.trim()}>
          <div className="transaction-selector-header">
            <h1>Create Transaction</h1>
            <p>Select country and preferred stablecoin</p>
          </div>

          <div className="selection-summary">
            <div style={{ paddingBottom: "1rem" }}>
              <div className="label-name">Country</div>
              <div className="summary-card">
                <div
                  className={`selection-status ${selectedCountry ? "status-selected" : "status-pending"}`}
                >
                  {selectedCountry ? (
                    <>
                      <img
                        src={selectedCountry.icon}
                        alt={selectedCountry.name}
                        className="country-flag"
                      />
                      {selectedCountry.name}
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
                        src={selectedStablecoin.icon}
                        alt={selectedStablecoin.name}
                        className="country-flag"
                      />
                      {selectedStablecoin.name}
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
                      onClick={() => handleSelection("country", country)}
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
                      onClick={() => handleSelection("stablecoin", coin)}
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
      )}
    </>
  );
};

export default TransactionSelector;
