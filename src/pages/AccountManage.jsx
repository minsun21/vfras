import React, { useState, useRef } from "react";
import Table from "../components/Table";

const AccountManage = () => {
  
  const [selectedRows, setSelectedRows] = useState([]);
  const tableRef = useRef();

  const columns = [
    {
      header: "사용자 정보",
      columns: [
        { accessorKey: "name", header: "이름" },
      ],
    },
    {
      header: "연락처",
      columns: [
        { accessorKey: "email", header: "이메일" },
        { accessorKey: "phone", header: "전화번호" },
      ],
    },
    {
      accessorKey: "age",
      header: "나이",
    },
    {
      id: "actions",
      header: "동작",
      cell: ({ row }) => (
        <button onClick={() => alert(`${row.original.name} 클릭됨`)}>
          상세보기
        </button>
      ),
    },
    {
      id: "radio1",
      header: "선택1",
    },
    {
      id: "radio2", //radio-approve 도 됨
      header: "선택2",
    },
  ];

  const data = [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      phone: "010-1111-1111",
      age: 30,
      radio: true,
      radio2: false,
    },
    {
      id: 2,
      name: "김개발",
      email: "kim@example.com",
      phone: "010-2222-2222",
      age: 28,
      radio: false,
      radio2: true,
    },
    {
      id: 3,
      name: "이디자이너",
      email: "lee@example.com",
      phone: "010-3333-3333",
      age: 26,
      radio: false,
      radio2: false,
    },
    {
      id: 4,
      name: "박기획",
      email: "park@example.com",
      phone: "010-4444-4444",
      age: 34,
      radio: false,
      radio2: false,
    },
    {
      id: 5,
      name: "최마케팅",
      email: "choi@example.com",
      phone: "010-5555-5555",
      age: 32,
      radio: false,
      radio2: false,
    },
    {
      id: 6,
      name: "한운영",
      email: "han@example.com",
      phone: "010-6666-6666",
      age: 29,
      radio: false,
      radio2: false,
    },
    {
      id: 7,
      name: "윤서비스",
      email: "yoon@example.com",
      phone: "010-7777-7777",
      age: 31,
      radio: false,
      radio2: false,
    },
    {
      id: 8,
      name: "정테스트",
      email: "jung@example.com",
      phone: "010-8888-8888",
      age: 27,
      radio: false,
      radio2: false,
    },
    {
      id: 9,
      name: "오프론트",
      email: "oh@example.com",
      phone: "010-9999-9999",
      age: 35,
      radio: false,
      radio2: false,
    },
    {
      id: 10,
      name: "문백엔드",
      email: "moon@example.com",
      phone: "010-0000-0000",
      age: 33,
      radio: false,
      radio2: false,
    },
  ];

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  return (
    <div>
      <div></div>
      <div>
        <Table
          ref={tableRef}
          columns={columns}
          data={data}
          pageSize={5}
          rowSelectionEnabled={true}
          onRowSelectionChange={setSelectedRows}
          onSave={(all) => console.log("전체:", all)}
        />
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => console.log("삭제", selectedRows)}>
            선택 삭제
          </button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
