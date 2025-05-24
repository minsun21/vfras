import Modal from "react-modal";
import { useModal } from "../../contexts/ModalContext";
import Button, { BUTTON_CANCEL } from "../Button";
import { LABELS } from "../../constants/Labels";

export const MODAL_SM = "w400"; 
export const MODAL_LG = "didPop"; 
export const MODAL_MD = "w600"; 

const ModalRenderer = () => {
  const { modals, closeModal } = useModal();

  if (modals?.length === 0) return null;

  return (
    <>
      {modals?.map(({ type, props }, index) => (
        <Modal
          className={`${type}`}
          key={index}
          isOpen={true}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
        >
          {type === "alert" ? (
            <div className="layer-popup open">
              <div className="md-content w400">
                <div className="msg-header">
                  <h3>{LABELS.ALERT_MSG}</h3>
                </div>
                <div className="msg-body">
                  <p>{props.message}</p>
                </div>
                <div className="msg-footer">
                  <div className="btn-wrap center">
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
          ) : type === "dialog" ? (
            <div className="layer-popup open">
              <div className="md-content w400">
                <div className="msg-header">
                  <h3>{LABELS.ALERT_MSG}</h3>
                </div>
                <div className="msg-body">
                  <p>{props.message}</p>
                </div>
                <div className="msg-footer">
                  <div className="btn-wrap center">
                    <Button
                      type={BUTTON_CANCEL}
                      onClick={() => {
                        props.onCancel?.();
                        closeModal();
                      }}
                    />
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
            <div className="layer-popup open">
              <div className={`md-content ${props.size}`}>
                <div className="pop-header">
                  <h3>{props.header}</h3>
                  <div className="pop-header-close">
                    <button onClick={closeModal} />
                  </div>
                </div>
                <div className="pop-body">{props.content}</div>
                <div className="pop-footer">
                  <div className="btn-wrap center">
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
          )}
        </Modal>
      ))}
    </>
  );
};

export default ModalRenderer;
