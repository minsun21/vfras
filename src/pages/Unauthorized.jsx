import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div>
      <h1>⚠️ 접근 권한 없음</h1>
      <p>이 페이지에 접근할 권한이 없습니다.</p>
      <button onClick={handleBackHome}>홈으로 돌아가기</button>
    </div>
  );
};

export default Unauthorized;
