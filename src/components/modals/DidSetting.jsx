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
import { fieldsValidate } from "../../utils/FormValidation";
import { store } from "../../store";
import { DID_ADD_FIELDS } from "../../config/FieldsConfig";
import DidConfig from "./DidConfig";
import axios from "../../api/axios";
import {
  addBulkItem,
  addDidItem,
  addSubItemToList,
  deleteDidItem,
  removeBulkItem,
  removeSubItemFromList,
  resetDidConfig,
  setDidList,
} from "../../features/didConfigSlice";
import { ROUTES } from "../../constants/routes";
import { getDidKey } from "../../utils/Util";

const DidSetting = ({ userInfo }) => {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const { showModal, showAlert, showDialog, closeModal } = useModal();

  const [tableData, setTableData] = useState([]); // 회선 목록
  const [selectRows, setSelectRows] = useState([]);
  const [selectDid, setSelectDid] = useState({});
  const [checkboxSelected, setCheckboxSelected] = useState([]); // 체크박스 선택

  useEffect(() => {
    return () => {
      dispatch(resetDidConfig());
    };
  }, []);

  useEffect(() => {
    axios.get(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO])).then((res) => {
      const result = res.data.resultData;
      console.log("result", result);
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
        console.log("SUBSRIBER_RBT_DETAIL", res);
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

  const addUiItems = (existItems) => {
    const didStore = store.getState()[KEYS.DID_CONFIG];
    const subChanges = didStore.subChanges;
    const addBulkList = didStore.bulkAddList;
    let mergeAddItems = applySubChangesToDidList(existItems, subChanges);
    let mergeBulkItemResult = mergeBulkItems(mergeAddItems, addBulkList);
    return deduplicateByWholeObject(mergeBulkItemResult);
  };

  const deduplicateByWholeObject = (data) => {
    const result = {};

    for (const key in data) {
      const items = data[key];
      if (!Array.isArray(items)) {
        result[key] = items;
        continue;
      }

      const seen = new Set();
      result[key] = items.filter((item) => {
        const serialized = JSON.stringify(item);
        if (seen.has(serialized)) return false;
        seen.add(serialized);
        return true;
      });
    }

    return result;
  };

  const applySubChangesToDidList = (didItem, subChanges) => {
    const didKey = getDidKey(didItem);

    const matchedChanges = subChanges.filter(
      (change) => getDidKey(change) === didKey && change.add
    );

    const result = { ...didItem };

    for (const change of matchedChanges) {
      const add = change.add;

      for (const key in add) {
        result[key] = [...result[key], ...add[key]];
      }
    }

    return result;
  };

  const mergeBulkItems = (originalData, bulkAddList) => {
    const updatedData = { ...originalData }; // 기존 객체 복사

    bulkAddList.forEach(({ key, items }) => {
      if (!Array.isArray(updatedData[key])) {
        updatedData[key] = [];
      }
      updatedData[key] = [...updatedData[key], ...items]; // 단순 병합 (중복 허용)
    });

    return updatedData;
  };

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

        const isDuplicate = tableData.some(
          (item) => getDidKey(item) === getDidKey(didFormData)
        );
        if (isDuplicate) {
          // 사용자 번호, 교환기 번호 중복시 추가 불가
          showAlert({
            message: ErrorMessages.duplicateSave,
          });
          return;
        }
        // UI용
        // setTableData((prev) => [...prev, didFormData]);
        // dispatch(addDidItem(didFormData));
        // dispatch(resetFormData());
        // closeModal();
        // ===============
        axios
          .post(ROUTES.SUBSCRIBERS_RBT_ADD(userInfo[KEYS.SUB_NO]), didFormData)
          .then((res) => {
            // rbt_id를 def로 변경해줘야 함
            let newTableRow = {
              ...didFormData,
              [KEYS.DEF_RBT_TYPE]: didFormData[KEYS.RBT_ID],
            };
            setTableData((prev) => [...prev, newTableRow]);
            dispatch(resetFormData());
            closeModal();
          });
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
        const selectedIds = checkboxSelected.map((row) => getDidKey(row));
        const updated = tableData.filter(
          (row) => !selectedIds.includes(getDidKey(row))
        );
        setTableData(updated);

        setCheckboxSelected([]);
        setSelectDid();
        setSelectRows([]);
        tableRef.current?.clearSelection?.();

        const deleteItems = tableData.filter((row) =>
          selectedIds.includes(getDidKey(row))
        );

        axios.delete(ROUTES.SUBSCRIBERS_RBT_ADD(userInfo[KEYS.SUB_NO]), {
          data: deleteItems,
        });

        // dispatch(deleteDidItem(deleteItems));
      },
    });
  };

  // // 변경 - 사용 / 안함
  // const didToggle = (key) => {
  //   const selectedKey = getDidKey(selectDid);
  //   const currentValue = selectDid?.[key] ?? false;
  //   const toggled = !currentValue;

  //   const updatedSelectDid = {
  //     ...selectDid,
  //     [key]: toggled,
  //   };

  //   setSelectDid(updatedSelectDid);

  //   setTableData((prev) =>
  //     prev.map((row) =>
  //       getDidKey(row) === selectedKey ? { ...row, [key]: toggled } : row
  //     )
  //   );
  // };

  // 부가서비스 저장
  const addDidSubs = (config, inputs) => {
    const key = config.key;
    const dataKey = config.dataKey;
    const selectedKey = getDidKey(selectDid);
    const newList = [inputs];
    // dispatch(
    //   addSubItemToList({
    //     selectDid: selectDid,
    //     subFieldKey: dataKey,
    //     newItem: newList,
    //   })
    // );
    const uri = getAddUri(dataKey, newList);
    const addItem = getAddItem(dataKey, newList);
    axios.post(uri, addItem).then((res) => {
      // 사용으로 변경
      setTableData((prev) =>
        prev.map((row) =>
          getDidKey(row) === selectedKey ? { ...row, [key]: true } : row
        )
      );

      let newData = [...selectDid[dataKey], ...newList];
      setSelectDid({
        ...selectDid,
        [dataKey]: newData,
      });
    });
  };

  const getAddItem = (dataKey, newList) => {
    if (dataKey === KEYS.TIMES_DATA_KEY) {
      return [
        {
          ...newList[0],
          [KEYS.S_TIME]: newList[0][KEYS.S_TIME].replace(":", ""),
          [KEYS.E_TIME]: newList[0][KEYS.E_TIME].replace(":", ""),
        },
      ];
    } else if (dataKey === KEYS.DURAS_DATA_KEY) {
      return [
        {
          ...newList[0],
          [KEYS.S_DATE]: newList[0][KEYS.S_DATE].replaceAll("-", ""),
          [KEYS.E_DATE]: newList[0][KEYS.E_DATE].replaceAll("-", ""),
        },
      ];
    }

    return newList;
  };

  const getAddUri = (dataKey) => {
    let subNo = selectDid[KEYS.SUB_NO];
    let fromNo = selectDid[KEYS.FROM_NO];
    let toNo = selectDid[KEYS.TO_NO];
    console.log("dataKey", dataKey);
    if (dataKey === KEYS.CIRCULARS_DATA_KEY) {
      return ROUTES.CIRCULAR(subNo, fromNo, toNo);
    } else if (dataKey === KEYS.TIMES_DATA_KEY) {
      return ROUTES.TIME(subNo, fromNo, toNo);
    } else if (dataKey === KEYS.WEEKS_DATA_KEY) {
      return ROUTES.WEEK(subNo, fromNo, toNo);
    } else if (dataKey === KEYS.ORGNS_DATA_KEY) {
      return ROUTES.ORGN(subNo, fromNo, toNo);
    } else if (dataKey === KEYS.DURAS_DATA_KEY) {
      return ROUTES.DURA(subNo, fromNo, toNo);
    }
  };

  // 부가서비스 일괄 저장
  const bulkAdd = (key, dataKey, inputs) => {
    // let bulkInputs = {
    //   key: dataKey,
    //   items: selectDid[dataKey],
    // };
    // dispatch(addBulkItem(bulkInputs));

    const uri = getBulkUri(dataKey);
    // const addItem = getAddItem(dataKey, bulkInputs);
    axios.post(uri, inputs).then((res) => {
      let newData = [...selectDid[dataKey], inputs];
      setSelectDid({
        ...selectDid,
        [dataKey]: newData,
      });
      // 사용으로 변경
      setTableData((prev) =>
        prev.map((row) => {
          return { ...row, [key]: true };
        })
      );
    });

    // setTableData((prev) =>
    //   prev.map((row) => {
    //     return { ...row, [key]: true };
    //   })
    // );
  };

  const getBulkUri = (dataKey) => {
    let subNo = selectDid[KEYS.SUB_NO];
    if (dataKey === KEYS.CIRCULARS_DATA_KEY) {
      return ROUTES.CIRCULAR_BULK(subNo);
    }
    // else if (dataKey === KEYS.TIMES_DATA_KEY) {
    //   return ROUTES.TIME(subNo, fromNo, toNo);
    // }else if (dataKey === KEYS.WEEKS_DATA_KEY) {
    //   return ROUTES.WEEK(subNo, fromNo, toNo);
    // }else if (dataKey === KEYS.ORGNS_DATA_KEY) {
    //   return ROUTES.ORGN(subNo, fromNo, toNo);
    // }
    // else if (dataKey === KEYS.DURAS_DATA_KEY) {
    //   return ROUTES.DURA(subNo, fromNo, toNo);
    // }
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
              value={selectDid?.[KEYS.DESCRIPT] || ""}
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
