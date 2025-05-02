import { createContext, useContext, useState } from "react";
import ModalRenderer from "../components/modals/ModalRenderer";

const ModalContext = createContext();

export const ALERT = "alert";
export const DIALOG = "dialog";
export const MODAL = "modal";

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, props: {} });

  const showAlert = (props) => {
    setModal({ type: ALERT, props });
  };

  const showDialog = (props) => {
    setModal({ type: DIALOG, props });
  };

  const showModal = (props) => {
    setModal({ type: MODAL, props });
  };

  const closeModal = () => {
    setModal({ type: null, props: {} });
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, showAlert, showDialog, modal }}
    >
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
