// menuConfig.js
import { lazy } from 'react';

const menuConfig = [
  {
    title: '대메뉴1',
    children: [
      {
        title: '중메뉴1-1',
        path: '/menu1/sub1',
        component: lazy(() => import('./pages/Menu1Sub1Page'))
      },
      {
        title: '중메뉴1-2',
        path: '/menu1/sub2',
        component: lazy(() => import('./pages/Menu1Sub2Page'))
      }
    ]
  },
  {
    title: '대메뉴2',
    children: [
      {
        title: '중메뉴2-1',
        path: '/menu2/sub1',
        component: lazy(() => import('./pages/Menu2Sub1Page'))
      }
    ]
  }
];

export default menuConfig;
