import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_DELETE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { subscribe_columns, subscribe_data } from "../config/DataConfig";
import {
  SEARCH_SUBSRIBERS_TYPES,
  DIVISIONS,
  SEARCH_SERVICE_TYPES,
  SEARCH_SUBSRIBERS_STATE,
} from "../config/FieldsConfig";
import { LABELS } from "../constants/Labels";
import {
  errorMessages,
  infoMessages,
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { KEYS } from "../constants/Keys";
import axios from "../api/axios";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { showAlert, showDialog, closeModal } = useModal();

  const [searchInput, setSearchInput] = useState({});
  const [data, setData] = useState([]);
  const [allType, setAllType] = useState([]);

  const [selectRows, setselectRows] = useState([]);

  useEffect(() => {
    setAllType(DIVISIONS);

    setSearchInput({
      [KEYS.SEARCH_DIVISION_VALUE]: "",
      [KEYS.SEARCH_DIVISION]: DIVISIONS[0].key,
      [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
      [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[0].key,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[0].key,
    });

    setData(subscribe_data);
  }, []);

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBERS_MANAGE, {
      state: {
        [KEYS.SUB_NO]: row[KEYS.SUB_NO],
      },
    });
  };

  const approvedSub = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    for (const selectedRow of selectRows) {
      if (selectedRow[KEYS.SUB_STATUS] === LABELS.SUBSCRIBE) {
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
    //     message: infoMessages.successEdit,
    //   });
    // })

    const selectedIds = tableRef.current.getSelectedRowIds();
    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      [KEYS.SUB_STATUS]: LABELS.SUBSCRIBE,
    }));
    showAlert({
      message: infoMessages.successEdit,
    });
  };

  const clickDelete = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: infoMessages.confirmDelete(selectRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    // axios.delete(ROUTES.SUBSCRIBERS, selectRows).then((res) => {
    //   showAlert({
    //     message: infoMessages.successDelete,
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
        message: infoMessages.successDelete,
      });
    }, 100);
  };

  const search = () => {
    console.log(searchInput);
    showAlert({
      message: infoMessages.noSearchResult,
    });

    // axios.post(ROUTES.ACCOUNTS, searchInput).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
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
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
        <table className="tbl-input">
          <colgroup></colgroup>
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
                    value={searchInput[KEYS.SEARCH_DIVISION]}
                    options={allType}
                    nonEmpty={true}
                    name={KEYS.SEARCH_DIVISION}
                    onChange={onChange}
                  />
                  <Input
                    type="text"
                    className="form-input"
                    name={KEYS.SEARCH_DIVISION_VALUE}
                    value={searchInput[KEYS.SEARCH_DIVISION_VALUE] || ""}
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
                  value={searchInput[KEYS.SUB_TYPE]}
                  options={SEARCH_SUBSRIBERS_TYPES}
                  nonEmpty={true}
                  name={KEYS.SUB_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInput[KEYS.SERVICE_TYPE]}
                  options={SEARCH_SERVICE_TYPES}
                  nonEmpty={true}
                  name={KEYS.SERVICE_TYPE}
                  onChange={onChange}
                />
              </td>
              <td>
                <Select
                  value={searchInput[KEYS.SUB_STATUS]}
                  options={SEARCH_SUBSRIBERS_STATE}
                  nonEmpty={true}
                  name={KEYS.SUB_STATUS}
                  onChange={onChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Table
        ref={tableRef}
        columns={subscribe_columns(navigateManage)}
        data={data}
        setTableData={setData}
        pageSize={10}
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
      />
    </div>
  );
};

export default Subscriber;
