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

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState({});
  const [data, setData] = useState(subscribe_data);
  const [allType, setAllType] = useState([]);
  const [subsriberTypeOptions, setSubsriberTypeOptions] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [userStateOptions, setUserStateOptions] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setAllType(option_allType);
    setSubsriberTypeOptions(option_subsriberType);
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

  const approvedSubsriber = () => {
    if (selectedRows.length === 0) {
      alert("가입자를 선택해주세요");
    }
  };

  const deleteSubsriber = () => {
    if (selectedRows.length === 0) {
      alert("가입자를 선택해주세요");
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
            <Input placeholder="가입자명, 번호를 입력해주세요." />
          </div>
          <div>
            <Select
              label={"가입자 타입"}
              value={searchInput.subsriberType}
              options={subsriberTypeOptions}
              nonEmpty={true}
            />
            <Select
              label={"서비스 타입"}
              value={searchInput.serviceType}
              options={serviceTypeOptions}
              nonEmpty={true}
            />
            <Select
              label={"가입자 상태"}
              value={searchInput.userState}
              options={userStateOptions}
              nonEmpty={true}
            />
            <Button type={BUTTON_SEARCH} />
            <span>{`검색결과 : ${data.length}건`}</span>
          </div>
        </div>
        <span>{`검색결과 : ${data.length}건`}</span>
      </div>
      <Table
        ref={tableRef}
        columns={subscribe_columns(navigateManage)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={true}
        onRowSelectionChange={setSelectedRows}
      />
      <div style={{ marginTop: "1rem" }}>
        <Button label={"승인"} onClick={approvedSubsriber} />
        <Button type={BUTTON_CANCEL} label={"삭제"} onClick={deleteSubsriber} />
      </div>
    </div>
  );
};

export default Subscriber;
