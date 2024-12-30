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
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    fee: "~$1.50",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-purple-100",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Tether",
    symbol: "USDT",
    fee: "~$1.00",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-green-100",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    fee: "~$0.30",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-blue-100",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Solana",
    symbol: "SOL",
    fee: "~$0.25",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-purple-100",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    fee: "~$0.20",
    icon: "https://api.cryptapi.io/media/token_logos/bch.png",
    color: "bg-yellow-100",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
];

export const Default = () => (
  <CryptoPaymentSelector
    onPaymentSelect={(symbol, address) => {
      console.log("Selected address:", symbol, address);
    }}
    onSubmit={() => {}}
    options={options}
  />
);
