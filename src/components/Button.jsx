import React, { useEffect, useState } from "react";
import { LABELS } from "../constants/Label";

export const BUTTON_CONFIRM = "confirm";
export const BUTTON_CANCEL = "cancel";
export const BUTTON_SEARCH = "search";
export const BUTTON_SAVE= "save";
export const BUTTON_DELETE= "delete";

const Button = ({ type='confirm', label, onClick }) => {
   
  const [btnLabel, setBtnLabel] = useState("");
  const [classType, setClassType] = useState(BUTTON_CONFIRM);

  useEffect(() => {
    if (label) {
      setBtnLabel(label);
      return;
    }

    if (type === BUTTON_CONFIRM) {
      setBtnLabel(LABELS.CONFIRM);
    } else if (type === BUTTON_CANCEL) {
      setBtnLabel(LABELS.CANCEL);
      setClassType(BUTTON_CANCEL)
    } else if(type === BUTTON_SEARCH){
      setBtnLabel(LABELS.SEARCH)
    } else if(type === BUTTON_SAVE) {
      setBtnLabel(LABELS.SAVE)
    } else if(type === BUTTON_DELETE){
      setBtnLabel(LABELS.DELETE)
    }
  }, [label, type]);

  return (
    <button className={`common-button-${classType}`} onClick={onClick}>
      {btnLabel}
    </button>
  );
};

export default Button;
