import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { ACCOUNTS_LOGS_COLUMNS } from "../config/DataConfig";
import { AccountMessages, InfoMessages } from "../constants/Message";
import { LABELS } from "../constants/Labels";
import AccountDetailLog from "../components/modals/AccountDetailLog";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { ROUTES } from "../constants/routes";
import Form from "../components/Form";
import { KEYS } from "../constants/Keys";
import { MODAL_MD } from "../components/modals/ModalRenderer";

const AccountLogs = () => {
  const tableRef = useRef();
  const { showAlert, showModal } = useModal();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    search();
  }, []);

  const clickIdColumn = (row) => {
    showModal({
      header: `${row[KEYS.ADMIN_ID]} ${LABELS.ACCOUNT_DETAIL_LOGS}`,
      content: <AccountDetailLog selectRow={row} />,
      size: MODAL_MD,
    });
  };

  const search = () => {
    axios
      .get(ROUTES.HISTORY, {
        params: { [KEYS.KEYWORD]: keyword },
      })
      .then((res) => {
        const result = res.data.resultData;
        if (result.length === 0) {
          showAlert({
            message: InfoMessages.noSearchResult,
          });
          return;
        }
        setData(result);
      });
  };

  return (
    <>
      <Form className="search-box" onSubmit={search}>
        <table className="tbl-input">
          <colgroup></colgroup>
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={ACCOUNTS_LOGS_COLUMNS(clickIdColumn)}
        data={data}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default AccountLogs;
