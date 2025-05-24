import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Button, {
  BUTTON_CANCEL,
  BUTTON_DELETE,
  BUTTON_SEARCH,
} from "../components/Button";
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

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert, showDialog } = useModal();
  const [selectRows, setselectRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        [KEYS.ADMIN_ID]: "admin",
        [KEYS.NAME]: "관리자",
        [KEYS.DEPARTMENT]: "-",
        [KEYS.ADMIN_TYPE]: "Admin",
        [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.04 11:23:27",
      },
      {
        [KEYS.ADMIN_ID]: "cwback",
        [KEYS.NAME]: "백창우",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.ADMIN_TYPE]: "User",
        [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.01 09:12:35",
      },
      {
        [KEYS.ADMIN_ID]: "wooseok",
        [KEYS.NAME]: "주우석",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.ADMIN_TYPE]: "User",
        [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
        [KEYS.LAST_ACCESS_TIME]: "2024.02.02 12:03:04",
      },
      {
        [KEYS.ADMIN_ID]: "hong",
        [KEYS.NAME]: "홍길동",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.ADMIN_TYPE]: "User",
        [KEYS.CREATED_AT]: "2024.04.23 10:55:45",
        [KEYS.LAST_ACCESS_TIME]: "2024.04.23 11:55:01",
      },
      {
        [KEYS.ADMIN_ID]: "kim",
        [KEYS.NAME]: "김철수",
        [KEYS.DEPARTMENT]: "고객만족팀",
        [KEYS.ADMIN_TYPE]: "User",
        [KEYS.CREATED_AT]: "2024.04.29 01:24:35",
        [KEYS.LAST_ACCESS_TIME]: "2024.04.30 05:13:09",
      },
    ]);
    // TODO :: 최초 로드는 전체 리스트 출력 하는지? , keywords를 빈값으로 보내면 되는건지?
    // axios.get(ROUTES.ACCOUNTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  }, []);

  const search = () => {
    showAlert({
      message: InfoMessages.noSearchResult,
    });

    // axios.get(ROUTES.ACCOUNTS, { params: { keyword } }).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  };

  const clickEdit = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }
    if (selectRows.length > 1) {
      showAlert({
        message: ErrorMessages.oneSelect,
      });
      return;
    }

    navigate(ROUTES.ACCOUNT_EDIT, {
      state: {
        selectedId: selectRows[0].id,
        selectedInfo: selectRows[0], // TOBE :: 삭제
      },
    });
  };

  const clickDelete = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    // for (const selectedRow of selectRows) {
    //   axios.delete(ROUTES.ACCOUNTS_MANAGE(selectedRow.adminId)).then(res => {
    //     showAlert({
    //       message: InfoMessages.successDelete,
    //     });
    //   })
    // }

    setData((prev) =>
      prev.filter(
        (item) =>
          !selectRows.some(
            (selected) => selected[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID]
          )
      )
    );

    tableRef.current?.clearSelection();
    setselectRows([]); // 선택 초기화

    setTimeout(() => {
      showAlert({
        message: InfoMessages.successDelete,
      });
    }, 100);
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
                  <Button
                    label={LABELS.USER_REGISTER}
                    onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={ACCOUNTS_COLUMNS}
        data={data}
        pageSize={5}
        onRowSelectionChange={setselectRows}
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
