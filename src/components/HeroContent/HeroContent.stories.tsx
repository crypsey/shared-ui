// HeroContent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { HeroContent } from "./HeroContent";
import "./HeroContent.css";

const meta: Meta<typeof HeroContent> = {
  title: "Components/HeroContent",
  component: HeroContent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HeroContent>;

export const PaymentHero: Story = {
  args: {
    tagText: "Zero fees",
    headingText: "Send money from a\\nCredit card to:",
    rotatingMethods: ["Bank account", "Credit card", "E-transfer"],
    buttonText: "Get Started",
    description:
      "VugaPay turns your credit card into instant cash. Send money to anyone's bank or pay other credit cards in seconds. It's as simple as sending a text!",
    onButtonClick: () => console.log("Get Started clicked"),
  },
};

export const InvestmentHero: Story = {
  args: {
    tagText: "Smart Investing",
    headingText: "Invest in\\nthe future with:",
    rotatingMethods: ["Stocks", "Crypto", "ETFs", "Bonds"],
    buttonText: "Start Investing",
    description:
      "Start your investment journey with our easy-to-use platform. Choose from multiple investment options and grow your wealth with confidence.",
    onButtonClick: () => console.log("Start Investing clicked"),
  },
};

export const CustomTiming: Story = {
  args: {
    ...PaymentHero.args,
    rotationInterval: 3000,
    fadeAnimationDuration: 300,
  },
};
