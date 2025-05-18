import React from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import { MenusConfig, NonMenuConfig } from "../config/MenusConfig";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import { infoMessages } from "../constants/Message";
import axios from "../api/axios";

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
        // axios.put(ROUTES.LOGOUT).then((res)=>{
        //   dispatch(logout());
        // })
        dispatch(logout());
      },
    });
  };

  return (
    <div className="layout">
      <SideBar />
      <div className="main-content">
        <header className="header">
          <Breadcrumb />
          <div className="header-right">
            <div className="log">
              <span className="adminInfo">
                <label>관리자(admin)</label>
                {LABELS.GREETING}
              </span>
              <Link to={ROUTES.PROFILE}>
                <span className="editInfo">{LABELS.MY_INFO}</span>
              </Link>
              <Link onClick={handleLogout}>
                <span className="headLogout">{LABELS.LOGOUT}</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="content">
          <h2 className="page-title">{title}</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
