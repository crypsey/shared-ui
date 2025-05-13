import type { Meta, StoryObj } from "@storybook/react";
import AddReceiverForm from "./AddReceiverForm";

const meta: Meta<typeof AddReceiverForm> = {
  title: "Components/AddReceiverForm",
  component: AddReceiverForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSave: { action: "saved" },
  },
};

export default meta;
type Story = StoryObj<typeof AddReceiverForm>;

// Default empty form
export const Default: Story = {
  args: {},
};

// Pre-filled form
export const Filled: Story = {
  args: {
    onSave: undefined,
  },
  parameters: {
    initialFormData: {
      firstName: "John",
      middleName: "David",
      lastName: "Smith",
      mobileCountryCode: "250",
      mobileNumber: "789123456",
      city: "Kigali",
      reasonForSending: "Family Support",
    },
  },
};

// Mobile view
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
