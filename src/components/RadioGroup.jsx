import React from "react";

const RadioGroup = ({ value, options, onChange }) => (
  <div className="radio-box">
    {options.map((opt) => (
      <span className="items" key={opt.value}>
        <input
          type="radio"
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
        />
       <label key={opt.key}>{opt.value}</label>
      </span>
    ))}
  </div>
);

export default RadioGroup;





