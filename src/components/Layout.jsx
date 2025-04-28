import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from './Breadcrumb';
import "./Layout.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("logout", Date.now()); // ✅ 트리거 역할
    navigate("/login", { replace: true });
  };

  return (
    <div className="layout">
      <aside className="layout-sidebar">
        <div className="logo">BI</div>

        <div className="menu-group">
          <div className="menu-title">▶ 캠페인 관리</div>
          <button className="menu-item">캠페인 대상 관리</button>
          <button className="menu-item">조건 추가</button>
        </div>

        <div className="menu-group">
          <div className="menu-title">▶ 리포트</div>
          <button className="menu-item">일별 리포트</button>
          <button className="menu-item">매체 리포트</button>
        </div>

        <div className="menu-group">
          <div className="menu-title">▶ 시스템 관리</div>
          <button className="menu-item">사용자 관리</button>
          <button className="menu-item">권한 설정</button>
        </div>
      </aside>

      <div className="layout-right">
        <header className="layout-header">
          <Breadcrumb />
          <div className="user-actions">
            <button>내정보</button>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </header>

        <main className="layout-content">
          <Outlet />
        </main>

        <footer className="layout-footer">시스템이름 | 카피라이트</footer>
      </div>
    </div>
  );
};

export default Layout;
