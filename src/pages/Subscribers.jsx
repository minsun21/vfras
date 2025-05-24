import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_DELETE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { SUBSRIBES_COLUMNS } from "../config/DataConfig";
import { LABELS } from "../constants/Labels";
import {
  ErrorMessages,
  InfoMessages,
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { KEYS } from "../constants/Keys";
import axios from "../api/axios";
import {
  SEARCH_DIVISIONS,
  SEARCH_SERVICE_TYPES,
  SEARCH_SUBSRIBERS_STATE,
  SEARCH_SUBSRIBERS_TYPES,
} from "../config/OPTIONS";
import Form from "../components/Form";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { showAlert, showDialog } = useModal();

  const [searchInputs, setSearchInputs] = useState({});
  const [filterInputs, setFilterInputs] = useState({});
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);

  const [selectRows, setselectRows] = useState([]);

  useEffect(() => {
    setSearchInputs({
      [KEYS.SEARCH_DIVISION]: SEARCH_DIVISIONS[0].key,
      [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
    });

    initFilterInputs();

    setData([
      {
        [KEYS.ADMIN_ID]: 1,
        [KEYS.ID]: 1,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 2,
        [KEYS.ID]: 12,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 3,
        [KEYS.ID]: 13,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 4,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 5,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 6,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 7,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "삭제",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 8,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "가입",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 5449,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 549,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 1429,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 329,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 459,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 449,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 319,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 219,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 19,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
    ]);
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
      },
    });
  };

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

  const search = () => {
    initFilterInputs();

    showAlert({
      message: InfoMessages.noSearchResult,
    });

    // axios.post(ROUTES.ACCOUNTS, searchInputs).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
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
    setSearchInputs({
      ...searchInputs,
      [e.target.name]: e.target.value,
    });
  };

  const filterData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFilterInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
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
                    value={searchInputs[KEYS.SEARCH_DIVISION]}
                    options={SEARCH_DIVISIONS}
                    nonEmpty={true}
                    name={KEYS.SEARCH_DIVISION}
                    onChange={onChange}
                  />
                  <Input
                    type="text"
                    className="form-input"
                    name={KEYS.SEARCH_DIVISION_VALUE}
                    value={searchInputs[KEYS.SEARCH_DIVISION_VALUE] || ""}
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
                  value={filterInputs[KEYS.SUB_TYPE]}
                  options={SEARCH_SUBSRIBERS_TYPES}
                  nonEmpty={true}
                  name={KEYS.SUB_TYPE}
                  onChange={filterData}
                />
              </td>
              <td>
                <Select
                  value={filterInputs[KEYS.SERVICE_TYPE]}
                  options={SEARCH_SERVICE_TYPES}
                  nonEmpty={true}
                  name={KEYS.SERVICE_TYPE}
                  onChange={filterData}
                />
              </td>
              <td>
                <Select
                  value={filterInputs[KEYS.SUB_STATUS]}
                  options={SEARCH_SUBSRIBERS_STATE}
                  nonEmpty={true}
                  name={KEYS.SUB_STATUS}
                  onChange={filterData}
                />
              </td>
              <td>
                <Button onClick={initFilterInputs} label={LABELS.RESET} />
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
        pageSize={10}
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
      />
    </div>
  );
};

export default Subscriber;
