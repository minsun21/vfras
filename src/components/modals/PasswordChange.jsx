import React, { useState } from "react";
import Input from "../Input";
import { passwordChange } from "../../config/FieldsConfig";
import { LABELS } from "../../constants/Labels";

const PasswordChange = () => {

  const [formData, setFormData] = useState(
    passwordChange.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {})
  );

  return (
    <div className="vFlex">
      {passwordChange.map((field) => {
        const { key, placeholder } = field;

        const handleChange = (val) => {
          setFormData((prev) => ({ ...prev, [key]: val }));
        };

        return (
          <Input size="fl"
            key={key}
            value={formData[key] || ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      })}
      <span>{LABELS.PASSWORD_CHECK2}</span>
    </div>
  );
};

export default PasswordChange;
