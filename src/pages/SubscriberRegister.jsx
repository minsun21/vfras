import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SUBSCRIBERResigerFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
import { errorMessages, infoMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";

const SubscriberRegister = () => {
  const navigate = useNavigate();
  const { showDialog, showAlert, showModal } = useModal();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
    let data = {};
    for (const field of SUBSCRIBERResigerFields) {
      if (field.type === "radio") {
        data[field.key] = field.options[0].value;
      }
    }
    setFormData({ ...formData, ...data });
  }, []);

  const cancelEdit = () => {
    showDialog({
      message: infoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBER),
    });
  };

  const validate = () => {
    for (const field of SUBSCRIBERResigerFields) {
      const { key, label, required, type, requiredLength } = field;
      // 1. 필수값인지 확인
      if (required && !formData[key]) {
        showAlert({
          message: errorMessages.required(label),
        });
        return false;
      }

      // 2. 타입에 따라 validation 체크(email, phone...)
      if (type === "email" && !isValidEmail(formData[key])) {
        showAlert({
          message: errorMessages.invalidEmail,
        });
        return;
      }

      if (type === "phone" && !isValidPhone(formData[key])) {
        showAlert({
          message: errorMessages.invalidPhone,
        });
        return;
      }

      // 3. 최소 길이 체크
      if (requiredLength && formData[key].length !== requiredLength) {
        showAlert({
          message: errorMessages.lengthMismatch(label, requiredLength),
        });
        return;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    console.log("저장할 데이터:", formData);

    showAlert({
      message: infoMessages.successAccountSave,
      onConfirm: () => navigate(ROUTES.SUBSCRIBER),
    });
  };

  return (
    <div>
      <table className="info-table">
        <tbody>
          {SUBSCRIBERResigerFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
              placeholder,
              comment,
              disabled,
              multi,
            } = field;
            const value = formData[key] || "";

            const handleChange = (val) => {
              setFormData((prev) => ({ ...prev, [key]: val }));
            };

            return (
              <tr key={key}>
                <td className="label" required={required}>
                  {label}
                </td>
                <td className="value">
                  {type === "select" ? (
                    <Select
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                      nonEmpty={true}
                    />
                  ) : type === "radio" ? (
                    <RadioGroup
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
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
                  ) : multi ? (
                    <div>
                      {field.fields.map((subField, idx) => (
                        <div key={subField.key}>
                          <Input
                            type={subField.type}
                            value={formData[subField.key] || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                [subField.key]: e.target.value,
                              }))
                            }
                            disabled={disabled}
                          />
                          {idx === 0 && <span>{"-"}</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Input
                      value={value}
                      type={type}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
        <Button onClick={handleSave} />
      </div>
    </div>
  );
};

export default SubscriberRegister;
