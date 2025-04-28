import React, { useState, useEffect } from "react";
import Dialog from "../components/modals/Dialog";
import Alert from "../components/modals/Alert";
import Modal from "../components/modals/Modal";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../features/breadcrumbSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        { name: "홈", path: "/home" },
        { name: "프로필", path: "/profile" },
      ])
    );
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openAlert = () => {
    setIsOpenAlert(true);
  };

  const closeAlert = () => {
    setIsOpenAlert(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };


  return (
    <div>
      <button onClick={openDialog}>Dialog</button>
      <button onClick={openAlert}>Alert</button>
      <button onClick={openModal}>Modal</button>
      <Dialog
        isOpen={isDialogOpen}
        onConfirm={closeDialog}
        onCancel={closeDialog}
        message="정말 삭제하시겠습니까?"
      />

      <Alert
        isOpen={isOpenAlert}
        onConfirm={closeAlert}
        onCancel={closeAlert}
        message="정말 삭제하시겠습니까?"
      />

      <Modal
        isOpen={isModalOpen}
        onConfirm={closeModal}
        onCancel={closeModal}
        message="정말 삭제하시겠습니까?"
      />
    </div>
  );
};

export default Home;
