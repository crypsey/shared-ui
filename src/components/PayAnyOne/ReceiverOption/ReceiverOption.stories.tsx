import type { Meta, StoryObj } from "@storybook/react";
import ReceiverOption from "./ReceiverOption";
import React from "react";

const meta: Meta<typeof ReceiverOption> = {
  title: "Components/ReceiverOption",
  component: ReceiverOption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onAccountChange: {
      description: "Callback function when account selection changes",
      control: false,
    },
    defaultAccount: {
      description: "Default selected account ID",
      control: "select",
      options: ["1", "2", "3", "4"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReceiverOption>;

// Default state with no selection
export const Default: Story = {
  args: {},
};

// Pre-selected account
export const WithDefaultSelection: Story = {
  args: {
    defaultAccount: "1",
  },
};

// Interactive example with callback
export const WithCallback: Story = {
  args: {
    onAccountChange: (account) => {
      console.log("Selected account:", account);
    },
  },
};

// Different account types showcase
export const AllAccountTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ReceiverOption defaultAccount="1" />
      <ReceiverOption defaultAccount="2" />
      <ReceiverOption defaultAccount="3" />
      <ReceiverOption defaultAccount="4" />
    </div>
  ),
};

// Mobile view (constrained width)
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div style={{ width: "100%", maxWidth: "320px" }}>
      <ReceiverOption />
    </div>
  ),
};

// Error state example
export const ErrorState: Story = {
  render: () => {
    const errorStyle = {
      border: "1px solid #DC2626",
      borderRadius: "16px",
      padding: "8px",
    };

    return (
      <div style={errorStyle}>
        <ReceiverOption
          onAccountChange={(account) => {
            console.log("Selected account:", account);
          }}
        />
        <div
          style={{
            color: "#DC2626",
            fontSize: "14px",
            marginTop: "4px",
            paddingLeft: "8px",
          }}
        >
          Please select a bank account
        </div>
      </div>
    );
  },
};

// Loading state
export const LoadingState: Story = {
  render: function LoadingExample() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div
          style={{
            width: "400px",
            height: "80px",
            borderRadius: "16px",
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        >
          <style>
            {`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}
          </style>
        </div>
      );
    }

    return <ReceiverOption />;
  },
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div style={{ opacity: 0.5, pointerEvents: "none" }}>
      <ReceiverOption defaultAccount="1" />
    </div>
  ),
};

// Custom styling example
export const CustomStyling: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "24px",
      }}
    >
      <ReceiverOption />
    </div>
  ),
};
