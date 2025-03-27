import React, {
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import "./AssetSelector.css";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  coin?: string;
  logo?: string;
  ticker?: string;
}

type SetValueFunction = (setter: (value: string) => void) => void;

interface AssetSelectorProps {
  headerTitle: string;
  initialAmount?: string;
  currency?: string;
  currencyIcon?: string;
  disabled?: boolean;
  error?: boolean;
  onAmountChange?: (value: string) => void;
  onItemChange?: (token: Token) => void;
  setValue?: SetValueFunction; // Use our specific type
  logo: string;
  symbol: string;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  headerTitle,
  initialAmount = "100.00",
  disabled,
  error,
  onAmountChange,
  setValue,
  logo,
  symbol,
}) => {
  const [internalValue, setInternalValue] = useState<string>("");
  const isInitialMount = useRef(true);
  const previousInitialAmount = useRef(initialAmount);
  
  const formatNumberWithCommas = useCallback((value: string): string => {
    if (!value) return "";
    
    if (value.startsWith('.')) {
      value = '0' + value;
    }
  
    if (value.includes('.')) {
      const [integerPart, decimalPart] = value.split('.');
      
      if (!integerPart || /^0+$/.test(integerPart)) {
        return "0." + decimalPart;
      }
      
      const formattedInteger = Number(integerPart).toLocaleString('en-US');
      
      return formattedInteger + '.' + decimalPart;
    } else {
      
      if (value === '' || /^0+$/.test(value)) {
        return value === '' ? '' : '0';
      }
      return Number(value).toLocaleString('en-US');
    }
  }, []);

  const setFormattedInternalValue = useCallback((value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    setInternalValue(formattedValue);
  }, [formatNumberWithCommas]);

  useEffect(() => {
    if (isInitialMount.current) {
      setFormattedInternalValue(initialAmount);
      isInitialMount.current = false;
    }
  }, [initialAmount, setFormattedInternalValue]);

  useEffect(() => {
    if (!isInitialMount.current && initialAmount !== previousInitialAmount.current) {
      setFormattedInternalValue(initialAmount);
      previousInitialAmount.current = initialAmount;
    }
  }, [initialAmount, setFormattedInternalValue]);


  useEffect(() => {
    if (setValue && typeof setValue === 'function') {
      setValue(setFormattedInternalValue);
    }
  }, [setValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setInternalValue("");
      onAmountChange?.("");
      return;
    }
    
    const rawValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = rawValue.split(".");
    if (parts.length > 2) return;

    if (parts[1] && parts[1].length > 8) return;
    
    onAmountChange?.(rawValue);
    
    setFormattedInternalValue(rawValue);
  };

  return (
    <div className="youpay-container">
      <div className={`outer-card ${error ? "error" : ""}`}>
        <div className="send-text">{headerTitle}</div>
        <div className="inner-card">
          <input
            type="text"
            className="amount-input"
            value={internalValue}
            onChange={handleInputChange}
            placeholder="0.00"
            inputMode="decimal"
            disabled={disabled}
          />
          <div className="youpay-info">
            <img src={logo} alt={`logo`} className="youpay-icon" />
            <span className="youpay-symbol">{symbol.toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSelector;