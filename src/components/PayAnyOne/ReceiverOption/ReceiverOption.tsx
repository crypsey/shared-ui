import React, { useState, useRef, useEffect, JSX } from "react";

import {
  CreditCard,
  Building2,
  LucideIcon,
  ChevronDown,
  Building,
  Smartphone,
  Send,
  MessageSquare,
  CircleDollarSign,
} from "lucide-react";
import "./ReceiverOption.css";

type AccountType =
  | "bank"
  | "mobileWallet"
  | "cashPickUp"
  | "UPI"
  | "aliPay"
  | "weChat"
  | "paypal"
  | "crypto";

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
  bank: {
    icon: Building,
    color: "icon-checking",
  },
  mobileWallet: {
    icon: Smartphone,
    color: "icon-business",
  },
  cashPickUp: {
    icon: Building2,
    color: "icon-wallet",
  },
  UPI: {
    icon: Send,
    color: "icon-wallet",
  },
  aliPay: {
    icon: CreditCard,
    color: "icon-wallet",
  },
  weChat: {
    icon: MessageSquare,
    color: "icon-wallet",
  },
  paypal: {
    icon: CreditCard,
    color: "icon-savings",
  },
  crypto: {
    icon: CircleDollarSign,
    color: "icon-wallet",
  },
};

const defaultAccounts: Account[] = [
  {
    id: "1",
    name: "bank",
    number: "**** 1234",
    type: "bank",
  },
  {
    id: "2",
    name: "mobileWallet",
    number: "**** 5678",
    type: "mobileWallet",
  },
  {
    id: "3",
    name: "cashPickUp",
    number: "**** 9012",
    type: "cashPickUp",
  },
  {
    id: "4",
    name: "UPI",
    number: "**** 3456",
    type: "UPI",
  },
  {
    id: "5",
    name: "aliPay",
    number: "**** 3456",
    type: "aliPay",
  },
  {
    id: "6",
    name: "Digital Wallet",
    number: "**** 3456",
    type: "weChat",
  },
];

interface ReceiverOptionProps {
  accounts?: Account[];
  onAccountChange?: (account: Account | null) => void;
  defaultAccount?: string;
}

const ReceiverOption: React.FC<ReceiverOptionProps> = ({
  accounts = [],
  onAccountChange,
  defaultAccount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayAccounts, setDisplayAccounts] = useState<Account[]>(
    accounts.length > 0 ? accounts : defaultAccounts
  );

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(
    defaultAccount
      ? accounts.find((acc) => acc.id === defaultAccount) || null
      : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayAccounts(accounts.length > 0 ? accounts : defaultAccounts);
  }, [accounts]);

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
              {getAccountIcon("bank")}
              <span className="account-name">Select reciving method</span>
            </>
          )}
        </div>
        <ChevronDown className={`chevron ${isOpen ? "open" : ""}`} size={20} />
      </div>

      <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
        {accounts.map((account) => (
          <div
            key={account.name}
            className="dropdown-item"
            onClick={() => handleSelect(account)}
          >
            {getAccountIcon(account.type)}
            <div className="account-info">
              <span className="account-name">{account.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverOption;
