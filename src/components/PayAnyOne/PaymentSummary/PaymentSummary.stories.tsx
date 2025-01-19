// PaymentSummary.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import PaymentSummary from "./PaymentSummary";

// Meta information for the component
const meta: Meta<typeof PaymentSummary> = {
  title: "Components/PaymentSummary",
  component: PaymentSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalFees: {
      description: "The total fees amount with currency",
      defaultValue: "0.00 CAD",
      control: "text",
    },
    totalAmount: {
      description: "The total amount with currency",
      defaultValue: "100.00 CAD",
      control: "text",
    },
    onNext: {
      description: "Callback function when Next button is clicked",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentSummary>;

// Default state
export const Default: Story = {
  args: {
    totalFees: "0.00 CAD",
    totalAmount: "100.00 CAD",
  },
};

// With custom fees
export const WithFees: Story = {
  args: {
    totalFees: "10.00 CAD",
    totalAmount: "110.00 CAD",
  },
};

// Large amount
export const LargeAmount: Story = {
  args: {
    totalFees: "100.00 CAD",
    totalAmount: "1,000.00 CAD",
  },
};

// Different currency
export const DifferentCurrency: Story = {
  args: {
    totalFees: "0.00 USD",
    totalAmount: "100.00 USD",
  },
};

// Long numbers (edge case)
export const LongNumbers: Story = {
  args: {
    totalFees: "1,234,567.89 CAD",
    totalAmount: "9,999,999.99 CAD",
  },
};

// Custom onClick handler example
export const WithCustomHandler: Story = {
  args: {
    totalFees: "0.00 CAD",
    totalAmount: "100.00 CAD",
    onNext: () => alert("Next button clicked!"),
  },
};
