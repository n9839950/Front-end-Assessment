import React from "react";

import { TransactionsContext } from "./contexts";
import { Transaction } from "./contexts/transactions";
import { Home } from "./pages/Home";

import "./App.css";

const App: React.FC = () => {
  const temp = localStorage.getItem("transactions");
  const cachedTransactions = temp ? JSON.parse(temp) : [];
  const [transactions, setTransactions] = React.useState<Transaction[]>(
    cachedTransactions
  );
  const [activeTransactionIndex, setActiveTransactionIndex] = React.useState<
    number | null
  >(null);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => {
      return [...prevTransactions, transaction];
    });
  };

  const deleteTransaction = (ix: number) => {
    setTransactions((prevTransactions) => {
      return prevTransactions.filter((_, idx) => ix !== idx);
    });
  };

  const updateTransaction = (ix: number, transaction: Transaction) => {
    setTransactions((prevTransactions) => {
      const transactionsCopy = [...prevTransactions];
      transactionsCopy[ix] = transaction;
      return transactionsCopy;
    });
  };

  React.useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        activeTransactionIndex,
        addTransaction,
        deleteTransaction,
        setActiveTransactionIndex,
        updateTransaction,
      }}
    >
      <Home />
    </TransactionsContext.Provider>
  );
};

export default App;
