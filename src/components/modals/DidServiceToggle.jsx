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

    const titleRows = document.querySelectorAll('.lvAccordion .title-row');
      titleRows.forEach(row => {
        row.addEventListener('click', () => {
          const item = row.parentElement;
          const isActive = item.classList.contains('active');
          document.querySelectorAll('.lvAccordion .item').forEach(i => i.classList.remove('active'));
          if (!isActive) item.classList.add('active');
        });
      });

  return (
      <div class="item">
        <div class="title-row">
            <div class="lvTitleBox">
              <div class="lvTitle">{info.title}</div>
              <div class="lvSummary">{LABELS.DID_CONFIG_LENGH(info.data.length, info.max)}</div>
            </div>
            <label class="lvSwitch">
              {/*  <span>{LABELS.IS_OPEN}</span> */} 
              <input
                  type="checkbox"
                //  checked={open}
                //  onChange={() => setOpen((prev) => !prev)}
                />
              <span class="slider"></span>
          </label>
      </div>

      {/* 본문: 오픈 시에만 표시 */}
      {open && (
        <div className="content">
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
                <div key={key}>
                  {item.type === "select" ? (
                    <Select
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                      nonEmpty={true}
                    />
                  ) : type === "textarea" ? (
                    <textarea/>
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
              <div className="svcBoxCTxt">{LABELS.MAIN_NUMBER}</div>
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
