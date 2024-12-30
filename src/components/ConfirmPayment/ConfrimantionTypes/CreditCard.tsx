import React from "react";
import "../ConfirmTransaction.css";

interface ConfirmProps {
  amount: any;
  transactionType?: any;
  paymentDetails?: any;
}

interface CreditCardProps {
  sendingMoneyData: ConfirmProps;
}

const CreditCard: React.FC<CreditCardProps> = ({ sendingMoneyData }) => {
  return (
    <>
      <div className="bank-info-label">Credit card informantion: </div>
      <div className="creditcard-grid">
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.creditCardProdiver}
          </div>
          <div className="account-type">Credit card provider name</div>
        </div>
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.cardNumber}
          </div>
          <div className="account-type">Credit card number</div>
        </div>
      </div>
    </>
  );
};

export default CreditCard;
