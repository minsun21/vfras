import { lazy } from "react";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Label";

export const MenusConfig = [
  {
    title: LABELS.SUBSCRIBER,
    items: [
      {
        title: LABELS.SUBSCRIBER_VIEW,
        path: ROUTES.SUBSCRIBER,
        component: lazy(() => import("../pages/Subscriber")),
      },
      {
        title: LABELS.SUBSCRIBER_MANAGE,
        path: ROUTES.SUBSCRIBER_MANAGE,
        component: lazy(() => import("../pages/SubscriberManage")),
      },
      {
        title: LABELS.SUBSCRIBER_REGISTER,
        path: ROUTES.SUBSCRIBER_REGISTER,
        component: lazy(() => import("../pages/SubscriberRegister")),
      },
    ],
  },
  {
    title: LABELS.COUNTRY_NUMBER,
    items: [
      {
        title: LABELS.COUNTRY_NUMBER_MANAGE,
        path: ROUTES.COUNTRY_CODE,
        component: lazy(() => import("../pages/CountryCode")),
      },
    ],
  },
  {
    title: LABELS.CONTENTS,
    items: [
      {
        title: LABELS.SOUNDS_VIEW,
        path: ROUTES.SOUND_SOURCE,
        component: lazy(() => import("../pages/SoundSource")),
      },
    ],
  },
  {
    title: LABELS.ACCOUNT,
    items: [
      {
        title: LABELS.ACCOUNT_MANAGE,
        path: ROUTES.ACCOUNT_MANAGE,
        component: lazy(() => import("../pages/AccountManage")),
      },
      {
        title: LABELS.ACCOUNT_LOGS,
        path: ROUTES.ACCOUNT_LOGS,
        component: lazy(() => import("../pages/AccountLogs")),
      },
    ],
  },
];

export const NonMenuConfig = [
  {
    title: LABELS.MY_INFO,
    path: ROUTES.PROFILE,
    component: lazy(() => import("../pages/Profile")),
  },
  {
    title: LABELS.USER_EDIT,
    path: ROUTES.PROFILE_EDIT,
    component: lazy(() => import("../pages/ProfileEdit")),
  },
  {
    title: LABELS.USER_EDIT,
    path: ROUTES.ACCOUNT_REGISTER,
    component: lazy(() => import("../pages/AccountRegister")),
  },
  {
    title: LABELS.USER_EDIT,
    path: ROUTES.ACCOUNT_EDIT,
    component: lazy(() => import("../pages/AccountEdit")),
  },
  {
    title: LABELS.SUBSCRIBER_MANAGE,
    path: ROUTES.ACCOUNT_MANAGE_EDIT,
    component: lazy(() => import("../pages/SubscriberManageEdit")),
  },
];
