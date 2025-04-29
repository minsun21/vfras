// menuConfig.js
import { lazy } from 'react';

export const menuConfig = [
  {
    title: '가입자',
    items: [
      {
        title: '가입자 조회',
        path: 'subscriber',
        component: lazy(() => import('../pages/Subscriber'))
      },
      {
        title: '가입자 관리',
        path: 'subscriber/manage',
        component: lazy(() => import('../pages/SubscriberManage'))
      },
      {
        title: '가입자 등록',
        path: 'subscriber/register',
        component: lazy(() => import('../pages/SubscriberRegister'))
      }
    ]
  },
  {
    title: '국번호',
    items: [
      {
        title: 'LV 국번 관리',
        path: 'countrycode',
        component: lazy(() => import('../pages/CountryCode'))
      }
    ]
  },
  {
    title: '컨텐츠',
    items: [
      {
        title: '음원 조회',
        path: 'soundsource',
        component: lazy(() => import('../pages/SoundSource'))
      }
    ]
  },
  {
    title: '계정',
    items: [
      {
        title: '계정 관리',
        path: 'accounts/manage',
        component: lazy(() => import('../pages/AccountManage'))
      },
      {
        title: '접속 이력',
        path: 'accounts/logs',
        component: lazy(() => import('../pages/AccountLogs'))
      }
    ]
  }
];

