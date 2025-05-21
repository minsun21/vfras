import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { DID_CONFIG_DATAS, did_setting_columns } from "../../config/DataConfig";
import Button, { BUTTON_DELETE } from "../Button";
import Input from "../Input";
import { errorMessages, subsriberMessages } from "../../constants/Message";
import DidConfig from "./DidConfig";
import { KEYS } from "../../constants/Keys";

const DidSetting = ({ userInfo }) => {
  const tableRef = useRef();
  const parentRef = useRef(null);

  const { showAlert } = useModal();
  const [data, setData] = useState([]);
  const [selectRows, setSelectRows] = useState([]);

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

    const filteredData = data.filter(
      (item) =>
        !selectRows.some((r) => r[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID])
    );
    setData(filteredData);

    tableRef.current?.clearSelection();
  };

  const openAccordion = () => {
    const child = parentRef.current.querySelector(".lvItem");
    if (child) {
      child.classList.toggle("active");
    }
  };

  const addDid = (accessorKey) => {
    const selectedIds = tableRef.current?.getSelectedRowIds?.();
    if (!selectedIds?.length) return;
    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      [accessorKey]: !row[accessorKey], // ✅ true <-> false 토글
    }));
  };

  useEffect(() => {
    console.log("데이터 변경됨:", data);
  }, [data]);

  return (
    <div>
      <div className="didLayout">
        <div className="w60p">
          <div className="popSubTit">{LABELS.DID}</div>
          <form class="popSchBox">
            <label class="schTxtL1">{LABELS.MAIN_NUMBER}</label>
            <Input
              label={LABELS.MAIN_NUMBER}
              size="lg"
              value={userInfo[KEYS.SUB_NO]}
              disabled
            />
            <div className="mlAuto">
              <Button label={LABELS.ADD_ITEM} class="sbtn black" />
            </div>
          </form>
          <form class="form">
            <div class="tbl-list-top mt10 mb-20">
              <div class="top-button">
                <span>
                  <Button type={BUTTON_DELETE} onClick={deleteData} />
                </span>
              </div>
            </div>
          </form>
          <Table
            ref={tableRef}
            onRowSelectionChange={onSelectRows}
            columns={did_setting_columns}
            data={data}
            setTableData={setData}
            pageSize={10}
            resultLabel={false}
            pageSelect={false}
            // paginationEnabled={false}
            // maxHeight={600}
          />
        </div>
        <div className="w40p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <form class="popSchBox">
            <label class="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input
              label={LABELS.DEFAULT_RING}
              size="sm"
              disabled
              value={userInfo[KEYS.RBT_ID]}
            />
            <Input size="sm" value={userInfo[KEYS.RBT_ID_VALUE]} disabled />
          </form>
          <div class="configBox">
            {selectRows.length === 0 ? (
              <div className="configAlertTxt">
                {subsriberMessages.didPlaceHolder}
              </div>
            ) : selectRows.length === 1 ? (
              <div class="lvAccordion" ref={parentRef} onClick={openAccordion}>
                {DID_CONFIG_DATAS.map((config) => (
                  <DidConfig
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
