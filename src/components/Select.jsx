import React from "react";

const Select = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}) => (
  <div className="common-select">
    {label && <label>{label}</label>}
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value=""></option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
