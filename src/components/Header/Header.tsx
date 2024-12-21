// Header.tsx
import React from "react";
import { Button } from "react-bootstrap";
import "./Header.css";
import "../../styles/fonts.css";

export interface HeaderProps {
  /**
   * The logo image source URL
   */
  logoSrc: string;
  /**
   * The logo text to display
   */
  logoText: string;
  /**
   * Whether the user is currently logged in
   */
  isLoggedIn?: boolean;
  /**
   * The destination URL when clicking the logo
   */
  homeUrl?: string;
  /**
   * Callback when the main action button is clicked
   */
  onActionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoSrc,
  logoText,
  isLoggedIn = false,
  homeUrl = "/dashboard",
  onActionClick,
}) => {
  const handleLogoClick = () => {
    if (homeUrl) {
      window.location.href = homeUrl;
    }
  };

  return (
    <header className="header">
      <div
        style={{ display: "flex", flexDirection: "row" }}
        onClick={handleLogoClick}
      >
        <div className="logo-container">
          <img src={logoSrc} className="logo-img" alt={`${logoText} logo`} />
        </div>
        <div className="logo">{logoText}</div>
      </div>

      <Button className="get-started-header" onClick={onActionClick}>
        {isLoggedIn ? "Logout" : "Get Started"}
      </Button>
    </header>
  );
};

export default Header;
