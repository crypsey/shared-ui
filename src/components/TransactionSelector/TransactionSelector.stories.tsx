import type { Meta, StoryObj } from "@storybook/react";
import { TransactionSelector } from "./TransactionSelector";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/TransactionSelector",
  component: TransactionSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A search interface component for selecting country and stablecoin during transaction creation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onComplete: {
      description:
        "Callback fired when both country and stablecoin are selected",
    },
    initialCountry: {
      description: "Pre-selected country",
      control: { type: "text" },
    },
    initialStablecoin: {
      description: "Pre-selected stablecoin",
      control: { type: "text" },
    },
    availableCountries: {
      description: "List of available countries",
      control: { type: "object" },
    },
    availableStablecoins: {
      description: "List of available stablecoins",
      control: { type: "object" },
    },
    className: {
      description: "Additional CSS class names",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof TransactionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    onComplete: (selection) => {
      action("onComplete")(selection);
      console.log("Simulating form submission...", selection);
      return new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};

// Pre-selected values
// export const WithPreselectedValues: Story = {
//   args: {
//     onComplete: action("onComplete"),
//     initialCountry: "United States",
//     initialStablecoin: "USDT (Tether)",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "TransactionSelector with pre-selected country and stablecoin values.",
//       },
//     },
//   },
// };

const DEFAULT_COUNTRIES = [
  {
    name: "United States",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
  {
    name: "United Kingdom",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
  {
    name: "Canada",
    icon: "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  },
];

const DEFAULT_STABLECOINS = [
  {
    name: "USDT (Tether)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
  {
    name: "USDC (USD Coin)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
  {
    name: "BUSD (Binance USD)",
    icon: "https://api.cryptapi.io/media/token_logos/eurc_ethereum_XXqmqFq.png",
    coin: "USDT",
    logo: "https://api.cryptapi.io/media/token_logos/usdt.png",
    ticker: "usdt",
    minimum_transaction: 5000,
    minimum_transaction_coin: "usdt",
    minimum_fee: 500,
    minimum_fee_coin: "usdt",
    fee_percent: "0.5",
    network_fee_estimation: "0.00042",
  },
];

// Limited options
export const LimitedOptions: Story = {
  args: {
    onComplete: action("onComplete"),
    availableCountries: DEFAULT_COUNTRIES,
    availableStablecoins: DEFAULT_STABLECOINS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "TransactionSelector with a limited set of countries and stablecoins.",
      },
    },
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    onComplete: action("onComplete"),
    className: "custom-theme",
  },
  parameters: {
    docs: {
      description: {
        story: "TransactionSelector with custom CSS class applied.",
      },
    },
  },
};

// Mobile view
export const MobileView: Story = {
  args: {
    onComplete: action("onComplete"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "TransactionSelector displayed in mobile viewport.",
      },
    },
  },
};

// Loading state simulation
export const LoadingSimulation: Story = {
  args: {
    onComplete: (selection) => {
      action("onComplete")(selection);
      console.log("Simulating form submission...", selection);
      return new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "TransactionSelector with simulated loading state on form submission.",
      },
    },
  },
};
