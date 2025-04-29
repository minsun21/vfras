import React from "react";
import { useNavigate } from "react-router-dom";
import { menusConfig } from "../config/menus";

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
      <nav>
        {menusConfig.map((group) => (
          <div key={group.classification}>
            <ul className="menu-group">
              <div className="menu-title">{group.title}</div>
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
  );
};

export default SideBar;
