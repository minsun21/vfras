import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../contexts/ModalContext";
import { setAlertHandler, setLoadingHandler } from "../api/axios";
import { startLoading, endLoading } from "../features/loadingSlice";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const { showAlert } = useModal();

  useEffect(() => {
    // ✅ Alert 핸들러 등록
    setAlertHandler(showAlert);

    // ✅ Loading 핸들러 등록 (Redux와 연결)
    setLoadingHandler((isLoading) => {
      dispatch(isLoading ? startLoading() : endLoading());
    });
  }, [dispatch, showAlert]);

  return null;
};

export default AppInitializer;
