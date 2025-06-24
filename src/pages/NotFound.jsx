import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants/routes';
import { LABELS } from "../constants/Labels";

const NotFound = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const homePath = isAuthenticated ? ROUTES.SUBSCRIBERS : ROUTES.LOGIN;

  return (
    <div className='tac mt100'>
      <div className="logoTit">
        <div className="logoTxt">{LABELS.HOME_TITLE}</div>
      </div>
      <p style={{ lineHeight: '2' }}>
      <p className='ft20 fw400'>404 - 페이지를 찾을 수 없습니다</p>
      <p className='ft16 fw400'>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to={homePath}  className='ft16 fw400' style={{ color: 'blue', textDecoration: 'underline' }}>
        홈으로 돌아가기
      </Link> 
      </p>
    </div>
  );
};

export default NotFound;
