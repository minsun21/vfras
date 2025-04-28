import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

import Layout from '../components/Layout';
import PrivateRoute from '../components/routes/PrivateRoute';
import PublicRoute from '../components/routes/PublicRoute';

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 경로 리디렉션 */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ 중첩 라우트 구조 */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Home />} />
          {/* 여기에 더 추가 가능 */}
        </Route>

        {/* 로그인 경로 */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
