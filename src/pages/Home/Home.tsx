import React from "react";

import { Modal } from "../../components/Modal";
import { Table } from "../../components/Table";

const Home = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <div className="home">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create New Transaction
      </button>

      <Table openModal={() => setModalOpen(true)} />

      {isModalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default Home;
