import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { TransactionModal } from "./TransactionModal";
import type { TransactionDetails } from "./TransactionModal";

// Define the meta object
const meta: Meta<typeof TransactionModal> = {
  title: "Components/TransactionModal",
  component: TransactionModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      defaultValue: true,
    },
    onClose: { action: "closed" },
    transaction: {
      control: "object",
    },
  },
};

// Export the meta object as default
export default meta;

type Story = StoryObj<typeof TransactionModal>;

// Sample transaction data
const sampleTransaction: TransactionDetails = {
  recipient: "alex.eth",
  amountCAD: 1500.5,
  amountCrypto: 0.45632,
  cryptoSymbol: "ETH",
  status: "completed",
  timestamp: "2024-01-05 14:30:25",
};

// Stories
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: sampleTransaction,
  },
};

export const PendingTransaction: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: {
      ...sampleTransaction,
      status: "pending",
      recipient: "bob.eth",
      amountCAD: 2750.75,
      amountCrypto: 0.82145,
      timestamp: "2024-01-05 15:45:30",
      currency: "CAD",
    },
  },
};

export const WithoutTimestamp: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: {
      ...sampleTransaction,
      timestamp: undefined,
      recipient: "carol.eth",
      amountCAD: 500.25,
      amountCrypto: 0.15428,
    },
  },
};

export const BitcoinTransaction: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: {
      ...sampleTransaction,
      cryptoSymbol: "BTC",
      recipient: "dave.btc",
      amountCAD: 3500.0,
      amountCrypto: 0.08254,
      timestamp: "2024-01-05 16:20:15",
    },
  },
};

export const ClosedModal: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    transaction: sampleTransaction,
  },
};
