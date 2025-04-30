import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { sounds_source_columns, sounds_source_data } from "../config/DataConfig";

const SoundSource = () => {
  
  const tableRef = useRef();

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(sounds_source_data);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="search-area">
        <div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="음원코드, 제목/설명을 입력해주세요."
            size={INPUT_SIZE_LG}
          />
          <Button type={BUTTON_SEARCH} />
        </div>
        <span>{`검색결과 : ${data.length}건`}</span>
      </div>
      <Table
        ref={tableRef}
        columns={sounds_source_columns}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
        onSave={(all) => console.log("전체:", all)}
      />
    </div>
  );
};

export default SoundSource;
