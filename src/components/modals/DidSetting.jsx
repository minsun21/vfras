import React, { useEffect, useRef, useState } from "react";
import { LABELS } from "../../constants/Labels";
import Table from "../Table";
import { DID_SETTING_COLUMNS } from "../../config/DataConfig";
import Button, { BUTTON_DELETE } from "../Button";
import Input from "../Input";
import { KEYS } from "../../constants/Keys";
import Form from "../Form";
import AddDidModal from "./AddDidModal";
import { useModal } from "../../contexts/ModalContext";
import { ErrorMessages, InfoMessages } from "../../constants/Message";
import { MODAL_MD, MODAL_SM } from "./ModalRenderer";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData } from "../../features/didAddSlice";
import { fieldsValidate } from "../../utils/FormValidation";
import { store } from "../../store";
import { DID_ADD_FIELDS } from "../../config/FieldsConfig";

const DidSetting = ({ userInfo }) => {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const { showModal, showAlert, showDialog, closeModal } = useModal();

  const [didData, setDidData] = useState([]);
  const [selectRows, setSelectRows] = useState([]);

  useEffect(() => {
    setDidData(userInfo.dids);
  }, [userInfo]);

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
        
        const newRow = { ...didFormData, id: Math.floor(Math.random() * 100) + 1 };
        setDidData((prev) => [...prev, newRow]);
        dispatch(resetFormData());
        closeModal();
      },
    });
  };

  // did회선 삭제
  const deleteDidRows = () => {
    if (selectRows.length === 0) {
      showAlert({ message: ErrorMessages.nonSelect });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: () => {
        const selectedIds = selectRows.map((row) => row.id);
        const updated = didData.filter((row) => !selectedIds.includes(row.id));
        setDidData(updated);

        setSelectRows([]);
        tableRef.current?.clearSelection?.();

        setTimeout(() => {
          showAlert({ message: InfoMessages.successDelete });
        }, 0);
      },
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
            data={didData}
            pageSize={10}
            resultLabel={false}
            pageSelect={false}
            paginationEnabled={false}
            maxHeight={400}
            onRowSelectionChange={setSelectRows}
          />
        </div>
      </div>
    </div>
  );
};

export default DidSetting;
