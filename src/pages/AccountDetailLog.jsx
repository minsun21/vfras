import React, { useEffect } from "react";
import Button, { BUTTON_CANCEL } from "../components/Button";
import { useModal } from "../contexts/ModalContext";
import { LABELS } from "../constants/Label";
import Table from "../components/Table";

const AccountDetailLog = ({ selectRow }) => {
  const { closeModal } = useModal();

  useEffect(() => {
    // console.log("id", selectRow);
  }, []);

  return (
    <div>
      <header>
        <div>
          <span>{`${selectRow.id} `}</span>
          <span>{`${LABELS.ACCOUNT_DETAIL_LOGS}`}</span>
        </div>
        <button onClick={closeModal}>x</button>
      </header>
      <div>
        <span>{LABELS.FINAL_ACCESS_TIME}</span>
        {/* <Table /> */}
      </div>
    </div>
  );
};

export default AccountDetailLog;
