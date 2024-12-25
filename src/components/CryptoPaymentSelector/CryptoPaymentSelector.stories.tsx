import React from "react";
import { LucideIcon } from "lucide-react";
import CryptoPaymentSelector from "../CryptoPaymentSelector/CryptoPaymentSelector";
import { CryptoOption } from "../CryptoPaymentSelector/CryptoPaymentSelector";

export default {
  title: "CryptoPaymentSelector",
  component: CryptoPaymentSelector,
};

const options: CryptoOption[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    fee: "~$2.50",
    icon: () => <span className="text-orange-500">₿</span>,
    color: "bg-orange-100",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    fee: "~$1.50",
    icon: () => <span className="text-purple-500">Ξ</span>,
    color: "bg-purple-100",
  },
  {
    name: "Tether",
    symbol: "USDT",
    fee: "~$1.00",
    icon: () => <span className="text-green-500">$</span>,
    color: "bg-green-100",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    fee: "~$0.30",
    icon: () => <span className="text-blue-500">₳</span>,
    color: "bg-blue-100",
  },
  {
    name: "Solana",
    symbol: "SOL",
    fee: "~$0.25",
    icon: () => <span className="text-purple-500">◎</span>,
    color: "bg-purple-100",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    fee: "~$0.20",
    icon: () => <span className="text-yellow-500">Ð</span>,
    color: "bg-yellow-100",
  },
];

export const Default = () => (
  <CryptoPaymentSelector
    onPaymentSelect={() => {}}
    onSubmit={() => {}}
    options={options}
  />
);
