import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div className='tac mt100'>
      <div className="logoTit">
        <div className="logoTxt">{LABELS.HOME_TITLE}</div>
      </div>
      <p style={{ lineHeight: '2' }}>
      <p className='ft20 fw400'>403 - 접근 권한 없음</p>
      <p className='ft16 fw400'>이 페이지에 접근할 권한이 없습니다.</p>
      <button onClick={handleBackHome} className='ft16 fw400' style={{ color: 'blue', textDecoration: 'underline' }}>홈으로 돌아가기</button>
      </p>
    </div>
  );
};

export default Unauthorized;
