import React from "react";
import Button from "../components/Button";
import { LABELS } from "../constants/Labels";
import { KEYS } from "../constants/Keys";

export const sounds_source_columns = [
  {
    accessorKey: KEYS.CODE,
    header: LABELS.SOUNDS_CODE,
  },
  {
    accessorKey: KEYS.TITLE,
    header: LABELS.TITLE_DESC,
  },
];
export const sounds_source_data = [
  {
    [KEYS.CODE]: 3820472,
    [KEYS.TITLE]: "편지",
  },
  {
    [KEYS.CODE]: 1234523,
    [KEYS.TITLE]: "모르시나요",
  },
  {
    [KEYS.CODE]: 3457435,
    [KEYS.TITLE]: "가끔 니가 생각나",
  },
  {
    [KEYS.CODE]: 2653455,
    [KEYS.TITLE]: "Period",
  },
  {
    [KEYS.CODE]: 2477854,
    [KEYS.TITLE]: "Again",
  },
  {
    [KEYS.CODE]: 6799556,
    [KEYS.TITLE]: "화",
  },
  {
    [KEYS.CODE]: 8576833,
    [KEYS.TITLE]: "슈퍼노바",
  },
  {
    [KEYS.CODE]: 5799336,
    [KEYS.TITLE]: "레블하트",
  },
  {
    [KEYS.CODE]: 583594,
    [KEYS.TITLE]: "Forever",
  },
  {
    [KEYS.CODE]: 16690345,
    [KEYS.TITLE]: "Like Water",
  },
];

export const account_logs_columns = (func) => {
  return [
    {
      accessorKey: "id",
      header: LABELS.ID,
      clickable: ({ row }) => func(row.original),
    },
    {
      accessorKey: "name",
      header: LABELS.NAME,
    },
    {
      accessorKey: "department",
      header: LABELS.DEPARTMENT,
    },
    {
      accessorKey: "userType",
      header: LABELS.CLASSIFICATION,
    },
    {
      accessorKey: "accessTime",
      header: LABELS.ACCESS_TIME,
    },
    {
      accessorKey: "lastAccessTime",
      header: LABELS.LAST_ACCESS_TIME,
    },
  ];
};

export const account_logs_data = [
  {
    id: "admin",
    name: "관리자",
    department: "-",
    userType: "Admin",
    accessTime: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.04 11:23:27",
  },
  {
    id: "cwback",
    name: "백창우",
    department: "고객만족팀",
    userType: "User",
    accessTime: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.01 09:12:35",
  },
  {
    id: "wooseok",
    name: "주우석",
    department: "고객만족팀",
    userType: "User",
    accessTime: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.02 12:03:04",
  },
  {
    id: "hong",
    name: "홍길동",
    department: "고객만족팀",
    userType: "User",
    accessTime: "2024.04.23 10:55:45",
    lastAccessTime: "2024.04.23 11:55:01",
  },
  {
    id: "kim",
    name: "김철수",
    department: "고객만족팀",
    userType: "User",
    accessTime: "2024.04.29 01:24:35",
    lastAccessTime: "2024.04.30 05:13:09",
  },
];

export const account_manage_columns = [
  {
    accessorKey: "id",
    header: LABELS.ID,
  },
  {
    accessorKey: "name",
    header: LABELS.NAME,
  },
  {
    accessorKey: "department",
    header: LABELS.DEPARTMENT,
  },
  {
    accessorKey: "userType",
    header: LABELS.CLASSIFICATION,
  },
  {
    accessorKey: "createdAt",
    header: LABELS.CREATED_AT,
  },
  {
    accessorKey: "lastAccessTime",
    header: LABELS.LAST_ACCESS_TIME,
  },
];

export const account_manage_data = [
  {
    id: "admin",
    name: "관리자",
    department: "-",
    userType: "Admin",
    createdAt: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.04 11:23:27",
  },
  {
    id: "cwback",
    name: "백창우",
    department: "고객만족팀",
    userType: "User",
    createdAt: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.01 09:12:35",
  },
  {
    id: "wooseok",
    name: "주우석",
    department: "고객만족팀",
    userType: "User",
    createdAt: "2024.02.04 11:23:37",
    lastAccessTime: "2024.02.02 12:03:04",
  },
  {
    id: "hong",
    name: "홍길동",
    department: "고객만족팀",
    userType: "User",
    createdAt: "2024.04.23 10:55:45",
    lastAccessTime: "2024.04.23 11:55:01",
  },
  {
    id: "kim",
    name: "김철수",
    department: "고객만족팀",
    userType: "User",
    createdAt: "2024.04.29 01:24:35",
    lastAccessTime: "2024.04.30 05:13:09",
  },
];

const ManageButtonCell = React.memo(({ row, onNavigate }) => (
  <Button
    label={LABELS.SUBSCRIBER_MANAGE}
    onClick={() => onNavigate(row.original)}
  />
));

export const subscribe_columns = (navigateManage) => {
  return [
    {
      accessorKey: "mainNumber",
      header: LABELS.MAIN_NUMBER,
    },
    {
      accessorKey: "userNumber",
      header: LABELS.USER_NUMBER_MULTI,
    },
    {
      accessorKey: "pbxNumber",
      header: LABELS.PBX_NUMBER_COL_MULTI,
    },
    {
      accessorKey: "name",
      header: LABELS.SUBSCRIBER_NAME,
    },
    {
      accessorKey: "applyDate",
      header: LABELS.APPLY_DATE,
    },
    {
      accessorKey: "status",
      header: LABELS.STATE,
      cell: ({ row }) => <div className="col-status">{row.original.state}</div>,
    },
    {
      accessorKey: "manage",
      header: "",
      cell: ({ row }) => (
        <ManageButtonCell row={row} onNavigate={navigateManage} />
      ),
    },
  ];
};

export const subscribe_data = [
  {
    id: 1,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "요청중",
  },
  {
    id: 2,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "요청중",
  },
  {
    id: 3,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 4,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 5,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 6,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 7,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 8,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 9,
    mainNumber: "0211112222",
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
];

export const access_detail_columns = [
  {
    accessorKey: "accessTime",
    header: LABELS.ACCESS_TIME,
  },
  {
    accessorKey: "content",
    header: LABELS.CONTENT,
  },
];

export const access_detail_data = [
  {
    accessTime: "2024.02.04\n11:23:37",
    content: "로그인",
  },
  {
    accessTime: "2024.02.04\n11:23:37",
    content: "가입자 조회",
  },
  {
    accessTime: "2024.02.04\n11:23:37",
    content: "음원 조회",
  },
];

export const did_setting_columns = [
  {
    accessorKey: "userNumber",
    header: LABELS.USER_NUMBER_MULTI,
  },
  {
    accessorKey: "pbxNumber",
    header: LABELS.PBX_NUMBER_COL_MULTI,
  },
  {
    accessorKey: "soundCode",
    header: LABELS.SOUND_CODE_COL_MULTI,
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: "orderAmount",
        header: LABELS.CIRCULATION_RING,
      },
      {
        accessorKey: "orderAmount",
        header: LABELS.TIME_SLOT,
      },
      {
        accessorKey: "orderAmount",
        header: LABELS.DAY_OF_WEEKEND,
      },
      {
        accessorKey: "orderAmount",
        header: LABELS.CALLER_AREA,
      },
      {
        accessorKey: "orderAmount",
        header: LABELS.CALLER_NUMBER,
      },
      {
        accessorKey: "orderAmount",
        header: LABELS.ANNIVERSARY,
      },
    ],
  },
];


export const did_setting_data = [
  {
    userNumber: "02111112222\n~\n0211112233",
    pbxNumber: "02111112222\n~\n0211112233",
    soundCode : "599145"
  },
];
