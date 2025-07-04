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

const AccountEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedId = state?.selectedInfo[KEYS.ADMIN_ID] || {}; // 삭제

  const { showDialog, showAlert, closeModal } = useModal();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // userid로 정보 검색
    if (!selectedId) return;
    initData();
  }, [selectedId]);

  const initData = () => {
    axios.get(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then((res) => {
      const result = res.data.resultData;
      setFormData(result);
    });
  };

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
    console.log("save formdata", formData);
    axios.put(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then((res) => {
      showAlert({
        message: InfoMessages.successEdit,
        onConfirm: () => navigate(ROUTES.ACCOUNTS),
      });
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
                Options = [],
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
                        Options={Options}
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
                    ) : // ) : key === KEYS.MOBILE ? (
                    //   <PhoneNumberInput value={value} onChange={handleChange} />
                    key === KEYS.PASSWORD2 ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
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
