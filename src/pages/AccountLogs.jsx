import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { account_logs_columns, account_logs_data } from "../config/DataConfig";
import { accountMessages } from "../constants/Message";
import { LABELS } from "../constants/Label";

const AccountLogs = () => {
  const tableRef = useRef();

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(account_logs_data);

  useEffect(() => {}, []);

  const detail_access_log = () => {
    console.log("detail_access_log");
  };

  return (
    <div>
      <div className="search-area">
        <div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={accountMessages.searchPlaceHolder}
            size={INPUT_SIZE_LG}
          />
          <Button type={BUTTON_SEARCH} />
        </div>
        <span>{LABELS.SEARCH_RESULT(data.length)}</span>
      </div>
      <Table
        ref={tableRef}
        columns={account_logs_columns(detail_access_log)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </div>
  );
};

export default AccountLogs;
