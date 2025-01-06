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
  amount: 1001,
  value: 0.0045,
  network: "Ethereum",
  status: "PENDING",
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
      status: "PENDING",
      amount: 1001,
      value: 0.0045,
      network: "Ethereum",
      timestamp: "2024-01-05 15:45:30",
      currency: "CAD",
      paymentDetails: {
        email: "pmuhire2@mail.com",
      },
    },
  },
};

export const WithoutTimestamp: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: {
      ...sampleTransaction,
      status: "COMPLETED",
      timestamp: undefined,
      amount: 1001,
      value: 0.0045,
      network: "Ethereum",
      paymentDetails: {
        accountNumber: "pmuhire2@mail.com",
      },
    },
  },
};

export const BitcoinTransaction: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    transaction: {
      ...sampleTransaction,
      amount: 1001,
      value: 0.0045,
      network: "Ethereum",
      timestamp: "2024-01-05 16:20:15",
      paymentDetails: {
        cardNumber: "pmuhire2@mail.com",
      },
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
