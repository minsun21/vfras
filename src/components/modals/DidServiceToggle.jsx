import React, { useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";

const ToggleTable = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([
    { area: "서울", soundCode: "11111", accessorKey: "20241225~20251225" },
    { area: "부산", soundCode: "12345", accessorKey: "20241225~20251225" },
    { area: "서울", soundCode: "23333", accessorKey: "20241225~20251225" },
    { area: "부산", soundCode: "45555", accessorKey: "20241225~20251225" },
  ]);
  const [left] = useState([
    {
      key: "area",
      type: "select",
      placeholder: "지역",
      options: [
        { key: "서울", value: "서울" },
        { key: "부산", value: "부산" },
      ],
    },
    { key: "soundCode", type: "text", placeholder: "음원코드" },
    {
      key: "didDate",
      type: "date",
      multi: true,
      fields: [
        { key: "startDate", type: "date" },
        { key: "endDate", type: "date" },
      ],
    },
    { key: "callerNumber", type: "textarea" },
  ]);
  const [columns, setColumns] = useState([
    {
      accessorKey: "area",
      header: "지역",
    },
    {
      accessorKey: "soundCode",
      header: "음원코드",
    },
    {
      accessorKey: "didDate",
      header: "날짜",
    },
  ]);
  const [inputs, setInputs] = useState({});

  const handleAdd = () => {
    const nextId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    setData([...data, { id: nextId, ...inputs }]);
    setInputs({});
  };

  const handleDelete = () => {
    setData(data.slice(0, -1));
  };

  const handleDeleteAll = () => {
    setData([]);
  };

  return (
    <div style={{ border: "1px solid black", width: 500 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid black",
          padding: 10,
        }}
      >
        <h4>{title}</h4>
        <div>
          <span>{LABELS.IS_OPEN}</span>
          <label>
            <input
              type="checkbox"
              checked={open}
              onChange={() => setOpen((prev) => !prev)}
              style={{ width: 40, height: 20 }}
            />
          </label>
        </div>
      </div>
      {/* 본문: 오픈 시에만 표시 */}
      {open && (
        <div style={{ display: "flex" }}>
          {/* 왼쪽 */}
          <div
            style={{
              borderRight: "1px solid #0074C1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 10,
            }}
          >
            {left.map((item) => {
              const {
                key,
                type = "text",
                options = [],
                placeholder,
                multi,
                fields,
              } = item;

              const value = inputs[key] || "";

              const handleChange = (val) => {
                setInputs((prev) => ({ ...prev, [key]: val }));
              };

              return (
                <div style={{ marginBottom: "5px" }} key={key}>
                  {item.type === "select" ? (
                    <Select
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                      nonEmpty={true}
                    />
                  ) : type === "textarea" ? (
                    <textarea style={{ height: "80px" }} />
                  ) : multi ? (
                    <div>
                      {fields.map((subField, idx) => (
                        <div key={subField.key}>
                          <Input
                            type={subField.type}
                            value={inputs[subField.key] || ""}
                            onChange={(e) =>
                              setInputs((prev) => ({
                                ...prev,
                                [subField.key]: e.target.value,
                              }))
                            }
                          />
                          {idx === 0 && <span>{"~"}</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Input
                      value={value}
                      type={type}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 버튼 영역 */}
          <div
            style={{
              borderRight: "1px solid #0074C1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderBottom: "1px solid black",
                paddingBottom: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.ADD}
                onClick={handleAdd}
              />
              <Button type={BUTTON_DELETE} onClick={handleDelete} />
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.ALL_DELETE}
                onClick={handleDeleteAll}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>{LABELS.MAIN_NUMBER}</div>
              <Button
                type={BUTTON_DELETE}
                onClick={handleDelete}
                label={LABELS.BULK_APPLY}
              />
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.BULK_DELETE}
                onClick={handleDeleteAll}
              />
            </div>
          </div>

          {/* 테이블 영역 */}
          <div style={{ flex: 1, padding: 10 }}>
            <Table columns={columns} data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleTable;
