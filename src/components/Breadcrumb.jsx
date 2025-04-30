import { useLocation, Link } from 'react-router-dom';
import { MenusConfigConfig } from '../config/MenusConfig';

const buildBreadcrumbMap = (MenusConfig) => {
  const map = { '/': '홈' };
  MenusConfig.forEach((group) => {
    group.items.forEach((item) => {
      const fullPath = '/' + item.path; 
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
  const breadcrumbMap = buildBreadcrumbMap(MenusConfigConfig);

  const entry = breadcrumbMap[currentPath];

  return (
    <nav style={{ fontSize: '14px' }}>
      <Link to="/">홈</Link>
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
