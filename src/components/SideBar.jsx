import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const goPage = (path) => {
    navigate(`/${path}`);
  };

  return (
    <aside className="layout-sidebar">
      <div className="logo">
        <div>이미지</div>
        <span>vFRAS 가입자 관리</span>
      </div>

      <ul className="menu-group">
        <div className="menu-title">가입자</div>
        <li className="menu-item" onClick={() => goPage("menu-list")}>가입자 조회</li>
        <li className="menu-item">가입자 관리</li>
        <li className="menu-item">가입자 등록</li>
      </ul>

      <ul className="menu-group">
        <div className="menu-title">국번호</div>
        <li className="menu-item">LV 국번 관리</li>
      </ul>

      <ul className="menu-group">
        <div className="menu-title">컨텐츠</div>
        <li className="menu-item">음원 조회</li>
      </ul>

      <ul className="menu-group">
        <div className="menu-title">계정</div>
        <li className="menu-item">계정관리</li>
        <li className="menu-item">접속이력</li>
      </ul>
    </aside>
  );
};

export default SideBar;
