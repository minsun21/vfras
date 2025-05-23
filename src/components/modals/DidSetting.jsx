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
  errorMessages,
  infoMessages,
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
  const [selectRows, setSelectRows] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    // console.log("id", userInfo);
    setData(userInfo.did_config);
  }, []);

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
        message: errorMessages.nonSelect,
      });
      return;
    }

    if (selectRows.length === data.length) {
      showAlert({
        message: errorMessages.deleteBulk,
      });
      return;
    }

    showDialog({
      message: infoMessages.confirmDelete(selectRows.length),
      onConfirm: () => {
        const filteredData = data.filter(
          (item) =>
            !selectRows.some((r) => r[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID])
        );
        setData(filteredData);
        tableRef.current?.clearSelection();

        setTimeout(() => {
          showAlert({
            message: infoMessages.successDelete,
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
          return value !== undefined && value !== null && value.toString().trim() !== "";
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
  
        // showDialog({
        //   message: infoMessages.confirmAdd,
        //   onConfirm: () => {
        //     setData((prev) =>
        //       prev.map((row) =>
        //         row._isNew ? { ...row, _isNew: false } : row
        //       )
        //     );
        //     setIsAddMode(false);
        //     showAlert({ message: infoMessages.successAdd });
        //   },
        //   onCancel: () => {
        //     setTimeout(() => {
        //       newRowRef.current?.querySelector("input")?.focus();
        //     }, 0);
        //   },
        // });
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAddMode, data]);
  
  return (
    <div>
      <div className="didLayout">
        <div className="w55p">
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
            <div className="tbl-list-top mt10 mb-20">
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
        <div className="w45p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <Form className="popSchBox">
            <label className="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input
              label={LABELS.DEFAULT_RING}
              size="sm"
              disabled
              value={
                !isAddMode && selectRows.length === 1
                  ? selectRows[0][KEYS.RBT_ID]
                  : ""
              }
            />
            <Input
              size="sm"
              value={
                !isAddMode && selectRows.length === 1
                  ? selectRows[0][KEYS.SOUND_CODE]
                  : ""
              }
              disabled
            />
          </Form>

          <div className="configBox">
            {!isAddMode && selectRows.length === 0 ? (
              <div className="configAlertTxt">
                {subsriberMessages.didPlaceHolder}
              </div>
            ) : !isAddMode && selectRows.length === 1 ? (
              <div className="lvAccordion">
                {DID_CONFIG_DATAS.map((config, idx) => (
                  <DidConfig
                    key={idx}
                    config={config}
                    initChekced={selectRows[0][config.key]}
                    addDid={addDid}
                  />
                ))}
              </div>
            ) : (
              <div className="configAlertTxt">{errorMessages.oneSelect}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
