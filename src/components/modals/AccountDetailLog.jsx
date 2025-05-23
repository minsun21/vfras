import React, { useEffect, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import {
  access_detail_columns,
  access_detail_data,
} from "../../config/DataConfig";
import axios from "../../api/axios";
import { ROUTES } from "../../constants/routes";
import { KEYS } from "../../constants/Keys";

const AccountDetailLog = ({ selectRow }) => {
  const { closeModal } = useModal();
  const [data, setData] = useState([]);
  const [lastAccessTime, setLastAccessTime] = useState("");

  useEffect(() => {
    // console.log("id", selectRow);
    setData(access_detail_data);
    setLastAccessTime(
      access_detail_data[access_detail_data.length - 1][[KEYS.ACCESS_TIME]]
    );
    // axios.get(ROUTES.HISTORY_DETAIL(selectRow.id)).then((res) => {
    //   setData(res.data);
    //  setLastAccessTime(res.data[res.data.length-1][[KEYS.ACCESS_TIME]])
    // });
  }, []);

  return (
    <div>
      <div>
        <span>{`${LABELS.FINAL_ACCESS_TIME} ${lastAccessTime}`}</span>
        <Table
          columns={access_detail_columns}
          data={data}
          pageSize={5}
          rowSelectionEnabled={false}
          resultLabel={false}
          pageSelect={false}
          paginationEnabled={false}
        />
      </div>
    </div>
  );
};

export default AccountDetailLog;
