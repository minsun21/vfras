import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";
import { InfoMessages } from "../../constants/Message";
import { useModal } from "../../contexts/ModalContext";

const DidConfig = ({
  config,
  didToggle,
  didInfo,
  addDidConfig,
  deleteDidConfig,
}) => {
  const { showAlert, showDialog } = useModal();

  const parentRef = useRef();
  const [selectRows, setSelectRows] = useState([]);
  const [inputs, setInputs] = useState({});

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
    const clickedEl = parentRef.current;

    if (clickedEl.classList.contains("active")) {
      document
        .querySelectorAll(".lvItem")
        .forEach((el) => el.classList.remove("active"));
    } else {
      document
        .querySelectorAll(".lvItem")
        .forEach((el) => el.classList.remove("active"));

      clickedEl.classList.add("active");
    }
  };

  const deleteAction = () => {
    if (selectRows.length === 0) return;

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: () => {
        const newList = didInfo[config.dataKey].filter(
          (item) => !selectRows.some((s) => s === item)
        );
        deleteDidConfig(config, newList);
        setTimeout(() => {
          showAlert({ message: InfoMessages.successDelete });
        }, 0);
      },
    });
  };

  const allDeleteAction = () => {
    showDialog({
      message: InfoMessages.confirmAllDelete,
      onConfirm: () => {
        deleteDidConfig(config, []);
        setTimeout(() => {
          showAlert({ message: InfoMessages.successDelete });
        }, 0);
      },
    });
  };

  return (
    <div className="lvItem" ref={parentRef}>
      <div className="title-row" onClick={openAccordion}>
        <div className="lvTitleBox">
          <div className="lvTitle">{config.title}</div>
          <div className="lvSummary">
            {config.max &&
              LABELS.DID_CONFIG_LENGH(
                didInfo[config.dataKey].length || 0,
                config.max
              )}
          </div>
        </div>
        <label className="lvSwitch">
          <input
            type="checkbox"
            checked={didInfo[config.key]}
            onChange={() => didToggle(config.key)}
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
                  />
                ) : type === "textarea" ? (
                  <textarea
                    value={inputs[key] || ""}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                ) : fields ? (
                  <div className="vFlex">
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
                        {idx === 0 && <span className="vFlex gap5">{"~"}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Input
                    size="w130"
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
            onClick={() => addDidConfig(config, inputs)}
          />
          <Button type={BUTTON_DELETE} onClick={deleteAction} />
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.ALL_DELETE}
            onClick={allDeleteAction}
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
