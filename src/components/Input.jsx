import React from "react";

export const INPUT_SIZE_LG = "lg";
export const INPUT_SIZE_SM = "sm";

const Input = ({
  type = "text",
  value,
  disabled = false,
  onChange,
  placeholder = "",
  size = "md",
  name,
}) => {
  return (
    <div className={`form-field ${size}`}>
      <input
        name={name}
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
