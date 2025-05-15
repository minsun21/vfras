import React from "react";
import { Link } from "react-router-dom";
import { MenusConfig } from "../config/MenusConfig";
import { LABELS } from "../constants/Labels";

const SideBar = () => {


  
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <Link href="">
            <span className="logoImg">{LABELS.HOME_TITLE}</span>
          </Link>
        </div>
        <nav className="menu">
          <ul className="nav-links">
            {MenusConfig.map((group, index) => (
              <li className="in-submenu">
                <div className="icon-link">
                  <Link to="#">
                    <i className={group.icon}></i>
                    <span>{group.title}</span>
                  </Link>
                  {group.items.map((item) => (
                    <ul className="sub-menu">
                      <li>
                        <Link to={item.path}>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
