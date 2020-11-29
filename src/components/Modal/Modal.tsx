import React from "react";

import { TransactionsContext } from "../../contexts";
import { Transaction } from "../../contexts/transactions";

type ModalProps = {
  closeModal: () => void;
};
const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const {
    addTransaction,
    activeTransactionIndex,
    setActiveTransactionIndex,
    transactions,
    updateTransaction,
  } = React.useContext(TransactionsContext);

  const [formState, setFormState] = React.useState<Transaction>(
    activeTransactionIndex === null
      ? {
          amount: 0,
          type: "credit",
          currency: "usd",
        }
      : transactions[activeTransactionIndex]
  );

  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [evt.target.name]: evt.target.value,
      };
    });
  };

  const handleSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (activeTransactionIndex !== null) {
      updateTransaction(activeTransactionIndex, formState);
    } else {
      addTransaction(formState);
    }
  };

  //   if (!isOpen) return null;

  return (
    <div className="modal">
      <button
        type="button"
        className="modal-close-btn"
        onClick={() => {
          setActiveTransactionIndex(null);
          closeModal();
        }}
      >
        Close
      </button>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            <span>What is the amount of this transaction?</span>
            <input
              type="number"
              name="amount"
              value={formState.amount}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            <span>What is the currency of this transaction?</span>
            <select
              name="currency"
              value={formState.currency}
              onChange={handleChange}
            >
              <option value="usd">USD</option>
              <option value="aud">AUD</option>
              <option value="eur">EUR</option>
            </select>
          </label>

          <label className="form-label">
            <span>What is the type of this transaction?</span>
            <select name="type" value={formState.type} onChange={handleChange}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </label>

          <button type="submit">
            {activeTransactionIndex === null ? "Add" : "Update"} transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
