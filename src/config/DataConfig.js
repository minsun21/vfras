export const sounds_source_columns = [
  {
    accessorKey: "code",
    header: "음원코드",
  },
  {
    accessorKey: "title",
    header: "제목/설명",
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
      header: "아이디",
    },
    {
      accessorKey: "name",
      header: "이름",
      clickable: ({ row }) => openModal(row.original),
    },
    {
      accessorKey: "department",
      header: "부서",
    },
    {
      accessorKey: "userType",
      header: "사용자 구분",
    },
    {
      accessorKey: "accessTime",
      header: "접속 시간",
    },
    {
      accessorKey: "lastAccessTime",
      header: "마지막 접속",
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
    header: "아이디",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "department",
    header: "부서",
  },
  {
    accessorKey: "userType",
    header: "사용자 구분",
  },
  {
    accessorKey: "createdAt",
    header: "가입일",
  },
  {
    accessorKey: "lastAccessTime",
    header: "마지막 접속",
  },
];

export const account_manage_data =[
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
]