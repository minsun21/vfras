import React from "react";

const Select = ({ label, value, options, onChange, nonEmpty = false }) => (
  <div className="common-select">
    {label && <label>{label}</label>}
    <select value={value} onChange={onChange}>
      {!nonEmpty && <option value=""></option>}
      {options.map((opt) => (
        <option key={opt.key} value={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
