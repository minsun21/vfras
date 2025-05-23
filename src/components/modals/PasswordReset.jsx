import React from "react";
import { subsriberMessages } from "../../constants/Message";
import Input from "../Input";

const PasswordReset = ({ currentPassword }) => {

  return (
    <div>
      <span>{subsriberMessages.resetPasswordConfirm}</span>
      <Input value={currentPassword} disabled />
    </div>
  );
};

export default PasswordReset;
