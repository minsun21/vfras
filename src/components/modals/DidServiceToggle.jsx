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
    <div className="svcItem">
      <div className="svcTit">
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
        <div className="svcBox">
          {/* 왼쪽 */}
          <div className="svcBoxL">
            {info.forms.map((item) => {
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
                            size="w130"
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
                      size="w150"
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
          <div className="svcBoxC">
            <div>
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.ADD}
                // onClick={handleAdd}
              />
              <Button type={BUTTON_DELETE} 
              // onClick={handleDelete} 
              />
              <Button
                type={BUTTON_CANCEL}
                label={LABELS.ALL_DELETE}
                // onClick={handleDeleteAll}
              />
            </div>
            <div>
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
          <div className="svcBoxR">
            <Table columns={info.columns} data={info.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleTable;
