import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { subscribe_columns, subscribe_data } from "../config/DataConfig";
import {
  option_subsriberType,
  option_allType,
  option_serviceType,
  option_userState,
} from "../config/FieldsConfig";
import { LABELS } from "../constants/Labels";
import {
  errorMessages,
  infoMessages,
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { showAlert, showDialog } = useModal();

  const [searchInput, setSearchInput] = useState({});
  const [data, setData] = useState([]);
  const [allType, setAllType] = useState([]);
  const [subsriberTypeOptions, setsubsriberTypeOptions] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [userStateOptions, setUserStateOptions] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setAllType(option_allType);
    setsubsriberTypeOptions(option_subsriberType);
    setServiceTypeOptions(option_serviceType);
    setUserStateOptions(option_userState);

    setSearchInput({
      allType: option_allType[0],
      subsriberType: option_subsriberType[0],
      serviceType: option_serviceType[0],
      userState: option_userState[0],
    });

    setData(subscribe_data);
  }, []);

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBER_MANAGE, {
      state: {
        selectedId: row.id,
      },
    });
  };

  const approvedSUBSCRIBER = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    // axios

    for (const selectedRow of selectedRows) {
      if (selectedRow.state === LABELS.SUBSCRIBE) {
        showAlert({
          message: subsriberMessages.approvedError,
        });
        return;
      }
    }

    const selectedIds = tableRef.current.getSelectedRowIds();

    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      state: LABELS.SUBSCRIBE,
    }));

    showAlert({
      message: infoMessages.successEdit,
    });
  };

  const clickDelete = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: infoMessages.confirmDelete(selectedRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    // showAlert({
    //   message: infoMessages.successDelete,
    // });
  };

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  return (
    <div>
      <div className="search-area">
        <div>
          <div>
            <Select
              value={searchInput.allType}
              options={allType}
              nonEmpty={true}
            />
            <Input placeholder={subsriberMessages.searchPlaceHolder} />
          </div>
          <div>
            <Select
              label={LABELS.SUBSCRIBER_TYPE}
              value={searchInput.subsriberType}
              options={subsriberTypeOptions}
              nonEmpty={true}
            />
            <Select
              label={LABELS.SERVICE_TYPE}
              value={searchInput.serviceType}
              options={serviceTypeOptions}
              nonEmpty={true}
            />
            <Select
              label={LABELS.SUBSCRIBER_STATE}
              value={searchInput.userState}
              options={userStateOptions}
              nonEmpty={true}
            />
            <Button type={BUTTON_SEARCH} onClick={search} />
            <span>{LABELS.SEARCH_RESULT(data.length)}</span>
          </div>
        </div>
      </div>
      <Table
        ref={tableRef}
        columns={subscribe_columns(navigateManage)}
        data={data}
        pageSize={10}
        onRowSelectionChange={setSelectedRows}
      />
      <div>
        <Button label={LABELS.APPROVE} onClick={approvedSUBSCRIBER} />
        <Button
          type={BUTTON_CANCEL}
          label={LABELS.DELETE}
          onClick={clickDelete}
        />
      </div>
    </div>
  );
};

export default Subscriber;
