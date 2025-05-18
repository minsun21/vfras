import React, { useState, useRef, useEffect } from "react";
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
import axios from "../api/axios";

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert, showDialog } = useModal();
  const [selectedRows, setSelectedRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(account_manage_data);
    // TODO :: 최초 로드는 전체 리스트 출력 하는지? , keywords를 빈값으로 보내면 되는건지?
    // axios.get(ROUTES.ACCOUNTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  }, []);

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });

    // axios.get(ROUTES.ACCOUNTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
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
    // for (const selectedRow of selectedRows) {
    //   axios.delete(ROUTES.ACCOUNTS_MANAGE(selectedRow.adminId)).then(res => {
    //     showAlert({
    //       message: infoMessages.successDelete,
    //     });
    //   })
    // }
  };

  return (
    <>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
        <table className="tbl-input">
          <colgroup></colgroup>
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={accountMessages.searchPlaceHolder}
                    size={INPUT_SIZE_LG}
                  />
                  <Button type={BUTTON_SEARCH} onClick={search} />
                  <Button
                    label={LABELS.USER_REGISTER}
                    onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Table
        ref={tableRef}
        columns={account_manage_columns}
        data={data}
        pageSize={5}
        onRowSelectionChange={setSelectedRows}
      />
      <div className="btn-wrap">
        <div>
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.USER_EDIT}
            onClick={clickEdit}
          />
        </div>
        <div>
          <Button type={BUTTON_DELETE} onClick={clickDelete} />
        </div>
      </div>
    </>
  );
};

export default AccountManage;
