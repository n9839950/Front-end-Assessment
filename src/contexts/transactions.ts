import React, { Dispatch, SetStateAction } from "react";

export interface Transaction {
  type: "credit" | "debit";
  amount: number;
  currency: "aud" | "usd" | "eur";
}

type ITransactionsContext = {
  transactions: Transaction[];
  activeTransactionIndex: number | null;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (ix: number) => void;
  setActiveTransactionIndex: Dispatch<SetStateAction<number | null>>;
  updateTransaction: (ix: number, transaction: Transaction) => void;
};

const TransactionsContext = React.createContext<ITransactionsContext>({
  transactions: [],
  activeTransactionIndex: null,
  addTransaction: () => {},
  deleteTransaction: () => {},
  setActiveTransactionIndex: () => {},
  updateTransaction: () => {},
});

export default TransactionsContext;
