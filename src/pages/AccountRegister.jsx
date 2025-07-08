import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNTS_REGISTER_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { useModal } from "../contexts/ModalContext";
import { AccountMessages, ErrorMessages, InfoMessages } from "../constants/Message";
import axios from "../api/axios";
import { fieldsValidate } from "../utils/FormValidation";
import { KEYS } from "../constants/Keys";
import { ADMIN_TYPES } from "../config/Options";
import PhoneNumberInput from "../components/PhoneNumberInput";

const AccountRegister = () => {
  const navigate = useNavigate();
  const { showAlert, showDialog, closeModal } = useModal();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // 초기 값 세팅
    setFormData({
      ...formData,
      [KEYS.ADMIN_TYPE]: ADMIN_TYPES[0].key,
    });
  }, []);

  const handleSave = () => {
    showDialog({
      message: InfoMessages.confirmRegister,
      onConfirm: () => {
        closeModal();
        setTimeout(() => {
          const errValidate = fieldsValidate(
            ACCOUNTS_REGISTER_FIELDS,
            formData
          );
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
    axios
      .post(ROUTES.ACCOUNTS, formData)
      .then((res) => {
        showAlert({
          message: InfoMessages.successAccountSave,
          onConfirm: () => navigate(ROUTES.ACCOUNTS),
        });
      })
      .catch((err) => {
        let message = err.response.data.resultData;
        // if (message.includes("Admin is Present")) {
        //   showAlert({ message: AccountMessages.adminIdPresent });
        // } else {
        //   showAlert({ message: ErrorMessages.server });
        // }
      });
  };

  const cancel = () => {
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
            {ACCOUNTS_REGISTER_FIELDS.map((field, idx) => {
              const {
                key,
                label,
                type = "text",
                Options = [],
                required,
                placeholder,
                comment,
                disabled,
              } = field;
              const value = formData[key] || "";

              const handleChange = (e) => {
                setFormData((prev) => ({ ...prev, [key]: e.target.value }));
              };

              return (
                <tr key={idx}>
                  <th className="Labels">
                    {label}
                    {required && <em>*</em>}
                  </th>
                  <td className="value">
                    {type === "select" ? (
                      <Select
                        value={value}
                        Options={Options}
                        onChange={handleChange}
                      />
                    ) : comment ? (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="comment">{comment}</span>
                      </div>
                      // ) : key === KEYS.MOBILE ? (
                      //   <PhoneNumberInput value={value} onChange={handleChange} />
                    ) : key === KEYS.PASSWORD2 ? (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="password-confirm">
                          {formData[KEYS.PASSWORD1] !==
                            formData[KEYS.PASSWORD2] &&
                            ErrorMessages.correctPassword}
                        </span>
                      </div>
                    ) : (
                      <Input
                        value={value}
                        type={type}
                        placeholder={placeholder}
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
          <Button type={BUTTON_CANCEL} onClick={cancel} />
        </div>
        <div>
          <Button type={BUTTON_SAVE} onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default AccountRegister;
