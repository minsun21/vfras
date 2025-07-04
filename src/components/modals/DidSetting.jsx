import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import {
  DID_CONFIG_DATAS,
  DID_SETTING_COLUMNS,
  EMPTY_DID_DATA,
} from "../../config/DataConfig";
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
import DidConfig from "./DidConfig";
import axios from "../../api/axios";
import {
  removeBulkItem,
  removeSubItemFromList,
  resetDidConfig,
  setDidList,
} from "../../features/didConfigSlice";
import { ROUTES } from "../../constants/routes";
import { getDidKey } from "../../utils/Util";
import {
  addDidSubItem,
  bulkAddItem,
  deleteDidItems,
  getDidDeleteResult,
  postDidRow,
  validateDidBeforeAdd,
  validateDidBeforeDelete,
} from "../../service/didService";

const DidSetting = ({ userInfo, plusRbtCount }) => {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const { showModal, showAlert, showDialog, closeModal } = useModal();

  const [tableData, setTableData] = useState([]); // 회선 목록
  const [selectRows, setSelectRows] = useState([]); // 선택 회선
  const [selectDid, setSelectDid] = useState({}); // 선택한 회선의 부가서비스 정보
  const [checkboxSelected, setCheckboxSelected] = useState([]); // 체크박스 선택

  useEffect(() => {
    return () => {
      dispatch(resetDidConfig());
    };
  }, []);

  useEffect(() => {
    axios.get(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO])).then((res) => {
      const result = res.data.resultData;
      setTableData(result);
      dispatch(setDidList(result));
    });
  }, [userInfo]);

  // 로우 하나 클릭 했을 때.
  useEffect(() => {
    if (selectRows.length !== 1) {
      setSelectDid();
      return;
    }

    const selectRow = selectRows[0];
    let subNo = selectRow[KEYS.SUB_NO];
    if (!subNo) {
      // 신규 회선은 subNo 없음
      setSelectDid({
        ...selectRow,
        ...EMPTY_DID_DATA,
      });
      return;
    }
    let fromNo = selectRow[KEYS.FROM_NO];
    let toNo = selectRow[KEYS.TO_NO];

    // axios로 detail 정보 가져옴
    axios
      .get(ROUTES.SUBSRIBER_RBT_DETAIL(subNo, fromNo, toNo))
      .then((res) => {
        const resultData = res.data.resultData;
        setSelectDid({ ...selectRow, ...resultData });
      })
      .catch((err) => {
        // 아직 부가서비스 없는 회선인 경우
        if (err.response.statusText === "Not Found") {
          const newRow = {
            ...selectRow,
            ...EMPTY_DID_DATA,
          };
          // const result = addUiItems(newRow);
          setSelectDid(newRow);
        }
      });
  }, [selectRows]);

  // did 회선 추가
  const addDidRow = () => {
    showModal({
      header: LABELS.ADD_ITEM,
      content: <AddDidModal />,
      size: MODAL_MD,
      onConfirm: async () => {
        const errorMsg = validateDidBeforeAdd({ tableData });
        if (errorMsg) {
          showAlert({ message: errorMsg });
          return;
        }

        const newRow = await postDidRow(userInfo);
        setTableData((prev) => [...prev, newRow]);
        
        dispatch(resetFormData());
        plusRbtCount();
        closeModal();
      },
      onClose: () => {
        dispatch(resetFormData());
      },
    });
  };

  // did회선 삭제
  const deleteDidRows = () => {
    const errorMsg = validateDidBeforeDelete({ checkboxSelected, tableData });
    if (errorMsg) {
      showAlert({ message: errorMsg });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(checkboxSelected.length),
      onConfirm: () => {
        const { updatedTable, deleteItems } = getDidDeleteResult({
          checkboxSelected,
          tableData,
        });

        deleteDidItems({
          userInfo,
          deleteItems,
          updatedTable,
          onSuccess: (newTable) => {
            setTableData(newTable);
            setCheckboxSelected([]);
            setSelectDid();
            setSelectRows([]);
            tableRef.current?.clearSelection?.();
          },
        });
      },
    });
  };

  // 부가서비스 저장
  const addDidSubs = (config, inputs) => {
    const key = config.key;
    const dataKey = config.dataKey;
    const selectedKey = getDidKey(selectDid);
    const newList = [inputs];
  
    addDidSubItem({
      dataKey,
      newList,
      selectDid,
    }).then(({ updatedDataKey, updatedValue }) => {
      setTableData((prev) =>
        prev.map((row) =>
          getDidKey(row) === selectedKey ? { ...row, [key]: true } : row
        )
      );
  
      setSelectDid({
        ...selectDid,
        [updatedDataKey]: updatedValue,
      });
    });
  };

  // 부가서비스 일괄 저장
  const bulkAdd = async (key, dataKey, inputs) => {
    const { updatedSelectDid, updateTableCallback } = await bulkAddItem({
      key,
      dataKey,
      inputs,
      selectDid,
    });
  
    setSelectDid(updatedSelectDid);
  
    setTableData((prev) => prev.map(updateTableCallback));
  };
  
  const bulkDelete = (key, dataKey) => {
    let bulkInputs = {
      key: dataKey,
      items: selectDid[dataKey],
    };
    dispatch(removeBulkItem(bulkInputs));
  };

  // 부가서비스 삭제
  const deleteDidConfig = (config, deleteList) => {
    const key = config.key;
    const dataKey = config.dataKey;
    const selectedKey = getDidKey(selectDid);

    let isAllDelete = deleteList.length === selectDid[dataKey].length; // 전체 삭제 여부

    const newList = selectDid[config.dataKey].filter(
      (item) => !deleteList.some((s) => s === item)
    ); // 삭제되지 않은 데이터

    const updatedSelectDid = {
      ...selectDid,
      [key]: isAllDelete ? false : true,
      [dataKey]: isAllDelete ? [] : newList,
    };

    setSelectDid(updatedSelectDid);

    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey
          ? { ...row, [key]: updatedSelectDid[key] }
          : row
      )
    );
    dispatch(
      removeSubItemFromList({
        selectDid,
        subFieldKey: dataKey,
        removeItem: deleteList,
      })
    );
  };

  // 일시 정지
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
            maxHeight={600}
            onRowSelectionChange={setSelectRows}
            rowClickSelect={true}
            onCheckboxSelectionChange={setCheckboxSelected}
          />
        </div>
        <div className="w40p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <Form className="popSchBox">
            {/* 기본 링 */}
            <label className="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input
              label={LABELS.DEFAULT_RING}
              size="sm"
              value={selectDid?.[KEYS.DEF_RBT_TYPE] || ""}
              disabled
            />
            <Input
              size="sm"
              value={selectDid?.[KEYS.BASE_RBT_DESC] || ""}
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
                    selectDid={selectDid}
                    addDidSubs={addDidSubs}
                    deleteDidConfig={deleteDidConfig}
                    bulkAdd={bulkAdd}
                    bulkDelete={bulkDelete}
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
