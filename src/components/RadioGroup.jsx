import React from "react";

const RadioGroup = ({ value, options, onChange }) => (
  <div className="common-radio">
    {options.map((opt) => (
      <label key={opt.key}>
        <input
          type="radio"
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
        />
        {opt.value}
      </label>
    ))}
  </div>
);

export default RadioGroup;
