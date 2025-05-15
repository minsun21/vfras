import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenusConfig } from "../config/MenusConfig";
import { LABELS } from "../constants/Labels";

const SideBar = () => {
  const location = useLocation();

  // const activeKey = MenusConfig
  //   .filter(
  //     (menu) =>
  //       location.pathname === menu.to ||
  //       location.pathname.startsWith(menu.to + "/")
  //   )
  //   .sort((a, b) => b.to.length - a.to.length)[0]?.key;

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
        {/* <nav class="menu">
          <ul class="nav-links">
            <li class="in-submenu">
              <div class="icon-link"> <a href="#"><i class="sb-icon-user"></i><span>가입자</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html" class="active"><span>가입자 조회</span></a></li>
                  <li><a href="../code.html"><span>가입자 관리</span></a></li>
                  <li><a href="../code.html"><span>가입자 등록</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> <a href="#"><i class="sb-icon-data"></i><span>국번호</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>LV 국번 관리</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> <a href="#"><i class="sb-icon-pop"></i><span>컨텐츠</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>음원 조회</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> <a href="#"><i class="sb-icon-system"></i><span>계정</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>계정 관리</span></a></li>
                  <li><a href="../code.html"><span>접속 이력</span></a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav> */}
      </aside>
    </>
  );
};

export default SideBar;
