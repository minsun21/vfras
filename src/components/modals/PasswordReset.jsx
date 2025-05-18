import React from "react";
import Button, { BUTTON_CANCEL } from "../Button";
import { useModal } from "../../contexts/ModalContext";
import { subsriberMessages } from "../../constants/Message";

const PasswordReset = ({ currentPassword, restPassword }) => {
  const { closeModal } = useModal();

  return (
    <div>
      <span>{subsriberMessages.resetPasswordConfirm}</span>
      <div>{currentPassword}</div>
      <div className="modal-footer">
        <Button type={BUTTON_CANCEL} onClick={closeModal} />
        <Button onClick={restPassword} />
      </div>
    </div>
  );
};

export default PasswordReset;
