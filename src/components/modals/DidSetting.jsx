import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { circularsInfo, did_setting_columns, did_setting_data, duras, groups, orgns, times, weeks } from "../../config/DataConfig";
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
      <div className="dflex gap10">
        <div className="w60p">
          <div className="popSubTit">{LABELS.DID}</div>
          <form class="popSchBox">
              <label class="schTxtL1">대표번호</label>
              <Input label={LABELS.MAIN_NUMBER} size="lg" />
              <div className="mlAuto">
                <Button label={LABELS.ADD_ITEM}  class="sbtn black"/>
              </div>
          </form>
          
          <form class="form">
            <div class="tbl-list-top mt10">
              <div class="top-button"> 
                <span>
                  <Button type={BUTTON_DELETE} onClick={deleteData} /></span>
              </div>
            </div>
          </form>
          <Table
            ref={tableRef}
            onRowSelectionChange={onSelectRows}
            columns={did_setting_columns}
            data={data}
            pageSize={5}
            resultLabel={false}
            pageSelect={false}
          />
        </div>

        <div className="w40p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <form class="popSchBox">
              <label class="schTxtL1">기본링</label>
              <Input label={LABELS.DEFAULT_RING} size="sm"/>
              <Input size="w200" />
          </form>
          <div class="configBox">
              {selectRows.length === 0 && (
                <span>{subsriberMessages.didPlaceHolder}</span>
              )}
               {selectRows.length > 0 && (
              <div>
                <DidServiceToggle info={circularsInfo} />
                <DidServiceToggle info={times} />
                <DidServiceToggle info={weeks} />
                <DidServiceToggle info={orgns} />
                <DidServiceToggle info={groups} />
                <DidServiceToggle info={duras} />
              </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
