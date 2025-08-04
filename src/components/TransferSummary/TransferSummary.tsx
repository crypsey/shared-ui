import React, { useState, useEffect, ReactNode } from "react";
import "./TransferSummary.css";

interface ExchangeRate {
  from: string;
  to: string;
}

interface TransferDetails {
  receiveMethod: string;
  receiveAccount: string;
  transferAmount: string;
  transferFee: string;
  exchangeRate: ExchangeRate;
  totalToReceipt: string;
  totalAmount: string;
}

interface ReceiverDetails {
  name: string;
  receiveAccount: any;
  city: string;
  reason: string;
}

export interface TransferSummaryProps {
  headerAmount: string;
  transferDetails: TransferDetails;
  receiverDetails: ReceiverDetails;
  onEditTransfer?: () => void;
  onEditReceiver?: () => void;
  onCalcle?: () => void;
  onNextClick?: () => void;
  cancleTitle?: string;
  continueTitle?: string;
  countryFlag: string;
  receiveDetailsSections?: ReactNode;
}

export const TransferSummary: React.FC<TransferSummaryProps> = ({
  headerAmount = "10,000 WHAW",
  transferDetails,
  receiverDetails,
  onEditTransfer = () => {},
  onEditReceiver = () => {},
  onCalcle = () => {},
  onNextClick = () => {},
  cancleTitle = "Cancle",
  continueTitle = "Continue",
  countryFlag = "https://crypsey-country-flags.s3.us-east-2.amazonaws.com/in.svg",
  receiveDetailsSections,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and update state on resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const receiverAccount = () => {
    if (receiverDetails?.receiveAccount?.type === "etransfer") {
      return receiverDetails.receiveAccount.details["E-transfer email"];
    }
  };

  console.log(receiverDetails, "receiverDetails");

  return (
    <div className="summary-money-transfer-container">
      {/* Purple Header */}
      <div className="summary-money-transfer-header">
        <div className="header-summary-content">
          <div className="header-summary-text">
            <h1>{headerAmount}</h1>
            <p className="header-summary-timing">
              <span className="timing-icon">⏱</span> Within minutes
            </p>
          </div>
          <div className="icon">
            <img src={countryFlag} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {isMobile ? (
          // Mobile View
          <div className="mobile-view">
            {/* Transfer Details - Mobile */}
            <div>
              <div className="section-header-summary">
                <h2 className="section-title">TRANSFER DETAILS</h2>
                {/* <button className="edit-button" onClick={onEditTransfer}>Edit</button> */}
              </div>

              <div className="section-content mobile-section-content">
                <div>
                  <div className="field-row mobile-field-row">
                    <span className="field-label">Receive method</span>
                    <span className="field-value">
                      {transferDetails.receiveMethod}
                    </span>
                  </div>

                  {/* <div className="field-row mobile-field-row">
                    <span className="field-label">
                      Receive money
                      <br />
                      account
                    </span>
                    <span className="field-value">
                      {transferDetails.receiveAccount}
                    </span>
                  </div> */}

                  <div className="field-row mobile-field-row">
                    <span className="field-label">Transfer amount</span>
                    <span className="field-value">
                      {transferDetails.transferAmount}
                    </span>
                  </div>

                  <div className="field-row mobile-field-row">
                    <span className="field-label">Transfer fee</span>
                    <span className="field-value">
                      {transferDetails.transferFee}
                    </span>
                  </div>

                  <div className="field-row mobile-field-row">
                    <span className="field-label">Exchange rate</span>
                    <span className="field-value text-right">
                      {transferDetails.exchangeRate.from} ={" "}
                      {transferDetails.exchangeRate.to}
                    </span>
                  </div>

                  <div className="field-row mobile-field-row">
                    <span className="field-label">Total to receipt</span>
                    <span className="field-value">
                      {transferDetails.totalToReceipt}
                    </span>
                  </div>

                  <div className="divider mobile-divider">
                    <div className="field-row">
                      <span className="field-label">Total amount</span>
                      <span className="field-value total-amount">
                        {transferDetails.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Details - Mobile */}
            <div>
              <div className="section-header-summary">
                <h2 className="section-title">RECEIVER DETAILS</h2>
                {/* <button className="edit-button" onClick={onEditReceiver}>Edit</button> */}
              </div>

              <div className="section-content mobile-section-content">
                <div>
                  <div className="field-row mobile-field-row">
                    <span className="field-label">Name</span>
                    <span className="field-value">{receiverDetails.name}</span>
                  </div>

                  {receiveDetailsSections ? (
                    receiveDetailsSections
                  ) : (
                    <div className="field-row mobile-field-row">
                      <span className="field-label">
                        {transferDetails.receiveMethod}
                        <br />
                      </span>
                      <span className="field-value">{receiverAccount()}</span>
                    </div>
                  )}

                  <div className="field-row mobile-field-row">
                    <span className="field-label">City/Town</span>
                    <span className="field-value">{receiverDetails.city}</span>
                  </div>

                  <div className="field-row mobile-field-row">
                    <span className="field-label">Reason for sending</span>
                    <span className="field-value text-right">
                      {receiverDetails.reason}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="cancle-button">
                  <button
                    className="action-button desktop-action-button-cancle"
                    onClick={onCalcle}
                  >
                    {cancleTitle}
                  </button>
                </div>

                <button
                  className="action-button desktop-action-button"
                  onClick={onNextClick}
                >
                  {continueTitle}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop View
          <div className="desktop-view">
            {/* Left Column: Transfer Details - Desktop */}
            <div className="desktop-column">
              <div className="section-header-summary">
                <h2 className="section-title">TRANSFER DETAILS</h2>
                {/* <button className="edit-button" onClick={onEditTransfer}>Edit</button> */}
              </div>

              <div className="section-content desktop-section-content">
                <div>
                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Receive method
                    </span>
                    <span className="field-value desktop-field-value">
                      {transferDetails.receiveMethod}
                    </span>
                  </div>
                  {/* 
                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Receive money
                      <br />
                      account
                    </span>
                    <span className="field-value desktop-field-value">
                      {transferDetails.receiveAccount}
                    </span>
                  </div> */}

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Transfer amount
                    </span>
                    <span className="field-value desktop-field-value">
                      {transferDetails.transferAmount}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Transfer fee
                    </span>
                    <span className="field-value desktop-field-value">
                      {transferDetails.transferFee}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Exchange rate
                    </span>
                    <span className="field-value desktop-field-value text-right">
                      {transferDetails.exchangeRate.from} ={" "}
                      {transferDetails.exchangeRate.to}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Total to receipt
                    </span>
                    <span className="field-value desktop-field-value">
                      {transferDetails.totalToReceipt}
                    </span>
                  </div>

                  <div className="divider desktop-divider">
                    <div className="field-row">
                      <span className="field-label desktop-field-label">
                        Total amount
                      </span>
                      <span className="field-value desktop-total-value total-amount">
                        {transferDetails.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Receiver Details - Desktop */}
            <div className="desktop-column">
              <div className="section-header-summary">
                <h2 className="section-title">RECEIVER DETAILS</h2>
                {/* <button className="edit-button" onClick={onEditReceiver}>Edit</button> */}
              </div>

              <div className="section-content desktop-section-content">
                <div>
                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Name
                    </span>
                    <span className="field-value desktop-field-value">
                      {receiverDetails.name}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      {transferDetails.receiveMethod}
                      <br />
                    </span>
                    <span className="field-value desktop-field-value">
                      {receiverAccount()}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      City/Town
                    </span>
                    <span className="field-value desktop-field-value">
                      {receiverDetails.city}
                    </span>
                  </div>

                  <div className="field-row desktop-field-row">
                    <span className="field-label desktop-field-label">
                      Reason for sending
                    </span>
                    <span className="field-value desktop-field-value text-right">
                      {receiverDetails.reason}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="cancle-button">
                  <button
                    className="action-button desktop-action-button-cancle"
                    onClick={onCalcle}
                  >
                    {cancleTitle}
                  </button>
                </div>

                <button
                  className="action-button desktop-action-button"
                  onClick={onNextClick}
                >
                  {continueTitle}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferSummary;
