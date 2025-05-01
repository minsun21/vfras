import { useLocation } from 'react-router-dom';
import { MenusConfig } from '../config/MenusConfig';

const buildBreadcrumbMap = (MenusConfig) => {
  const map = {  };
  MenusConfig.forEach((group) => {
    group.items.forEach((item) => {
      const fullPath = item.path; 
      map[fullPath] = {
        label: item.title,
        parent: group.title,
      };
    });
  });
  return map;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname; 
  const breadcrumbMap = buildBreadcrumbMap(MenusConfig);

  const entry = breadcrumbMap[currentPath];

  return (
    <nav>
      <span to="/">아이콘</span>
      {entry?.parent && (
        <>
          {' > '}
          <span>{entry.parent}</span>
        </>
      )}
      {entry?.label && (
        <>
          {' > '}
          <span>{entry.label}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
