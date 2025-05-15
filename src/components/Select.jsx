import React from "react";

const Select = ({ value, options, onChange, nonEmpty = false }) => (
  <select className="common-select" value={value} onChange={onChange}>
    {!nonEmpty && <option value=""></option>}
    {options.map((opt) => (
      <option key={opt.key} value={opt.value}>
        {opt.value}
      </option>
    ))}
  </select>
);

export default Select;
