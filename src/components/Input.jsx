import React from "react";

export const INPUT_SIZE_LG = "lg";
export const INPUT_SIZE_SM = "sm";

const Input = ({
  type = "text",
  value,
  disabled = false,
  onChange,
  placeholder = "",
  label = "",
  size = "md",
}) => {
  return (
    <div className={`form-field ${size}`}>
      {label && <span>{label}</span>}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
};

export default Input;
