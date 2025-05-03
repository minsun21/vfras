import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { subscribe_columns, subscribe_data } from "../config/DataConfig";
import {
  option_SUBSCRIBERType,
  option_allType,
  option_serviceType,
  option_userState,
} from "../config/FieldsConfig";
import { LABELS } from "../constants/Label";
import { errorMessages, subsriberMessage } from "../constants/Message";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState({});
  const [data, setData] = useState(subscribe_data);
  const [allType, setAllType] = useState([]);
  const [SUBSCRIBERTypeOptions, setSUBSCRIBERTypeOptions] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [userStateOptions, setUserStateOptions] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setAllType(option_allType);
    setSUBSCRIBERTypeOptions(option_SUBSCRIBERType);
    setServiceTypeOptions(option_serviceType);
    setUserStateOptions(option_userState);

    setSearchInput({
      allType: option_allType[0],
      SUBSCRIBERType: option_SUBSCRIBERType[0],
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
      alert(errorMessages.nonSelect);
      return;
    }

    for (const selectedRow of selectedRows) {
      if (selectedRow.state === LABELS.SUBSCRIBE) {
        alert(subsriberMessage.approvedError);
        return;
      }
    }

    const selectedIds = tableRef.current.getSelectedRowIds();

    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      state: LABELS.SUBSCRIBE,
    }));
  };

  const deleteSUBSCRIBER = () => {
    if (selectedRows.length === 0) {
      alert(errorMessages.nonSelect);
      return;
    }
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
            <Input placeholder={subsriberMessage.searchPlaceHolder} />
          </div>
          <div>
            <Select
              label={LABELS.SUBSCRIBER_TYPE}
              value={searchInput.SUBSCRIBERType}
              options={SUBSCRIBERTypeOptions}
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
            <Button type={BUTTON_SEARCH} />
            <span>{LABELS.SEARCH_RESULT(data.length)}</span>
          </div>
        </div>
      </div>
      <Table
        ref={tableRef}
        columns={subscribe_columns(navigateManage)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={true}
        onRowSelectionChange={setSelectedRows}
      />
      <div>
        <Button label={LABELS.APPROVE} onClick={approvedSUBSCRIBER} />
        <Button
          type={BUTTON_CANCEL}
          label={LABELS.DELETE}
          onClick={deleteSUBSCRIBER}
        />
      </div>
    </div>
  );
};

export default Subscriber;
