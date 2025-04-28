import React, { useState, useEffect } from "react";
import Dialog from "../components/modals/Dialog";
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../features/breadcrumbSlice';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumb([
      { name: '홈', path: '/home' },
      { name: '프로필', path: '/profile' },
    ]));
  }, [dispatch]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("✅ 삭제가 완료되었습니다");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("❌ 삭제가 취소되었습니다");
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleDeleteClick}>삭제하기</button>

      <Dialog
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="정말 삭제하시겠습니까?"
      />
    </div>
  );
};

export default Home;
