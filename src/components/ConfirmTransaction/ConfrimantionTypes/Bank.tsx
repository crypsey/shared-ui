import React from "react";
import "../ConfirmTransaction.css";

interface ConfirmProps {
  amount: any;
  transactionType?: any;
  paymentDetails?: any;
}

interface BankProps {
  sendingMoneyData: ConfirmProps;
}
const Bank: React.FC<BankProps> = ({ sendingMoneyData }) => {
  return (
    <>
      <div className="bank-info-label">Bank account informantion</div>
      <div className="account-grid">
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.transitNumber}
          </div>
          <div className="account-type">Transit</div>
        </div>
        <div className="account-item">
          <div className="account-number">
            {" "}
            {sendingMoneyData.paymentDetails.institutionNumber}
          </div>
          <div className="account-type">institution</div>
        </div>
        <div className="account-item">
          <div className="account-number">
            {" "}
            {sendingMoneyData.paymentDetails.accountNumber}
          </div>
          <div className="account-type">account</div>
        </div>
      </div>
    </>
  );
};

export default Bank;
