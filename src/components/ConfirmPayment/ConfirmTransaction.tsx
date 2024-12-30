import React from "react";
import "./ConfirmTransaction.css";
import { Button } from "react-bootstrap";
import TransactionIcon from "./TransactionIcon";
import CreditCard from "./ConfrimantionTypes/CreditCard";
import Bank from "./ConfrimantionTypes/Bank";
import Etransfer from "./ConfrimantionTypes/Etranfer";
import Cuba from "./ConfrimantionTypes/Cuba";
import {
  CREDIT_CARD_FEE,
  CUBA_FEE,
  VUGA_PAY_FEE,
  ConfirmProps,
} from "../../Interface/Interface";
import { formatCurrency } from "../../../Tools/Tools";

interface ConfirmTransactionProps {
  sendingMoneyData: ConfirmProps;
  onContinue: () => void;
  onCancel: () => void;
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({
  sendingMoneyData,
  onContinue,
  onCancel,
}) => {
  const SendType = () => {
    switch (sendingMoneyData?.transactionType) {
      case "CREDIT_CARD":
        return <CreditCard sendingMoneyData={sendingMoneyData} />;
      case "BANK_DEPOSIT":
        return <Bank sendingMoneyData={sendingMoneyData} />;
      case "ETRANSFER":
        return <Etransfer sendingMoneyData={sendingMoneyData} />;
      case "CUBA":
        return <Cuba sendingMoneyData={sendingMoneyData} />;
      default:
        return <div>Invalid sending type</div>;
    }
  };

  const isCubaTransaction = sendingMoneyData.transactionType === "CUBA";

  const numAmount = sendingMoneyData?.amount;
  const feeRate = isCubaTransaction ? CUBA_FEE : CREDIT_CARD_FEE;
  const creditCardFeeAmount = numAmount * feeRate;
  const totalAmount = numAmount + creditCardFeeAmount;
  return (
    <div className="payment-confirmation">
      <div className="bank-icon">
        <div className="icon-container">
          <TransactionIcon type={sendingMoneyData?.transactionType} />
        </div>
      </div>

      <div className="sending-section">
        <h2>Sending to:</h2>
        {SendType()}
      </div>

      <div className="amount-section">
        <h2>Send amount:</h2>
        <div className="main-amount">${sendingMoneyData?.amount}</div>
        <div>
          {isCubaTransaction ? "Cuba transaction fee: " : "Credit card fee: "}
          {`${(isCubaTransaction ? CUBA_FEE : CREDIT_CARD_FEE) * 100}%`}
        </div>

        <div className="fee-item">VugaPay fee: {VUGA_PAY_FEE}</div>
        <div className="total-amount">
          Total to pay:{formatCurrency(totalAmount)}
        </div>
      </div>

      <div className="confrim-button">
        <Button className="send-money-button" onClick={onContinue}>
          Continue
        </Button>

        <Button className="send-money-cancle" onClick={onCancel}>
          Cancle
        </Button>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
