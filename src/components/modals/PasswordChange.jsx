import React, { useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";
import Input from "../Input";
import { passwordChange } from "../../config/FieldsConfig";
import { LABELS } from "../../constants/Label";
import { hasEmptyValue } from "../../utils/FormValidation";
import { errorMessages } from "../../constants/Message";

const PasswordChange = ({ info, onConfirm }) => {
  const { showAlert, closeModal } = useModal();
  const [formData, setFormData] = useState({});

  const changePassword = () => {

    if(hasEmptyValue(formData)){
       showAlert({
         message: errorMessages.emptyValue,
       });
      return;
    }
    // 1. 현재 비밀번호 확인
    console.log(info)
    console.log(formData)
    // 2. 변경 비밀번호 validation

    // 3. 변경 비밀번호 재확인
    // onConfirm(formData);
    // closeModal();
  };
  return (
    <div style={{height:'800px'}}>
      {passwordChange.map((field) => {
        const { key, placeholder } = field;

        const handleChange = (val) => {
          setFormData((prev) => ({ ...prev, [key]: val }));
        };

        return (
          <Input
            key={key}
            value={formData[key] || ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      })}
      <span>{LABELS.PASSWORD_CHECK2}</span>
      <div className="modal-footer">
        <Button type={BUTTON_CANCEL} onClick={closeModal} />
        <Button onClick={changePassword} />
      </div>
    </div>
  );
};

export default PasswordChange;
