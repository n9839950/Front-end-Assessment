import React from "react";
import { Button } from "reactstrap";

import { TransactionsContext } from "../../contexts";

type TTableProps = {
  openModal: () => void;
};
const TTable: React.FC<TTableProps> = ({ openModal }) => {
  const {
    transactions,
    deleteTransaction,
    setActiveTransactionIndex,
  } = React.useContext(TransactionsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ type, amount, currency }, ix) => (
          <tr key={ix}>
            <td>{ix + 1}</td>
            <td>{amount}</td>
            <td>{currency}</td>
            <td>{type}</td>
            <td>
              <Button
                onClick={() => {
                  setActiveTransactionIndex(ix);
                  openModal();
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  const result = window.confirm(
                    "Are you sure you wan to delete this transaction?"
                  );
                  if (!result) return;

                  deleteTransaction(ix);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TTable;
