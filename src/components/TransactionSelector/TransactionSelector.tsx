import React, { useState, useCallback } from "react";
import { Search, AlertCircle } from "lucide-react";
import { RingLoader } from "react-spinners";
import SearchDropdown from "../SearchDropdown";
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

  const handleContinue = useCallback((): void => {
    if (selectedCountry && selectedStablecoin && onComplete) {
      const selection: TransactionSelection = {
        country: selectedCountry,
        stablecoin: selectedStablecoin,
      };
      onComplete(selection);
    }
  }, [selectedCountry, selectedStablecoin, onComplete]);

  const isReadyForTransaction = selectedCountry && selectedStablecoin;

  const loading = !countries?.length || !stablecoins?.length;

  const handleSelectItem = useCallback(
    (type: SelectionType, value: Country | Stablecoin): void => {
      if (type === "country") {
        setSelectedCountry(value as Country);
      } else {
        setSelectedStablecoin(value as Stablecoin);
      }
    },
    []
  );

  const handleClearSelection = useCallback(
    (type: SelectionType, value: Country | Stablecoin): void => {
      if (type === "country") {
        setSelectedCountry(null);
      } else {
        setSelectedStablecoin(null);
      }
    },
    []
  );

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
            <div>
              <div className="label-name">Country</div>
              {/* <div className="summary-card"> */}
              <SearchDropdown
                items={countries}
                placeholder="Select country"
                onSelect={(item) =>
                  handleSelectItem("country", item as Country)
                }
                onClear={(item: any) =>
                  handleClearSelection("stablecoin", item as Stablecoin)
                }
              />
              {/* </div> */}
            </div>

            <div>
              <div className="label-name">Stablecoin</div>
              {/* <div className="summary-card"> */}
              <SearchDropdown
                items={stablecoins}
                placeholder="Select stablecoin"
                onSelect={(item) =>
                  handleSelectItem("stablecoin", item as Stablecoin)
                }
                onClear={(item: any) =>
                  handleClearSelection("stablecoin", item as Stablecoin)
                }
              />
              {/* </div> */}
            </div>
          </div>
          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={!isReadyForTransaction}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default TransactionSelector;
