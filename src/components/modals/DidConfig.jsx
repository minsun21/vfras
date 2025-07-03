import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";
import { ErrorMessages, InfoMessages } from "../../constants/Message";
import { useModal } from "../../contexts/ModalContext";

const DidConfig = ({
  config,
  selectDid,
  addDidSubs,
  deleteDidConfig,
  bulkAdd,
  bulkDelete,
}) => {
  const { showAlert, showDialog } = useModal();
  const tableRef = useRef();
  const parentRef = useRef();
  const [selectRows, setSelectRows] = useState([]);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs({});
  }, [selectDid]);

  useEffect(() => {
    // 부가서비스 Form 초기화
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

  // 부가서비스 저장
  const addDidConfigAction = () => {
    const dataKey = config.dataKey;
    const currentList = selectDid[dataKey] || [];

    if (!addDidConfigValidation(config, inputs, currentList)) return;
    addDidSubs(config, inputs);
    resetSelectRows();
  };

  const bulkAddAction = () => {
    const key = config.key;
    const dataKey = config.dataKey;
    bulkAdd(key, dataKey, inputs);
  };

  const bulkDeleteAction = () => {
    const key = config.key;
    const dataKey = config.dataKey;
    bulkDelete(key, dataKey);
  };

  // 삭제
  const deleteAction = () => {
    if (selectRows.length === 0) return;

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: () => {
        deleteDidConfig(config, selectRows);
        resetSelectRows();
      },
    });
  };

  // 전체 삭제
  const allDeleteAction = () => {
    showDialog({
      message: InfoMessages.confirmAllDelete,
      onConfirm: () => {
        deleteDidConfig(config, []);
        resetSelectRows();
      },
    });
  };

  // 기본 입력값 체크
  const addDidConfigValidation = (config, inputs, currentList) => {
    const isEmpty = config.forms.some((form) => {
      if (form.fields) {
        return form.fields.some((sub) => {
          const val = inputs[sub.key];
          return (
            val === undefined || val === null || val.toString().trim() === ""
          );
        });
      } else {
        const val = inputs[form.key];
        return (
          val === undefined || val === null || val.toString().trim() === ""
        );
      }
    });

    if (isEmpty) {
      showAlert({ message: "모든 항목을 입력해주세요." });
      return;
    }

    // 날짜 유효성 검사
    const startDate = inputs.startDate;
    const endDate = inputs.endDate;
    if (startDate && endDate && startDate > endDate) {
      showAlert({
        message: ErrorMessages.date,
      });
      return;
    }

    // 시간 유효성 검사
    const startTime = inputs.startTime;
    const endTime = inputs.endTime;
    if (startTime && endTime && startTime > endTime) {
      showAlert({
        message: ErrorMessages.time,
      });
      return;
    }

    // 최대 갯수 초과 검사
    if (config.max && currentList.length >= config.max) {
      showAlert({
        message: ErrorMessages.max(config.title, config.max),
      });
      return;
    }

    return true;
  };

  const resetSelectRows = () => {
    setSelectRows([]);
    tableRef.current?.clearSelection?.();
  };

  return (
    <div className="lvItem" ref={parentRef}>
      <div className="title-row" onClick={openAccordion}>
        <div className="lvTitleBox">
          <div className="lvTitle">{config.title}</div>
          <div className="lvSummary">
            {config.max &&
              LABELS.DID_CONFIG_LENGH(
                selectDid[config.dataKey].length || 0,
                config.max
              )}
          </div>
        </div>
        <label className="lvSwitch">
          <input
            type="checkbox"
            checked={selectDid[config.key]}
            // onChange={() => didToggle(config.key)}
            disabled
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
            onClick={addDidConfigAction}
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
            onClick={bulkAddAction}
            label={LABELS.BULK_APPLY}
          />
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.BULK_DELETE}
            onClick={bulkDeleteAction}
          />
        </div>
        {/* 테이블 영역 */}
        <div className="svcBoxR">
          {config.columns && (
            <Table
              ref={tableRef}
              columns={config.columns}
              data={selectDid[config.dataKey]}
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
