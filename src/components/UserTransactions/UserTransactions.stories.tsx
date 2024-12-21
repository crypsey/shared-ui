import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  UserTransactions,
  TransactionStatus,
  TransactionProps,
} from "./UserTransactions";
import EmptyState from "../EmptyState/EmptyState";
import { CreditCard, Inbox, FileX, Search } from "lucide-react";

const meta: Meta<typeof UserTransactions> = {
  title: "Components/UserTransactions",
  component: UserTransactions,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UserTransactions>;

// Mock data
const mockTransactions: TransactionProps[] = [
  {
    currency: "USD",
    status: TransactionStatus.COMPLETED,
    _id: "1",
    userId: "user1",
    amount: 100.5,
    transactionType: "TRANSFER",
    description: "Payment for services",
    paymentDetails: {},
    reference: "REF123",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
    __v: 0,
    formattedAmount: "$100.50",
    id: "1",
  },
  {
    currency: "USD",
    status: TransactionStatus.COMPLETED,
    _id: "2",
    userId: "user2",
    amount: 75.25,
    transactionType: "TRANSFER",
    description: "Monthly subscription",
    paymentDetails: {},
    reference: "REF124",
    createdAt: "2024-03-19T15:30:00Z",
    updatedAt: "2024-03-19T15:30:00Z",
    __v: 0,
    formattedAmount: "$75.25",
    id: "2",
  },
];

const mockGetTransactionInfo = (transaction: TransactionProps) => ({
  initials: "JS",
  receiver: "John Smith",
  created_at: new Date(transaction.createdAt).toLocaleDateString(),
});

const EmptyStateComponent = () => (
  <EmptyState
    icon={CreditCard}
    title="No transactions yet"
    message="When you make your first transaction, it will appear here."
    buttonText="send money"
    onButtonClick={() => {
      console.log("Send money clicked");
    }}
  />
);

// Stories
export const Default: Story = {
  args: {
    recentTransactions: { data: mockTransactions },
    getTransactionInfo: mockGetTransactionInfo,
    formatCurrency: (amount) => `$${amount.toFixed(2)}`,
  },
};

export const Empty: Story = {
  args: {
    recentTransactions: { data: [] },
    EmptyStateComponent: EmptyStateComponent,
    getTransactionInfo: mockGetTransactionInfo,
    formatCurrency: (amount) => `$${amount.toFixed(2)}`,
  },
};

export const WithCustomTitle: Story = {
  args: {
    recentTransactions: { data: mockTransactions },
    getTransactionInfo: mockGetTransactionInfo,
    formatCurrency: (amount) => `$${amount.toFixed(2)}`,
    title: "Payment History",
  },
};

export const WithClickHandler: Story = {
  args: {
    recentTransactions: { data: mockTransactions },
    getTransactionInfo: mockGetTransactionInfo,
    formatCurrency: (amount) => `$${amount.toFixed(2)}`,
    onTransactionClick: (transaction) =>
      alert(`Clicked transaction: ${transaction.id}`),
  },
};
