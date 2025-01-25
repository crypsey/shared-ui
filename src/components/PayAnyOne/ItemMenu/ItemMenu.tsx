import React from "react";
import "./ItemMenu.css";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface ItemMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  anchorRect?: DOMRect;
  items: Token[];
  title: string;
}

export const ItemMenu: React.FC<ItemMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  anchorRect,
  items,
  title,
}) => {
  if (!isOpen || !anchorRect) return null;

  return (
    <>
      <div className="token-menu-backdrop" onClick={onClose} />
      <div
        className="token-menu"
        style={{
          top: anchorRect.bottom,
          left: anchorRect.left - 5,
        }}
      >
        <div className="token-menu-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="token-list">
          {items.map((token) => (
            <button
              key={token.symbol}
              className="token-option"
              onClick={() => {
                onSelect(token);
                onClose();
              }}
            >
              <img src={token.icon} alt={token.name} className="token-icon" />
              <div className="token-info">
                <span className="token-symbol">{token.name}</span>
                <span className="token-name">{token.symbol}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemMenu;
