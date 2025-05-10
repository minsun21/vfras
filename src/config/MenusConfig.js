import { lazy } from "react";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { FaRegUser, FaRegListAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";

export const MenusConfig = [
  {
    title: LABELS.SUBSCRIBER,
    icon: <FaRegUser />,
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
    icon: <FaRegListAlt />,
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
    icon: <MdContentCopy />,
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
    icon: <CiSettings />,
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
    title: LABELS.MY_INFO,
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
