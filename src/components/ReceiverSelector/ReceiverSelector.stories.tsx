import React from "react";
import ResponsiveContactSelector from "./ReceiverSelector";
import { Receiver } from "./ReceiverSelector";

export default {
  title: "Components/ContactSelector",
  component: ResponsiveContactSelector,
  parameters: {
    layout: "centered",
  },
};

// Mock data
const mockReceivers: Receiver[] = [
  {
    id: 1,
    name: "Patrick Muhire",
    phone: "+250 78 943 8209",
    contryflag: "CA",
  },
  { id: 2, name: "Jane Doe", phone: "+250 78 123 4567", contryflag: "CA" },
];

// Template
const Template = (args: any) => <ResponsiveContactSelector {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  receivers: mockReceivers,
  onAddReceiver: () => alert("Add receiver clicked"),
  onSelectReceiver: (receiver: Receiver) =>
    alert(`Selected receiver: ${receiver.name}`),
  onMoreOptions: (receiver: Receiver) =>
    alert(`More options for: ${receiver.name}`),
};
