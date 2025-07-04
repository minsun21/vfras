import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_DELETE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import {
  SUBSRIBES_COLUMNS,
  SUBSRIBES_COLUMNS_USER,
} from "../config/DataConfig";
import { LABELS } from "../constants/Labels";
import {
  ErrorMessages,
  InfoMessages,
  SubsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { KEYS } from "../constants/Keys";
import {
  SEARCH_TYPES,
  SEARCH_SERVICE_TYPES,
  SEARCH_SUBSRIBERS_STATE,
  SEARCH_SUBSRIBERS_TYPES,
} from "../config/Options";
import Form from "../components/Form";
import { findMappedValue } from "../utils/Util";
import axios from "../api/axios";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { showAlert, showDialog } = useModal();

  const [searchInputs, setSearchInputs] = useState({
    [KEYS.KEYWORD]: "",
    [KEYS.SEARCH_TYPE]: SEARCH_TYPES[0].key,
    [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
    [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[0].key,
    [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[0].key,
  });
  const [data, setData] = useState([]);

  const [selectRows, setselectRows] = useState([]);

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBERS_MANAGE, {
      state: {
        [KEYS.SUB_NO]: row[KEYS.SUB_NO],
        selectRow: {
          [KEYS.SUB_NO]: row[KEYS.SUB_NO],
          [KEYS.NAME]: row[KEYS.NAME],
          [KEYS.SUB_STATUS]: row[KEYS.SUB_STATUS],
          [KEYS.SUB_TYPE]: findMappedValue(
            SEARCH_SUBSRIBERS_TYPES,
            row[KEYS.SUB_TYPE]
          ),
          [KEYS.SERVICE_TYPE]: findMappedValue(
            SEARCH_SERVICE_TYPES,
            row[KEYS.SERVICE_TYPE]
          ),
          [KEYS.FROM_NO]: row[KEYS.FROM_NO],
          [KEYS.TO_NO]: row[KEYS.TO_NO],
          [KEYS.TEL_FROM_NO]: row[KEYS.TEL_FROM_NO],
          [KEYS.TEL_TO_NO]: row[KEYS.TEL_TO_NO],
        }, // TOBE :: 삭제
      },
    });
  };

  // 가입자 승인
  const approvedSub = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }

    for (const selectedRow of selectRows) {
      if (selectedRow[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[1].key) {
        showAlert({
          message: SubsriberMessages.approvedError,
        });
        return;
      }
    }

    const inputs = selectRows.map((row) => {
      return row[KEYS.SUB_NO];
    });

    axios.put(ROUTES.SUBSCRIBERS_APPROVE, inputs).then((res) => {
      tableRef.current.updateRowsById(inputs, (row) => ({
        ...row,
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
      }));
      showAlert({
        message: InfoMessages.successEdit,
      });
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
    const subNos = selectRows.map((row) => {
      return row[KEYS.SUB_NO];
    });
    const inputs = {
      data: subNos,
    };
    axios.delete(ROUTES.SUBSCRIBERS, inputs).then((res) => {
      search();
      showAlert({
        message: InfoMessages.successDelete,
      });
    });
  };

  const search = () => {
    tableRef.current?.triggerFetch(0, 15);
  };

  const getData = (page = 0, size = 15) => {
    return axios.get(ROUTES.SUBSCRIBERS, {
      params: {
        ...searchInputs,
        page: page,
        size: size,
      },
    });
  };

  const topBtns = () => {
    return (
      <>
        <Button label={LABELS.APPROVE} onClick={approvedSub} />
        <Button type={BUTTON_DELETE} onClick={clickDelete} />
      </>
    );
  };

  const onChange = (e) => {
    setSearchInputs({
      ...searchInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Form className="search-box">
        <table className="tbl-input">
          <thead>
            <tr>
              <th>
                <label className="schTxtL1">{LABELS.DIVISION_SEARCH}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SUBSCRIBER_TYPE}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SERVICE_TYPE}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SUBSCRIBER_STATE}</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Select
                    value={searchInputs[KEYS.SEARCH_TYPE]}
                    Options={SEARCH_TYPES}
                    nonEmpty={true}
                    name={KEYS.SEARCH_TYPE}
                    onChange={onChange}
                  />
                  <Input
                    type="text"
                    className="form-input"
                    name={KEYS.KEYWORD}
                    value={searchInputs[KEYS.KEYWORD] || ""}
                    placeholder={SubsriberMessages.searchPlaceHolder}
                    onChange={onChange}
                  />
                  <span>
                    <Button type={BUTTON_SEARCH} onClick={search} />
                  </span>
                </div>
              </td>
              <td>
                <Select
                  value={searchInputs[KEYS.SUB_TYPE]}
                  Options={SEARCH_SUBSRIBERS_TYPES}
                  nonEmpty={true}
                  name={KEYS.SUB_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInputs[KEYS.SERVICE_TYPE]}
                  Options={SEARCH_SERVICE_TYPES}
                  nonEmpty={true}
                  name={KEYS.SERVICE_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInputs[KEYS.SUB_STATUS]}
                  Options={SEARCH_SUBSRIBERS_STATE}
                  nonEmpty={true}
                  name={KEYS.SUB_STATUS}
                  onChange={onChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={SUBSRIBES_COLUMNS(navigateManage)}
        data={data}
        setTableData={setData}
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
        manualPagination={true}
        fetchData={getData}
      />
    </div>
  );
};

export default Subscriber;
