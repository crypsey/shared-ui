import React from "react";
import "./ConfirmTransaction.css";
import image1 from "@assets/etransfer1@2x.png";
import image2 from "@assets/bank-deposit-icon1@2x.png";
import image3 from "@assets/credit-card-color-icon1@2x.png";
import image4 from "@assets/cuba.png";

enum SendingType {
  BANK = "bank",
  CREDIT = "credit",
  ETRANSFER = "etransfer",
  CUBA = "cuba",
}

interface TransactionIconProps {
  type: SendingType;
}

const TransactionIcon: React.FC<TransactionIconProps> = ({ type }) => {
  switch (type.toUpperCase()) {
    case "ETRANSFER":
      return (
        <>
          <img src={image1} alt={type} className="selector-btn-image" />
          <div className="bank-label">Etransfer</div>
        </>
      );

    case "BANK_DEPOSIT":
      return (
        <>
          <img src={image2} alt={type} className="selector-btn-image" />
          <div className="bank-label">Bank deposit</div>
        </>
      );

    case "CREDIT_CARD":
      return (
        <>
          <img src={image3} alt={type} className="selector-btn-image" />
          <div className="bank-label">Credit card</div>
        </>
      );

    case "CUBA":
      return (
        <>
          <img src={image4} alt={type} className="selector-btn-image" />
          <div className="bank-label">Cuba</div>
        </>
      );

    default:
      return null;
  }
};

export default TransactionIcon;
