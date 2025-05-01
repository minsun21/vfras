export const profileFields = [
  {
    key: "classification",
    label: "사용자 구분",
    value: "Admin",
    type: "text",
    required: true,
  },
  {
    key: "department",
    label: "부서",
    value: "운영팀",
    type: "text",
    required: true,
  },
  { key: "id", label: "아이디", value: "vFRAS", type: "text", required: true },
  {
    key: "password",
    label: "비밀번호",
    value: "******",
    type: "text",
    required: true,
  },
  { key: "name", label: "이름", value: "홍길동", type: "text", required: true },
  {
    key: "phone",
    label: "휴대폰",
    value: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "이메일",
    value: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
];

export const profileEditFields = [
  {
    key: "classification",
    label: "사용자 구분",
    placeholder: "Admin",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "department",
    label: "부서",
    placeholder: "운영팀",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "id",
    label: "아이디",
    placeholder: "vFRAS",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "password",
    label: "비밀번호",
    placeholder: "******",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "name",
    label: "이름",
    placeholder: "홍길동",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "phone",
    label: "휴대폰",
    placeholder: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "이메일",
    placeholder: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
];

export const subsriberResigerFields = [
  {
    key: "mainNumber",
    label: "대표번호",
    type: "text",
    required: true,
    requiredLength: 11,
  },
  {
    key: "userState",
    label: "사용자 상태",
    type: "radio",
    options: [
      { key: "subsribe", value: "가입" },
      { key: "request", value: "요청중" },
    ],
  },
  {
    key: "subsriberType",
    label: "가입자 유형",
    type: "radio",
    options: [
      { key: "individual", value: "개인" },
      { key: "corporation", value: "법인" },
    ],
  },
  {
    key: "serviceType",
    label: "서비스 유형",
    type: "radio",
    options: [
      { key: "all", value: "전체" },
      { key: "corporation", value: "기업" },
      { key: "individual", value: "개인" },
      { key: "individualdj", value: "개인DJ" },
    ],
  },
  {
    key: "name",
    label: "이름",
    type: "text",
    required: true,
  },
  {
    key: "password",
    label: "비밀번호",
    type: "text",
    required: true,
    requiredLength: 4,
  },
  {
    key: "address1",
    label: "주소1",
    type: "text",
    required: true,
  },
  {
    key: "address2",
    label: "주소2 (Option)",
    type: "text",
    placeholder: "OPTION",
  },
  {
    key: "pbxNumber",
    label: "교환기 번호 (시작~끝)",
    multi: true,
    fields: [
      { key: "startPbxNumber", type: "number" },
      { key: "endPbxNumber", type: "number" },
    ],
  },
  {
    key: "userNumber",
    label: "사용자 번호(시작~끝)",
    multi: true,
    fields: [
      { key: "starUsertNumber", type: "number" },
      { key: "endUserNumber", type: "number" },
    ],
  },
  {
    key: "defaultCallRing",
    label: "기본통화연결음 ID",
    type: "number",
    required: true,
    requiredLength: 6,
  },
];

export const accountRegisterFields = [
  {
    key: "id",
    label: "아이디",
    type: "text",
    required: true,
  },
  {
    key: "classification",
    label: "사용자 구분",
    type: "select",
    options: [
      { key: "admin", value: "Admin" },
      { key: "user", value: "User" },
    ],
    required: true,
  },
  {
    key: "department",
    label: "부서",
    type: "text",
    required: true,
  },
  {
    key: "name",
    label: "이름",
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: "휴대폰",
    type: "text",
  },
  {
    key: "email",
    label: "이메일",
    type: "email",
  },
  {
    key: "remarks",
    label: "비고",
    type: "text",
  },
  {
    key: "password",
    label: "비밀번호",
    type: "text",
    required: true,
    comment: "(8~20 영문/숫자/특수문자 혼합)",
  },
  {
    key: "passwordConfirm",
    label: "비밀번호 확인",
    type: "text",
    required: true,
  },
];

export const accountEditFields = [
  {
    key: "id",
    label: "아이디",
    placeholder: "vFRAS",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "classification",
    label: "사용자 구분",
    placeholder: "Admin",
    type: "text",
    required: true,
  },
  {
    key: "department",
    label: "부서",
    placeholder: "운영팀",
    type: "text",
    required: true,
  },
  {
    key: "name",
    label: "이름",
    placeholder: "홍길동",
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: "휴대폰",
    placeholder: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "이메일",
    placeholder: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
  {
    key: "remarks",
    label: "비고",
    placeholder: "협력사 요청",
    type: "text",
  },
  {
    key: "password",
    label: "비밀번호",
    placeholder: "******",
    type: "text",
    comment: "(8~20 영문/숫자/특수문자 혼합)",
    required: true,
  },
  {
    key: "passwordConfirm",
    label: "비밀번호 확인",
    type: "text",
    placeholder: "******",
    required: true,
  },
];

export const option_subsriberType = [
  { key: "all", value: "전체" },
  { key: "individual", value: "개인" },
  { key: "corporation", value: "법인" },
];
export const option_allType = [
  { key: "all", value: "전체" },
  { key: "corporation", value: "기업" },
  { key: "individual", value: "개인" },
];
export const option_serviceType = [
  { key: "all", value: "전체" },
  { key: "corporation", value: "기업" },
  { key: "individual", value: "개인" },
  { key: "individualdj", value: "개인DJ" },
];

export const option_userState = [
  { key: "all", value: "전체" },
  { key: "subsribe", value: "가입" },
  { key: "request", value: "요청중" },
];
