import React, { useEffect, useState } from "react";

const Button = ({ type, label, onClick }) => {
   
  const [btnLabel, setBtnLabel] = useState("");

  useEffect(() => {
    if (label) {
      setBtnLabel(label);
      return;
    }

    if (type === "confirm") {
      setBtnLabel("확인");
    } else if (type === "cancel") {
      setBtnLabel("취소");
    }
  }, [label, type]);

  return (
    <button className={`btn-${type}`} onClick={onClick}>
      {btnLabel}
    </button>
  );
};

export default Button;
