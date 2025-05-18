import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { did_setting_columns, did_setting_data } from "../../config/DataConfig";
import Button, { BUTTON_DELETE } from "../Button";
import Input from "../Input";
import { errorMessages, subsriberMessages } from "../../constants/Message";
import DidServiceToggle from "./DidServiceToggle";
import { KEYS } from "../../constants/Keys";

const DidSetting = ({ userInfo }) => {

  const tableRef = useRef();

  const { showAlert } = useModal();

  const [data, setData] = useState([]);
  const [selectRows, setSelectRows] = useState([]);

  useEffect(() => {
    // console.log("id", userInfo);
    setData(did_setting_data);
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
      (item) => !selectRows.some((r) => r[KEYS.ID] === item[KEYS.ID])
    );
    setData(filteredData);

    tableRef.current?.clearSelection();
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <span>{LABELS.DID}</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <Input label={LABELS.MAIN_NUMBER} />
            <Button label={LABELS.ADD_ITEM} />
          </div>
          <Table
            ref={tableRef}
            onRowSelectionChange={onSelectRows}
            columns={did_setting_columns}
            data={data}
            pageSize={5}
            resultLabel={false}
            pageSelect={false}
          />
          <Button type={BUTTON_DELETE} onClick={deleteData} />
        </div>
        <div>
          <span>{LABELS.ADDITIONAL_SERVICE_SETTING}</span>
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderBottom: "1px solid black",
              }}
            >
              <Input label={LABELS.DEFAULT_RING} />
              <Input />
            </div>
            <div>
              {selectRows.length === 0 && (
                <span>{subsriberMessages.didPlaceHolder}</span>
              )}
              {selectRows.length > 0 && (
                <DidServiceToggle title={LABELS.CIRCULAR} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
