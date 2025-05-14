import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import { MenusConfig, NonMenuConfig } from "../config/MenusConfig";
import Button, { BUTTON_CANCEL } from "./Button";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import { infoMessages } from "../constants/Message";
import '../asset/css/basic.css'; 

const getCurrentSubMenuTitle = (currentPath) => {
  for (const group of MenusConfig) {
    for (const item of group.items || []) {
      if (item.path === currentPath) {
        return item.title;
      }
    }
  }

  for (const item of NonMenuConfig) {
    if (item.path === currentPath) {
      return item.title;
    }
  }

  return null;
};

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showDialog } = useModal();

  const title = getCurrentSubMenuTitle(location.pathname);

  const handleLogout = () => {
    showDialog({
      message: infoMessages.confirmLogout,
      onConfirm: () => {
        dispatch(logout());
        localStorage.setItem("logout", Date.now()); // ✅ 트리거 역할
        navigate(ROUTES.LOGIN, { replace: true });
      },
    });
  };

  const goProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <div className="layout">
      <SideBar />
      <div className="main-content">

        <header className="header">
          <Breadcrumb />
          <div className="header-right">
            <div class="log"> 
              <span class="adminInfo"><label>관리자(admin)</label>님 안녕하세요</span> 
              <a href="#" onClick={goProfile}><span class="editInfo">{LABELS.MY_INFO}</span></a> 
              <a href="#" onClick={handleLogout}><span class="headLogout">{LABELS.LOGOUT}</span></a> 
            </div>
          </div>
        </header>
        <main className="content">
          <h2 class="page-title">{title}</h2>
          <Outlet />
        </main>


      </div>
    </div>
  );
};

export default Layout;
