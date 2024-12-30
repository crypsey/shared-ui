import type { Meta, StoryObj } from "@storybook/react";
import CryptoPayment from "./CryptoPayment";

const meta = {
  title: "Components/CryptoPayment",
  component: CryptoPayment,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A cryptocurrency payment component that displays payment details, QR code, and a countdown timer.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    details: {
      description:
        "Payment details including amount, address, and network information",
      control: "object",
    },
    onCopy: {
      description: "Callback function triggered when the address is copied",
      control: false,
    },
    className: {
      description: "Additional CSS classes to apply to the component",
      control: "text",
    },
    initialTime: {
      description: "Initial countdown time in seconds",
      control: { type: "number", min: 1, max: 3600 },
    },
    onTimeEnd: {
      description: "Callback function triggered when the timer reaches zero",
      control: false,
    },
  },
} satisfies Meta<typeof CryptoPayment>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    details: {
      amount: "100",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amountInUSD: "$1,250.00 USD",
      expiresIn: "24:00:00",
      network: "Ethereum",
    },
    className: "",
    initialTime: 30 * 60,
  },
};

// Bitcoin payment story
export const BitcoinPayment: Story = {
  args: {
    details: {
      amount: "0.05 BTC",
      address: "38p8hPVkaPFBQZ4fTD4Lviizp1NLCZNEKJ",
      amountInUSD: "$2,150.00 USD",
      expiresIn: "15:00:00",
      network: "Bitcoin",
    },
    className: "",
    initialTime: 30 * 60,
  },
};

// Short timer story
export const ShortTimer: Story = {
  args: {
    ...Default.args,
    initialTime: 30 * 60,
  },
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: "dark-theme",
  },
};

// Interactive story with copy functionality
export const WithCopyFeedback: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    // You can add interactions here using testing-library
    // For example, clicking the copy button and checking the feedback
  },
};

// Error state example
export const NetworkWarning: Story = {
  args: {
    details: {
      amount: "100 USDT",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amountInUSD: "$100.00 USD",
      expiresIn: "24:00:00",
      network: "Tether (ERC-20)",
    },
    className: "warning-state",
    initialTime: 30 * 60,
  },
};
