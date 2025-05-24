import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";

const DidConfig = ({
  config,
  addDid,
  didInfo,
  addDidConfig,
  deleteDidConfig,
}) => {
  const [inputs, setInputs] = useState({});
  const parentRef = useRef();
  const [selectRows, setSelectRows] = useState([]);

  useEffect(() => {
    const initialInputs = {};

    config.forms.forEach((form) => {
      if (form.fields) {
        form.fields.forEach((sub) => {
          if (initialInputs[sub.key] === undefined) {
            initialInputs[sub.key] = "";
          }
        });
      } else if (form.type === "select") {
        // select 초기화
        initialInputs[form.key] = form.options?.[0]?.key ?? "";
      } else {
        // 일반 input 초기화
        initialInputs[form.key] = "";
      }
    });

    setInputs(initialInputs);
  }, [config.forms]);

  const openAccordion = (e) => {
    if (parentRef.current) {
      parentRef.current.classList.toggle("active");
    }
  };

  return (
    <div className="lvItem" ref={parentRef}>
      <div className="title-row" onClick={openAccordion}>
        <div className="lvTitleBox">
          <div className="lvTitle">{config.title}</div>
          <div className="lvSummary">
            {config.max &&
              LABELS.DID_CONFIG_LENGH(
                didInfo[config.dataKey].length,
                config.max
              )}
          </div>
        </div>
        <label className="lvSwitch">
          <input
            type="checkbox"
            checked={didInfo[config.key]}
            onChange={() => addDid(config.key)}
          />
          <span className="slider"></span>
        </label>
      </div>
      {/* 본문: 오픈 시에만 표시 */}
      <div className="lvContent">
        {/* 왼쪽 */}
        <div className="svcBoxL">
          {config.forms.map((item) => {
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
              <div key={key}>
                {item.type === "select" ? (
                  <Select
                    value={value}
                    options={options}
                    onChange={(e) => handleChange(e.target.value)}
                    nonEmpty={true}
                  />
                ) : type === "textarea" ? (
                  <textarea
                    value={inputs[key] || ""}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                ) : fields ? (
                  <div>
                    {fields.map((subField, idx) => (
                      <div key={subField.key}>
                        <Input
                          size="w120"
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
                    size="w120"
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
            onClick={() => addDidConfig(config, didInfo, inputs)}
          />
          <Button
            type={BUTTON_DELETE}
            onClick={() => {
              if (selectRows.length === 0) return;

              const newList = didInfo[config.dataKey].filter(
                (item) => !selectRows.some((s) => s === item)
              );
              deleteDidConfig(config, newList);
            }}
          />
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.ALL_DELETE}
            onClick={() => {
              const confirmed = window.confirm(
                "정말 모든 항목을 삭제하시겠습니까?"
              );
              if (confirmed) {
                deleteDidConfig(config, []);
              }
            }}
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
          {config.columns && (
            <Table
              columns={config.columns}
              data={didInfo[config.dataKey]}
              paginationEnabled={false}
              resultLabel={false}
              pageSelect={false}
              onRowSelectionChange={setSelectRows}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DidConfig;
