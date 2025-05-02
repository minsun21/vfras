import Modal from "react-modal";
import { ALERT, DIALOG, useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";

const ModalRenderer = () => {
  const { modal, closeModal } = useModal();
  const { type, props } = modal;

  if (!type) return null;

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      ariaHideApp={false}
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
      {type === ALERT ? (
        <div className="modal-content">
          <div>{props.message}</div>
          <div className="modal-footer">
            <Button onClick={closeModal} />
          </div>
        </div>
      ) : type === DIALOG ? (
        <div className="modal-content">
          <div>{props.message}</div>
          <div className="modal-footer">
            <Button type={BUTTON_CANCEL} onClick={closeModal} />
            <Button
              onClick={() => {
                props.onConfirm?.();
              }}
            />
          </div>
        </div>
      ) : (
        <div className="modal-content">{props.content}</div>
      )}

      {type === "custom" && <div>{props.content}</div>}
    </Modal>
  );
};

export default ModalRenderer;
