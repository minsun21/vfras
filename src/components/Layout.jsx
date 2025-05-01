import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import { MenusConfig } from "../config/MenusConfig";
import Button, { BUTTON_CANCEL } from "./Button";
import { ROUTES } from "../constants/routes";

const getCurrentSubMenuTitle = (MenusConfig, currentPath) => {
  const normalized = currentPath.replace(/^\/+/, "");

  for (const group of MenusConfig) {
    for (const item of group.items || []) {
      if (item.path === normalized) {
        return item.title;
      }
    }
  }

  if(normalized === 'profile'){
    return '내 정보';
  }
  else if(normalized === 'accounts/register'){
    return '사용자 등록';
  }
  else if(normalized === 'accounts/edit'){
    return '사용자 정보 수정';
  }
  
  return null;
};

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const title = getCurrentSubMenuTitle(MenusConfig, location.pathname);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("logout", Date.now()); // ✅ 트리거 역할
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const goProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <div className="layout">
      <SideBar />
      <div className="layout-right">
        <header className="layout-header">
          <Breadcrumb />
          <div className="user-actions">
            <Button label={"내 정보"} onClick={goProfile} />
            <Button label={"로그아웃"} type={BUTTON_CANCEL} onClick={handleLogout} />
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
