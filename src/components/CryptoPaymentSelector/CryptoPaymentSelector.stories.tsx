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
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-orange-100",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    fee: "~$1.50",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-purple-100",
  },
  {
    name: "Tether",
    symbol: "USDT",
    fee: "~$1.00",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-green-100",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    fee: "~$0.30",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-blue-100",
  },
  {
    name: "Solana",
    symbol: "SOL",
    fee: "~$0.25",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-purple-100",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    fee: "~$0.20",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
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
