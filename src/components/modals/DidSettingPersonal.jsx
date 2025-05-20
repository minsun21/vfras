import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { did_personal_setting_data, did_personal_setting_columns } from "../../config/DataConfig";
import Input, { INPUT_SIZE_SM } from "../Input";
import { KEYS } from "../../constants/Keys";

const DidSettingPersonal = ({ userInfo }) => {
  const tableRef = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("id", userInfo);
    setData(did_personal_setting_data);
  }, []);

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <div>
      <div className="dflex gap10">
        <div className="w60p">
          <div className="popSubTit">{LABELS.DID}</div>
          <form class="popSchBox">
            <label class="schTxtL1">{LABELS.MAIN_NUMBER}</label>
            <Input value={userInfo[KEYS.SUB_NO]} />
            <div className="mlAuto"></div>
          </form>
          <Table
            ref={tableRef}
            columns={did_personal_setting_columns}
            data={data}
            setTableData={setData}
            resultLabel={false}
            pageSelect={false}
            rowSelectionEnabled={false}
          />
        </div>

        <div className="w40p">
          <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div>
          <form class="popSchBox">
            <label class="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input value={userInfo[KEYS.RBT_ID]} size={INPUT_SIZE_SM} />
            <Input value={userInfo[KEYS.RBT_ID]} size={INPUT_SIZE_SM} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DidSettingPersonal;
