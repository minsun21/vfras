import React from "react";

const Select = ({ value, options, onChange, nonEmpty = true, name, id }) => (
  <div className="select-box">
    <select name={name} id={id} value={value} onChange={onChange}>
      {!nonEmpty && <option value=""></option>}
      {options.map((opt) => (
        <option key={opt.key} value={opt.key}>
          {opt.value}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
