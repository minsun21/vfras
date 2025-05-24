import React from "react";

const RadioGroup = ({ value, options, onChange}) => (
  <div className="radio-box">
    {options.map((opt) => {
      return (
        <span className="items" key={opt.value}>
          <input
            type="radio"
            id={opt.value}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
          <label htmlFor={opt.value}>{opt.label ?? opt.value}</label>
        </span>
      );
    })}
  </div>
);

export default RadioGroup;
