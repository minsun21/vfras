import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { accountEditFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { fieldsValidate } from "../utils/FormValidation";
import { errorMessages, infoMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import { findMappedKey, findMappedValue } from "../utils/Util";
import { ADMIN_TYPES } from "../config/OPTIONS";

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
      // [KEYS.ADMIN_ID] : "vFRAS",
      [KEYS.ADMIN_TYPE]: findMappedKey(ADMIN_TYPES, selectRow[KEYS.ADMIN_TYPE]),
      // [KEYS.DEPARTMENT] : "운영팀",
      // [KEYS.NAME] : "홍길동",
      [KEYS.MOBILE]: "010-1234-5678",
      [KEYS.EMAIL]: "test@lguplus.co.kr",
      [KEYS.REMARKS]: "협력사 요청",
      [KEYS.EMAIL]: "test@lguplus.co.kr",
      [KEYS.PASSWORD]: "",
      [KEYS.PASSWORD_CHECK]: "",
    });

    // axios.get(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then((res) => {
    //   setFormData(res.data);
    // });
  }, []);

  const handleSave = () => {
    showDialog({
      message: infoMessages.confirmRegister,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          const errValidate = fieldsValidate(accountEditFields, formData);
          if (errValidate) {
            showAlert({
              message: errValidate,
              onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
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
    //     message: infoMessages.successAccountSave,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })

    showAlert({
      message: infoMessages.successEdit,
      onConfirm: () => navigate(ROUTES.ACCOUNTS),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: infoMessages.confirmCancel,
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
            {accountEditFields.map((field) => {
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

              const handleChange = (val) => {
                setFormData((prev) => ({ ...prev, [key]: val }));
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
                        nonEmpty={true}
                        value={value}
                        options={options}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    ) : comment ? (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          onChange={(e) => handleChange(e.target.value)}
                          disabled={disabled}
                        />
                        <span className="comment">{comment}</span>
                      </div>
                    ) : key === KEYS.PASSWORD_CONFIRM ? (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          onChange={(e) => handleChange(e.target.value)}
                          disabled={disabled}
                        />
                        <span>
                          {formData[KEYS.PASSWORD] !==
                            formData[KEYS.PASSWORD_CONFIRM] &&
                            errorMessages.correctPassword}
                        </span>
                      </div>
                    ) : (
                      <Input
                        value={value}
                        type={type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
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
