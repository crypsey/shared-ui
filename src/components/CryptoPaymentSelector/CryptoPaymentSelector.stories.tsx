import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CryptoPaymentSelector from "./CryptoPaymentSelector";
import { CryptoId } from "./CryptoPaymentSelector";

const meta = {
  title: "Components/CryptoPaymentSelector",
  component: CryptoPaymentSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component for selecting cryptocurrency payment methods. Supports Bitcoin, Ethereum, and Tether payment options.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CryptoPaymentSelector>;

export default meta;
type Story = StoryObj<typeof CryptoPaymentSelector>;

// Default state
export const Default: Story = {
  args: {},
};

// With preselected crypto
export const WithPreselectedCrypto: Story = {
  args: {
    defaultSelectedCrypto: "btc" as CryptoId,
  },
};

// Custom crypto options
export const CustomCryptoOptions: Story = {
  args: {
    cryptoOptions: [
      {
        id: "btc" as CryptoId,
        name: "Bitcoin",
        symbol: "BTC",
        price: "46,000",
        icon: "₿",
      },
      {
        id: "eth" as CryptoId,
        name: "Ethereum",
        symbol: "ETH",
        price: "3,200",
        icon: "Ξ",
      },
    ],
  },
};

// Mobile view
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
