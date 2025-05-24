import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACCOUNTS_EDIT_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { fieldsValidate } from "../utils/FormValidation";
import { ErrorMessages, InfoMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import { findMappedKey } from "../utils/Util";
import { ADMIN_TYPES } from "../config/OPTIONS";
import PhoneNumberInput from "../components/PhoneNumberInput";

const AccountEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedId = state?.selectedId || [];
  const selectRow = state?.selectedInfo || {}; // 삭제

  const { showDialog, showAlert, closeModal } = useModal();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // userid로 정보 검색
    if (!selectedId) return;
    setFormData({
      ...selectRow,
      [KEYS.ADMIN_TYPE]: findMappedKey(ADMIN_TYPES, selectRow[KEYS.ADMIN_TYPE]),
      [KEYS.MOBILE]: "010-1234-5678",
      [KEYS.EMAIL]: "test@lguplus.co.kr",
      [KEYS.REMARKS]: "협력사 요청",
      [KEYS.EMAIL]: "test@lguplus.co.kr",
      [KEYS.PASSWORD]: "aA12345678!",
      [KEYS.PASSWORD_CONFIRM]: "aA12345678!",
    });

    // axios.get(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then((res) => {
    //   setFormData(res.data);
    // });
  }, []);

  const handleSave = () => {
    showDialog({
      message: InfoMessages.confirmRegister,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          const errValidate = fieldsValidate(ACCOUNTS_EDIT_FIELDS, formData);
          if (errValidate) {
            showAlert({
              message: errValidate,
            });
            return;
          }

          save();
        }, 50);
      },
    });
  };

  const save = () => {
    console.log("저장할 데이터:", formData);

    // axios.put(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then(res=>{
    //   showAlert({
    //     message: InfoMessages.successAccountSave,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })

    showAlert({
      message: InfoMessages.successEdit,
      onConfirm: () => navigate(ROUTES.ACCOUNTS),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.ACCOUNTS),
    });
  };

  return (
    <>
      <form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {ACCOUNTS_EDIT_FIELDS.map((field) => {
              const {
                key,
                label,
                type = "text",
                options = [],
                required,
                comment,
                disabled,
              } = field;
              const value = formData[key] || "";

              const handleChange = (e) => {
                setFormData((prev) => ({ ...prev, [key]: e.target.value }));
              };

              return (
                <tr key={key}>
                  <th className="Labels">
                    {label}
                    {required && <em>*</em>}
                  </th>
                  <td className="value">
                    {type === "select" ? (
                      <Select
                        value={value}
                        options={options}
                        onChange={handleChange}
                      />
                    ) : comment ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="comment">{comment}</span>
                      </div>
                    ) : key === KEYS.MOBILE ? (
                      <PhoneNumberInput
                        value={value}
                        onChange={handleChange}
                      />
                    ) : key === KEYS.PASSWORD_CONFIRM ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="password-confirm">
                          {formData[KEYS.PASSWORD] !==
                            formData[KEYS.PASSWORD_CONFIRM] &&
                            ErrorMessages.correctPassword}
                        </span>
                      </div>
                    ) : (
                      <Input
                        value={value}
                        type={type}
                        placeholder={formData[key]}
                        onChange={handleChange}
                        disabled={disabled}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
      <div className="btn-wrap">
        <div>
          <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
        </div>
        <div>
          <Button type={BUTTON_SAVE} onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default AccountEdit;
