import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import "./Layout.css";
import SideBar from "./SideBar";
import { menusConfig } from "../config/menus";

const getCurrentSubMenuTitle = (menusConfig, currentPath) => {
  const normalized = currentPath.replace(/^\/+/, "");

  for (const group of menusConfig) {
    for (const item of group.items || []) {
      if (item.path === normalized) {
        return item.title;
      }
    }
  }

  if(normalized === 'profile'){
    return '내 정보';
  }
  
  return null;
};

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const title = getCurrentSubMenuTitle(menusConfig, location.pathname);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("logout", Date.now()); // ✅ 트리거 역할
    navigate("/login", { replace: true });
  };

  const goProfile = () => {
    navigate("/profile");
  };

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
          <div className="content-title">{title}</div>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;
