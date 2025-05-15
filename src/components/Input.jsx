import React from "react";

export const INPUT_SIZE_LG = "lg";
export const INPUT_SIZE_SM = "sm";

const Input = ({
  type = "text",
  value,
  disabled = false,
  onChange,
  placeholder = "",
}) => {
  return (
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
  );
};

export default Input;
