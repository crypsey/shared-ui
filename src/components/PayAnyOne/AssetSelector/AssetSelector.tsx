import React, {
  useState,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { ItemMenu } from "../ItemMenu/ItemMenu";
import "./AssetSelector.css";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface AssetSelectorProps {
  headerTitle: string;
  initialAmount?: string;
  currency?: string;
  currencyIcon?: string;
  disabled?: boolean;
  error?: boolean;
  initialToken: Token;
  onAmountChange?: (value: string) => void;
  onItemChange?: (token: Token) => void;
  items: Token[];
  dropdownTitle: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  headerTitle,
  initialAmount = "100.00",
  disabled,
  error,
  initialToken,
  onAmountChange,
  onItemChange,
  items,
  dropdownTitle,
  setValue: externalSetValue,
}) => {
  const [internalValue, setInternalValue] = useState<string>(initialAmount);
  const [selectedItem, setSelectedItem] = useState<Token>(initialToken);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tokenSectionRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<DOMRect | undefined>();

  const setValue = externalSetValue || setInternalValue;
  const value = externalSetValue ? internalValue : internalValue;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setValue("");
      onAmountChange?.("");
      return;
    }
    const cleanedValue = inputValue.replace(/[^\d.]/g, "");
    const parts = cleanedValue.split(".");
    if (parts.length > 2) return;

    // Limit decimal places to 8 (standard for crypto)
    if (parts[1] && parts[1].length > 8) return;

    setValue(cleanedValue);
    onAmountChange?.(cleanedValue);
  };

  const handleTokenClick = () => {
    if (disabled) return;
    const rect = tokenSectionRef.current?.getBoundingClientRect();
    setMenuPosition(rect);
    setIsMenuOpen(true);
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedItem(token);
    onItemChange?.(token);
  };

  return (
    <div className="youpay-container">
      <div className={`outer-card ${error ? "error" : ""}`}>
        <p className="send-text">{headerTitle}</p>
        <div className="inner-card">
          <input
            type="text"
            className="amount-input"
            value={value}
            onChange={handleInputChange}
            placeholder="0.00"
            inputMode="decimal"
            disabled={disabled}
          />
          <div
            ref={tokenSectionRef}
            onClick={handleTokenClick}
            className="youpay-info"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleTokenClick();
              }
            }}
          >
            <img
              src={selectedItem.icon}
              alt={`${selectedItem.name} logo`}
              className="youpay-icon"
            />
            <span className="youpay-symbol">{selectedItem.symbol}</span>
          </div>
        </div>
      </div>
      <ItemMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelect={handleTokenSelect}
        anchorRect={menuPosition}
        items={items}
        title={dropdownTitle}
      />
    </div>
  );
};

export default AssetSelector;
