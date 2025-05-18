import Modal from "react-modal";
import { useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";

const ModalRenderer = () => {
  const { modals, closeModal } = useModal();

  if (modals?.length === 0) return null;

  return (
    <>
      {modals?.map(({ type, props }, index) => (
        <Modal
          className={`common-modal ${type}`}
          key={index}
          isOpen={true}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000 + index * 2,
            },
            content: {
              position: "relative",
              inset: "unset",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              background: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              zIndex: 1001 + index * 2,
              textAlign: "center",
            },
          }}
        >
          {type === "alert" ? (
            <div>
              <p>{props.message}</p>
              <Button
                onClick={() => {
                  props.onConfirm?.();
                  closeModal();
                }}
              />
            </div>
          ) : type === "dialog" ? (
            <div>
              <p>{props.message}</p>
              <Button type={BUTTON_CANCEL} onClick={closeModal} />
              <Button
                onClick={() => {
                  props.onConfirm?.();
                  closeModal();
                }}
              />
            </div>
          ) : (
            <div>
              <header>
                <h4>{props.header}</h4>
                <button onClick={closeModal}>x</button>
              </header>
              <div>{props.content}</div>
            </div>
          )}
        </Modal>
      ))}
    </>
  );
};

export default ModalRenderer;
