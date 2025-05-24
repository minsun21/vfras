import { INPUT_SIZE_FL } from "../components/Input";
import { KEYS } from "../constants/Keys";
import { LABELS } from "../constants/Labels";
import { ADMIN_TYPES } from "./OPTIONS";

export const DIVISIONS = [
  { key: "", value: LABELS.ALL },
  { key: KEYS.NAME, value: LABELS.SUBSCRIBER_NAME },
  { key: KEYS.SUB_NO, value: LABELS.MAIN_NUMBER },
  { key: KEYS.PBX_NUMBER, value: LABELS.PBX_NUMBER },
  { key: KEYS.USER_NUMBER, value: LABELS.USER_NUMBER_F },
];
export const SUBSRIBERS_TYPES = [
  { key: "0", value: "개인" },
  { key: "1", value: "법인" },
];

export const SEARCH_SUBSRIBERS_TYPES = [
  { key: "", value: "전체" },
  { key: "0", value: "개인" },
  { key: "1", value: "법인" },
];

export const SERVICE_TYPES = [
  { key: "0", value: "개인" },
  { key: "1", value: "개인DJ" },
  { key: "2", value: "기업" },
];

export const SEARCH_SERVICE_TYPES = [
  { key: "", value: "전체" },
  { key: "0", value: "개인" },
  { key: "1", value: "개인DJ" },
  { key: "2", value: "기업" },
];

export const USER_STATES = [
  { key: "0", value: "가입" },
  { key: "1", value: "요청중" },
];

export const SUBSRIBERS_STATE = [
  { key: "0", value: "요청중" },
  { key: "1", value: "가입" },
  { key: "2", value: "삭제" },
];

export const SEARCH_SUBSRIBERS_STATE = [
  { key: "", value: "전체" },
  { key: "0", value: "요청중" },
  { key: "1", value: "가입" },
  { key: "2", value: "삭제" },
];

export const option_userUseState = [
  { key: "notUsed", value: "사용안함" },
  { key: "unconditionally", value: "무조건" },
  {
    key: "period",
    value: "특정기간",
    items: [
      { key: "statusStartDate", value: "" },
      { key: "statusEndDate", value: "" },
    ],
  },
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
    key: KEYS.ADMIN_TYPE,
    label: LABELS.CLASSIFICATION,
    value: "Admin",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.DEPARTMENT,
    label: LABELS.DEPARTMENT,
    value: "운영팀",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.ADMIN_ID,
    label: LABELS.ID,
    value: "vFRAS",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    value: "!sdf423",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    value: "홍길동",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.MOBILE,
    label: LABELS.PHONE,
    value: "010-1234-5678",
    type: "text",
    required: true,
  },
  {
    key: KEYS.EMAIL,
    label: LABELS.EMAIL,
    value: "test@lguplus.co.kr",
    type: "email",
    required: true,
  },
];

export const subsriberResigerFields = [
  {
    key: KEYS.SUB_NO,
    label: LABELS.MAIN_NUMBER,
    type: "text",
    required: true,
    requiredLength: 11,
  },
  {
    key: KEYS.SUB_STATUS,
    label: LABELS.USER_STATE,
    type: "radio",
    options: USER_STATES,
  },
  {
    key: KEYS.SUB_TYPE,
    label: LABELS.SUBSCRIBE_TYPE,
    type: "radio",
    options: SUBSRIBERS_TYPES,
  },
  {
    key: KEYS.SERVICE_TYPE,
    label: LABELS.SERVICE_TYPE,
    type: "radio",
    options: SERVICE_TYPES,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    type: "text",
    required: true,
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    type: "text",
    required: true,
    requiredLength: 4,
    comment: LABELS.PASSWORD_CHECK3,
  },
  {
    key: KEYS.ADDRESS1,
    label: LABELS.ADDRESS1,
    type: "text",
    required: true,
  },
  {
    key: KEYS.ADDRESS2,
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    placeholder: "OPTION",
  },
  {
    key: KEYS.PBX_NUMBER,
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    fields: [
      { key: KEYS.FROM_NO, type: "number" },
      { key: KEYS.TO_NO, type: "number" },
    ],
  },
  {
    key: KEYS.USER_NUMBER,
    label: LABELS.USER_NUMBER,
    multi: true,
    fields: [
      { key: KEYS.TEL_FROM_NO, type: "number" },
      { key: KEYS.TEL_TO_NO, type: "number" },
    ],
  },
  {
    key: KEYS.RBT_ID,
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    required: true,
    requiredLength: 6,
  },
];

export const subsriberManageFields = [
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
    key: "subsriberType",
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
    label: LABELS.DID_TITLE,
    type: "button",
    value: "현재 xxx개 DID",
  },
];

export const subscriberEditFields = [
  {
    key: KEYS.SUB_NO,
    label: LABELS.SUBSCRIBER_NUMBER,
    type: "text",
    value: "0211112222",
    disabled: true,
  },
  {
    key: KEYS.SUB_STATUS,
    label: LABELS.USER_STATE,
    type: "radio",
    options: SUBSRIBERS_STATE,
    value: SUBSRIBERS_STATE[1].value,
  },
  {
    key: KEYS.SUB_TYPE,
    label: LABELS.SUBSCRIBE_TYPE,
    type: "text",
    value: "법인",
    disabled: true,
  },
  {
    key: KEYS.SERVICE_TYPE,
    label: LABELS.SERVICE_TYPE,
    type: "text",
    value: "기업",
    disabled: true,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    type: "text",
    value: "홍길동",
    required: true,
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    type: "text",
    value: "0505",
    required: true,
  },
  {
    key: KEYS.ADDRESS1,
    label: LABELS.ADDRESS1,
    type: "text",
    value: "서울시 강남구",
    required: true,
    size : INPUT_SIZE_FL
  },
  {
    key: KEYS.ADDRESS2,
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    value: "",
  },
  {
    key: KEYS.PBX_NUMBER,
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    disabled: true,
    fields: [
      { key: KEYS.FROM_NO, type: "number", value: "0240050045", size: "sm" },
      { key: KEYS.TO_NO, type: "number", value: "0240050045", size: "sm" },
    ],
  },
  {
    key: KEYS.USER_NUMBER,
    label: LABELS.USER_NUMBER,
    multi: true,
    disabled: true,
    fields: [
      { key: KEYS.TEL_FROM_NO, type: "number", value: "0240050045", size: "sm" },
      { key: KEYS.TEL_TO_NO, type: "number", value: "0240050045" , size: "sm"},
    ],
  },
  {
    key: KEYS.RBT_ID,
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    value: "050125",
    required: true,
  },
  // {
  //   key: "userUseState",
  //   label: LABELS.USER_STATE,
  //   type: "radio",
  //   options: option_userUseState,
  // },
  {
    key: KEYS.DID,
    label: LABELS.DID_TITLE,
    type: "button",
    value: 13,
  },
];

// 계정 관리 > 사용자 등록
export const ACCOUNTS_REGISTER_FIELDS = [
  {
    key: KEYS.ADMIN_ID,
    label: LABELS.ID,
    type: "text",
    required: true,
    min: 4,
    max: 20,
  },
  {
    key: KEYS.ADMIN_TYPE,
    label: LABELS.CLASSIFICATION,
    type: "select",
    options: ADMIN_TYPES,
    required: true,
  },
  {
    key: KEYS.DEPARTMENT,
    label: LABELS.DEPARTMENT,
    type: "text",
    required: true,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    type: "text",
    required: true,
  },
  {
    key: KEYS.MOBILE,
    label: LABELS.PHONE,
    type: "text",
    required: true,
  },
  {
    key: KEYS.EMAIL,
    label: LABELS.EMAIL,
    type: "email",
    required: true,
  },
  {
    key: KEYS.REMARKS,
    label: LABELS.REMARKS,
    type: "text",
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    type: "password",
    required: true,
    comment: LABELS.PASSWORD_CHECK,
    min: 8,
    max: 20,
  },
  {
    key: KEYS.PASSWORD_CONFIRM,
    label: LABELS.PASSWORD_CONFIRM,
    type: "password",
    required: true,
  },
];

// 계정관리 > 사용자 정보 수정
export const ACCOUNTS_EDIT_FIELDS = [
  {
    key: KEYS.ADMIN_ID,
    label: LABELS.ID,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.ADMIN_TYPE,
    label: LABELS.CLASSIFICATION,
    type: "select",
    options: ADMIN_TYPES,
    required: true,
  },
  {
    key: KEYS.DEPARTMENT,
    label: LABELS.DEPARTMENT,
    type: "text",
    required: true,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    type: "text",
    required: true,
  },
  {
    key: KEYS.MOBILE,
    label: LABELS.PHONE,
    type: "text",
    required: true,
  },
  {
    key: KEYS.EMAIL,
    label: LABELS.EMAIL,
    type: "email",
    required: true,
  },
  {
    key: KEYS.REMARKS,
    label: LABELS.REMARKS,
    type: "text",
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    placeholder: "1234abcd!@#$",
    type: "password",
    comment: LABELS.PASSWORD_CHECK,
    required: true,
  },
  {
    key: KEYS.PASSWORD_CONFIRM,
    label: LABELS.PASSWORD_CONFIRM,
    type: "password",
    placeholder: "1234abcd!@#$",
    required: true,
  },
];

export const passwordChange = [
  {
    key: KEYS.OLD_PASSWORD,
    placeholder: LABELS.CURRENT_PASSWORD,
    type: "text",
  },
  {
    key: KEYS.NEW_PASSWORD1,
    placeholder: LABELS.CHANGE_PASSWORD,
    type: "text",
  },
  {
    key: KEYS.NEW_PASSWORD2,
    placeholder: LABELS.CHANGE_PASSWORD_CONFIRM,
    type: "text",
  },
];
