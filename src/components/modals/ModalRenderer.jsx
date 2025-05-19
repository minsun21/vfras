import Modal from "react-modal";
import { useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";
import { LABELS } from "../../constants/Labels";

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
             <div class="layer-popup open"> 
                <div class="md-content w400">
                    <div class="msg-header">
                        <h3>{LABELS.ALERT_MSG}</h3>
                    </div>
                  <div class="msg-body">
                    <p>{props.message}</p>
                  </div>
                  <div class="msg-footer">
                    <div class="btn-wrap center">
                      <Button
                      onClick={() => {
                        props.onConfirm?.();
                        closeModal()
                      }}
                    />
                    </div>
                  </div>
              </div>
            </div>

          ) : type === "dialog" ? (
            <div class="layer-popup open"> 
                <div class="md-content w400">
                    <div class="msg-header">
                        <h3>{LABELS.ALERT_MSG}</h3>
                    </div>
                  <div class="msg-body">
                    <p>{props.message}</p>
                  </div>
                  <div class="msg-footer">
                    <div class="btn-wrap center">
                      <Button type={BUTTON_CANCEL} onClick={closeModal} />
                      <Button
                        onClick={() => {
                        props.onConfirm?.();
                        closeModal();
                          }}
                        />
                    </div>
                  </div>
              </div>
            </div>

          ) : (
            <div class="layer-popup open"> 
                <div class="md-content">
                    <div class="msg-header">
                        <h3>{props.header}</h3>
                    </div>
                  <div class="msg-body">
                    <p>{props.content}</p>
                  </div>
                  <div class="msg-footer">
                    <div class="btn-wrap center">
                      <button onClick={closeModal}>x</button>
                    </div>
                  </div>
              </div>
            </div>

          )}
        </Modal>
      ))}
    </>
  );
};

export default ModalRenderer;
