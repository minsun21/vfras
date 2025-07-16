import { INPUT_SIZE_FL } from "../components/Input";
import { KEYS } from "../constants/Keys";
import { LABELS } from "../constants/Labels";
import {
  ADMIN_TYPES,
  SERVICE_TYPES,
  SUBSRIBERS_TYPES,
  USER_STATES,
} from "./Options";

export const SUBSRIBERS_STATE = [
  { key: "0", value: "요청중" },
  { key: "1", value: "가입" },
  { key: "2", value: "삭제 대기" },
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

export const PROFILE_FIELDS = [
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

// 내 정보
export const PROFILE_EDIT_FIELDS = [
  {
    key: KEYS.ADMIN_TYPE,
    label: LABELS.CLASSIFICATION,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.DEPARTMENT,
    label: LABELS.DEPARTMENT,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.ADMIN_ID,
    label: LABELS.ID,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.PASSWORD,
    label: LABELS.PASSWORD,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    key: KEYS.NAME,
    label: LABELS.NAME,
    type: "text",
    required: true,
    disabled: true,
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
];

export const SUBSRIBERS_REGISTER_FIELDS = [
  {
    key: KEYS.SUB_NO,
    label: LABELS.MAIN_NUMBER,
    type: "number",
    required: true,
  },
  {
    key: KEYS.SUB_STATUS,
    label: LABELS.USER_STATE,
    type: "radio",
    Options: USER_STATES,
    required: true,
  },
  {
    key: KEYS.SUB_TYPE,
    label: LABELS.SUBSCRIBE_TYPE,
    type: "radio",
    Options: SUBSRIBERS_TYPES,
    required: true,
  },
  {
    key: KEYS.SERVICE_TYPE,
    label: LABELS.SERVICE_TYPE,
    type: "radio",
    Options: SERVICE_TYPES,
    required: true,
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
    disabled: true,
    required: true,
    length: 4,
    comment: LABELS.PASSWORD_CHECK3,
  },
  {
    key: KEYS.ADDRESS1,
    label: LABELS.ADDRESS1,
    type: "text",
    required: true,
    size: INPUT_SIZE_FL,
  },
  {
    key: KEYS.ADDRESS2,
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    placeholder: "OPTION",
    size: INPUT_SIZE_FL,
  },
  {
    key: KEYS.PBX_NUMBER,
    label: LABELS.PBX_NUMBER_COL,
    required: true,
    fields: [
      {
        key: KEYS.FROM_NO, type: "number"
      },
      {
        key: KEYS.TO_NO, type: "number"
      },
    ],
  },
  {
    key: KEYS.USER_NUMBER,
    label: LABELS.USER_NUMBER,
    required: true,
    fields: [
      {
        key: KEYS.TEL_FROM_NO, type: "number"
      },
      {
        key: KEYS.TEL_TO_NO, type: "number"
      },
    ],
  },
  {
    key: KEYS.DEF_RBT_TYPE,
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    required: true,
  },
];

export const SUBSRIBERS_MANAGE_FILEDS = [
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

export const SUBSRIBERS_EDIT_FIELDS = [
  {
    key: KEYS.SUB_NO,
    label: LABELS.SUBSCRIBER_NUMBER,
    type: "text",
    disabled: true,
  },
  {
    key: KEYS.SUB_STATUS,
    label: LABELS.USER_STATE,
    type: "radio",
    Options: SUBSRIBERS_STATE,
  },
  {
    key: KEYS.SUB_TYPE,
    label: LABELS.SUBSCRIBE_TYPE,
    type: "text",
    disabled: true,
  },
  {
    key: KEYS.SERVICE_TYPE,
    label: LABELS.SERVICE_TYPE,
    type: "text",
    disabled: true,
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
    disabled: true,
  },
  {
    key: KEYS.ADDRESS1,
    label: LABELS.ADDRESS1,
    type: "text",
    required: true,
    size: INPUT_SIZE_FL,
  },
  {
    key: KEYS.ADDRESS2,
    label: LABELS.ADDRESS2_OPTION,
    type: "text",
    size: INPUT_SIZE_FL,
  },
  {
    key: KEYS.PBX_NUMBER,
    label: LABELS.PBX_NUMBER_COL,
    multi: true,
    disabled: true,
    fields: [
      { key: KEYS.FROM_NO, type: "number", size: "sm" },
      { key: KEYS.TO_NO, type: "number", size: "sm" },
    ],
  },
  {
    key: KEYS.USER_NUMBER,
    label: LABELS.USER_NUMBER,
    disabled: true,
    fields: [
      {
        key: KEYS.TEL_FROM_NO,
        type: "number",
        size: "sm",
      },
      { key: KEYS.TEL_TO_NO, type: "number", size: "sm" },
    ],
  },
  {
    key: KEYS.DEF_RBT_TYPE,
    label: LABELS.DEFAULT_CALLRING,
    type: "number",
    required: true,
  },
  {
    key: KEYS.DID_CONFIG,
    label: LABELS.DID_TITLE,
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
    Options: ADMIN_TYPES,
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
    key: KEYS.PASSWORD1,
    label: LABELS.PASSWORD,
    type: "password",
    required: true,
    comment: LABELS.PASSWORD_CHECK,
  },
  {
    key: KEYS.PASSWORD2,
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
    Options: ADMIN_TYPES,
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
    key: KEYS.PASSWORD1,
    label: LABELS.PASSWORD,
    type: "password",
    comment: LABELS.PASSWORD_CHECK,
  },
  {
    key: KEYS.PASSWORD2,
    label: LABELS.PASSWORD_CONFIRM,
    type: "password",
  },
];

// 내 정보 > 비밀번호 변경
export const PASSWORD_CHANGE_FIELDS = [
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

export const DID_ADD_FIELDS = [
  {
    key: KEYS.PBX_NUMBER,
    label: LABELS.PBX_NUMBER_COL,
    required: true,
    fields: [
      { key: KEYS.FROM_NO, type: "number" },
      { key: KEYS.TO_NO, type: "number" },
    ],
  },
  {
    key: KEYS.USER_NUMBER,
    label: LABELS.USER_NUMBER,
    required: true,
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
  },
];
