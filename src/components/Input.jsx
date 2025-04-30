import React from "react";

export const INPUT_SIZE_LG = "lg";
export const INPUT_SIZE_SM = "sm";

const Input = ({
  type = "text",
  value,
  readOnly = false,
  onChange,
  placeholder = "",
  name,
  size = "md",
}) => {
  return (
    <div class={`common-input-${size}`}>
      {name && <span>{name}</span>}
      <input
        type={type}
        value={value}
        disabled={readOnly}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
