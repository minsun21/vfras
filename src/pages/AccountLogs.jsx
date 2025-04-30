import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { account_logs_columns, account_logs_data } from "../config/DataConfig";

const AccountLogs = () => {
  const tableRef = useRef();

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(account_logs_data);

  useEffect(() => {}, []);

  const detail_access_log =() =>{
console.log('detail_access_log')
  }

  return (
    <div>
      <div className="search-area">
        <div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="아이디, 이름, 부서를 입력해주세요."
            size={INPUT_SIZE_LG}
          />
          <Button type={BUTTON_SEARCH} />
        </div>
        <span>{`검색결과 : ${data.length}건`}</span>
      </div>
      <Table
        ref={tableRef}
        columns={account_logs_columns(detail_access_log)}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
        onSave={(all) => console.log("전체:", all)}
      />
    </div>
  );
}

export default AccountLogs