import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Button, { BUTTON_DELETE, BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import { ACCOUNTS_COLUMNS } from "../config/DataConfig";
import { ROUTES } from "../constants/routes";
import {
  AccountMessages,
  ErrorMessages,
  InfoMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import { PERMISSIONS } from "../constants/Permissions";

const AccountManage = () => {
  const permissions = useSelector((state) => state.auth.user?.permissions);
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert } = useModal();
  const [selectRows, setselectRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    search();
  }, []);

  // 검색
  const search = () => {
    axios.get(ROUTES.ACCOUNTS, { params: { keyword } }).then((res) => {
      const result = res.data.resultData.map((data) => {
        data[KEYS.LAST_ACCESS_TIME] = data.loginInfo[KEYS.LAST_ACCESS_TIME];
        return data;
      });
      if (result.length === 0) {
        showAlert({
          message: InfoMessages.noSearchResult,
        });
        return;
      }
      setData(result);
      tableRef.current?.clearSelection?.();
      setselectRows([]);
    });
  };

  const clickIdColumn = (row) => {
    navigate(ROUTES.ACCOUNT_EDIT, {
      state: {
        selectedInfo: row,
      },
    });
  };

  return (
    <>
      <Form className="search-box" onSubmit={search}>
        <table className="tbl-input">
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={AccountMessages.searchPlaceHolder}
                    size={INPUT_SIZE_LG}
                  />
                  <Button type={BUTTON_SEARCH} onClick={search} />
                  {permissions.includes(PERMISSIONS.ACCNT_C) && <Button
                    label={LABELS.USER_REGISTER}
                    onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
                  />}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={ACCOUNTS_COLUMNS(clickIdColumn)}
        data={data}
        onRowSelectionChange={setselectRows}
      />
    </>
  );
};

export default AccountManage;
