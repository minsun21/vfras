import { useEffect } from "react";
import { useModal } from "../contexts/ModalContext";
import { setAlertHandler } from "../api/axios";

const AppInitializer = () => {
  const { showAlert } = useModal();

  useEffect(() => {
    setAlertHandler(showAlert);
  }, [showAlert]);

  return null;
};

export default AppInitializer;
