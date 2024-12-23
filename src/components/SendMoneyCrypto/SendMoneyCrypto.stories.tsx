import type { Meta, StoryObj } from "@storybook/react";
import SendMoneyCrypto from "./SendMoneyCrypto";

const meta: Meta<typeof SendMoneyCrypto> = {
  title: "Components/SendMoneyCrypto",
  component: SendMoneyCrypto,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A cryptocurrency exchange interface component that handles BTC to CAD conversions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    initialAmount: {
      control: "text",
      description: "The initial amount to display in the exchange",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "100.00" },
      },
    },
    onAmountChange: {
      action: "amount changed",
      description: "Callback fired when the amount changes",
      table: {
        type: { summary: "(amount: string) => void" },
      },
    },
    onNextClick: {
      action: "next clicked",
      description: "Callback fired when the next button is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta<typeof SendMoneyCrypto>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    initialAmount: "100.00",
  },
};

// Large amount story
export const LargeAmount: Story = {
  args: {
    initialAmount: "1000000.00",
  },
};

// Small amount story
export const SmallAmount: Story = {
  args: {
    initialAmount: "0.50",
  },
};

// Interactive story with all callbacks
export const Interactive: Story = {
  args: {
    initialAmount: "100.00",
    onAmountChange: (amount) => console.log("Amount changed:", amount),
    onNextClick: () => console.log("Next button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "An interactive version of the exchange component with all callbacks enabled.",
      },
    },
  },
};

// Mobile viewport story
export const Mobile: Story = {
  args: {
    initialAmount: "100.00",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Exchange component displayed in a mobile viewport.",
      },
    },
  },
};

// Dark mode story
export const DarkMode: Story = {
  args: {
    initialAmount: "100.00",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      description: {
        story: "Exchange component in dark mode.",
      },
    },
  },
};
