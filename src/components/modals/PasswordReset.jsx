import React from "react";
import { SubsriberMessages } from "../../constants/Message";
import Input from "../Input";

const PasswordReset = ({ currentPassword }) => {

  return (
    <div className="vFlex">
      <span className="mt40 mb20">{SubsriberMessages.resetPasswordConfirm}</span>
      <div className="tac">
      <Input size="fl" value={currentPassword} disabled />
      </div>
    </div>
  );
};

export default PasswordReset;
