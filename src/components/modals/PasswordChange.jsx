import React from "react";
import Input from "../Input";
import { PASSWORD_CHANGE_FIELDS } from "../../config/FieldsConfig";
import { LABELS } from "../../constants/Labels";
import { useSelector, useDispatch } from "react-redux";
import { setPasswordField } from "../../features/passwordSlice";

const PasswordChange = () => {
  const passwordData = useSelector((state) => state.password);
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    dispatch(setPasswordField({ key, value }));
  };

  return (
    <div className="vFlex">
      {PASSWORD_CHANGE_FIELDS.map(({ key, placeholder }) => (
        <Input
          key={key}
          size="fl"
          type="password"
          value={passwordData[key] || ""}
          placeholder={placeholder}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ))}
      <span>{LABELS.PASSWORD_CHECK2}</span>
    </div>
  );
};

export default PasswordChange;
