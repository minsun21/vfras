import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from './Breadcrumb';
import "./Layout.css";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("logout", Date.now()); // ✅ 트리거 역할
    navigate("/login", { replace: true });
  };

  const goProfile = ()=>{
    navigate('/profile');
  }

  return (
    <div className="layout">
      <SideBar />
      <div className="layout-right">
        <header className="layout-header">
          <Breadcrumb />
          <div className="user-actions">
            <button onClick={goProfile}>내정보</button>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </header>

        <main className="layout-content">
          <div className="content-title">{'내정보'}</div>
          <Outlet />
        </main>

        <footer className="layout-footer">copyright</footer>
      </div>
    </div>
  );
};

export default Layout;
