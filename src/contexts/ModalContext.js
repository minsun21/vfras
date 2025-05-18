import { createContext, useContext, useState } from "react";
import ModalRenderer from "../components/modals/ModalRenderer";

const ModalContext = createContext();

export const ALERT = "alert";
export const DIALOG = "dialog";
export const MODAL = "modal";

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]); // ✅ 스택 구조

  const showAlert = (props) => {
    setModals((prev) => [...prev, { type: ALERT, props }]);
  };

  const showDialog = (props) => {
    setModals((prev) => [...prev, { type: DIALOG, props }]);
  };

  const showModal = (props) => {
    setModals((prev) => [...prev, { type: MODAL, props }]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, showAlert, showDialog, modals }}
    >
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
