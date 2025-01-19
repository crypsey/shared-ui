import type { Meta, StoryObj } from "@storybook/react";
import { ItemMenu } from "./ItemMenu";
import React, { useState, useRef } from "react";

const meta: Meta<typeof ItemMenu> = {
  title: "Components/ItemMenu",
  component: ItemMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ItemMenu>;

// Wrapper component to handle state
const ItemMenuWrapper = ({
  initialIsOpen = false,
}: {
  initialIsOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedToken, setSelectedToken] = useState<{
    symbol: string;
    name: string;
    icon: string;
  } | null>(null);

  return (
    <div className="p-4">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        {selectedToken ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedToken.icon}
              alt={selectedToken.name}
              className="w-6 h-6"
            />
            <span>{selectedToken.symbol}</span>
          </div>
        ) : (
          "Select Token"
        )}
      </button>

      <ItemMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(token) => {
          setSelectedToken(token);
          console.log("Selected token:", token);
        }}
        anchorRect={buttonRef.current?.getBoundingClientRect()}
        items={[
          {
            symbol: "ETH",
            name: "Ethereum",
            icon: "https://api.cryptapi.io/media/token_logos/btc.png",
          },
          {
            symbol: "USDT",
            name: "Tether",
            icon: "https://api.cryptapi.io/media/token_logos/btc.png",
          },
          {
            symbol: "BNB",
            name: "Binance Coin",
            icon: "https://api.cryptapi.io/media/token_logos/btc.png",
          },
          {
            symbol: "SOL",
            name: "Solana",
            icon: "https://api.cryptapi.io/media/token_logos/btc.png",
          },
        ]}
        title="Select Token"
      />
    </div>
  );
};

// Default story with closed menu
export const Default: Story = {
  render: () => <ItemMenuWrapper />,
};

// Story showing open menu
export const OpenMenu: Story = {
  render: () => <ItemMenuWrapper initialIsOpen={true} />,
};

// Story demonstrating interaction flow
export const InteractionFlow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the complete interaction flow of the ItemMenu component. Click the button to open the menu, select a token, and observe the selection being displayed.",
      },
    },
  },
  render: () => <ItemMenuWrapper />,
};

// Story with preselected token
export const WithPreselectedToken: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [selectedToken, setSelectedToken] = useState({
      symbol: "ETH",
      name: "Ethereum",
      icon: "/api/placeholder/32/32",
    });

    return (
      <div className="p-4">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <img
              src={selectedToken.icon}
              alt={selectedToken.name}
              className="w-6 h-6"
            />
            <span>{selectedToken.symbol}</span>
          </div>
        </button>

        <ItemMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(token) => {
            setSelectedToken(token);
            console.log("Selected token:", token);
          }}
          anchorRect={buttonRef.current?.getBoundingClientRect()}
          items={[
            {
              symbol: "ETH",
              name: "Ethereum",
              icon: "https://api.cryptapi.io/media/token_logos/btc.png",
            },
            {
              symbol: "USDT",
              name: "Tether",
              icon: "https://api.cryptapi.io/media/token_logos/btc.png",
            },
            {
              symbol: "BNB",
              name: "Binance Coin",
              icon: "https://api.cryptapi.io/media/token_logos/btc.png",
            },
            {
              symbol: "SOL",
              name: "Solana",
              icon: "https://api.cryptapi.io/media/token_logos/btc.png",
            },
          ]}
          title="Select Token"
        />
      </div>
    );
  },
};

// Story with custom styling (you'll need to ensure the CSS is properly loaded)
export const CustomStyling: Story = {
  decorators: [
    (Story) => (
      <div className="custom-theme">
        <Story />
      </div>
    ),
  ],
  render: () => <ItemMenuWrapper />,
};
