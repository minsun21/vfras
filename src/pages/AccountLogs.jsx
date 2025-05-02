import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { account_logs_columns, account_logs_data } from "../config/DataConfig";
import { accountMessages, infoMessage } from "../constants/Message";
import { LABELS } from "../constants/Label";
import AccountDetailLog from "./AccountDetailLog";
import { useModal } from "../contexts/ModalContext";

const AccountLogs = () => {
  const tableRef = useRef();
  const { showAlert, showModal } = useModal();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(account_logs_data);
  }, []);

  const clickIdColumn = (row) => {
    showModal({
      content: <AccountDetailLog selectRow={row} />,
    });
  };

  const search = () => {
    showAlert({
      message: infoMessage.noSearchResult,
    });
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
          <Button type={BUTTON_SEARCH} onClick={search} />
        </div>
        <span>{LABELS.SEARCH_RESULT(data.length)}</span>
      </div>
      <Table
        ref={tableRef}
        columns={account_logs_columns(clickIdColumn)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </div>
  );
};

export default AccountLogs;
