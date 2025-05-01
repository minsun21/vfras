import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subsriberResigerFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import { ROUTES } from "../constants/routes";
import {
  isRequiredData,
  isValidEmail,
  isValidPhone,
} from "../utils/FormValidation";
import { errorMessages } from "../constants/Message";

const SubscriberRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  const isFilledDigits = () => {
    for (const field of subsriberResigerFields) {
      const digits = formData[field.key].replace(/\D/g, "");
      if (field.requiredLength && digits.length === field.requiredLength) {
        alert(
          `${field.label}는(은) 최소 ${field.requiredLength} 이상이어야 합니다.`
        );
        return false;
      }
    }

    return true;
  };

  const validate = () => {
    for (const field of subsriberResigerFields) {
      const { key, label, required, type, requiredLength } = field;
      // 1. 필수값인지 확인
      if (required && !formData[key]) {
        alert(errorMessages.required(label));
        return false;
      }

      // 2. 타입에 따라 validation 체크(email, phone...)
      if (type === "email" && !isValidEmail(formData[key])) {
        alert(errorMessages.invalidEmail());
        return;
      }

      if (type === "phone" && !isValidPhone(formData[key])) {
        alert(errorMessages.invalidPhone());
        return;
      }

      // 3. 최소 길이 체크
      if (requiredLength && formData[key].length !== requiredLength) {
        alert(errorMessages.lengthMismatch(label, requiredLength));
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

    // alert("가입자 등록이 완료되었습니다.");
    // navigate(ROUTES.SUBSCRIBER);
  };

  return (
    <div>
      <table className="info-table">
        <tbody>
          {subsriberResigerFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
              placeholder,
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
                    />
                  ) : type === "radio" ? (
                    <RadioGroup
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  ) : key === "password" ? (
                    <div>
                      <Input
                        value={value}
                        type={field.type}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={field.readonly}
                      />
                      <span className="comment">
                        {"초기 비밀번호는 대표번호 마지막 4자리"}
                      </span>
                    </div>
                  ) : field.multi ? (
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
      <div style={{ display: "flex" }}>
        <Button
          type={BUTTON_CANCEL}
          onClick={() => navigate(ROUTES.SUBSCRIBER)}
        />
        <Button label="확인" onClick={handleSave} />
      </div>
    </div>
  );
};

export default SubscriberRegister;
