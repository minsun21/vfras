import React from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import { MenusConfig, NonMenuConfig } from "../config/MenusConfig";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";
import { InfoMessages } from "../constants/Message";
import { KEYS } from "../constants/Keys";
import { deleteCookie } from "../utils/cookies";

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
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.user);
  const { showDialog } = useModal();

  const title = getCurrentSubMenuTitle(location.pathname);

  const handleLogout = () => {
    showDialog({
      message: InfoMessages.confirmLogout,
      onConfirm: () => {
        axios.put(ROUTES.LOGOUT).then((res)=>{
          console.log('res', res)
          deleteCookie();
          dispatch(logout());
        })
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
                <label>{`${userInfo[KEYS.ADMIN_ID]}`}</label>
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
