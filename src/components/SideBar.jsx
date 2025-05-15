import React from "react";
import { useNavigate } from "react-router-dom";
import { MenusConfig } from "../config/MenusConfig";
import { LABELS } from "../constants/Labels";

const SideBar = () => {
  const navigate = useNavigate();

  const goPage = (path) => {
    navigate(`${path}`);
  };

  return (
    <>
      <aside class="sidebar">
        <div class="logo"><a href=""><span class="logoImg">{LABELS.HOME_TITLE}</span></a></div>
        <nav class="menu">
          <ul class="nav-links">
            <li class="in-submenu">
              <div class="icon-link"> 
                <a href="#"><i class="sb-icon-user"></i><span>가입자</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html" class="active"><span>가입자 조회</span></a></li>
                  <li><a href="../code.html"><span>가입자 관리</span></a></li>
                  <li><a href="../code.html"><span>가입자 등록</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> 
                <a href="#"><i class="sb-icon-data"></i><span>국번호</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>LV 국번 관리</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> 
                <a href="#"><i class="sb-icon-pop"></i><span>컨텐츠</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>음원 조회</span></a></li>
                </ul>
              </div>
            </li>
            <li class="in-submenu">
              <div class="icon-link"> 
                <a href="#"><i class="sb-icon-system"></i><span>계정</span></a>
                <ul class="sub-menu">
                  <li><a href="../code.html"><span>계정 관리</span></a></li>
                  <li><a href="../code.html"><span>접속 이력</span></a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>



      <nav class="menu">
        {MenusConfig.map((group, index) => (

          <div key={`${group.classification}${index}`}>
            <ul className="menu-group" key={group.classification}>
              <div className="menu-title" key={group.title}>
                {group.icon}
                {group.title}
              </div>
              {group.items.map((item) => (
                <li
                  key={item.path}
                  className="menu-item"
                  onClick={() => goPage(item.path)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          
        ))}
      </nav>
      
      
      </aside>
      
    </>


    



  );
};

export default SideBar;
