import { Link, useLocation } from "react-router-dom";
import { MenusConfig, NonMenuConfig } from "../config/MenusConfig";

const buildBreadcrumbMap = (MenusConfig) => {
  const map = {};
  MenusConfig.forEach((group) => {
    group.items.forEach((item) => {
      const fullPath = item.path;
      map[fullPath] = {
        label: item.title,
        parent: group.title,
      };
    });
  });

  NonMenuConfig.forEach((item) => {
    const fullPath = item.path;
    map[fullPath] = {
      label: item.title,
      parent : item.parent
    };
  });

  return map;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const breadcrumbMap = buildBreadcrumbMap(MenusConfig);

  const entry = breadcrumbMap[currentPath];

  return (
    <section className="location">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {entry?.parent && (
          <>
            <li>
              <span>{entry.parent}</span>
            </li>
          </>
        )}
        {entry?.label && (
          <>
            <li>
              <span>{entry.label}</span>
            </li>
          </>
        )}
      </ul>
    </section>
  );
};

export default Breadcrumbs;
