import React, { useEffect, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { ACCESS_DETAIL_COLUMNS } from "../../config/DataConfig";
import axios from "../../api/axios";
import { ROUTES } from "../../constants/routes";
import { KEYS } from "../../constants/Keys";

const AccountDetailLog = ({ selectRow }) => {

  const [data, setData] = useState([]);
  const [lastAccessTime, setLastAccessTime] = useState("");

  useEffect(() => {
    axios.get(ROUTES.HISTORY_DETAIL(selectRow[KEYS.ADMIN_ID])).then((res) => {
      const result = res.data.resultData;
      setData(result);
      console.log('res', res)
      setLastAccessTime(result[0][KEYS.LOG_TIME]);
    });
  }, []);

  return (
    <div>
      <div>
        <span>{`${LABELS.FINAL_ACCESS_TIME} ${lastAccessTime}`}</span>
        <Table
          columns={ACCESS_DETAIL_COLUMNS}
          data={data}
          rowSelectionEnabled={false}
          resultLabel={false}
          pageSelect={false}
          paginationEnabled={false}
          maxHeight={450}
        />
      </div>
    </div>
  );
};

export default AccountDetailLog;
