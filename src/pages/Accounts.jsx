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

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert, showDialog } = useModal();
  const [selectRows, setselectRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    axios.get(ROUTES.ACCOUNTS, { params: { keyword } }).then((res) => {
      const result = res.data.resultData.map(data => {
        data[KEYS.LAST_ACCESS_TIME] = data.loginInfo[KEYS.LAST_ACCESS_TIME];
        return data;
      })
      if (result.length === 0) {
        showAlert({
          message: InfoMessages.noSearchResult,
        });
        return;
      }
      setData(result);
    });
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

  const topBtns = () => {
    return (
      <>
        <Button label={LABELS.USER_EDIT} onClick={clickEdit} />
        <Button type={BUTTON_DELETE} onClick={clickDelete} />
      </>
    );
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
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
      />
    </>
  );
};

export default AccountManage;
