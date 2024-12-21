import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "The visual style of the button",
    },
    children: {
      control: "text",
      description: "The content to be displayed inside the button",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary variant
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

// With long text
export const LongText: Story = {
  args: {
    children: "This is a button with very long text content",
    variant: "primary",
  },
};

// With click handler
export const WithClickHandler: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};
