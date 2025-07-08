import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_DELETE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { SUBSRIBES_COLUMNS } from "../config/DataConfig";
import { LABELS } from "../constants/Labels";
import {
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
import axios from "../api/axios";
import {
  approveSubscribers,
  deleteSubscribers,
  validateSubscribersBeforeApprove,
  validateSubscribersBeforeDelete,
} from "../service/subsriberService";
import { useSelector } from "react-redux";
import { PERMISSIONS } from "../constants/Permissions";

const Subscriber = () => {
  const permissions = useSelector((state) => state.auth.user?.permissions);
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

  const searchInputsRef = useRef(searchInputs);

  useEffect(() => {
    searchInputsRef.current = searchInputs;
  }, [searchInputs]);

  const search = () => {
    tableRef.current?.triggerFetch(0, 15);
  };

  const getData = (page = 0, size = 15) => {
    return axios.get(ROUTES.SUBSCRIBERS, {
      params: {
        ...searchInputsRef.current,
        page,
        size,
      },
    });
  };

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBERS_MANAGE, {
      state: {
        [KEYS.SUB_NO]: row[KEYS.SUB_NO],
      },
    });
  };

  // 가입자 승인
  const approvedSub = async () => {
    const errorMsg = validateSubscribersBeforeApprove(selectRows);
    if (errorMsg) {
      showAlert({ message: errorMsg });
      return;
    }

    const subNos = selectRows.map((row) => row[KEYS.SUB_NO]);

    await approveSubscribers(subNos);

    tableRef.current.updateRowsById(subNos, (row) => ({
      ...row,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
    }));

    showAlert({ message: InfoMessages.successEdit });
  };

  // 가입자 삭제
  const clickDelete = () => {
    const errorMsg = validateSubscribersBeforeDelete(selectRows);
    if (errorMsg) {
      showAlert({ message: errorMsg });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = async () => {
    const subNos = selectRows.map((row) => row[KEYS.SUB_NO]);

    await deleteSubscribers(subNos);

    search();
    showAlert({ message: InfoMessages.successDelete });
  };

  const topBtns = () => {
    return (
      <>
        {permissions.includes(PERMISSIONS.SUBS_U) && <Button label={LABELS.APPROVE} onClick={approvedSub} />}
        {permissions.includes(PERMISSIONS.SUBS_D) && <Button type={BUTTON_DELETE} onClick={clickDelete} />}
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
