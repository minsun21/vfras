import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import {
  SUBSCRIBEREditFields,
  SUBSCRIBERManageFields,
} from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
import { errorMessages, infoMessage, profileMessages } from "../constants/Message";
import { LABELS } from "../constants/Label";

const SubscriberManageEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState(() =>
    SUBSCRIBERManageFields.reduce((acc, field) => {
      acc[field.key] = field.value || "";
      return acc;
    }, {})
  );
  const [searchMainNumber, setSearchMainNumber] = useState("");

  useEffect(() => {
    // userid로 정보 검색
    console.log(state);

    const selectedId = state?.selectedId || [];
    // setInitData();
    // setFormData(() =>
    //   accountEditFields.reduce((acc, field) => {
    //     acc[field.key] = field.placeholder || "";
    //     return acc;
    //   }, {})
    // );
  }, [state]);

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData.email)) {
      alert(errorMessages.invalidEmail);
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert(errorMessages.invalidPhone);
      return;
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    console.log("저장할 데이터:", formData);

    alert(profileMessages.successUserEdit);
    navigate(ROUTES.PROFILE);
  };

  return (
    <div>
      <table className="info-table">
        <tbody>
          {SUBSCRIBEREditFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
              placeholder,
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
                  {key === "mainNumber" ? (
                    <div>
                      <Input
                        value={formData[key] || ""}
                        type={field.type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <span>{LABELS.LV_NUMBER}</span>
                    </div>
                  ) : key === "password" ? (
                    <>
                      <Input
                        value={formData[key] || ""}
                        type={field.type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <Button
                        type={BUTTON_CANCEL}
                        label={LABELS.PASSWORD_RESET}
                      />
                    </>
                  ) : type === "radio" ? (
                    <RadioGroup
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  ) : key === "did" ? (
                    <div>
                      <span>{value}</span>
                      <Button type={BUTTON_CANCEL} label={LABELS.SETTING} />
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
                      disabled={disabled}
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
        <Button type={BUTTON_CANCEL} onClick={() => navigate(ROUTES.PROFILE)} />
        <Button type={BUTTON_SAVE} onClick={handleSave} />
      </div>
    </div>
  );
};

export default SubscriberManageEdit;
