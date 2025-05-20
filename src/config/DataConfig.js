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

export const HISTORY_columns = (func) => {
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
      accessorKey: KEYS.IP,
      header: LABELS.ACCESS_IP,
    },
  ];
};

export const HISTORY_data = [
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
    accessorKey: KEYS.ADMIN_TYPE,
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
  <button className="sbtn miniK" onClick={() => onNavigate(row.original)}>
    {LABELS.MANAGE}
  </button>
));

export const subscribe_columns = (navigateManage) => {
  return [
    {
      accessorKey: KEYS.SUB_NO,
      header: LABELS.MAIN_NUMBER,
    },
    {
      accessorKey: KEYS.USER_NUMBER,
      header: LABELS.USER_NUMBER,
    },
    {
      accessorKey: KEYS.PBX_NUMBER,
      header: LABELS.PBX_NUMBER_COL,
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
      accessorKey: KEYS.SUB_STATUS,
      header: LABELS.STATE,
      cell: ({ row }) => (
        <div className="stateArert">{row.original[KEYS.SUB_STATUS]}</div>
      ),
    },
    {
      accessorKey: KEYS.MANAGE,
      header: LABELS.SUBSCRIBER_MANAGE,
      cell: ({ row }) => (
        <ManageButtonCell row={row} onNavigate={navigateManage} />
      ),
    },
  ];
};

export const subscribe_data = [
  {
    [KEYS.ID]: 1,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "요청",
  },
  {
    [KEYS.ID]: 2,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "요청",
  },
  {
    [KEYS.ID]: 3,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 4,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 5,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 6,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 7,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 8,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
  },
  {
    [KEYS.ID]: 9,
    [KEYS.SUB_NO]: "0211112222",
    [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
    [KEYS.NAME]: "LGU+",
    [KEYS.APPLY_DATE]: "2024.02.04",
    [KEYS.SUB_STATUS]: "가입",
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
    accessorKey: KEYS.RBT_ID,
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
    [KEYS.RBT_ID]: "599145",
    [KEYS.SOUND_CODE]: "사랑을 했다",
  },

  {
    [KEYS.ID]: 11,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112244",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112244",
    [KEYS.RBT_ID]: "1111211",
    [KEYS.SOUND_CODE]: "아파트",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
  {
    [KEYS.ID]: 112,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112255",
    [KEYS.RBT_ID]: "323232",
    [KEYS.SOUND_CODE]: "네모의 꿈",
  },
];

export const circularsInfo = {
  title: LABELS.CIRCULAR,
  max: 5,
  forms: [{ key: "soundCode", type: "number", placeholder: "음원코드" }],
  columns: [
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
  ],
  data: [
    { [KEYS.RBT_ID]: "11111" },
    { [KEYS.RBT_ID]: "12345" },
    { [KEYS.RBT_ID]: "22222" },
    { [KEYS.RBT_ID]: "44444" },
  ],
};

export const times = {
  title: LABELS.BY_TIME_ZONE,
  max: 35,
  forms: [
    {
      key: "dayType",
      type: "select",
      placeholder: "요일",
      options: [
        { key: "1", value: "월" },
        { key: "2", value: "화" },
        { key: "3", value: "수" },
        { key: "4", value: "목" },
        { key: "5", value: "금" },
        { key: "6", value: "토" },
        { key: "0", value: "일" },
      ],
    },
    {
      key: "time",
      fields: [
        {
          key: "startTime",
          type: "time",
        },
        {
          key: "endTime",
          type: "time",
        },
      ],
    },
    { key: "soundCode", type: "number", placeholder: "음원코드" },
  ],
  columns: [
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
    {
      accessorKey: "dayType",
      header: "요일",
    },
    {
      accessorKey: "startTime",
      header: "시작시간",
    },
    {
      accessorKey: "endTime",
      header: "종료시간",
    },
  ],
  data: [
    {
      [KEYS.RBT_ID]: "11111",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "12345",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "22222",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "44444",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "33333",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "24343",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "65456",
      startTime: "0800",
      endTime: "1100",
      dayType: "월",
    },
  ],
};

export const weeks = {
  title: LABELS.BY_DAY,
  max: 7,
  forms: [
    {
      key: "dayType",
      type: "select",
      placeholder: "요일",
      options: [
        { key: "1", value: "월" },
        { key: "2", value: "화" },
        { key: "3", value: "수" },
        { key: "4", value: "목" },
        { key: "5", value: "금" },
        { key: "6", value: "토" },
        { key: "0", value: "일" },
      ],
    },
    { key: "soundCode", type: "number", placeholder: "음원코드" },
  ],
  columns: [
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
    {
      accessorKey: "dayType",
      header: "요일",
    },
  ],
  data: [
    {
      [KEYS.RBT_ID]: "11111",
      dayType: "월",
    },
    {
      [KEYS.RBT_ID]: "12345",
      dayType: "월",
    },
  ],
};

export const orgns = {
  title: LABELS.BY_SENDING_AREA,
  max: 17,
  forms: [
    {
      key: "areaCode",
      type: "select",
      placeholder: "지역",
      options: [
        { key: "02", value: "서울" },
        { key: "031", value: "경기" },
        { key: "052", value: "대구" },
      ],
    },
    { key: "soundCode", type: "number", placeholder: "음원코드" },
  ],
  columns: [
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
    {
      accessorKey: "areaCode",
      header: "지역",
    },
  ],
  data: [
    {
      [KEYS.RBT_ID]: "11111",
      areaCode: "02(서울)",
    },
    {
      [KEYS.RBT_ID]: "12345",
      areaCode: "031(경기)",
    },
  ],
};

export const groups = {
  title: LABELS.BY_CALLER_NUMBER,
  max: 3,
  forms: [
    { label: "발신번호(','구분, 최대 5개)", key: "numbers", type: "textarea" },
    { key: "soundCode", type: "number", placeholder: "음원코드" },
  ],
  columns: [
    {
      accessorKey: "groupId",
      header: "그룹",
    },
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
    {
      accessorKey: "numbers",
      header: "발신번호",
    },
  ],
  data: [
    {
      groupId: "그룹1",
      [KEYS.RBT_ID]: "11111",
      numbers: "01012344444\n01033334444\n01099998888",
    },
    {
      groupId: "그룹2",
      [KEYS.RBT_ID]: "12345",
      numbers: "01012344444\n01033334444\n01099998888",
    },
  ],
};

export const duras = {
  title: LABELS.BY_ANNIVERSARY,
  max: 50,
  forms: [
    {
      key: "date",
      fields: [
        {
          key: "startDate",
          type: "date",
        },
        {
          key: "endDate",
          type: "date",
        },
      ],
    },
    { key: "soundCode", type: "number", placeholder: "음원코드" },
  ],
  columns: [
    {
      accessorKey: KEYS.RBT_ID,
      header: LABELS.SOUNDS_CODE,
    },
    {
      accessorKey: "startDate",
      header: "시작일",
    },
    {
      accessorKey: "endDate",
      header: "종료일",
    },
  ],
  data: [
    {
      [KEYS.RBT_ID]: "11111",
      startDate: "20250501",
      endDate: "20250501",
    },
    {
      [KEYS.RBT_ID]: "22222",
      startDate: "20250501",
      endDate: "20250501",
    },
    {
      [KEYS.RBT_ID]: "33333",
      startDate: "20250501",
      endDate: "20250501",
    },
    {
      [KEYS.RBT_ID]: "44444",
      startDate: "20250501",
      endDate: "20250501",
    },
    {
      [KEYS.RBT_ID]: "55555",
      startDate: "20250501",
      endDate: "20250501",
    },
  ],
};

export const did_personal_setting_columns = [
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER_MULTI,
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL_MULTI,
  },
  {
    accessorKey: KEYS.RBT_ID,
    header: LABELS.SOUND_CODE_COL_MULTI,
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: KEYS.GERNERAL_PERMISSIONS,
        header: LABELS.GERNERAL_PERMISSIONS,
        type: "checkbox",
      },
      {
        accessorKey: KEYS.DEPARTMENT_PERMISSIONS,
        header: LABELS.DEPARTMENT_PERMISSIONS,
        type: "checkbox",
      },
      {
        accessorKey: KEYS.MODIFY,
        header: LABELS.MODIFY,
        type: "checkbox",
      },
    ],
  },
];

export const did_personal_setting_data = [
  {
    [KEYS.ID]: 1,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.RBT_ID]: "599145",
    [KEYS.SOUND_CODE]: "사랑을 했다",
    [KEYS.GERNERAL_PERMISSIONS]: true,
    [KEYS.DEPARTMENT_PERMISSIONS]: false,
    [KEYS.MODIFY]: false,
  },
];
