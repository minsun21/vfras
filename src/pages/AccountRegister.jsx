import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountRegisterFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import { ROUTES } from "../constants/routes";
import {
  isValidEmail,
  isValidPhone,
} from "../utils/FormValidation";
import { errorMessages } from "../constants/Message";

const AccountRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setFormData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData.email)) {
        alert(errorMessages.invalidEmail());
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
        alert(errorMessages.invalidPhone());
      return;
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    console.log("저장할 데이터:", formData);

    alert("프로필이 성공적으로 저장되었습니다.");
    navigate("/profile");
  };

  return (
    <div>
      <table className="user-info-table">
        <tbody>
        {accountRegisterFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
              placeholder,
              comment
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
                        {comment}
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
        <Button type={BUTTON_CANCEL} onClick={() => navigate(ROUTES.PROFILE)} />
        <Button label="저장" onClick={handleSave} />
      </div>
    </div>
  );
};

export default AccountRegister;
