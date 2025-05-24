import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountRegisterFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { useModal } from "../contexts/ModalContext";
import { errorMessages, infoMessages } from "../constants/Message";
import axios from "../api/axios";
import { fieldsValidate } from "../utils/FormValidation";
import { KEYS } from "../constants/Keys";
import { ADMIN_TYPES } from "../config/OPTIONS";

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
      message: infoMessages.confirmRegister,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          const errValidate = fieldsValidate(accountRegisterFields, formData);
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

    // axios.post(ROUTES.ACCOUNTS, formData).then(res=>{
    //   showAlert({
    //     message: infoMessages.successAccountSave,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })

    showAlert({
      message: infoMessages.successAccountSave,
      onConfirm: () => navigate(ROUTES.ACCOUNTS),
    });
  };

  const cancel = () => {
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
            {accountRegisterFields.map((field, idx) => {
              const {
                key,
                label,
                type = "text",
                options = [],
                required,
                placeholder,
                comment,
                disabled,
              } = field;
              const value = formData[key] || "";

              const handleChange = (val) => {
                setFormData((prev) => ({ ...prev, [key]: val }));
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
                        options={options}
                        onChange={(e) => handleChange(e.target.value)}
                        nonEmpty={true}
                      />
                    ) : comment ? (
                      <div>
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
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
                          placeholder={placeholder}
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
                        placeholder={placeholder}
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
