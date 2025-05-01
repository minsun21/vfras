import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants/routes';

const NotFound = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const homePath = isAuthenticated ? ROUTES.SUBSCRIBER : ROUTES.LOGIN;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
      <Link to={homePath} style={{ color: 'blue', textDecoration: 'underline' }}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
