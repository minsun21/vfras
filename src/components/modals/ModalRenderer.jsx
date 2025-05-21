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
          className={`${type}`}
          key={index}
          isOpen={true}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          ariaHideApp={false} >
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
                <div class="md-content w1600">
                    <div class="pop-header">
                        <h3>{props.header}</h3>
                        <div class="pop-header-close">
                          <button onClick={closeModal}/>
                        </div>
                    </div>
                  <div class="pop-body">
                    {props.content}
                  </div>
                  <div class="pop-footer">
                    <div class="btn-wrap center">
                      <Button type={BUTTON_CANCEL} onClick={closeModal} />
                      <Button onClick={() => { props.onConfirm?.(); closeModal(); }} />
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
