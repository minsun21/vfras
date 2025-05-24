import React from "react";

export const INPUT_SIZE_SM = "sm"; // 160px
export const INPUT_SIZE_LG = "lg"; // 400px
export const INPUT_SIZE_FL = "fl"; // 100%

const Input = ({
  type = "text",
  value,
  disabled = false,
  onChange,
  placeholder = "",
  size = "nm",
  name,
}) => {

  const blockNegative = (e) => {
    if (type === "number" && (e.key === '-' || e.key === 'e')) {
      e.preventDefault();
    }
  };

  return (
      <input className={`form-input ${size}`}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        min="0"
        onKeyDown={blockNegative}
      />
  );
};

export default Input;
