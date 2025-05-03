import React, { useEffect, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import {
  access_detail_columns,
  access_detail_data,
} from "../../config/DataConfig";

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
        <h4>{`${selectRow.id} ${LABELS.ACCOUNT_DETAIL_LOGS}`}</h4>
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
