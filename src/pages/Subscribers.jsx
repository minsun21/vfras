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
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { KEYS } from "../constants/Keys";
import {
  SEARCH_TYPES,
  SEARCH_SERVICE_TYPES,
  SEARCH_SUBSRIBERS_STATE,
  SEARCH_SUBSRIBERS_TYPES,
} from "../config/OPTIONS";
import Form from "../components/Form";
import { findMappedValue } from "../utils/Util";
import { useSelector } from "react-redux";
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
  const [filterInputs, setFilterInputs] = useState({});
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);

  const [selectRows, setselectRows] = useState([]);

  useEffect(() => {
    initFilterInputs();

    search();
  }, []);

  const initFilterInputs = () => {
    setFilterInputs({
      [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
      [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[0].key,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[0].key,
    });
  };

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
          message: subsriberMessages.approvedError,
        });
        return;
      }
    }

    // axios.put(ROUTES.SUBSCRIBERS_APPROVE, selectRows).then(res=>{
    //   const selectedIds = tableRef.current.getSelectedRowIds();
    //   tableRef.current.updateRowsById(selectedIds, (row) => ({
    //     ...row,
    //     state: LABELS.SUBSCRIBE,
    //   }));
    //   showAlert({
    //     message: InfoMessages.successEdit,
    //   });
    // })

    const selectedIds = tableRef.current.getSelectedRowIds();
    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
    }));
    showAlert({
      message: InfoMessages.successEdit,
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
    // axios.delete(ROUTES.SUBSCRIBERS, selectRows).then((res) => {
    //   showAlert({
    //     message: InfoMessages.successDelete,
    //   });
    // });

    const filteredData = data.filter(
      (item) =>
        !selectRows.some((r) => r[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID])
    );
    setData(filteredData);
    tableRef.current?.clearSelection();

    // closeModal();
    setTimeout(() => {
      showAlert({
        message: InfoMessages.successDelete,
      });
    }, 100);
  };

  const search = (page = 0, size = 20) => {
    return axios.get(ROUTES.SUBSCRIBERS, {
      params: {
        ...searchInputs,
        page: page,
        size: 4,
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

  useEffect(() => {
    const filtered = data.filter((item) => {
      return Object.entries(filterInputs).every(([key, val]) => {
        if (!val) return true;
        return item[key] === val;
      });
    });

    setFilteredData(filtered);
  }, [filterInputs, data]);

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
                    options={SEARCH_TYPES}
                    nonEmpty={true}
                    name={KEYS.SEARCH_TYPE}
                    onChange={onChange}
                  />
                  <Input
                    type="text"
                    className="form-input"
                    name={KEYS.KEYWORD}
                    value={searchInputs[KEYS.KEYWORD] || ""}
                    placeholder={subsriberMessages.searchPlaceHolder}
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
                  options={SEARCH_SUBSRIBERS_TYPES}
                  nonEmpty={true}
                  name={KEYS.SUB_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInputs[KEYS.SERVICE_TYPE]}
                  options={SEARCH_SERVICE_TYPES}
                  nonEmpty={true}
                  name={KEYS.SERVICE_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInputs[KEYS.SUB_STATUS]}
                  options={SEARCH_SUBSRIBERS_STATE}
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
        data={filterdData}
        setTableData={setFilteredData}
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
        manualPagination={true}
        fetchData={search}
      />
    </div>
  );
};

export default Subscriber;
