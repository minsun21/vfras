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
      accessorKey: KEYS.ID,
      header: LABELS.ID,
      clickable: ({ row }) => func(row.original),
    },
    {
      accessorKey: KEYS.NAME,
      header: LABELS.NAME,
    },
    {
      accessorKey: KEYS.DEPARTMENT,
      header: LABELS.DEPARTMENT,
    },
    {
      accessorKey: KEYS.USER_TYPE,
      header: LABELS.CLASSIFICATION,
    },
    {
      accessorKey: KEYS.ACCESS_TIME,
      header: LABELS.ACCESS_TIME,
    },
    {
      accessorKey: KEYS.LAST_ACCESS_TIME,
      header: LABELS.LAST_ACCESS_TIME,
    },
  ];
};

export const account_logs_data = [
  {
    [KEYS.ID]: "admin",
    [KEYS.NAME]: "관리자",
    [KEYS.DEPARTMENT]: "-",
    [KEYS.USER_TYPE]: "Admin",
    [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.04 11:23:27",
  },
  {
    [KEYS.ID]: "cwback",
    [KEYS.NAME]: "백창우",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.01 09:12:35",
  },
  {
    [KEYS.ID]: "wooseok",
    [KEYS.NAME]: "주우석",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.ACCESS_TIME]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.02 12:03:04",
  },
  {
    [KEYS.ID]: "hong",
    [KEYS.NAME]: "홍길동",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.ACCESS_TIME]: "2024.04.23 10:55:45",
    [KEYS.LAST_ACCESS_TIME]: "2024.04.23 11:55:01",
  },
  {
    [KEYS.ID]: "kim",
    [KEYS.NAME]: "김철수",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.ACCESS_TIME]: "2024.04.29 01:24:35",
    [KEYS.LAST_ACCESS_TIME]: "2024.04.30 05:13:09",
  },
];

export const account_manage_columns = [
  {
    accessorKey: KEYS.ID,
    header: LABELS.ID,
  },
  {
    accessorKey: KEYS.NAME,
    header: LABELS.NAME,
  },
  {
    accessorKey: KEYS.DEPARTMENT,
    header: LABELS.DEPARTMENT,
  },
  {
    accessorKey: KEYS.USER_TYPE,
    header: LABELS.CLASSIFICATION,
  },
  {
    accessorKey: KEYS.CREATED_AT,
    header: LABELS.CREATED_AT,
  },
  {
    accessorKey: KEYS.LAST_ACCESS_TIME,
    header: LABELS.LAST_ACCESS_TIME,
  },
];

export const account_manage_data = [
  {
    [KEYS.ID]: "admin",
    [KEYS.NAME]: "관리자",
    [KEYS.DEPARTMENT]: "-",
    [KEYS.USER_TYPE]: "Admin",
    [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.04 11:23:27",
  },
  {
    [KEYS.ID]: "cwback",
    [KEYS.NAME]: "백창우",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.01 09:12:35",
  },
  {
    [KEYS.ID]: "wooseok",
    [KEYS.NAME]: "주우석",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.CREATED_AT]: "2024.02.04 11:23:37",
    [KEYS.LAST_ACCESS_TIME]: "2024.02.02 12:03:04",
  },
  {
    [KEYS.ID]: "hong",
    [KEYS.NAME]: "홍길동",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.CREATED_AT]: "2024.04.23 10:55:45",
    [KEYS.LAST_ACCESS_TIME]: "2024.04.23 11:55:01",
  },
  {
    [KEYS.ID]: "kim",
    [KEYS.NAME]: "김철수",
    [KEYS.DEPARTMENT]: "고객만족팀",
    [KEYS.USER_TYPE]: "User",
    [KEYS.CREATED_AT]: "2024.04.29 01:24:35",
    [KEYS.LAST_ACCESS_TIME]: "2024.04.30 05:13:09",
  },
];

const ManageButtonCell = React.memo(({ row, onNavigate }) => (
  <div className="col-management" onClick={() => onNavigate(row.original)}>{LABELS.SUBSCRIBER_MANAGE}</div>
));

export const subscribe_columns = (navigateManage) => {
  return [
    {
      accessorKey: KEYS.MAIN_NUMBER,
      header: LABELS.MAIN_NUMBER,
    },
    {
      accessorKey: KEYS.USER_NUMBER,
      header: LABELS.USER_NUMBER_MULTI,
    },
    {
      accessorKey: KEYS.PBX_NUMBER,
      header: LABELS.PBX_NUMBER_COL_MULTI,
    },
    {
      accessorKey: KEYS.NAME,
      header: LABELS.SUBSCRIBER_NAME,
    },
    {
      accessorKey: KEYS.APPLY_DATE,
      header: LABELS.APPLY_DATE,
    },
    {
      accessorKey: KEYS.STATE,
      header: LABELS.STATE,
      cell: ({ row }) => <div className="col-status">{row.original.state}</div>,
    },
    {
      accessorKey: KEYS.MANAGE,
      header: "",
      cell: ({ row }) => (
        <ManageButtonCell row={row} onNavigate={navigateManage} />
      ),
    },
  ];
};

export const subscribe_data = [
  {
    [KEYS.ID]: 1,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "요청중",
  },
  {
    [KEYS.ID]: 2,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "요청중",
  },
  {
    [KEYS.ID]: 3,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 4,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 5,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 6,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 7,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 8,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.MAIN_NUMBER]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.MANAGE]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.STATE]: "가입",
  },
];

export const access_detail_columns = [
  {
    accessorKey: KEYS.ACCESS_TIME,
    header: LABELS.ACCESS_TIME,
  },
  {
    accessorKey: KEYS.CONTENT,
    header: LABELS.CONTENT,
  },
];

export const access_detail_data = [
  {
    [KEYS.ACCESS_TIME]: "2024.02.04\n11:23:37",
    [KEYS.CONTENT]: "로그인",
  },
  {
    [KEYS.ACCESS_TIME]: "2024.02.04\n11:23:37",
    [KEYS.CONTENT]: "가입자 조회",
  },
  {
    [KEYS.ACCESS_TIME]: "2024.02.04\n11:23:37",
    [KEYS.CONTENT]: "음원 조회",
  },
];

export const did_setting_columns = [
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER_MULTI,
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL_MULTI,
  },
  {
    accessorKey: KEYS.SOUND_CODE,
    header: LABELS.SOUND_CODE_COL_MULTI,
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: KEYS.CIRCULATION_RING,
        header: LABELS.CIRCULATION_RING,
      },
      {
        accessorKey: KEYS.TIME_SLOT,
        header: LABELS.TIME_SLOT,
      },
      {
        accessorKey: KEYS.DAY_OF_WEEKEND,
        header: LABELS.DAY_OF_WEEKEND,
      },
      {
        accessorKey: KEYS.CALLER_AREA,
        header: LABELS.CALLER_AREA,
      },
      {
        accessorKey: KEYS.CALLER_NUMBER,
        header: LABELS.CALLER_NUMBER,
      },
      {
        accessorKey: KEYS.ANNIVERSARY,
        header: LABELS.ANNIVERSARY,
      },
    ],
  },
];

export const did_setting_data = [
  {
    [KEYS.ID]: 1,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.SOUND_CODE]: "599145",
  },

  {
    [KEYS.ID]: 11,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.SOUND_CODE]: "599145",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.SOUND_CODE]: "599145",
  },
];
