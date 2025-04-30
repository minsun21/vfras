import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import "./Layout.css";
import SideBar from "./SideBar";
import { MenusConfigConfig } from "../config/MenusConfig";
import Button, { BUTTON_CANCEL } from "./Button";

const getCurrentSubMenuTitle = (MenusConfigConfig, currentPath) => {
  const normalized = currentPath.replace(/^\/+/, "");

  for (const group of MenusConfigConfig) {
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

  const title = getCurrentSubMenuTitle(MenusConfigConfig, location.pathname);

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
            <Button onClick={goProfile}>내정보</Button>
            <Button type={BUTTON_CANCEL} onClick={handleLogout}>로그아웃</Button>
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
