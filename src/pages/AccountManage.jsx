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

  const editAccount = () => {
    if(selectedRows.length ===0){
      alert('사용자를 선택해주세요');
      return;
    }
    if(selectedRows.length > 1){
      alert('사용자 1명 선택해 주세요');
      return;
    }

    navigate(ROUTES.ACCOUNT_EDIT, {
      state: {
        selectedId: selectedRows[0].id,
      },
    });
  }

  const deleteAccount = () =>{
    if(selectedRows.length ===0){
      alert('삭제할 사용자를 선택해주세요');
      return;
    }

    // {}건 삭제하시겠습니까?
  }

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
        />
        <div style={{ marginTop: "1rem" }}>
          <Button
            type={BUTTON_CANCEL}
            label={"사용자 정보 수정"}
            onClick={editAccount}
          />
          <Button type={BUTTON_CANCEL} label={"삭제"} onClick={deleteAccount} />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
