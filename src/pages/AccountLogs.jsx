import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { ACCOUNTS_LOGS_COLUMNS } from "../config/DataConfig";
import { accountMessages, infoMessages } from "../constants/Message";
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
    setData([
      {
        [KEYS.ADMIN_ID]: "admin",
        [KEYS.NAME]: "관리자",
        [KEYS.DEPARTMENT]: "-",
        [KEYS.USER_TYPE]: "Admin",
        [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.04 11:23:27",
      },
      {
        [KEYS.ADMIN_ID]: "cwback",
        [KEYS.NAME]: "백창우",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.USER_TYPE]: "User",
        [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.01 09:12:35",
      },
      {
        [KEYS.ADMIN_ID]: "wooseok",
        [KEYS.NAME]: "주우석",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.USER_TYPE]: "User",
        [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.02 12:03:04",
      },
      {
        [KEYS.ADMIN_ID]: "hong",
        [KEYS.NAME]: "홍길동",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.USER_TYPE]: "User",
        [KEYS.ACCESS_TIME]: "2024.04.23 10:55:45",
        [KEYS.LAST_ACCESS_TIME]: "2024.04.23 11:55:01",
      },
      {
        [KEYS.ADMIN_ID]: "kim",
        [KEYS.NAME]: "김철수",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.USER_TYPE]: "User",
        [KEYS.ACCESS_TIME]: "2024.04.29 01:24:35",
        [KEYS.LAST_ACCESS_TIME]: "2024.04.30 05:13:09",
      },
    ]);
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
      header: `${row[KEYS.ADMIN_ID]} ${LABELS.ACCOUNT_DETAIL_LOGS}`,
      content: <AccountDetailLog selectRow={row} />,
      size: MODAL_MD,
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
        columns={ACCOUNTS_LOGS_COLUMNS(clickIdColumn)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default AccountLogs;
