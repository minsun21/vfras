import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import {
  DID_CONFIG_DATAS,
  DID_SETTING_COLUMNS,
  EMPTY_DID_DATA,
} from "../../config/DataConfig";
import Button, { BUTTON_CANCEL, BUTTON_DELETE } from "../Button";
import Input from "../Input";
import { KEYS } from "../../constants/Keys";
import Form from "../Form";
import AddDidModal from "./AddDidModal";
import { useModal } from "../../contexts/ModalContext";
import {
  ErrorKey,
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
  bulkRemoveItem,
  deleteDidItems,
  duplicateBeforeAdd,
  getAddItem,
  getDidDeleteResult,
  postDidRow,
  stopRbt,
  validateDidBeforeAdd,
  validateDidBeforeDelete,
} from "../../service/didService";

const DidSetting = ({ userInfo, plusRbtCount, isPersonal }) => {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const { showModal, showAlert, showDialog, closeModal } = useModal();

  const [tableData, setTableData] = useState([]); // 회선 목록
  const [selectRows, setSelectRows] = useState([]); // 선택 회선
  const [selectDid, setSelectDid] = useState({}); // 선택한 회선의 부가서비스 정보
  const [checkboxSelected, setCheckboxSelected] = useState([]); // 체크박스 선택

  const [selectStop, setSelectStop] = useState(selectDid?.[KEYS.IS_INTERRUPT] || 0);
  const [stopDate, setStopDate] = useState({})

  useEffect(() => {
    return () => {
      dispatch(resetDidConfig());
    };
  }, []);

  useEffect(() => {
    initRbtData();
  }, [userInfo]);

  const initRbtData = () => {
    axios.get(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO])).then((res) => {
      const result = res.data.resultData;
      setTableData(result);
      dispatch(setDidList(result));
    });
  };

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

    // axios로 detail 정보 가져옴
    initRbtSubs(selectRow);
  }, [selectRows]);

  const initRbtSubs = (selectRow) => {
    let subNo = selectRow[KEYS.SUB_NO];
    let fromNo = selectRow[KEYS.FROM_NO];
    let toNo = selectRow[KEYS.TO_NO];

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
          setSelectDid(newRow);
        }
      });
  }

  // did 회선 추가
  const addDidRow = () => {
    if (isPersonal && tableData.length > 0) {
      showAlert({ message: ErrorMessages.onlyOneRbt });
      return;
    }
    showModal({
      header: LABELS.ADD_ITEM,
      content: <AddDidModal />,
      size: MODAL_MD,
      onConfirm: () => {
        const errorMsg = validateDidBeforeAdd({ tableData });
        if (errorMsg) {
          showAlert({ message: errorMsg });
          return;
        }

        postDidRow(userInfo).then(res => {
          initRbtData();
          dispatch(resetFormData());
          plusRbtCount();
          closeModal();
          setTimeout(() => {
            showAlert({ message: InfoMessages.successAdd });
            return;
          }, 50);
        }).catch(err => {
          let message = err.response.data.resultData;
          rbtError(message)
        });
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
            setTimeout(() => {
              showAlert({ message: InfoMessages.successDelete });
              return;
            }, 50);
          },
        });
      },
    });
  };

  // 부가서비스 추가
  const addDidSubs = (config, inputs) => {
    const dataKey = config.dataKey;
    const addItem = getAddItem(dataKey, inputs, selectDid);

    setSelectDid({
      ...selectDid,
      [dataKey]: [...(selectDid[dataKey] || []), addItem],
    });
  };

  // 부가서비스 최종 저장
  const saveDidSub = (config) => {
    const dataKey = config.dataKey;
    addDidSubItem({
      dataKey,
      selectDid,
    }).then(() => {
      showAlert({
        message: InfoMessages.successEdit
      })
      initRbtData();
      initRbtSubs(selectDid);
    }).catch(err => {
      let message = err.response.data.resultData;
      rbtError(message);
    });
  }

  const rbtError = (message) => {
    if (message.includes(ErrorKey.notFindRbtInfo)) {
      showAlert({
        message: message.replace(ErrorKey.notFindRbtInfo, ErrorMessages.notFindRbt)
      })
      return;
    }
    showAlert({ message: ErrorMessages.server });

  }

  // 부가서비스 일괄 저장
  const bulkAdd = async (key, dataKey, inputs) => {
    const { updatedSelectDid, updateTableCallback } = await bulkAddItem({
      key,
      dataKey,
      inputs,
      selectDid,
    });

    setSelectDid(updatedSelectDid);
    initRbtSubs(selectDid);
  };

  // 부가서비스 일괄 삭제
  const bulkDelete = (dataKey, inputs) => {
    bulkRemoveItem({
      dataKey,
      inputs,
      selectDid,
    }).then(res => {
      initRbtData();
      initRbtSubs(selectDid);
    })
  };

  // 부가서비스 삭제
  const deleteDidConfig = (config, deleteList, isAllDelete) => {
    const { key, dataKey } = config;
    const selectedKey = getDidKey(selectDid);

    // 삭제 후 남길 데이터 계산
    const filteredList = isAllDelete
      ? []
      : selectDid[dataKey].filter((item) => !deleteList.includes(item));

    // 업데이트될 selectDid 객체
    const updatedSelectDid = {
      ...selectDid,
      [key]: !isAllDelete && filteredList.length > 0,
      [dataKey]: filteredList,
    };

    // 상태 반영
    setSelectDid(updatedSelectDid);
    setTableData((prev) =>
      prev.map((row) =>
        getDidKey(row) === selectedKey
          ? { ...row, [key]: updatedSelectDid[key] }
          : row
      )
    );
  };

  // 일시 정지
  const handleOptionChange = (e) => {
    const value = Number(e.target.value);
    setSelectStop(value);

    if (value !== 2) {
      setStopDate({
        [KEYS.INTERRUPT_RESERVATION_FROM]: "",
        [KEYS.INTERRUPT_RESERVATION_TO]: ""
      })
    }
  };

  const onChangeDate = (e) => {
    setStopDate({
      ...stopDate,
      [e.target.name]: e.target.value
    })
  }

  const saveInterrupt = () => {
    if (selectStop === 2) {
      let startDate = stopDate[KEYS.INTERRUPT_RESERVATION_FROM];
      let endDate = stopDate[KEYS.INTERRUPT_RESERVATION_TO];
      if (!startDate || !endDate) {
        showAlert({
          message: ErrorMessages.dateBlank,
        });
        return;
      }
      if (startDate && endDate && startDate > endDate) {
        showAlert({
          message: ErrorMessages.date,
        });
        return;
      }
    }

    let inputs = {
      ...stopDate,
      [KEYS.IS_INTERRUPT]: selectStop
    }
    stopRbt(
      inputs,
      selectDid
    ).then(() => {
      showAlert({
        message: InfoMessages.successStop,
      });
      initRbtData();
      initRbtSubs(selectDid);
    });
  }

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
                <div style={{ display: 'flex' }}>
                  <span className="items">
                    <input
                      type="radio"
                      name="dateOption"
                      value={0}
                      id="rdDidStart"
                      checked={selectStop === 0}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="rdDidStart">{LABELS.START}</label>
                  </span>
                  <span className="items">
                    <input
                      type="radio"
                      name="dateOption"
                      value={1}
                      id="rdDidStop"
                      checked={selectStop === 1}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="rdDidStop">{LABELS.INTERRUPT}</label>
                  </span>
                  <span className="items">
                    <input
                      type="radio"
                      name="dateOption"
                      value={2}
                      id="rdDidPeriodStop"
                      checked={selectStop === 2}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="rdDidPeriodStop">{LABELS.PERIOD_INTERRUPT}</label>
                  </span>
                  <div className="hFlex">
                    <Input
                      type="date"
                      size="w130"
                      name={KEYS.INTERRUPT_RESERVATION_FROM}
                      value={stopDate[KEYS.INTERRUPT_RESERVATION_FROM]}
                      onChange={onChangeDate}
                      disabled={selectStop != 2}
                    />
                    <span>{"~"}</span>
                    <Input
                      type="date"
                      size="w130"
                      name={KEYS.INTERRUPT_RESERVATION_TO}
                      value={stopDate[KEYS.INTERRUPT_RESERVATION_TO]}
                      onChange={onChangeDate}
                      disabled={selectStop != 2}
                    />
                  </div>
                </div>
              </div>
              <Button
                type={BUTTON_DELETE}
                label={LABELS.SAVE}
                onClick={saveInterrupt}
              />
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
                    saveDidSub={saveDidSub}
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
