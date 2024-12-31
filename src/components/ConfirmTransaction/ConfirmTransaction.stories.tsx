import type { Meta, StoryObj } from "@storybook/react";
import ConfirmTransaction from "./ConfirmTransaction";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof ConfirmTransaction> = {
  title: "Components/ConfirmTransaction",
  component: ConfirmTransaction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onContinue: { action: "continued" },
    onCancel: { action: "cancelled" },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmTransaction>;

const defaultProps = {
  onContinue: action("continue clicked"),
  onCancel: action("cancel clicked"),
};

// Mock data for different transaction types
const creditCardData = {
  paymentDetails: {
    creditCardProvider: "VISA", // Added missing property
    cardNumber: "**** **** **** 1234",
  },
  transactionType: "CREDIT_CARD",
  amount: 1000,
};

const bankDepositData = {
  transactionType: "BANK_DEPOSIT",
  amount: 2000,
  paymentDetails: {
    accountNumber: "****5678",
    bankName: "Royal Bank",
    transitNumber: "12345",
    institutionNumber: "678",
  },
};

const eTransferData = {
  transactionType: "ETRANSFER",
  amount: 500,
  paymentDetails: {
    email: "alice@example.com",
  },
};

const cubaData = {
  transactionType: "CUBA",
  amount: 300,
  paymentDetails: {
    fullName: "alice@example.com",
    email: "heqjrfer@gmail.com",
    phoneNumber: "1234567890",
  },
  recipientName: "Carlos Rodriguez",
  cubaId: "CU123456789",
  province: "Havana",
  municipality: "Plaza",
};

export const CreditCardTransaction: Story = {
  args: {
    ...defaultProps,
    sendingMoneyData: creditCardData,
  },
};

// Add example of handling interaction
export const WithInteractions: Story = {
  args: {
    ...defaultProps,
    sendingMoneyData: creditCardData,
  },
  play: async ({ canvasElement }) => {},
};

export const BankDepositTransaction: Story = {
  args: {
    ...defaultProps,
    sendingMoneyData: bankDepositData,
  },
  play: async ({ canvasElement }) => {},
};

export const ETransferTransaction: Story = {
  args: {
    ...defaultProps,
    sendingMoneyData: eTransferData,
  },
  play: async ({ canvasElement }) => {},
};

export const CubaTransaction: Story = {
  args: {
    ...defaultProps,
    sendingMoneyData: cubaData,
  },
  play: async ({ canvasElement }) => {},
};
