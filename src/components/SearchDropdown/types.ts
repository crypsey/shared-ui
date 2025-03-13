export interface Item {
  name: string;
  image?: string;
  icon?: string;
}

export interface SearchDropdownProps {
  placeholder?: string;
  onSelect?: (item: Item) => void;
  onClear?: (item: Item) => void;
  items: Item[];
  maxResults?: number;
}
