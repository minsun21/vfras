import React from "react";
import { useNavigate } from "react-router-dom";
import { MenusConfigConfig } from "../config/MenusConfig";

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
        {MenusConfigConfig.map((group, index) => (
          <div key={`${group.classification}${index}`}>
            <ul className="menu-group" key={group.classification} >
              <div className="menu-title" key={group.title}>{group.title}</div>
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
