import React, { useEffect, useState } from "react";
import Button, { BUTTON_CANCEL } from "../components/Button";
import { useModal } from "../contexts/ModalContext";
import { LABELS } from "../constants/Label";
import Table from "../components/Table";
import {
  access_detail_columns,
  access_detail_data,
} from "../config/DataConfig";

const AccountDetailLog = ({ selectRow }) => {
  const { closeModal } = useModal();
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("id", selectRow);
    setData(access_detail_data);
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
        <Table columns={access_detail_columns} data={data} pageSize={5} />
      </div>
    </div>
  );
};

export default AccountDetailLog;
