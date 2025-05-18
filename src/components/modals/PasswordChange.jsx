import React, { useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";
import Input from "../Input";
import { passwordChange } from "../../config/FieldsConfig";
import { LABELS } from "../../constants/Labels";
import { hasEmptyValue, isValidPassword } from "../../utils/FormValidation";
import { errorMessages, profileMessages } from "../../constants/Message";

const PasswordChange = ({ info, onOk }) => {
  const { showAlert, closeModal } = useModal();
  const [formData, setFormData] = useState(
    passwordChange.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {})
  );

  const changePassword = () => {
    // 1. 빈 값 확인
    // if (hasEmptyValue(formData)) {
    //   showAlert({
    //     message: errorMessages.emptyValue,
    //   });
    //   return;
    // }

    // // 2. 현재 비밀번호 확인
    // if (info.password !== formData.currentPassword) {
    //   showAlert({
    //     message: errorMessages.confirmCurrentPassword,
    //   });
    //   return;
    // }

    // // 3. 변경 비밀번호 validation
    // if (!isValidPassword(formData.changePassword)) {
    //   showAlert({
    //     message: errorMessages.invalidPassword,
    //   });
    //   return;
    // }

    // // 4. 변경 비밀번호 재확인
    // if (formData.changePassword !== formData.changeConfirmPassword) {
    //   showAlert({
    //     message: errorMessages.confirmPassword,
    //   });
    //   return;
    // }
    onOk(formData);
  };

  return (
    <div>
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
