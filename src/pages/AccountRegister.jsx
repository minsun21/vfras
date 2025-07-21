import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNTS_REGISTER_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { useModal } from "../contexts/ModalContext";
import { ErrorMessages, InfoMessages } from "../constants/Message";
import axios, { AXIOS_NO_GLOBAL_ERROR } from "../api/axios";
import { fieldsValidate, fieldsValidate2, isValidEmail, isValidPassword, isValidPhone } from "../utils/FormValidation";
import { KEYS } from "../constants/Keys";
import { ADMIN_TYPES } from "../config/OptionConfig";

const AccountRegister = () => {
  const navigate = useNavigate();
  const { showAlert, showDialog, closeModal } = useModal();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
            showAlert({ message: errValidate })
            return;
          }
          save();
        }, 50);
      },
    });
  };

  const save = () => {
    axios
      .post(ROUTES.ACCOUNTS, formData, AXIOS_NO_GLOBAL_ERROR)
      .then((res) => {
        showAlert({
          message: InfoMessages.successAccountSave,
          onConfirm: () => navigate(ROUTES.ACCOUNTS),
        });
        setErrorMessage("");
      })
      .catch((err) => {
        const { response } = err;

        if (response?.data?.result === 400 && response.data.resultData?.[0]?.message) {
          showAlert({ message: response.data.resultData[0].message });
          return;
        }

        showAlert({ message: ErrorMessages.server });
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
                disabled,
              } = field;
              const value = formData[key] || "";

              const handleChange = (e) => {
                let value = e.target.value;
                if (!value) {
                  setErrorMessage('');
                } else if (key === KEYS.MOBILE && !isValidPhone(value)) {
                  setErrorMessage({ key: key, message: ErrorMessages.invalidPhone });
                } else if (key === KEYS.EMAIL && !isValidEmail(value)) {
                  setErrorMessage({ key: key, message: ErrorMessages.invalidEmail });
                } else if (key === KEYS.PASSWORD1) {
                  if (!isValidPassword(value)) {
                    setErrorMessage({ key: key, message: ErrorMessages.invalidPassword });
                  } else if (formData[KEYS.PASSWORD1] !== e.target.value) {
                    setErrorMessage({ key: KEYS.PASSWORD2, message: ErrorMessages.correctPassword });
                  }
                } else if (key === KEYS.PASSWORD2 && formData[KEYS.PASSWORD1] !== e.target.value) {
                  setErrorMessage({ key: key, message: ErrorMessages.correctPassword });
                } else {
                  setErrorMessage('');
                }

                setFormData({ ...formData, [key]: value });
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
                    ) : (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="password-confirm">
                          {key === errorMessage.key && errorMessage.message}
                        </span>
                      </div>
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
          <Button type={BUTTON_SAVE} onClick={handleSave} disabled={errorMessage.key} />
        </div>
      </div>
    </>
  );
};

export default AccountRegister;
