import React, { useEffect, useState } from "react";

export const BUTTON_CONFIRM = "confirm";
export const BUTTON_CANCEL = "cancel";
export const BUTTON_SEARCH = "search";

const Button = ({ type='confirm', label, onClick }) => {
   
  const [btnLabel, setBtnLabel] = useState("");
  const [classType, setClassType] = useState(BUTTON_CONFIRM);

  useEffect(() => {
    if (label) {
      setBtnLabel(label);
      return;
    }

    if (type === BUTTON_CONFIRM) {
      setBtnLabel("확인");
    } else if (type === BUTTON_CANCEL) {
      setBtnLabel("취소");
      setClassType(BUTTON_CANCEL)
    } else if(type === BUTTON_SEARCH){
      setBtnLabel("검색")
    }
  }, [label, type]);

  return (
    <button className={`common-button-${classType}`} onClick={onClick}>
      {btnLabel}
    </button>
  );
};

export default Button;
