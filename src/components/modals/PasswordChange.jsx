import React, { useEffect } from "react";
import Input from "../Input";
import { PASSWORD_CHANGE_FIELDS } from "../../config/FieldsConfig";
import { LABELS } from "../../constants/Labels";
import { useDispatch, useSelector } from "react-redux";
import { setPasswordField } from "../../features/passwordSlice";

const PasswordChange = () => {
  
  const passwordState = useSelector((state) => state.changePassword);
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
          placeholder={placeholder}
          value={passwordState[key]}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ))}
      <span>{LABELS.PASSWORD_CHECK2}</span>
    </div>
  );
};

export default PasswordChange;
