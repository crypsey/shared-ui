import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SearchDropdown from "./SearchDropdown";
import { Item } from "./types";

// Sample data for stories
const fruitItems: Item[] = [
  { name: "Apple", image: "apple" },
  { name: "Banana", image: "banana" },
  { name: "Cherry", image: "cherry" },
  { name: "Date", image: "date" },
  { name: "Elderberry", image: "elderberry" },
  { name: "Fig", image: "fig" },
  { name: "Grape", image: "grape" },
  { name: "Honeydew", image: "honeydew" },
  { name: "Kiwi", image: "kiwi" },
  { name: "Lemon", image: "lemon" },
];

// A longer list for pagination examples
const longFruitList: Item[] = [
  ...fruitItems,
  { name: "Mango", image: "mango" },
  { name: "Nectarine", image: "nectarine" },
  { name: "Orange", image: "orange" },
  { name: "Papaya", image: "papaya" },
  { name: "Quince", image: "quince" },
  { name: "Raspberry", image: "raspberry" },
  { name: "Strawberry", image: "strawberry" },
  { name: "Tangerine", image: "tangerine" },
  { name: "Watermelon", image: "watermelon" },
  { name: "Zucchini", image: "zucchini" },
];

// Meta information for the component
const meta: Meta<typeof SearchDropdown> = {
  title: "Components/SearchDropdown",
  component: SearchDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    maxResults: { control: { type: "range", min: 1, max: 20 } },
    onSelect: { action: "selected" },
    onClear: { action: "cleared" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchDropdown>;

// Base story with default props
export const Default: Story = {
  args: {
    items: fruitItems,
    placeholder: "Search fruits...",
  },
};

// Story with limited results
export const LimitedResults: Story = {
  args: {
    items: longFruitList,
    placeholder: "Search fruits (max 5 results)...",
    maxResults: 5,
  },
};

// Story with a custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    items: fruitItems,
    placeholder: "Type to find your favorite fruit...",
  },
};

// Story with a lot of items
export const ManyItems: Story = {
  args: {
    items: longFruitList,
    placeholder: "Search from many fruits...",
  },
};

// Story with mobile view
export const MobileView: Story = {
  args: {
    items: fruitItems,
    placeholder: "Search on mobile...",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
