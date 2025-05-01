import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import { MenusConfig } from "../config/MenusConfig";
import Button, { BUTTON_CANCEL } from "./Button";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Label";

const getCurrentSubMenuTitle = (MenusConfig, currentPath) => {
  for (const group of MenusConfig) {
    for (const item of group.items || []) {
      if (item.path === currentPath) {
        return item.title;
      }
    }
  }

  if(currentPath === '/profile'){
    return LABELS.MY_INFO;
  }
  else if(currentPath === '/accounts/register'){
    return LABELS.USER_REGISTER;
  }
  else if(currentPath === '/accounts/edit'){
    return LABELS.USER_EDIT;
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
            <Button label={LABELS.MY_INFO} onClick={goProfile} />
            <Button label={LABELS.LOGOUT} type={BUTTON_CANCEL} onClick={handleLogout} />
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
