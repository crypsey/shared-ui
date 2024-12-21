// HeroContent.tsx
import React, { useState, useEffect } from "react";
import "./HeroContent.css";

export interface HeroContentProps {
  /**
   * Tag text displayed at the top
   */
  tagText: string;
  /**
   * Main heading text (supports line breaks with \n)
   */
  headingText: string;
  /**
   * Array of methods/options to rotate through
   */
  rotatingMethods: string[];
  /**
   * Interval for rotating methods (in milliseconds)
   * @default 2000
   */
  rotationInterval?: number;
  /**
   * Fade animation duration (in milliseconds)
   * @default 200
   */
  fadeAnimationDuration?: number;
  /**
   * Button text
   */
  buttonText: string;
  /**
   * Description text below the button
   */
  description: string;
  /**
   * Optional className for custom styling
   */
  className?: string;
  /**
   * Handler for button click
   */
  onButtonClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  tagText,
  headingText,
  rotatingMethods,
  rotationInterval = 2000,
  fadeAnimationDuration = 200,
  buttonText,
  description,
  onButtonClick,
}) => {
  const [currentMethod, setCurrentMethod] = useState(rotatingMethods[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (rotatingMethods.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentMethod((prev) => {
          const currentIndex = rotatingMethods.indexOf(prev);
          return rotatingMethods[(currentIndex + 1) % rotatingMethods.length];
        });
        setIsVisible(true);
      }, fadeAnimationDuration);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [rotatingMethods, rotationInterval, fadeAnimationDuration]);

  return (
    <div className="payment-container">
      <div className="payment-tag">{tagText}</div>

      <div className="payment-heading">
        {headingText.split("\\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < headingText.split("\\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>

      <div className={`payment-gradient-text ${isVisible ? "visible" : ""}`}>
        {currentMethod}
      </div>

      <button className="payment-button" onClick={onButtonClick}>
        {buttonText}
      </button>

      <p className="payment-description">{description}</p>
    </div>
  );
};

export default HeroContent;
