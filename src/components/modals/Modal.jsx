import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Dialog = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel="확인 모달"
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
          maxWidth: '400px',
          margin: 'auto',
          height : '400px',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
        },
      }}
    >
      <h2>확인</h2>
      <p>{message}</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={onCancel}>아니오</button>
        <button onClick={onConfirm}>예</button>
      </div>
    </Modal>
  );
};

export default Dialog;