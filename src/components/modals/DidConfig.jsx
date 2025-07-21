import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import Select from "../Select";
import Table from "../Table";
import { ErrorMessages, InfoMessages } from "../../constants/Message";
import { useModal } from "../../contexts/ModalContext";
import { isObjectInList } from "../../utils/Util";
import { PERMISSIONS } from "../../constants/Permissions";
import { useSelector } from "react-redux";

const DidConfig = ({
  config,
  selectDid,
  addDidSubs,
  deleteDidConfig,
  bulkAdd,
  bulkDelete,
  saveDidSub
}) => {
  const permissions = useSelector((state) => state.auth.user?.permissions);

  const { showAlert, showDialog } = useModal();
  const tableRef = useRef();
  const parentRef = useRef();
  const [selectRows, setSelectRows] = useState([]);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    initForms();

  }, [selectDid]);

  useEffect(() => {
    initForms();
  }, [config.forms]);

  // 부가서비스 Form 초기화
  const initForms = () => {
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
        initialInputs[form.key] = form.Options?.[0]?.key ?? "";
      } else {
        // 일반 input 초기화
        initialInputs[form.key] = "";
      }
    });

    setInputs(initialInputs);
  }

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

  // 부가서비스 추가
  const addDidConfigAction = () => {
    const dataKey = config.dataKey;
    const currentList = selectDid[dataKey] || [];

    if (!addDidConfigValidation(config, inputs, currentList)) return;
    addDidSubs(config, inputs);
    resetSelectRows();
  };

  // 부가서비스 저장
  const saveDid = () => {
    saveDidSub(config);
    resetSelectRows();
  }

  const bulkAddAction = () => {
    const key = config.key;
    const dataKey = config.dataKey;

    if (checkEmpty(config, inputs)) {
      showAlert({ message: ErrorMessages.allInsert });
      return;
    }

    bulkAdd(key, dataKey, inputs);
  };

  const bulkDeleteAction = () => {
    if (selectRows.length === 0) return;

    if (selectRows.length > 1) {
      showAlert({
        message: ErrorMessages.oneSelect
      })
      return;
    }
    bulkDelete(config.dataKey, selectRows[0]);
    resetSelectRows();
  };

  // 삭제
  const deleteAction = () => {
    if (selectRows.length === 0) return;

    deleteDidConfig(config, selectRows);
    resetSelectRows();
    // showDialog({
    //   message: InfoMessages.confirmDelete(selectRows.length),
    //   onConfirm: () => {
    //     deleteDidConfig(config, selectRows);
    //     resetSelectRows();
    //   },
    // });
  };

  // 전체 삭제
  const allDeleteAction = () => {
    showDialog({
      message: InfoMessages.confirmAllDelete,
      onConfirm: () => {
        deleteDidConfig(config, [], true);
        resetSelectRows();
      },
    });
  };

  // 기본 입력값 체크

  const checkEmpty = (config, inputs) => {
    return config.forms.some((form) => {
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

  };

  const addDidConfigValidation = (config, inputs, currentList) => {

    if (checkEmpty(config, inputs)) {
      showAlert({ message: ErrorMessages.allInsert });
      return;
    }
    // 중복 검사
    if (isObjectInList(inputs, currentList)) {
      showAlert({ message: ErrorMessages.duplicateSave });
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
    if (config.max && (currentList.length + 1) > config.max) {
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
              Options = [],
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
                    Options={Options}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                ) : type === "textarea" ? (
                  <div>
                    <span className="ft14">{"( ','구분, 최대 5개까지)"}</span>
                    < textarea
                      value={inputs[key] || ""}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
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
        {permissions.includes(PERMISSIONS.ACCNT_U) ?
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
            <div className="svcBoxCTxt"> <Button type={BUTTON_DELETE} label={LABELS.SAVE} onClick={saveDid} /></div>
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
          : <div className="svcBoxC" />}

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
