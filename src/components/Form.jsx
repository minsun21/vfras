import React from "react";

const Form = ({ className, onSubmit, children }) => {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
