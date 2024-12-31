import React from "react";
import { LucideIcon } from "lucide-react";
import "./EmptyState.css";

export interface EmptyStateProps {
  /**
   * The icon to display (Lucide icon component)
   */
  icon: LucideIcon;
  /**
   * Main title text
   */
  title: string;
  /**
   * Description message
   */
  message: string;
  /**
   * Text for the action button
   */
  buttonText: string;
  /**
   * Handler for button click
   */
  onButtonClick: () => void;
  /**
   * Optional custom class name for the container
   */
  className?: string;
  /**
   * Optional custom class for the button
   */
  buttonClassName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="container">
      <div className="empty-state">
        <div className="icon-wrapper">
          <Icon />
        </div>
        <h3 className="empty-title">{title}</h3>
        <p className="empty-message">{message}</p>
        <button className="send-money-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
