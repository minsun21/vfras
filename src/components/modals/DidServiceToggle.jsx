import React, { useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";

const ToggleTable = ({ info }) => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  // const handleAdd = () => {
  //   const nextId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
  //   setData([...data, { id: nextId, ...inputs }]);
  //   setInputs({});
  // };

  // const handleDelete = () => {
  //   setData(data.slice(0, -1));
  // };

  // const handleDeleteAll = () => {
  //   setData([]);
  // };

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
        <h4>{info.title}</h4>
        <h4>{LABELS.DID_CONFIG_LENGH(info.data.length, info.max)}</h4>
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
            {info.forms.map((item) => {
              const {
                key,
                type = "text",
                options = [],
                placeholder,
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
                  ) : fields ? (
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
                // onClick={handleAdd}
              />
              <Button
                type={BUTTON_DELETE}
                // onClick={handleDelete}
              />
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.ALL_DELETE}
                // onClick={handleDeleteAll}
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
                // onClick={handleDelete}
                label={LABELS.BULK_APPLY}
              />
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.BULK_DELETE}
                // onClick={handleDeleteAll}
              />
            </div>
          </div>

          {/* 테이블 영역 */}
          <div style={{ flex: 1, padding: 10 }}>
            <Table columns={info.columns} data={info.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleTable;

