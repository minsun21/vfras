import React from "react";

const Form = ({ className, children }) => {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
};

export default Form;
