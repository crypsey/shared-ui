import React, { useState, useRef, useEffect } from "react";
import "./SearchDropdown.css";
import { Item, SearchDropdownProps } from "./types";

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  placeholder = "Search items...",
  onSelect,
  onClear,
  items,
  maxResults,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [results, setResults] = useState<Item[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      // Filter results based on input
      let filteredResults = items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      // Apply max results limit if specified
      if (maxResults && filteredResults.length > maxResults) {
        filteredResults = filteredResults.slice(0, maxResults);
      }

      setResults(filteredResults);
      setIsOpen(filteredResults.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Handle item selection
  const handleSelectItem = (item: Item): void => {
    setSelectedItem(item);
    setInputValue("");
    setIsOpen(false);

    // Call the optional onSelect callback
    if (onSelect) {
      onSelect(item);
    }
  };

  // Clear selection
  const handleClearSelection = (item: Item): void => {
    setSelectedItem(null);
    setInputValue("");
    setResults([]);

    // Call the optional onClear callback
    if (onClear) {
      onClear(item);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      {/* Search Input */}
      {!selectedItem ? (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="search-input"
            placeholder={placeholder}
          />
          <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="clear-button"
              aria-label="Clear search"
              type="button"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        /* Selected Item Display */
        <div className="selected-item">
          <img
            src={selectedItem.icon || selectedItem.image}
            alt={selectedItem.name}
            className="selected-item-image"
          />
          <span className="selected-item-name">{selectedItem.name}</span>
          <button
            onClick={() => {
              handleClearSelection(selectedItem);
            }}
            className="selected-clear-button"
            aria-label="Remove selected item"
            type="button"
          >
            ×
          </button>
        </div>
      )}

      {/* Dropdown Results */}
      {/* {isOpen && (
        <div ref={dropdownRef} className="dropdown">
          {results.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelectItem(item)}
            >
              <img
                src={item?.icon || item?.image}
                alt={item.name}
                className="dropdown-item-image"
              />
              {item.name}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchDropdown;
