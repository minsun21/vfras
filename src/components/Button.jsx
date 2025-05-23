import React, { useEffect, useState } from "react";
import { LABELS } from "../constants/Labels";

export const BUTTON_CONFIRM = "confirm";
export const BUTTON_CANCEL = "cancel";
export const BUTTON_SEARCH = "search";
export const BUTTON_SAVE = "save";
export const BUTTON_DELETE = "delete";

const Button = ({ type = "confirm", label, onClick, disabled = false }) => {
  const [btnLabel, setBtnLabel] = useState("");

  useEffect(() => {
    if (label) {
      setBtnLabel(label);
      return;
    }

    if (type === BUTTON_CONFIRM) {
      setBtnLabel(LABELS.CONFIRM);
    } else if (type === BUTTON_CANCEL) {
      setBtnLabel(LABELS.CANCEL);
    } else if (type === BUTTON_SEARCH) {
      setBtnLabel(LABELS.SEARCH);
    } else if (type === BUTTON_SAVE) {
      setBtnLabel(LABELS.SAVE);
    } else if (type === BUTTON_DELETE) {
      setBtnLabel(LABELS.DELETE);
    }
  }, [label, type]);

  return (
    <button
      className={`sbtn ${
        type === BUTTON_CANCEL
          ? BUTTON_CANCEL
          : type === BUTTON_DELETE
          ? BUTTON_DELETE
          : "scolor"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {btnLabel}
    </button>
  );
};

export default Button;
