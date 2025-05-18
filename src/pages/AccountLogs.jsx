import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { HISTORY_columns, HISTORY_data } from "../config/DataConfig";
import { accountMessages, infoMessages } from "../constants/Message";
import { LABELS } from "../constants/Labels";
import AccountDetailLog from "../components/modals/AccountDetailLog";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { ROUTES } from "../constants/routes";
import Form from "../components/Form";
import { KEYS } from "../constants/Keys";

const AccountLogs = () => {
  const tableRef = useRef();
  const { showAlert, showModal } = useModal();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(HISTORY_data);
    // TODO :: 최초 로드는 전체 리스트 출력 하는지? , keywords를 빈값으로 보내면 되는건지?
    // axios.get(ROUTES.HISTORY, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  }, []);

  const clickIdColumn = (row) => {
    showModal({
      header: `${row[KEYS.ID]} ${LABELS.ACCOUNT_DETAIL_LOGS}`,
      content: <AccountDetailLog selectRow={row} />,
    });
  };

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
    // axios.get(ROUTES.HISTORY, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  };

  return (
    <>
      <Form className="search-box">
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={HISTORY_columns(clickIdColumn)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default AccountLogs;
