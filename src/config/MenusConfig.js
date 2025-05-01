import { lazy } from 'react';
import { ROUTES } from '../constants/routes';

export const MenusConfigConfig = [
  {
    title: '가입자',
    items: [
      {
        title: '가입자 조회',
        path: ROUTES.SUBSCRIBER,
        component: lazy(() => import('../pages/Subscriber'))
      },
      {
        title: '가입자 관리',
        path: ROUTES.SUBSCRIBER_MANAGE,
        component: lazy(() => import('../pages/SubscriberManage'))
      },
      {
        title: '가입자 등록',
        path: ROUTES.SUBSCRIBER_REGISTER,
        component: lazy(() => import('../pages/SubscriberRegister'))
      }
    ]
  },
  {
    title: '국번호',
    items: [
      {
        title: 'LV 국번 관리',
        path: ROUTES.COUNTRY_CODE,
        component: lazy(() => import('../pages/CountryCode'))
      }
    ]
  },
  {
    title: '컨텐츠',
    items: [
      {
        title: '음원 조회',
        path: ROUTES.SOUND_SOURCE,
        component: lazy(() => import('../pages/SoundSource'))
      }
    ]
  },
  {
    title: '계정',
    items: [
      {
        title: '계정 관리',
        path: ROUTES.ACCOUNT_MANAGE,
        component: lazy(() => import('../pages/AccountManage'))
      },
      {
        title: '접속 이력',
        path: ROUTES.ACCOUNT_LOGS,
        component: lazy(() => import('../pages/AccountLogs'))
      }
    ]
  }
];

