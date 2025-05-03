import React, { useEffect, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { did_setting_columns, did_setting_data } from "../../config/DataConfig";
import Button from "../Button";
import Input from "../Input";

const DidSetting = ({ selectRow }) => {
  const { closeModal } = useModal();
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("id", selectRow);
    setData(did_setting_data);
  }, []);

  return (
    <div>
      <header>
        <h4>{LABELS.DID_TITLE}</h4>
        <button onClick={closeModal}>x</button>
      </header>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
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
          <Table columns={did_setting_columns} data={data} pageSize={5} />
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
