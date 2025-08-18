import React from "react";
import { LABELS } from "../constants/Labels";
import { KEYS } from "../constants/Keys";
import { SUBSRIBERS_STATE } from "./FieldsConfig";
import { AREA_CODES, DAY_TYPE, DAY_TYPE_FULL, SEARCH_SUBSRIBERS_STATE, SERVICE_TYPES } from "./OptionConfig";
import { findMappedValue } from "../utils/Util";

// 음원 조회 컬럼
export const SOUND_SOURCE_COLUMNS = [
  {
    accessorKey: KEYS.RBT_ID,
    header: LABELS.SOUNDS_CODE,
  },
  {
    accessorKey: KEYS.DESCRIPT,
    header: LABELS.TITLE_DESC,
  },
];

export const ACCOUNTS_LOGS_COLUMNS = (func) => {
  return [
    {
      accessorKey: KEYS.ADMIN_ID,
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
      accessorKey: KEYS.ADMIN_TYPE,
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

export const ACCOUNTS_COLUMNS = (func) => {
  return [
    {
      accessorKey: KEYS.ADMIN_ID,
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
}

const ManageButtonCell = React.memo(({ row, onNavigate }) => (
  <button className="sbtn miniK" onClick={() => onNavigate(row.original)}>
    {LABELS.MANAGE}
  </button>
));

export const SUBSRIBES_COLUMNS = (navigateManage) => {
  return [
    {
      accessorKey: KEYS.SUB_NO,
      header: LABELS.MAIN_NUMBER,
    },
    {
      accessorKey: KEYS.USER_NUMBER,
      header: LABELS.USER_NUMBER,
      cell: ({ row }) => (
        <span>
          {row.original[KEYS.TEL_FROM_NO]} ~ {row.original[KEYS.TEL_TO_NO]}
        </span>
      ),
    },
    {
      accessorKey: KEYS.PBX_NUMBER,
      header: LABELS.PBX_NUMBER_COL,
      cell: ({ row }) => (
        <span>
          {row.original[KEYS.FROM_NO]} ~ {row.original[KEYS.TO_NO]}
        </span>
      ),
    },
    {
      accessorKey: KEYS.NAME,
      header: LABELS.SUBSCRIBER_NAME,
    },
    {
      accessorKey: KEYS.APPLY_DATE,
      header: LABELS.APPLY_DATE,
      cell: ({ row }) => (
        <span>
          {row.original[KEYS.APPLY_DATE].split(" ")[0]}
        </span>
      ),
    },
    {
      accessorKey: KEYS.SUB_STATUS,
      header: LABELS.STATE,
      cell: ({ row }) => (
        <div
          className={`${row.original[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[2].key
            ? "stateArert"
            : "stateNormal"
            }`}
        >
          {row.original[KEYS.SUB_STATUS] == SEARCH_SUBSRIBERS_STATE[2].key ? LABELS.SUBSCRIBE : LABELS.REQUESTING}
        </div>
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

export const SUBSRIBES_COLUMNS_USER = [
  {
    accessorKey: KEYS.SUB_NO,
    header: LABELS.MAIN_NUMBER,
  },
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.TEL_FROM_NO]} ~ {row.original[KEYS.TEL_TO_NO]}
      </span>
    ),
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.FROM_NO]} ~ {row.original[KEYS.TO_NO]}
      </span>
    ),
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
      <div
        className={`${row.original[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[1].key
          ? "stateNormal"
          : "stateArert"
          }`}
      >
        {findMappedValue(
          SEARCH_SUBSRIBERS_STATE,
          row.original[KEYS.SUB_STATUS]
        )}
      </div>
    ),
  },
];

export const ACCESS_DETAIL_COLUMNS = [
  {
    accessorKey: KEYS.LOG_TIME,
    header: LABELS.ACCESS_TIME,
  },
  {
    accessorKey: KEYS.LOG_ACTION,
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

export const DID_PERSONAL_SETTING_COLUMNS = [
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER_MULTI,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.TEL_FROM_NO]} ~ <br />
        {row.original[KEYS.TEL_TO_NO]}
      </span>
    ),
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL_MULTI,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.FROM_NO]} ~ <br />
        {row.original[KEYS.TO_NO]}
      </span>
    ),
  },
  {
    accessorKey: KEYS.DEF_RBT_TYPE,
    header: LABELS.SOUND_CODE_COL_MULTI,
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: KEYS.IS_CIRCULR_JOINED,
        header: LABELS.CIRCULATION_RING,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_WEEK_JOINED,
        header: LABELS.DAY_OF_WEEKEND,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_ORGN_JOINED,
        header: LABELS.CALLER_AREA,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_GROUP_JOINED,
        header: LABELS.CALLER_NUMBER,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_DURA_JOINED,
        header: LABELS.ANNIVERSARY,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
    ],
  },
  {
    accessorKey: KEYS.IS_STOPED,
    header: LABELS.INTERRUPT,
    cell: ({ row, getValue }) => (
      <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
    ),
  },
];

export const DID_SETTING_COLUMNS = [
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER_MULTI,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.TEL_FROM_NO]} ~ <br />
        {row.original[KEYS.TEL_TO_NO]}
      </span>
    ),
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL_MULTI,
    cell: ({ row }) => (
      <span>
        {row.original[KEYS.FROM_NO]} ~ <br />
        {row.original[KEYS.TO_NO]}
      </span>
    ),
  },
  {
    accessorKey: KEYS.DEF_RBT_TYPE,
    header: LABELS.SOUND_CODE_COL_MULTI,
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: KEYS.IS_CIRCULR_JOINED,
        header: LABELS.CIRCULATION_RING,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_TIME_JOINED,
        header: LABELS.TIME_SLOT,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_WEEK_JOINED,
        header: LABELS.DAY_OF_WEEKEND,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_ORGN_JOINED,
        header: LABELS.CALLER_AREA,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_GROUP_JOINED,
        header: LABELS.CALLER_NUMBER,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
      {
        accessorKey: KEYS.IS_DURA_JOINED,
        header: LABELS.ANNIVERSARY,
        cell: ({ row, getValue }) => (
          <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
        ),
      },
    ],
  },
  {
    accessorKey: KEYS.IS_STOPED,
    header: LABELS.INTERRUPT,
    cell: ({ row, getValue }) => (
      <span className={!!getValue() ? "cellDidOn" : "cellDidOff"} />
    ),
  },
];

export const DID_CONFIG_DATAS = [
  {
    key: KEYS.IS_CIRCULR_JOINED,
    title: LABELS.CIRCULAR,
    max: 5,
    dataKey: KEYS.CIRCULARS_DATA_KEY,
    forms: [{ key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID }],
    columns: [
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
    ],
    permission: [SERVICE_TYPES[0].value, SERVICE_TYPES[2].value]
  },
  {
    key: KEYS.IS_TIME_JOINED,
    title: LABELS.BY_TIME_ZONE,
    max: 35,
    dataKey: KEYS.TIMES_DATA_KEY,
    forms: [
      {
        key: KEYS.DAY_TYPE,
        type: "select",
        placeholder: LABELS.DAY_TYPE,
        Options: DAY_TYPE_FULL,
      },
      {
        key: "time",
        fields: [
          {
            key: KEYS.S_TIME,
            type: "time",
          },
          {
            key: KEYS.E_TIME,
            type: "time",
          },
        ],
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
    columns: [
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
      {
        accessorKey: KEYS.DAY_TYPE,
        header: LABELS.DAY_TYPE,
        cell: ({ getValue }) => {
          const value = getValue();
          return findMappedValue(DAY_TYPE, value);
        },
      },
      {
        accessorKey: KEYS.TIMES_DATA_KEY,
        header: LABELS.TIME,
        cell: ({ row }) => {
          if (!row.original._isNew) {
            return (
              <span>
                {row.original[KEYS.S_TIME]} ~ {row.original[KEYS.E_TIME]}
              </span>
            );
          }
        },
      },
    ],
    permission: [SERVICE_TYPES[2].value]
  },
  {
    key: KEYS.IS_WEEK_JOINED,
    title: LABELS.BY_DAY,
    max: 7,
    dataKey: KEYS.WEEKS_DATA_KEY,
    forms: [
      {
        key: KEYS.DAY_TYPE,
        type: "select",
        placeholder: LABELS.DAY_TYPE,
        Options: DAY_TYPE,
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
    columns: [
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
      {
        accessorKey: KEYS.DAY_TYPE,
        header: LABELS.DAY_TYPE,
        cell: ({ getValue }) => {
          const value = getValue();
          return findMappedValue(DAY_TYPE, value);
        },
      },
    ],
    permission: [SERVICE_TYPES[0].value, SERVICE_TYPES[2].value]
  },
  {
    key: KEYS.IS_ORGN_JOINED,
    title: LABELS.BY_SENDING_AREA,
    max: 17,
    dataKey: KEYS.ORGNS_DATA_KEY,
    forms: [
      {
        key: KEYS.ORGN,
        type: "select",
        placeholder: LABELS.ORGN,
        Options: AREA_CODES,
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
    columns: [
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
      {
        accessorKey: KEYS.ORGN,
        header: LABELS.ORGN,
        cell: ({ getValue }) => {
          const value = getValue();
          return findMappedValue(AREA_CODES, value);
        },
      },
    ],
    permission: [SERVICE_TYPES[0].value, SERVICE_TYPES[2].value]
  },
  {
    key: KEYS.IS_GROUP_JOINED,
    title: LABELS.BY_CALLER_NUMBER,
    max: 3,
    dataKey: KEYS.GROUPS_DATA_KEY,
    forms: [
      {
        label: LABELS.DID_CALLING_PLACEHOLDER,
        key: KEYS.CALLING_NUMBER,
        type: "textarea",
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
    columns: [
      {
        accessorKey: KEYS.GROUP_ID,
        header: LABELS.GROUP,
      },
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
      {
        accessorKey: KEYS.CALLING_NUMBER,
        header: LABELS.CALLING_NUMBER,
      },
    ],
    permission: [SERVICE_TYPES[0].value, SERVICE_TYPES[2].value]
  },
  {
    key: KEYS.IS_DURA_JOINED,
    title: LABELS.BY_ANNIVERSARY,
    max: 50,
    dataKey: KEYS.DURAS_DATA_KEY,
    forms: [
      {
        key: "date",
        fields: [
          {
            key: KEYS.S_DATE,
            type: "date",
          },
          {
            key: KEYS.E_DATE,
            type: "date",
          },
        ],
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
    columns: [
      {
        accessorKey: KEYS.RBT_ID,
        header: LABELS.SOUNDS_CODE,
      },
      {
        accessorKey: KEYS.ANNIVERSARY,
        header: LABELS.ANNIVERSARY,
        cell: ({ row }) => {
          if (!row.original._isNew) {
            return (
              <span>
                {row.original[KEYS.S_DATE]} ~ {row.original[KEYS.E_DATE]}
              </span>
            );
          }
        },
      },
    ],
    permission: [SERVICE_TYPES[0].value, SERVICE_TYPES[2].value]
  },
];

export const EMPTY_DID_DATA = {
  circulars: [],
  times: [],
  weeks: [],
  orgns: [],
  groups: [],
  duras: [],
};
