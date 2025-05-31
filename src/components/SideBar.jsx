import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenusConfig } from "../config/MenusConfig";
import { LABELS } from "../constants/Labels";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const role = useSelector((state) => state.auth.user?.role); // 예: 'admin'

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <Link to="">
            <span className="logoImg">{LABELS.HOME_TITLE}</span>
          </Link>
        </div>
        <nav className="menu">
          <ul className="nav-links">
            {MenusConfig.map((group) => {
              const visibleItems = group.items.filter((item) =>
                item.roles.includes(role)
              );
              if (visibleItems.length === 0) return null;

              return (
                <li className="in-submenu" key={group.title}>
                  <div className="icon-link">
                    <Link to="#">
                      <i className={group.icon}></i>
                      <span>{group.title}</span>
                    </Link>
                    {group.items.map((item) => {
                      if (!item.roles.includes(role)) return null;

                      const activeKey = group.items
                        .filter(
                          (item) =>
                            location.pathname === item.path ||
                            location.pathname.startsWith(item.path + "/")
                        )
                        .sort((a, b) => b.path.length - a.path.length)[0]?.path;

                      return (
                        <ul className="sub-menu" key={item.path}>
                          <li>
                            <Link
                              to={item.path}
                              className={
                                item.path === activeKey ? "active" : ""
                              }
                            >
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
