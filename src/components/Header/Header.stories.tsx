// Header.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import "./Header.css";
import "../../styles/fonts.css";

const placeholderLogo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  args: {
    logoSrc: placeholderLogo,
    logoText: "VugaPay",
    isLoggedIn: false,
    onActionClick: () => console.log("Get Started clicked"),
  },
};

export const LoggedIn: Story = {
  args: {
    logoSrc: placeholderLogo,
    logoText: "VugaPay",
    isLoggedIn: true,
    onActionClick: () => console.log("Logout clicked"),
  },
};

export const CustomHomeUrl: Story = {
  args: {
    logoSrc: placeholderLogo,
    logoText: "VugaPay",
    homeUrl: "/custom-dashboard",
    onActionClick: () => console.log("Action clicked"),
  },
};
