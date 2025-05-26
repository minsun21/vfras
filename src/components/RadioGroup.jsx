import React from "react";

const RadioGroup = ({ name = "radio-group", value, options, onChange }) => (
  <div className="radio-box">
    {options.map((opt) => {
      const id = `${name}-${opt.key}`;
      return (
        <span className="items" key={opt.key}>
          <input
            type="radio"
            id={id}
            name={name}
            value={opt.key}
            checked={value === opt.key}
            onChange={onChange}
            disabled={opt.disabled}
          />
          <label htmlFor={id}>{opt.value}</label>
        </span>
      );
    })}
  </div>
);

export default RadioGroup;
