import { lazy } from "react";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { ACCNT_R, PERMISSIONS } from "../constants/Permissions";

export const MenusConfig = [
  {
    title: LABELS.SUBSCRIBER,
    icon: "sb-icon-user",
    items: [
      {
        title: LABELS.SUBSCRIBER_VIEW,
        path: ROUTES.SUBSCRIBERS,
        component: lazy(() => import("../pages/Subscribers")),
        permission: "SUBS_R",
      },
      {
        title: LABELS.SUBSCRIBER_MANAGE,
        path: ROUTES.SUBSCRIBERS_MANAGE,
        component: lazy(() => import("../pages/SubscribersManageEdit")),
        permission: "SUBS_U",
      },
      {
        title: LABELS.SUBSCRIBER_REGISTER,
        path: ROUTES.SUBSCRIBERS_REGISTER,
        component: lazy(() => import("../pages/SubscribersRegister")),
        permission: "SUBS_C",
      },
    ],
  },
  {
    title: LABELS.COUNTRY_NUMBER,
    icon: "sb-icon-data",
    items: [
      {
        title: LABELS.COUNTRY_NUMBER_MANAGE,
        path: ROUTES.LV,
        component: lazy(() => import("../pages/LvManage")),
        permission: "LVNUM_R",
      },
    ],
  },
  {
    title: LABELS.CONTENTS,
    icon: "sb-icon-pop",
    items: [
      {
        title: LABELS.SOUNDS_VIEW,
        path: ROUTES.CONTENTS,
        component: lazy(() => import("../pages/SoundSource")),
        permission: "CONTS_R",
      },
    ],
  },
  {
    title: LABELS.ACCOUNT,
    icon: "sb-icon-system",
    items: [
      {
        title: LABELS.ACCOUNT_MANAGE,
        path: ROUTES.ACCOUNTS,
        component: lazy(() => import("../pages/Accounts")),
        permission: PERMISSIONS.ACCNT_R,
      },
      {
        title: LABELS.HISTORY,
        path: ROUTES.HISTORY,
        component: lazy(() => import("../pages/AccountLogs")),
        permission: PERMISSIONS.ACCNT_R,
      },
    ],
  },
];

export const NonMenuConfig = [
  {
    title: LABELS.MY_INFO,
    path: ROUTES.PROFILE,
    component: lazy(() => import("../pages/ProfileEdit")),
    permission: "MY_R",
  },
  {
    title: LABELS.USER_REGISTER,
    path: ROUTES.ACCOUNT_REGISTER,
    parent: LABELS.ACCOUNT,
    component: lazy(() => import("../pages/AccountRegister")),
    permission: "SUBS_C",
  },
  {
    title: LABELS.USER_EDIT,
    path: ROUTES.ACCOUNT_EDIT,
    parent: LABELS.ACCOUNT,
    component: lazy(() => import("../pages/AccountEdit")),
    permission: ["admin"],
  },
  {
    title: LABELS.SUBSCRIBER_MANAGE,
    path: ROUTES.SUBSCRIBERS_MANAGE,
    parent: LABELS.SUBSCRIBER,
    component: lazy(() => import("../pages/SubscribersManageEdit")),
    permission: ["admin"],
  },
];
