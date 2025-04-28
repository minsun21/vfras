import React from "react";
import Modal from "react-modal";

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          inset: 'unset',
          width: '400px',
          padding: '20px',
          borderRadius: '10px',
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }
      }}
    >
      <h2>확인하시겠습니까?</h2>
      {message}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={onConfirm}
          style={{
            padding: "10px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          확인
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          취소
        </button>
      </div>
    </Modal>
  );
};

export default Dialog;
