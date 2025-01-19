import type { Meta, StoryObj } from "@storybook/react";
import YouPay from "./AssetSelector";

const meta: Meta<typeof YouPay> = {
  title: "Components/AssetSelector",
  component: YouPay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof YouPay>;

const mockTokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://api.cryptapi.io/media/token_logos/btc.png",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "https://api.cryptapi.io/media/token_logos/btc.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://api.cryptapi.io/media/token_logos/btc.png",
  },
];

// Default state
export const Default: Story = {
  args: {
    initialAmount: "100.00",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
  },
};

// Empty state
export const Empty: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "100.00",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
    disabled: true,
  },
};

// Error state
export const Error: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "100.00",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
    error: true,
  },
};

// With different initial token
export const DifferentToken: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "100.00",
    initialToken: mockTokens[1],
    items: mockTokens,
    dropdownTitle: "Select Token",
  },
};

// Interactive example with event handlers
export const Interactive: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "100.00",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
    onAmountChange: (value) => console.log("Amount changed:", value),
    onItemChange: (token) => console.log("Token changed:", token),
  },
};

// With many tokens
export const ManyTokens: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "100.00",
    initialToken: mockTokens[0],
    items: [
      ...mockTokens,
      {
        symbol: "DAI",
        name: "Dai Stablecoin",
        icon: "https://api.cryptapi.io/media/token_logos/btc.png",
      },
      {
        symbol: "USDT",
        name: "Tether",
        icon: "https://api.cryptapi.io/media/token_logos/btc.png",
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        icon: "https://api.cryptapi.io/media/token_logos/btc.png",
      },
    ],
    dropdownTitle: "Select Token",
  },
};

// With custom initial amount
export const CustomAmount: Story = {
  args: {
    headerTitle: "Send",
    initialAmount: "1234.5678",
    initialToken: mockTokens[0],
    items: mockTokens,
    dropdownTitle: "Select Token",
  },
};
