import React from "react";
import { LABELS } from "../constants/Labels";
import { KEYS } from "../constants/Keys";
import { SUBSRIBERS_STATE } from "./FieldsConfig";
import { DAY_TYPE, ORGNS, SEARCH_SUBSRIBERS_STATE } from "./OPTIONS";
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

export const ACCOUNTS_COLUMNS = [
  {
    accessorKey: KEYS.ADMIN_ID,
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
      cell: ({ row }) => {
        if (!row.original._isNew) {
          return (
            <span>
              {row.original[KEYS.TEL_FROM_NO]} ~ {row.original[KEYS.TEL_TO_NO]}
            </span>
          );
        }
      },
    },
    {
      accessorKey: KEYS.PBX_NUMBER,
      header: LABELS.PBX_NUMBER_COL,
      cell: ({ row }) => {
        if (!row.original._isNew) {
          return (
            <span>
              {row.original[KEYS.FROM_NO]} ~ {row.original[KEYS.TO_NO]}
            </span>
          );
        }
      },
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
          className={`${
            row.original[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[1].key
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
    {
      accessorKey: KEYS.MANAGE,
      header: LABELS.SUBSCRIBER_MANAGE,
      cell: ({ row }) => (
        <ManageButtonCell row={row} onNavigate={navigateManage} />
      ),
    },
  ];
};

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

export const DID_SETTING_COLUMNS = (handleInputChange) => [
  {
    accessorKey: KEYS.USER_NUMBER,
    header: LABELS.USER_NUMBER_MULTI,
    cell: ({ row }) => {
      if (!row.original._isNew) {
        return (
          <span>
            {row.original[KEYS.TEL_FROM_NO]} ~ {row.original[KEYS.TEL_TO_NO]}
          </span>
        );
      }

      return (
        <>
          <input
            type="number"
            value={row.original[KEYS.TEL_FROM_NO]}
            onChange={(e) => {
              e.stopPropagation();
              handleInputChange?.(row.index, KEYS.TEL_FROM_NO, e.target.value);
            }}
          />
          &nbsp;~&nbsp;
          <input
            type="number"
            value={row.original[KEYS.TEL_TO_NO]}
            onChange={(e) => {
              e.stopPropagation();
              handleInputChange?.(row.index, KEYS.TEL_TO_NO, e.target.value);
            }}
          />
        </>
      );
    },
  },
  {
    accessorKey: KEYS.PBX_NUMBER,
    header: LABELS.PBX_NUMBER_COL_MULTI,
    cell: ({ row }) => {
      if (!row.original._isNew) {
        return (
          <span>
            {row.original[KEYS.FROM_NO]} ~ {row.original[KEYS.TO_NO]}
          </span>
        );
      }

      return (
        <>
          <input
            type="number"
            value={row.original[KEYS.FROM_NO]}
            onChange={(e) => {
              e.stopPropagation();
              handleInputChange?.(row.index, KEYS.FROM_NO, e.target.value);
            }}
          />
          &nbsp;~&nbsp;
          <input
            type="number"
            value={row.original[KEYS.TO_NO]}
            onChange={(e) => {
              e.stopPropagation();
              handleInputChange?.(row.index, KEYS.TO_NO, e.target.value);
            }}
          />
        </>
      );
    },
  },
  {
    accessorKey: KEYS.RBT_ID,
    header: LABELS.SOUND_CODE_COL_MULTI,
    cell: ({ row }) => {
      if (!row.original._isNew) {
        return <span>{row.original[KEYS.RBT_ID]}</span>;
      }

      return (
        <input
          type="number"
          value={row.original[KEYS.RBT_ID]}
          onChange={(e) => {
            e.stopPropagation();
            handleInputChange(row.index, KEYS.RBT_ID, e.target.value);
          }}
        />
      );
    },
  },
  {
    header: LABELS.IS_ADDITIONAL_SERVICE,
    columns: [
      {
        accessorKey: KEYS.IS_INTERRUPT,
        header: LABELS.INTERRUPT,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_CIRCULR_JOINED,
        header: LABELS.CIRCULATION_RING,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_TIME_JOINED,
        header: LABELS.TIME_SLOT,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_WEEK_JOINED,
        header: LABELS.DAY_OF_WEEKEND,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_ORGN_JOINED,
        header: LABELS.CALLER_AREA,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_GROUP_JOINED,
        header: LABELS.CALLER_NUMBER,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
      {
        accessorKey: KEYS.IS_DURA_JOINED,
        header: LABELS.ANNIVERSARY,
        cell: ({ row, getValue }) => (
          <input type="checkbox" checked={!!getValue()} disabled readOnly />
        ),
      },
    ],
  },
];

export const DID_CONFIG_DATAS = [
  {
    key: KEYS.IS_INTERRUPT,
    title: LABELS.INTERRUPT,
    dataKey: KEYS.IS_INTERRUPT,
    forms: [
      {
        key: "date",
        fields: [
          {
            key: KEYS.START_DATE,
            type: "date",
          },
          {
            key: KEYS.END_DATE,
            type: "date",
          },
        ],
      },
      { key: KEYS.RBT_ID, type: "number", placeholder: LABELS.RBT_ID },
    ],
  },
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
        options: DAY_TYPE,
      },
      {
        key: "time",
        fields: [
          {
            key: KEYS.START_TIME,
            type: "time",
          },
          {
            key: KEYS.END_TIME,
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
                {row.original[KEYS.START_TIME]} ~ {row.original[KEYS.END_TIME]}
              </span>
            );
          }
        },
      },
    ],
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
        options: DAY_TYPE,
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
        options: ORGNS,
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
          return findMappedValue(ORGNS, value);
        },
      },
    ],
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
            key: KEYS.START_DATE,
            type: "date",
          },
          {
            key: KEYS.END_DATE,
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
                {row.original[KEYS.START_DATE]} ~ {row.original[KEYS.END_DATE]}
              </span>
            );
          }
        },
      },
    ],
  },
];

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
    [KEYS.ADMIN_ID]: 1,
    [KEYS.USER_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.PBX_NUMBER]: "02111112222\n~\n0211112233",
    [KEYS.RBT_ID]: "599145",
    [KEYS.RBT_ID_VALUE]: "사랑을 했다",
    [KEYS.GERNERAL_PERMISSIONS]: true,
    [KEYS.DEPARTMENT_PERMISSIONS]: false,
    [KEYS.MODIFY]: false,
  },
];

export const SUBSRIBERS_INFO_DUMMY = {
  [KEYS.SUB_NO]: "0211112222",
  [KEYS.SUB_STATUS]: SUBSRIBERS_STATE[1].key,
  [KEYS.SUB_TYPE]: "법인",
  [KEYS.SERVICE_TYPE]: "기업",
  [KEYS.NAME]: "홍길동",
  [KEYS.PASSWORD]: "0505",
  [KEYS.ADDRESS1]: "서울시 강남구",
  [KEYS.ADDRESS2]: "",
  [KEYS.FROM_NO]: "0240050045",
  [KEYS.TO_NO]: "0240050111",
  [KEYS.TEL_FROM_NO]: "0240050045",
  [KEYS.TEL_TO_NO]: "0240054232",
  [KEYS.RBT_ID]: "050125",
  [KEYS.RBT_ID_VALUE]: "사랑을 했다",
  did_personal: [
    {
      [KEYS.ADMIN_ID]: 1,
      [KEYS.TEL_FROM_NO]: "02111629222",
      [KEYS.TEL_TO_NO]: "02111756222",
      [KEYS.FROM_NO]: "02110762222",
      [KEYS.TO_NO]: "02111935222",
      [KEYS.RBT_ID]: "599145",
      [KEYS.RBT_ID_VALUE]: "사랑을 했다",
      [KEYS.GERNERAL_PERMISSIONS]: true,
      [KEYS.DEPARTMENT_PERMISSIONS]: false,
      [KEYS.MODIFY]: false,
    },
  ],
  [KEYS.DID_CONFIG]: [
    {
      [KEYS.ID]: 1222,
      [KEYS.ADMIN_ID]: 1,
      [KEYS.TEL_FROM_NO]: "02111112222",
      [KEYS.TEL_TO_NO]: "02111112222",
      [KEYS.FROM_NO]: "02111112222",
      [KEYS.TO_NO]: "02111112222",
      [KEYS.RBT_ID]: "599145",
      [KEYS.RBT_ID_VALUE]: "사랑을 했다",
      [KEYS.IS_INTERRUPT]: true,
      [KEYS.IS_CIRCULR_JOINED]: true,
      [KEYS.IS_WEEK_JOINED]: true,
      [KEYS.IS_TIME_JOINED]: false,
      [KEYS.IS_ORGN_JOINED]: false,
      [KEYS.IS_GROUP_JOINED]: true,
      [KEYS.IS_DURA_JOINED]: false,
    },
    {
      [KEYS.ID]: 28,
      [KEYS.ADMIN_ID]: 11,
      [KEYS.TEL_FROM_NO]: "02111112222",
      [KEYS.TEL_TO_NO]: "02111112222",
      [KEYS.FROM_NO]: "02111112222",
      [KEYS.TO_NO]: "02111112222",
      [KEYS.RBT_ID]: "1111211",
      [KEYS.RBT_ID_VALUE]: "아파트",
      [KEYS.IS_INTERRUPT]: true,
      [KEYS.IS_CIRCULR_JOINED]: false,
      [KEYS.IS_WEEK_JOINED]: false,
      [KEYS.IS_TIME_JOINED]: false,
      [KEYS.IS_ORGN_JOINED]: false,
      [KEYS.IS_GROUP_JOINED]: true,
      [KEYS.IS_DURA_JOINED]: false,
    },
    {
      [KEYS.ID]: 27,
      [KEYS.ADMIN_ID]: 112,
      [KEYS.TEL_FROM_NO]: "02136512222",
      [KEYS.TEL_TO_NO]: "02742112222",
      [KEYS.FROM_NO]: "0211113332222",
      [KEYS.TO_NO]: "02111544222",
      [KEYS.RBT_ID]: "1111211",
      [KEYS.RBT_ID]: "323232",
      [KEYS.RBT_ID_VALUE]: "네모의 꿈",
      [KEYS.IS_INTERRUPT]: true,
      [KEYS.IS_CIRCULR_JOINED]: false,
      [KEYS.IS_WEEK_JOINED]: true,
      [KEYS.IS_TIME_JOINED]: false,
      [KEYS.IS_ORGN_JOINED]: false,
      [KEYS.IS_GROUP_JOINED]: true,
      [KEYS.IS_DURA_JOINED]: false,
    },
    {
      [KEYS.ID]: 26,
      [KEYS.ADMIN_ID]: 112,
      [KEYS.TEL_FROM_NO]: "021111234222",
      [KEYS.TEL_TO_NO]: "0215432222",
      [KEYS.FROM_NO]: "021134512222",
      [KEYS.TO_NO]: "021564222",
      [KEYS.RBT_ID]: "323232",
      [KEYS.RBT_ID_VALUE]: "슈퍼노바",
      [KEYS.IS_INTERRUPT]: false,
      [KEYS.IS_CIRCULR_JOINED]: false,
      [KEYS.IS_WEEK_JOINED]: true,
      [KEYS.IS_TIME_JOINED]: false,
      [KEYS.IS_ORGN_JOINED]: false,
      [KEYS.IS_GROUP_JOINED]: true,
      [KEYS.IS_DURA_JOINED]: false,
    },
    {
      [KEYS.ID]: 25,
      [KEYS.ADMIN_ID]: 112,
      [KEYS.TEL_FROM_NO]: "022545112222",
      [KEYS.TEL_TO_NO]: "02165465422",
      [KEYS.FROM_NO]: "02111653342222",
      [KEYS.TO_NO]: "021243212222",
      [KEYS.RBT_ID]: "323232",
      [KEYS.RBT_ID_VALUE]: "레블 하트",
      [KEYS.IS_INTERRUPT]: false,
      [KEYS.IS_CIRCULR_JOINED]: false,
      [KEYS.IS_WEEK_JOINED]: true,
      [KEYS.IS_TIME_JOINED]: false,
      [KEYS.IS_ORGN_JOINED]: true,
      [KEYS.IS_GROUP_JOINED]: true,
      [KEYS.IS_DURA_JOINED]: true,
    },
  ],
};
