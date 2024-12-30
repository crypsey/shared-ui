import React from "react";
import "../ConfirmTransaction.css";

interface EtransferProps {
  sendingMoneyData: any;
}

const Etransfer: React.FC<EtransferProps> = ({ sendingMoneyData }) => {
  return (
    <>
      <div className="bank-info-label">Etranfer informantion: </div>
      <div className="creditcard-grid">
        <div className="account-item">
          <div className="account-number">
            {sendingMoneyData.paymentDetails.email}
          </div>
          <div className="account-type">Email address</div>
        </div>
      </div>
    </>
  );
};

export default Etransfer;
