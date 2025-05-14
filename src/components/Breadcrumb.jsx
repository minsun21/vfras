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
    <section class="location">
			<ul>
				<li><a to="/">홈</a></li>
        {entry?.parent && (
          <>
            <li><span>{entry.parent}</span></li>
          </>
        )}
        {entry?.label && (
          <>
            <li><span>{entry.label}</span></li>
          </>
        )}
			</ul>
		</section>

  );
};

export default Breadcrumbs;
