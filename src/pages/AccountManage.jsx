import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Button, { BUTTON_CANCEL, BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import {
  account_manage_columns,
  account_manage_data,
} from "../config/DataConfig";
import { ROUTES } from "../constants/routes";

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(account_manage_data);

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  return (
    <div>
      <div className="search-area">
        <div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="아이디, 이름, 부서를 입력해주세요"
            size={INPUT_SIZE_LG}
          />
          <Button type={BUTTON_SEARCH} />
          <Button
            label={"사용자 등록"}
            onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
          />
        </div>
        <span>{`검색결과 : ${data.length}건`}</span>
      </div>
      <div>
        <Table
          ref={tableRef}
          columns={account_manage_columns}
          data={data}
          pageSize={5}
          rowSelectionEnabled={true}
          onRowSelectionChange={setSelectedRows}
          onSave={(all) => console.log("전체:", all)}
        />
        <div style={{ marginTop: "1rem" }}>
          <Button
            type={BUTTON_CANCEL}
            label={"사용자 정보 수정"}
            onClick={() => navigate(ROUTES.ACCOUNT_EDIT)}
          />
          <Button type={BUTTON_CANCEL} label={"삭제"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
