import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Button, {
  BUTTON_CANCEL,
  BUTTON_DELETE,
  BUTTON_SEARCH,
} from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import {
  account_manage_columns,
  account_manage_data,
} from "../config/DataConfig";
import { ROUTES } from "../constants/routes";
import {
  accountMessages,
  errorMessages,
  infoMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert, showDialog } = useModal();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(account_manage_data);

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  const clickEdit = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }
    if (selectedRows.length > 1) {
      showAlert({
        message: errorMessages.oneSelect,
      });
      return;
    }

    navigate(ROUTES.ACCOUNT_EDIT, {
      state: {
        selectedId: selectedRows[0].id,
      },
    });
  };

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  const clickDelete = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: infoMessages.confirmDelete(selectedRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    console.log("delete");
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
          <Button
            label={LABELS.USER_REGISTER}
            onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
          />
        </div>
        <span>{LABELS.SEARCH_RESULT(data.length)}</span>
      </div>
      <div>
        <Table
          ref={tableRef}
          columns={account_manage_columns}
          data={data}
          pageSize={5}
          rowSelectionEnabled={true}
          onRowSelectionChange={setSelectedRows}
        />
        <div>
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.USER_EDIT}
            onClick={clickEdit}
          />
          <Button type={BUTTON_DELETE} onClick={clickDelete} />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
