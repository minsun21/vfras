import React from "react";
import Modal from "react-modal";
import Button from "../Button";

Modal.setAppElement("#root");

const Dialog = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel="확인 모달"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          inset: "unset",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        },
      }}
    >
      {message}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button type="cancel" onClick={onCancel} />
        <Button type="confirm" onClick={onCancel} />
      </div>
    </Modal>
  );
};

export default Dialog;
