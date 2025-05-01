import React from "react";

const RadioGroup = ({ value, options, onChange }) => (
  <div className="common-radio">
    {options.map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          value={opt}
          checked={value === opt}
          onChange={onChange}
        />
        {opt}
      </label>
    ))}
  </div>
);

export default RadioGroup;
