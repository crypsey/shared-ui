import { Meta, StoryObj } from "@storybook/react";
import { RecentActivity, Transaction } from "./RecentActivity";

const meta: Meta<typeof RecentActivity> = {
  title: "Components/RecentActivity",
  component: RecentActivity,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecentActivity>;

// Mock data and functions
const mockTransactions: Transaction[] = [
  {
    sender: "John Doe",
    amount: 100.5,
    recipient: "Jane Smith",
    timeAgo: "2 minutes ago",
    created_at: "2 minutes ago",
  },
  {
    sender: "Alice Johnson",
    amount: 50.75,
    recipient: "Bob Wilson",
    timeAgo: "5 minutes ago",
    created_at: "5 minutes ago",
  },
];

const mockGetTransactionInfo = (transaction: Transaction) => ({
  sender: transaction.sender,
  receiver: transaction.recipient,
  initials: transaction.sender
    .split(" ")
    .map((n) => n[0])
    .join(""),
  created_at: transaction.created_at || transaction.timeAgo,
});

// Stories
export const Default: Story = {
  args: {
    transactions: mockTransactions,
    isConnected: true,
    getTransactionInfo: mockGetTransactionInfo,
  },
};

export const Loading: Story = {
  args: {
    transactions: [],
    isConnected: true,
    getTransactionInfo: mockGetTransactionInfo,
  },
};

export const WithCustomFormatting: Story = {
  args: {
    transactions: mockTransactions,
    isConnected: true,
    getTransactionInfo: mockGetTransactionInfo,
    formatCurrency: (amount) => `€${amount.toFixed(2)}`,
  },
};

export const WithClickHandler: Story = {
  args: {
    transactions: mockTransactions,
    isConnected: true,
    getTransactionInfo: mockGetTransactionInfo,
    onTransactionClick: (transaction) =>
      alert(
        `Clicked transaction: ${transaction.sender} -> ${transaction.recipient}`
      ),
  },
};
