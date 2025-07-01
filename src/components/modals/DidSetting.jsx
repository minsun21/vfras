import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { DID_CONFIG_DATAS, DID_SETTING_COLUMNS } from "../../config/DataConfig";
import Button, { BUTTON_DELETE } from "../Button";
import Input from "../Input";
import { KEYS } from "../../constants/Keys";
import Form from "../Form";
import AddDidModal from "./AddDidModal";
import { useModal } from "../../contexts/ModalContext";
import {
  ErrorMessages,
  InfoMessages,
  SubsriberMessages,
} from "../../constants/Message";
import { MODAL_MD } from "./ModalRenderer";
import { useDispatch } from "react-redux";
import { resetFormData } from "../../features/didAddSlice";
import { fieldsValidate } from "../../utils/FormValidation";
import { store } from "../../store";
import { DID_ADD_FIELDS } from "../../config/FieldsConfig";
import DidConfig from "./DidConfig";
import axios from "../../api/axios";
import { setConfigData } from "../../features/didConfigSlice";
import { ROUTES } from "../../constants/routes";

const DidSetting = ({ userInfo }) => {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const { showModal, showAlert, showDialog, closeModal } = useModal();

  const [tableData, setTableData] = useState([]);
  const [selectRows, setSelectRows] = useState([]);
  const [didData, setDidData] = useState([]); // 전체 DID data
  const [selectDid, setSelectDid] = useState({});
  const [checkboxSelected, setCheckboxSelected] = useState([]); // 체크박스 선택

  useEffect(() => {
    axios.get(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO])).then((res) => {
      const result = res.data.resultData;
      setTableData(result);
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch(setConfigData(didData));
  }, [didData]);

  useEffect(() => {
    if (selectRows.length !== 1) {
      setSelectDid();
      return;
    }

    const selectRow = selectRows[0];
    // 중복 검사
    const exist = didData.find(
      (item) =>
        item[KEYS.SUB_NO] === selectRow[KEYS.SUB_NO] &&
        item[KEYS.FROM_NO] === selectRow[KEYS.FROM_NO] &&
        item[KEYS.TO_NO] === selectRow[KEYS.TO_NO]
    );
    if (exist) {
      setSelectDid(exist);
      return;
    }

    // axios로 detail 정보 가져옴
    const newRow = {
      ...selectRow,
      circulars: [
        {
          rbtId: "1071087",
        },
      ],
      times: [
        {
          rbtId: "1071087",
          startTime: "0800",
          endTime: "1800",
          dayType: 0,
        },
      ],
      weeks: [
        {
          rbtId: "1071087",
          dayType: 0,
        },
      ],
      orgns: [
        {
          rbtId: "1071087",
          [KEYS.ORGN]: "02",
        },
      ],
      groups: [
        {
          rbtId: "1071087",
          groupId: "1",
        },
      ],
      duras: [
        {
          rbtId: "1071087",
          startDate: "2025-05-01",
          endDate: "2025-06-01",
        },
      ],
    };

    // setDidData((prev) => [...prev, newRow]);
    setSelectDid(newRow);
  }, [selectRows]);

  // did 회선 추가
  const addDidRow = () => {
    showModal({
      header: LABELS.ADD_ITEM,
      content: <AddDidModal />,
      size: MODAL_MD,
      onConfirm: () => {
        const didFormData = store.getState().didAdd;
        const errValidate = fieldsValidate(DID_ADD_FIELDS, didFormData);
        if (errValidate) {
          showAlert({
            message: errValidate,
          });
          return;
        }

        const newRow = {
          ...didFormData,
          id: Math.floor(Math.random() * 100) + 1,
        };
        setTableData((prev) => [...prev, newRow]);
        dispatch(resetFormData());
        closeModal();

        setTimeout(() => {
          showAlert({ message: InfoMessages.successAdd });
        }, 0);
      },
      onClose: () => {
        dispatch(resetFormData());
      },
    });
  };

  // did회선 삭제
  const deleteDidRows = () => {
    if (checkboxSelected.length === 0) {
      showAlert({ message: ErrorMessages.nonSelect });
      return;
    }

    if (checkboxSelected.length === tableData.length) {
      showAlert({ message: ErrorMessages.deleteBulk });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(checkboxSelected.length),
      onConfirm: () => {
        const selectedIds = checkboxSelected.map((row) => row.id);
        const updated = tableData.filter(
          (row) => !selectedIds.includes(row.id)
        );
        setTableData(updated);

        setCheckboxSelected([]);
        setSelectDid();
        setSelectRows([]);
        tableRef.current?.clearSelection?.();

        setTimeout(() => {
          showAlert({ message: InfoMessages.successDelete });
        }, 0);
      },
    });
  };

  const getDidKey = (item) => `${item.subNo}_${item.fromNo}_${item.toNo}`;

  // 사용 / 안함
  const didToggle = (key) => {
    const selectedKey = getDidKey(selectDid);
    const currentValue = selectDid?.[key] ?? false;
    const toggled = !currentValue;

    const updatedSelectDid = {
      ...selectDid,
      [key]: toggled,
    };

    setSelectDid(updatedSelectDid);

    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey ? { ...row, [key]: toggled } : row
      )
    );

    setDidData((prev) => {
      const exists = prev.some((row) => getDidKey(row) === selectedKey);
      if (exists) {
        return prev.map((row) =>
          getDidKey(row) === selectedKey ? { ...row, [key]: toggled } : row
        );
      } else {
        return [...prev, { ...updatedSelectDid }];
      }
    });
  };

  const deleteDidConfig = (config, newList) => {
    const key = config.key;
    const dataKey = config.dataKey;
    const selectedKey = getDidKey(selectDid);

    const updatedSelectDid = {
      ...selectDid,
      [key]: newList.length > 0 ? selectDid[key] : false,
      [dataKey]: newList,
    };

    setSelectDid(updatedSelectDid);

    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey
          ? { ...row, [key]: updatedSelectDid[key] }
          : row
      )
    );

    setDidData((prev) => {
      const exists = prev.some((row) => getDidKey(row) === selectedKey);
      if (exists) {
        return prev.map((row) =>
          getDidKey(row) === selectedKey
            ? {
                ...row,
                [key]: updatedSelectDid[key],
                [dataKey]: updatedSelectDid[dataKey],
              }
            : row
        );
      } else {
        return [...prev, { ...updatedSelectDid }];
      }
    });
  };

  const addDidConfig = (config, inputs) => {
    const key = config.key;
    const dataKey = config.dataKey;
    const selectedKey = getDidKey(selectDid);
    const currentList = selectDid[dataKey] || [];

    if (!addDidConfigValidation(config, inputs, currentList)) return;

    const newList = getNewAddList(config, inputs);

    const updatedSelectDid = {
      ...selectDid,
      [key]: true,
      [dataKey]: newList,
    };

    setSelectDid(updatedSelectDid);

    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey ? { ...row, [key]: true } : row
      )
    );

    setDidData((prev) => {
      const exists = prev.some((row) => getDidKey(row) === selectedKey);
      if (exists) {
        return prev.map((row) =>
          getDidKey(row) === selectedKey
            ? { ...row, [key]: true, [dataKey]: newList }
            : row
        );
      } else {
        return [...prev, { ...updatedSelectDid }];
      }
    });
  };

  const addDidConfigValidation = (config, inputs, currentList) => {
    // 기본 입력값 체크
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

  const getNewAddList = (config, inputs) => {
    const extractValues = () => {
      const result = {};
      config.forms.forEach((form) => {
        if (form.fields) {
          form.fields.forEach((sub) => {
            result[sub.key] = inputs[sub.key];
          });
        } else {
          result[form.key] = inputs[form.key];
        }
      });
      return result;
    };

    const newItem = {
      ...extractValues(),
      rbtId: inputs.rbtId || inputs[KEYS.RBT_ID],
    };

    // 그룹인 경우
    if (config.key === KEYS.IS_GROUP_JOINED) {
      const groupList = selectDid[config.dataKey] || [];
      const nextGroupId = groupList.length
        ? Math.max(
            ...groupList.map((item) => parseInt(item.groupId || "0", 10))
          ) + 1
        : 1;

      newItem.groupId = String(nextGroupId);
    }

    return [...(selectDid?.[config.dataKey] ?? []), newItem];
  };

  const handleInterruptChange = (e) => {
    const selectedKey = getDidKey(selectDid);
    const name = e.target.name;

    const isInterrupt = name === LABELS.START ? false : true;

    setSelectDid({
      ...selectDid,
      [KEYS.IS_INTERRUPT]: isInterrupt,
      [KEYS.INTERRUPT_RESERVATION_FROM]: "",
      [KEYS.INTERRUPT_RESERVATION_TO]: "",
    });

    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey
          ? { ...row, [KEYS.IS_INTERRUPT]: isInterrupt }
          : row
      )
    );

    setDidData((prev) => {
      const exists = prev.some((row) => getDidKey(row) === selectedKey);
      if (exists) {
        return prev.map((row) =>
          getDidKey(row) === selectedKey
            ? { ...row, [KEYS.IS_INTERRUPT]: isInterrupt }
            : row
        );
      } else {
        return [...prev, { ...selectDid, [KEYS.IS_INTERRUPT]: isInterrupt }];
      }
    });
  };

  const handleInterruptDateChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === KEYS.INTERRUPT_RESERVATION_TO) {
      // 종료일을 지정할 때
      if (!selectDid[KEYS.INTERRUPT_RESERVATION_FROM]) {
        showAlert({
          message: ErrorMessages.dateStart,
        });
        return;
      }

      if (selectDid[KEYS.INTERRUPT_RESERVATION_FROM] > value) {
        showAlert({
          message: ErrorMessages.date,
        });
        return;
      }
    }

    setSelectDid({
      ...selectDid,
      [name]: value,
      // 종료일도 자동으로 넣어줌
      [KEYS.INTERRUPT_RESERVATION_TO]: value,
    });

    const selectedKey = getDidKey(selectDid);
    setDidData((prev) => {
      const exists = prev.some((row) => getDidKey(row) === selectedKey);
      if (exists) {
        return prev.map((row) =>
          getDidKey(row) === selectedKey ? { ...row, [name]: value } : row
        );
      } else {
        return [...prev, { ...selectDid, [name]: value }];
      }
    });
  };

  return (
    <div>
      <div className="didLayout">
        <div className="w60p">
          <div className="popSubTit">{LABELS.DID}</div>
          <Form className="popSchBox">
            <label className="schTxtL1">{LABELS.MAIN_NUMBER}</label>
            <Input
              label={LABELS.MAIN_NUMBER}
              size="lg"
              value={userInfo[KEYS.SUB_NO]}
              disabled
            />
            <div className="mlAuto">
              <Button
                label={LABELS.ADD_ITEM}
                className="sbtn black"
                onClick={addDidRow}
              />
            </div>
          </Form>
          <Form className="form">
            <div className="tbl-list-top mt20">
              <div className="top-button">
                <span>
                  <Button type={BUTTON_DELETE} onClick={deleteDidRows} />
                </span>
              </div>
            </div>
          </Form>
          <Table
            ref={tableRef}
            columns={DID_SETTING_COLUMNS}
            data={tableData}
            pageSize={10}
            resultLabel={false}
            pageSelect={false}
            paginationEnabled={false}
            maxHeight={400}
            onRowSelectionChange={setSelectRows}
            rowClickSelect={true}
            onCheckboxSelectionChange={setCheckboxSelected}
          />
        </div>
        <div className="w40p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <Form className="popSchBox">
            <label className="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input
              label={LABELS.DEFAULT_RING}
              size="sm"
              disabled
              value={selectDid ? selectDid[KEYS.RBT_ID] : ""}
            />
            <Input
              size="sm"
              value={selectDid ? selectDid[KEYS.RBT_ID_VALUE] : ""}
              disabled
            />
          </Form>
          {/* 시작, 일시정지 */}
          {selectDid && (
            <div className="didStopBox">
              <div className="radio-box">
                <span className="items">
                  <input
                    type="radio"
                    name={LABELS.START}
                    id="rdDidStart"
                    onChange={handleInterruptChange}
                    value="rdDidStart"
                    checked={selectDid[KEYS.IS_INTERRUPT] === false}
                  />
                  <label htmlFor="rdDidStart">{LABELS.START}</label>
                </span>
                <span className="items">
                  <input
                    type="radio"
                    name={LABELS.INTERRUPT}
                    id="rdDidStop"
                    onChange={handleInterruptChange}
                    value="rdDidStop"
                    checked={selectDid[KEYS.IS_INTERRUPT] === true}
                  />
                  <label htmlFor="rdDidStop">{LABELS.INTERRUPT}</label>
                </span>
              </div>
              <div className="hFlex">
                <Input
                  type="date"
                  size="w130"
                  name={KEYS.INTERRUPT_RESERVATION_FROM}
                  value={selectDid[KEYS.INTERRUPT_RESERVATION_FROM]}
                  onChange={handleInterruptDateChange}
                  disabled={!selectDid[KEYS.IS_INTERRUPT]}
                />
                <span>{"~"}</span>
                <Input
                  type="date"
                  size="w130"
                  name={KEYS.INTERRUPT_RESERVATION_TO}
                  value={selectDid[KEYS.INTERRUPT_RESERVATION_TO]}
                  onChange={handleInterruptDateChange}
                  disabled={!selectDid[KEYS.IS_INTERRUPT]}
                />
              </div>
            </div>
          )}
          <div className="configBox">
            {selectRows.length === 0 ? (
              <div className="configAlertTxt">
                {SubsriberMessages.didPlaceHolder}
              </div>
            ) : selectRows.length === 1 && selectDid ? (
              <div className="lvAccordion">
                {DID_CONFIG_DATAS.map((config, idx) => (
                  <DidConfig
                    key={idx}
                    config={config}
                    didInfo={selectDid}
                    didToggle={didToggle}
                    addDidConfig={addDidConfig}
                    deleteDidConfig={deleteDidConfig}
                  />
                ))}
              </div>
            ) : (
              <div className="configAlertTxt">{ErrorMessages.oneSelect}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
