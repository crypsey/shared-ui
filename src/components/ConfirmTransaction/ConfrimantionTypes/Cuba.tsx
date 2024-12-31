import React from "react";
import "../ConfirmTransaction.css";

interface ConfirmProps {
  amount: any;
  transactionType?: any;
  paymentDetails?: any;
}

interface CubaProps {
  sendingMoneyData: ConfirmProps;
}

const Cuba: React.FC<CubaProps> = ({ sendingMoneyData }) => {
  return (
    <>
      <div className="bank-info-label">Cuba receiver informantion: </div>
      <div className="creditcard-grid">
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.fullName}
          </div>
          <div className="account-type">Full names </div>
        </div>
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.email}
          </div>
          <div className="account-type">Email address</div>
        </div>
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.phoneNumber}
          </div>
          <div className="account-type">Phone number</div>
        </div>
      </div>
    </>
  );
};

export default Cuba;
