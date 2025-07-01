import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { DID_PERSONAL_SETTING_COLUMNS } from "../../config/DataConfig";
import Input, { INPUT_SIZE_SM } from "../Input";
import { KEYS } from "../../constants/Keys";
import { useDispatch } from "react-redux";
import { setConfigData } from "../../features/didConfigSlice";
import axios from "../../api/axios";
import { ROUTES } from "../../constants/routes";

const DidSettingPersonal = ({ userInfo }) => {
  const tableRef = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO])).then(res=>{
      const result = res.data.resultData;
      setData(result);
    })
  }, [userInfo]);

  useEffect(() => {
    dispatch(setConfigData(data));
  }, [data]);

  return (
    <div>
      <div className="dflex gap10">
        <div className="w60p">
          <div className="popSubTit">{LABELS.DID}</div>
          <form className="popSchBox">
            <label className="schTxtL1">{LABELS.MAIN_NUMBER}</label>
            <Input value={userInfo[KEYS.SUB_NO]} disabled />
            <div className="mlAuto"></div>
          </form>
          <Table
            ref={tableRef}
            columns={DID_PERSONAL_SETTING_COLUMNS}
            data={data}
            setTableData={setData}
            resultLabel={false}
            pageSelect={false}
            rowSelectionEnabled={false}
            paginationEnabled={false}
          />
        </div>

        <div className="w40p">
          {/* <div className="popSubTit">{LABELS.ADDITIONAL_SERVICE_SETTING}</div> */}
          <form className="popSchBox">
            <label className="schTxtL1">{LABELS.DEFAULT_RING}</label>
            <Input
              value={userInfo[KEYS.DEF_RBT_TYPE]}
              size={INPUT_SIZE_SM}
              disabled
            />
            <Input
              value={userInfo[KEYS.RBT_ID]}
              size={INPUT_SIZE_SM}
              disabled
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DidSettingPersonal;
