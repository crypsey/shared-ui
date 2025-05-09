import type { Meta, StoryObj } from "@storybook/react";
import { TransferSummary, TransferSummaryProps } from "./TransferSummary";
import "./TransferSummary.css";

const meta: Meta<typeof TransferSummary> = {
  title: "Components/TransferSummary",
  component: TransferSummary,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onEditTransfer: { action: 'edit transfer clicked' },
    onEditReceiver: { action: 'edit receiver clicked' },
    onNextClick: { action: 'next button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TransferSummary>;

// Base transfer details for reuse
const baseTransferDetails = {
  receiveMethod: "test",
  receiveAccount: "test",
  transferAmount: "100.00 CAD",
  transferFee: "0.00 CAD",
  exchangeRate: {
    from: "1 CAD",
    to: "9,9247 BTC",
  },
  totalToReceipt: "100000,99999",
  totalAmount: "100.00 CAD",
};

// Base receiver details for reuse
const baseReceiverDetails = {
  name: "Test user",
  mobileAccount: "783682550",
  city: "toronto",
  reason: "Family or friend support",
};

export const DefaultSummary: Story = {
  args: {
    headerAmount: "10,000 WHAW",
    transferDetails: baseTransferDetails,
    receiverDetails: baseReceiverDetails,
  },
};

export const LargeAmountSummary: Story = {
  args: {
    headerAmount: "50,000 WHAW",
    transferDetails: {
      ...baseTransferDetails,
      transferAmount: "5,000.00 CAD",
      transferFee: "15.00 CAD",
      totalToReceipt: "4,996,235",
      totalAmount: "5,015.00 CAD",
    },
    receiverDetails: baseReceiverDetails,
  },
};

export const BusinessSummary: Story = {
  args: {
    headerAmount: "25,000 WHAW",
    transferDetails: {
      receiveMethod: "business",
      receiveAccount: "acme-corp-2023",
      transferAmount: "2,500.00 CAD",
      transferFee: "5.00 CAD",
      exchangeRate: {
        from: "1 CAD",
        to: "9,9247 BTC",
      },
      totalToReceipt: "248117,50",
      totalAmount: "2,505.00 CAD",
    },
    receiverDetails: {
      name: "Acme Corporation",
      mobileAccount: "9998887777",
      city: "Vancouver",
      reason: "Business expense",
    },
  },
};

export const InternationalSummary: Story = {
  args: {
    headerAmount: "15,000 WHAW",
    transferDetails: {
      receiveMethod: "international",
      receiveAccount: "global-123456",
      transferAmount: "200.00 USD",
      transferFee: "2.50 USD",
      exchangeRate: {
        from: "1 USD",
        to: "12,4567 BTC",
      },
      totalToReceipt: "249134,00",
      totalAmount: "202.50 USD",
    },
    receiverDetails: {
      name: "International User",
      mobileAccount: "447123456789",
      city: "London",
      reason: "Education support",
    },
  },
};

export const MobileSummaryView: Story = {
  args: {
    ...DefaultSummary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletSummaryView: Story = {
  args: {
    ...DefaultSummary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};