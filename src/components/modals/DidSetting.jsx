import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { DID_CONFIG_DATAS, DID_SETTING_COLUMNS } from "../../config/DataConfig";
import Button, { BUTTON_DELETE } from "../Button";
import Input from "../Input";
import {
  ErrorMessages,
  InfoMessages,
  subsriberMessages,
} from "../../constants/Message";
import DidConfig from "./DidConfig";
import { KEYS } from "../../constants/Keys";
import Form from "../Form";

const DidSetting = ({ userInfo }) => {
  const tableRef = useRef();
  const scrollRef = useRef();
  const newRowRef = useRef(); // 새 행 외 div
  const newRowRefData = useRef(); // 새 행

  const { showAlert, showDialog } = useModal();
  const [data, setData] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [selectDidInfo, setSelectDidInfo] = useState();
  const [selectRows, setSelectRows] = useState([]);

  useEffect(() => {
    // console.log("id", userInfo);
    setData(userInfo.did_config);
  }, []);

  useEffect(() => {
    if (!selectRows || selectRows.length !== 1) {
      setSelectDidInfo();
      return;
    }

    setSelectDidInfo({
      ...selectRows[0],
      subNo: "000226229300",
      fromNo: "000226229300",
      toNo: "000226229319",
      [KEYS.RBT_ID]: selectRows[0][KEYS.RBT_ID],
      rbtValue: "라일락",
      [KEYS.IS_INTERRUPT]: [],
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
        // {
        //   rbtId: "1071087",
        //   startDate: "20250501",
        //   endDate: "20250601",
        // },
      ],
    });
  }, [selectRows]);

  const onSelectRows = (rows) => {
    setSelectRows((prev) => {
      const isSame =
        prev.length === rows.length &&
        prev.every((r, i) => r.id === rows[i]?.id);
      return isSame ? prev : rows;
    });
  };

  const deleteData = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }

    if (selectRows.length === data.length) {
      showAlert({
        message: ErrorMessages.deleteBulk,
      });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: () => {
        const filteredData = data.filter(
          (item) =>
            !selectRows.some((r) => r[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID])
        );
        setData(filteredData);
        tableRef.current?.clearSelection();

        setTimeout(() => {
          showAlert({
            message: InfoMessages.successDelete,
          });
        }, 100);
      },
    });
  };

  const addDid = (accessorKey) => {
    const selectedIds = tableRef.current?.getSelectedRowIds?.();
    if (!selectedIds?.length) return;
    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      [accessorKey]: !row[accessorKey],
    }));

    setSelectDidInfo({
      ...selectDidInfo,
      [accessorKey]: !selectDidInfo[accessorKey],
    });
  };

  const addDidRow = () => {
    setTimeout(() => {
      const newRow = {
        id: Math.floor(Math.random() * 1_000_000),
        [KEYS.ADMIN_ID]: 1,
        [KEYS.TEL_FROM_NO]: "",
        [KEYS.TEL_TO_NO]: "",
        [KEYS.FROM_NO]: "",
        [KEYS.TO_NO]: "",
        [KEYS.RBT_ID]: "",
        [KEYS.SOUND_CODE]: "",
        [KEYS.IS_INTERRUPT]: false,
        [KEYS.IS_CIRCULR_JOINED]: false,
        [KEYS.IS_WEEK_JOINED]: false,
        [KEYS.IS_TIME_JOINED]: false,
        [KEYS.IS_ORGN_JOINED]: false,
        [KEYS.IS_GROUP_JOINED]: false,
        [KEYS.IS_DURA_JOINED]: false,
        _isNew: true, // ✅ 새 행만 입력 가능
        handleInputChange: (rowIndex, key, value) =>
          handleInputChange(rowIndex, key, value),
      };
      setData((prev) => [
        ...prev.map((r) => ({ ...r, _isNew: false })),
        newRow,
      ]);
      newRowRefData.current = newRow;

      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });

      setIsAddMode(true);
    }, 0);
  };

  const handleConfirm = (rowIndex) => {
    setData((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, _isNew: false } : row))
    );
    setIsAddMode(false);
  };

  useEffect(() => {
    console.log("데이터 변경됨:", data);
  }, [data]);

  const handleInputChange = useCallback((rowIndex, key, value) => {
    setData((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row))
    );
  }, []);

  const columns = useMemo(
    () => DID_SETTING_COLUMNS(handleInputChange),
    [handleInputChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isAddMode || !newRowRef.current) return;

      if (!newRowRef.current.contains(e.target)) {
        const newRow = data.find((row) => row._isNew);
        const REQUIRED_FIELDS = [
          KEYS.TEL_FROM_NO,
          KEYS.TEL_TO_NO,
          KEYS.FROM_NO,
          KEYS.TO_NO,
          KEYS.RBT_ID,
        ];

        const isValid = REQUIRED_FIELDS.every((key) => {
          const value = newRow?.[key];
          return (
            value !== undefined &&
            value !== null &&
            value.toString().trim() !== ""
          );
        });

        if (!isValid) {
          return;
        }

        const confirmed = window.confirm("추가하시겠습니까?");
        if (confirmed) {
          setData((prev) =>
            prev.map((row) => (row._isNew ? { ...row, _isNew: false } : row))
          );
          setIsAddMode(false);
        } else {
          setTimeout(() => {
            newRowRef.current?.focus();
          }, 0);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAddMode, data]);

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
        message: "시작 날짜는 종료 날짜보다 빠르거나 같아야 합니다.",
      });
      return;
    }

    // 시간 유효성 검사
    const startTime = inputs.startTime;
    const endTime = inputs.endTime;
    if (startTime && endTime && startTime > endTime) {
      showAlert({
        message: "시작 시간은 종료 시간보다 빠르거나 같아야 합니다.",
      });
      return;
    }

    // 최대 갯수 초과 검사
    if (config.max && currentList.length >= config.max) {
      showAlert({
        message: `${config.title} 항목은 최대 ${config.max}개까지 등록할 수 있습니다.`,
      });
      return;
    }

    return true;
  };

  const addDidConfig = (config, didInfo, inputs) => {
    const key = config.dataKey;
    const currentList = didInfo[key] || [];
    if (!addDidConfigValidation(config, inputs, currentList)) {
      return;
    }

    // 입력값 추출
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
      const groupList = didInfo[config.dataKey] || [];
      const nextGroupId = groupList.length
        ? Math.max(
            ...groupList.map((item) => parseInt(item.groupId || "0", 10))
          ) + 1
        : 1;

      newItem.groupId = String(nextGroupId);
    }
    const newList = [...(selectDidInfo?.[key] ?? []), newItem];

    setSelectDidInfo((prev) => ({
      ...prev,
      [key]: newList,
      [config.key]: true,
    }));

    if (selectDidInfo[config.key] === false) {
      const selectedIds = tableRef.current?.getSelectedRowIds?.();
      if (!selectedIds?.length) return;
      tableRef.current.updateRowsById(selectedIds, (row) => ({
        ...row,
        [config.key]: !row[config.key],
      }));
    }
  };

  const deleteDidConfig = (config, newList) => {
    const key = config.dataKey;
    if (newList.length === 0 && selectRows.length === 1) {
      // 전체 삭제인 경우
      setSelectDidInfo((prev) => {
        const nextState = {
          ...prev,
          [key]: newList,
          [config.key]: false,
        };

        if (newList.length === 0) {
          nextState[config.key] = false;
        }

        return nextState;
      });
      const selectedIds = tableRef.current?.getSelectedRowIds?.();
      if (!selectedIds?.length) return;
      tableRef.current.updateRowsById(selectedIds, (row) => ({
        ...row,
        [config.key]: !row[config.key],
      }));
    } else {
      setSelectDidInfo((prev) => {
        const nextState = {
          ...prev,
          [key]: newList,
        };

        if (newList.length === 0) {
          nextState[config.key] = false;
        }

        return nextState;
      });
    }
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
                disabled={isAddMode}
              />
            </div>
          </Form>
          <Form className="form">
            <div className="tbl-list-top mt20">
              <div className="top-button">
                <span>
                  <Button
                    type={BUTTON_DELETE}
                    onClick={deleteData}
                    disabled={isAddMode}
                  />
                </span>
              </div>
            </div>
          </Form>
          <Table
            ref={tableRef}
            onRowSelectionChange={onSelectRows}
            columns={columns}
            data={data}
            setTableData={setData}
            pageSize={10}
            resultLabel={false}
            pageSelect={false}
            paginationEnabled={false}
            maxHeight={400}
            scrollRef={scrollRef}
            newRowRef={newRowRef}
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
              value={
                !isAddMode && selectDidInfo ? selectDidInfo[KEYS.RBT_ID] : ""
              }
            />
            <Input
              size="sm"
              value={
                !isAddMode && selectDidInfo ? selectDidInfo[KEYS.RBT_VALUE] : ""
              }
              disabled
            />
          </Form>
           {/* 시작, 일시정지 */}
          <div class="didStopBox">
            <div class="radio-box">
              <span class="items">
                <input type="radio" name="rdDidS" id="rdDidStart" value="시작" checked/>
                <label for="viewTime1">시작</label>
              </span> 
              <span class="items">
                <input type="radio" name="rdDidS" id="rdDidStop" value="시작" checked/>
                <label for="viewTime1">일시정지</label>
              </span> 
              <span class="items">
                <input type="radio" name="rdDidS" id="rdDidStopRe" value="시작" checked/>
                <label for="viewTime1">일시정지 예약</label>
              </span> 
            </div>
            <div>
                <Input type="date" size="w140"/>
            </div>
          </div>    
          <div className="configBox">
            {!isAddMode && selectRows.length === 0 ? (
              <div className="configAlertTxt">
                {subsriberMessages.didPlaceHolder}
              </div>
            ) : !isAddMode && selectRows.length === 1 && selectDidInfo ? (
              <div className="lvAccordion">
                {DID_CONFIG_DATAS.map((config, idx) => (
                  <DidConfig
                    key={idx}
                    config={config}
                    didInfo={selectDidInfo}
                    addDid={addDid}
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
