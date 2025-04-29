import React from "react";

const Input = ({
  type = "text",
  value,
  readOnly = false,
  onChange,
  initValue = "",
}) => {
  return (
    <input
      className="input-field"
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={initValue}
    />
  );
};

export default Input;
