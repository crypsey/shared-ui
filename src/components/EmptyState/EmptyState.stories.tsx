// EmptyState.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { CreditCard, Inbox, FileX, Search } from "lucide-react";
import "./EmptyState.css";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoTransactions: Story = {
  args: {
    icon: CreditCard,
    title: "No transactions yet",
    message: "When you make your first transaction, it will appear here.",
    buttonText: "Send Money",
    onButtonClick: () => console.log("Send money clicked"),
  },
};

export const NoMessages: Story = {
  args: {
    icon: Inbox,
    title: "Your inbox is empty",
    message: "Messages from your conversations will appear here.",
    buttonText: "Start Chat",
    onButtonClick: () => console.log("Start chat clicked"),
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: Search,
    title: "No results found",
    message: "Try adjusting your search terms or filters.",
    buttonText: "Clear Filters",
    onButtonClick: () => console.log("Clear filters clicked"),
  },
};

export const NoFiles: Story = {
  args: {
    icon: FileX,
    title: "No files uploaded",
    message: "Upload your first file to get started.",
    buttonText: "Upload File",
    onButtonClick: () => console.log("Upload clicked"),
  },
};
