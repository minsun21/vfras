import { LABELS } from "../constants/Label";

export const option_SUBSCRIBERType = [
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
  { key: "SUBSCRIBE", value: "가입" },
  { key: "request", value: "요청중" },
];

export const option_substriber_userState = [
  { key: "request", value: "요청중" },
  { key: "SUBSCRIBE", value: "가입" },
  { key: "delete", value: "삭제" },
];

export const option_userUseState = [
  { key: "notUsed", value: "사용안함" },
  { key: "unconditionally", value: "무조건" },
  { key: "specialPeriod", value: "특정기간" },
];

export const user_classification = [
  { key: "admin", value: "Admin" },
  { key: "user", value: "User" },
];

export const profileFields = [
  {
    key: "classification",
    label: LABELS.CLASSIFICATION,
    value: "Admin",
    type: "text",
    required: true,
  },
  {
    key: "department",
    label: LABELS.DEPARTMENT,
    value: "운영팀",
    type: "text",
    required: true,
  },
  { key: "id", label: LABELS.ID, value: "vFRAS", type: "text", required: true },
  {
    key: "password",
    label: LABELS.PASSWORD,
    value: LABELS.PASSWORD_PLACEHOLDER,
    type: "text",
    required: true,
  },
  {
    key: "name",
    label: LABELS.NAME,
    value: "홍길동",
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: LABELS.PHONE,
    value: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: LABELS.EMAIL,
    value: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
];

export const profileEditFields = [
  {
    key: "classification",
    label: LABELS.CLASSIFICATION,
    value: "Admin",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "department",
    label: LABELS.DEPARTMENT,
    value: "운영팀",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "id",
    label: LABELS.ID,
    value: "vFRAS",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    value: "!sdf423",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "name",
    label: LABELS.NAME,
    value: "홍길동",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "phone",
    label: LABELS.PHONE,
    value: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: LABELS.EMAIL,
    value: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
];

export const SUBSCRIBERResigerFields = [
  {
    key: "mainNumber",
    label: LABELS.MAIN_NUMBER,
    type: "text",
    required: true,
    requiredLength: 11,
  },
  {
    key: "userState",
    label: LABELS.USER_STATE,
    type: "radio",
    options: option_userState,
  },
  {
    key: "SUBSCRIBERType",
    label: LABELS.SUBSCRIBE_TYPE,
    type: "radio",
    options: option_SUBSCRIBERType,
  },
  {
    key: "serviceType",
    label: LABELS.SERVICE_TYPE,
    type: "radio",
    options: option_serviceType,
  },
  {
    key: "name",
    label: LABELS.NAME,
    type: "text",
    required: true,
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    type: "text",
    required: true,
    requiredLength: 4,
  },
  {
    key: "address1",
    label: LABELS.ADDRESS1,
    type: "text",
    required: true,
  },
  {
    key: "address2",
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    placeholder: "OPTION",
  },
  {
    key: "pbxNumber",
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    fields: [
      { key: "startPbxNumber", type: "number" },
      { key: "endPbxNumber", type: "number" },
    ],
  },
  {
    key: "userNumber",
    label: LABELS.USER_NUMBER,
    multi: true,
    fields: [
      { key: "starUsertNumber", type: "number" },
      { key: "endUserNumber", type: "number" },
    ],
  },
  {
    key: "defaultCallRing",
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    required: true,
    requiredLength: 6,
  },
];

export const SUBSCRIBERManageFields = [
  {
    key: "mainNumber",
    label: LABELS.SUBSCRIBER_NUMBER,
    type: "text",
    value: "0211112222",
    required: true,
  },
  {
    key: "userState",
    label: LABELS.USER_STATE,
    type: "text",
    value: "요청중",
  },
  {
    key: "SUBSCRIBERType",
    label: LABELS.SUBSCRIBE_TYPE,
    type: "text",
    value: "법인",
  },
  {
    key: "serviceType",
    label: LABELS.SERVICE_TYPE,
    type: "text",
    value: "기업",
  },
  {
    key: "name",
    label: LABELS.NAME,
    type: "text",
    value: "홍길동",
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    type: "text",
    value: "0505",
  },
  {
    key: "address1",
    label: LABELS.ADDRESS1,
    type: "text",
    value: "서울시 강남구",
  },
  {
    key: "address2",
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    value: "",
  },
  {
    key: "pbxNumber",
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    fields: [
      { key: "startPbxNumber", type: "number", value: "0240050045" },
      { key: "endPbxNumber", type: "number", value: "0240050045" },
    ],
  },
  {
    key: "userNumber",
    label: LABELS.USER_NUMBER,
    multi: true,
    fields: [
      { key: "starUsertNumber", type: "number", value: "0240050045" },
      { key: "endUserNumber", type: "number", value: "0240050045" },
    ],
  },
  {
    key: "defaultCallRing",
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    value: "050125",
  },
  {
    key: "userUseState",
    label: LABELS.USER_STATE,
    type: "radio",
    value: "사용안함",
  },
  {
    key: "did",
    label: LABELS.DID,
    type: "button",
    value: "현재 xxx개 DID",
  },
];

export const SUBSCRIBEREditFields = [
  {
    key: "mainNumber",
    label: LABELS.SUBSCRIBER_NUMBER,
    type: "text",
    value: "0211112222",
    disabled: true,
  },
  {
    key: "userState",
    label: LABELS.USER_STATE,
    type: "radio",
    options: option_substriber_userState,
  },
  {
    key: "SUBSCRIBERType",
    label: LABELS.SUBSCRIBE_TYPE,
    type: "text",
    value: "법인",
    disabled: true,
  },
  {
    key: "serviceType",
    label: LABELS.SERVICE_TYPE,
    type: "text",
    value: "기업",
    disabled: true,
  },
  {
    key: "name",
    label: LABELS.NAME,
    type: "text",
    value: "홍길동",
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    type: "text",
    value: "0505",
  },
  {
    key: "address1",
    label: LABELS.ADDRESS1,
    type: "text",
    value: "서울시 강남구",
  },
  {
    key: "address2",
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    value: "",
  },
  {
    key: "pbxNumber",
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    disabled: true,
    fields: [
      { key: "startPbxNumber", type: "number", value: "0240050045" },
      { key: "endPbxNumber", type: "number", value: "0240050045" },
    ],
  },
  {
    key: "userNumber",
    label: LABELS.USER_NUMBER,
    multi: true,
    disabled: true,
    fields: [
      { key: "starUsertNumber", type: "number", value: "0240050045" },
      { key: "endUserNumber", type: "number", value: "0240050045" },
    ],
  },
  {
    key: "defaultCallRing",
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    value: "050125",
  },
  {
    key: "userUseState",
    label: LABELS.USER_STATE,
    type: "radio",
    value: "사용안함",
  },
  {
    key: "did",
    label: LABELS.DID,
    type: "button",
    value: "현재 xxx개 DID",
  },
];

export const accountRegisterFields = [
  {
    key: "id",
    label: LABELS.ID,
    type: "text",
    required: true,
  },
  {
    key: "classification",
    label: LABELS.CLASSIFICATION,
    type: "select",
    options: user_classification,
    required: true,
  },
  {
    key: "department",
    label: LABELS.DEPARTMENT,
    type: "text",
    required: true,
  },
  {
    key: "name",
    label: LABELS.NAME,
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: LABELS.PHONE,
    type: "text",
  },
  {
    key: "email",
    label: LABELS.EMAIL,
    type: "email",
  },
  {
    key: "remarks",
    label: LABELS.REMARKS,
    type: "text",
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    type: "text",
    required: true,
    comment: LABELS.PASSWORD_CHECK,
  },
  {
    key: "passwordConfirm",
    label: LABELS.PASSWORD_CONFIRM,
    type: "text",
    required: true,
  },
];

export const accountEditFields = [
  {
    key: "id",
    label: LABELS.ID,
    placeholder: "vFRAS",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: "classification",
    label: LABELS.CLASSIFICATION,
    placeholder: "Admin",
    type: "text",
    required: true,
  },
  {
    key: "department",
    label: LABELS.DEPARTMENT,
    placeholder: "운영팀",
    type: "text",
    required: true,
  },
  {
    key: "name",
    label: LABELS.NAME,
    placeholder: "홍길동",
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: LABELS.PHONE,
    placeholder: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: LABELS.EMAIL,
    placeholder: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
  {
    key: "remarks",
    label: LABELS.REMARKS,
    placeholder: "협력사 요청",
    type: "text",
  },
  {
    key: "password",
    label: LABELS.PASSWORD,
    placeholder: "******",
    type: "text",
    comment: LABELS.PASSWORD_CHECK,
    required: true,
  },
  {
    key: "passwordConfirm",
    label: LABELS.PASSWORD_CONFIRM,
    type: "text",
    placeholder: "******",
    required: true,
  },
];

export const countryNumbers = [
  7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
  7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
  7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
];

export const passwordChange = [
  {
    key: "currentPassword",
    placeholder: LABELS.CURRENT_PASSWORD,
    type: "text",
  },
  {
    key: "changePassword",
    placeholder: LABELS.CHANGE_PASSWORD,
    type: "text",
  },
  {
    key: "changeConfirmPassword",
    placeholder: LABELS.CHANGE_PASSWORD_CONFIRM,
    type: "text",
  },
];