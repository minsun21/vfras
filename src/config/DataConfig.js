import Button from "../components/Button";
import { LABELS } from "../constants/Label";

export const sounds_source_columns = [
  {
    accessorKey: "code",
    header: LABELS.SOUNDS_CODE,
  },
  {
    accessorKey: "title",
    header: LABELS.TITLE_DESC,
  },
];
export const sounds_source_data = [
  {
    code: 3820472,
    title: "편지",
  },
  {
    code: 1234523,
    title: "모르시나요",
  },
  {
    code: 3457435,
    title: "가끔 니가 생각나",
  },
  {
    code: 2653455,
    title: "Period",
  },
  {
    code: 2477854,
    title: "Again",
  },
  {
    code: 6799556,
    title: "화",
  },
  {
    code: 8576833,
    title: "슈퍼노바",
  },
  {
    code: 5799336,
    title: "레블하트",
  },
  {
    code: 583594,
    title: "Forever",
  },
  {
    code: 16690345,
    title: "Like Water",
  },
];

export const account_logs_columns = (openModal) => {
  return [
    {
      accessorKey: "id",
      header: LABELS.ID,
    },
    {
      accessorKey: "name",
      header: LABELS.NAME,
      clickable: ({ row }) => openModal(row.original),
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
        <Button
          label={LABELS.SUBSCRIBER_MANAGE}
          onClick={() => {
            navigateManage(row.original);
          }}
        />
      ),
    },
  ];
};

export const subscribe_data = [
  {
    id: 1,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "요청중",
  },
  {
    id: 2,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "요청중",
  },
  {
    id: 3,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 4,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 5,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 6,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 7,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 8,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
  {
    id: 9,
    mainNumber: "0211112222",
    userNumber: "02111112222~0211112233",
    pbxNumber: "02111112222~0211112233",
    name: "LGU+",
    applyDate: "2024.02.04",
    state: "가입",
  },
];
