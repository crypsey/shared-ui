import React, { useState, useRef, useEffect, JSX } from "react";
import {
  CreditCard,
  Wallet,
  PiggyBank,
  Building2,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import "./ReceiverOption.css";

type AccountType = "checking" | "savings" | "business" | "wallet";

interface AccountTypeConfig {
  icon: LucideIcon;
  color: string;
}

interface Account {
  id: string;
  name: string;
  number: string;
  type: AccountType;
}

type AccountTypes = {
  [K in AccountType]: AccountTypeConfig;
};

const accountTypes: AccountTypes = {
  checking: {
    icon: CreditCard,
    color: "icon-checking",
  },
  savings: {
    icon: PiggyBank,
    color: "icon-savings",
  },
  business: {
    icon: Building2,
    color: "icon-business",
  },
  wallet: {
    icon: Wallet,
    color: "icon-wallet",
  },
};

const accounts: Account[] = [
  {
    id: "1",
    name: "Personal Checking",
    number: "**** 1234",
    type: "checking",
  },
  {
    id: "2",
    name: "Savings Account",
    number: "**** 5678",
    type: "savings",
  },
  {
    id: "3",
    name: "Business Account",
    number: "**** 9012",
    type: "business",
  },
  {
    id: "4",
    name: "Digital Wallet",
    number: "**** 3456",
    type: "wallet",
  },
];

interface ReceiverOptionProps {
  onAccountChange?: (account: Account | null) => void;
  defaultAccount?: string;
}

const ReceiverOption: React.FC<ReceiverOptionProps> = ({
  onAccountChange,
  defaultAccount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(
    defaultAccount
      ? accounts.find((acc) => acc.id === defaultAccount) || null
      : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAccountIcon = (type: AccountType): JSX.Element | null => {
    const accountType = accountTypes[type];
    if (!accountType) return null;

    const IconComponent = accountType.icon;
    return (
      <div className={`recv-container ${accountType.color}`}>
        <IconComponent className="icon" />
      </div>
    );
  };

  const handleSelect = (account: Account): void => {
    setSelectedAccount(account);
    setIsOpen(false);
    onAccountChange?.(account);
  };

  return (
    <div className="bank-selector" ref={dropdownRef}>
      <div className="selector-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="trigger-content">
          {selectedAccount ? (
            <>
              {getAccountIcon(selectedAccount.type)}
              <div className="account-info">
                <span className="account-name">{selectedAccount.name}</span>
              </div>
            </>
          ) : (
            <>
              {getAccountIcon("checking")}
              <span className="account-name">Select reciving method</span>
            </>
          )}
        </div>
        <ChevronDown className={`chevron ${isOpen ? "open" : ""}`} size={20} />
      </div>

      <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
        {accounts.map((account) => (
          <div
            key={account.id}
            className="dropdown-item"
            onClick={() => handleSelect(account)}
          >
            {getAccountIcon(account.type)}
            <div className="account-info">
              <span className="account-name">{account.name}</span>
              <span className="account-number">{account.number}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverOption;
