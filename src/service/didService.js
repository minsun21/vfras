import axios from "../api/axios";
import { ROUTES } from "../constants/routes";
import { KEYS } from "../constants/Keys";
import { fieldsValidate } from "../utils/FormValidation";
import { DID_ADD_FIELDS } from "../config/FieldsConfig";
import { deepEqual, getDidKey } from "../utils/Util";
import { ErrorMessages } from "../constants/Message";
import { store } from "../store";
import { LABELS } from "../constants/Labels";

/**
 * DID 추가 전 검증 (에러 메시지 리턴)
 */
export const validateDidBeforeAdd = ({ tableData }) => {
  const didFormData = store.getState().didAdd;

  const errValidate = fieldsValidate(DID_ADD_FIELDS, didFormData);
  if (errValidate) {
    return errValidate;
  }

  const isDuplicate = tableData.some(
    (item) => getDidKey(item) === getDidKey(didFormData)
  );
  if (isDuplicate) {
    return ErrorMessages.duplicateRbtSave;
  }

  return null; // 통과
};

/**
 * DID 회선 추가
 * @param {Object} userInfo - 사용자 정보
 * @returns {Promise<Object>} - 추가된 row 반환
 */
export const postDidRow = async (userInfo) => {
  const didFormData = store.getState().didAdd;

  await axios.post(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO]), didFormData);

  // 서버에서 rbt_id를 그대로 쓰되, def_rbt_type에 복사해줘야 하는 로직
  return {
    ...didFormData,
    [KEYS.DEF_RBT_TYPE]: didFormData[KEYS.RBT_ID],
  };
};

/**
 * 삭제 전 유효성 검사
 * 전체 삭제는 안됨
 */
export const validateDidBeforeDelete = ({ checkboxSelected, tableData }) => {
  if (!checkboxSelected.length) return ErrorMessages.nonSelect;
  if (checkboxSelected.length === tableData.length)
    return ErrorMessages.deleteBulk;

  return null;
};

/**
 * 삭제할 항목 분리 (선택된 것, 남은 것)
 */
export const getDidDeleteResult = ({ tableData, checkboxSelected }) => {
  const selectedIds = checkboxSelected.map((row) => getDidKey(row));

  const deleteItems = tableData.filter((row) =>
    selectedIds.includes(getDidKey(row))
  );
  const updatedTable = tableData.filter(
    (row) => !selectedIds.includes(getDidKey(row))
  );

  return { updatedTable, deleteItems };
};

/**
 * 실제 삭제 API 호출 및 후처리 콜백 실행
 */
export const deleteDidItems = async ({
  userInfo,
  deleteItems,
  updatedTable,
  onSuccess,
}) => {
  await axios.delete(ROUTES.SUBSCRIBERS_RBT(userInfo[KEYS.SUB_NO]), {
    data: deleteItems,
  });

  onSuccess?.(updatedTable);
};

/**
 * 부가서비스 등록용 URI 반환
 */
export const getAddUri = (dataKey, selectDid) => {
  const subNo = selectDid[KEYS.SUB_NO];
  const fromNo = selectDid[KEYS.FROM_NO];
  const toNo = selectDid[KEYS.TO_NO];

  switch (dataKey) {
    case KEYS.CIRCULARS_DATA_KEY:
      return ROUTES.CIRCULAR(subNo, fromNo, toNo);
    case KEYS.TIMES_DATA_KEY:
      return ROUTES.TIME(subNo, fromNo, toNo);
    case KEYS.WEEKS_DATA_KEY:
      return ROUTES.WEEK(subNo, fromNo, toNo);
    case KEYS.ORGNS_DATA_KEY:
      return ROUTES.ORGN(subNo, fromNo, toNo);
    case KEYS.DURAS_DATA_KEY:
      return ROUTES.DURA(subNo, fromNo, toNo);
    case KEYS.GROUPS_DATA_KEY:
      return ROUTES.GROUP(subNo, fromNo, toNo);
    default:
      return "";
  }
};

/**
 * 부가서비스 추가용 데이터 가공
 */
export const getAddItem = (dataKey, item, selectDid) => {

  switch (dataKey) {
    case KEYS.TIMES_DATA_KEY:
      return {
        ...item,
        [KEYS.S_TIME]: item[KEYS.S_TIME].replace(":", ""),
        [KEYS.E_TIME]: item[KEYS.E_TIME].replace(":", ""),
      };
    case KEYS.DURAS_DATA_KEY:
      return {
        ...item,
        [KEYS.S_DATE]: item[KEYS.S_DATE].replaceAll("-", ""),
        [KEYS.E_DATE]: item[KEYS.E_DATE].replaceAll("-", ""),
      };
    case KEYS.GROUPS_DATA_KEY:
      return {
        ...item,
        [KEYS.GROUP_ID]: selectDid[dataKey]?.length + 1 || 1,
      };
    default:
      return item;
  }
};

/**
 * 부가서비스 등록 전 중복 검사
 */
export const duplicateBeforeAdd = (inputs, originList, dataKey) => {
  if (originList.some((item) => deepEqual(item, inputs))) {
    return ErrorMessages.duplicateSave;
  }

  // 요일별은 요일이 같으면 안됨
  if (dataKey === KEYS.WEEKS_DATA_KEY) {
    return duplicateByField(inputs, originList, KEYS.DAY_TYPE, LABELS.DAY_TYPE);
  }

  // 발신지역 - 지역 같으면 안됨
  if (dataKey === KEYS.WEEKS_DATA_KEY) {
    return duplicateByField(inputs, originList, KEYS.ORGN, LABELS.ORGN);
  }

  return null;
};

const duplicateByField = (inputs, originList, key, label) => {
  if (isKeyDuplicateInArray(inputs, originList, key)) {
    return ErrorMessages.duplicateSaveField(label);
  }
};

const isKeyDuplicateInArray = (targetObj, arr, key) => {
  return arr.some((item) => item[key] == targetObj[key]);
};

/**
 * 부가서비스 등록 API 요청 및 후처리 데이터 반환
 */
export const addDidSubItem = async ({ dataKey, selectDid }) => {
  const uri = getAddUri(dataKey, selectDid);
  console.log('selectDid[dataKey]', selectDid[dataKey])

  await axios.post(uri, selectDid[dataKey]);
};

/**
 * 부가서비스 일괄 등록용 URI 반환
 */
export const getBulkUri = (dataKey, selectDid) => {
  const subNo = selectDid[KEYS.SUB_NO];

  switch (dataKey) {
    case KEYS.CIRCULARS_DATA_KEY:
      return ROUTES.CIRCULAR_BULK(subNo);
    case KEYS.TIMES_DATA_KEY:
      return ROUTES.TIME_BULK(subNo);
    case KEYS.WEEKS_DATA_KEY:
      return ROUTES.WEEK_BULK(subNo);
    case KEYS.ORGNS_DATA_KEY:
      return ROUTES.ORGN_BULK(subNo);
    case KEYS.DURAS_DATA_KEY:
      return ROUTES.DURA_BULK(subNo);
    case KEYS.GROUPS_DATA_KEY:
      return ROUTES.GROUP_BULK(subNo);
    default:
      return "";
  }
};

/**
 * 일괄 등록용 데이터 가공
 */
export const getAddBulkItem = (dataKey, inputs, selectDid) => {
  switch (dataKey) {
    case KEYS.TIMES_DATA_KEY:
      return {
        ...inputs,
        [KEYS.S_TIME]: inputs[KEYS.S_TIME].replace(":", ""),
        [KEYS.E_TIME]: inputs[KEYS.E_TIME].replace(":", ""),
      };
    case KEYS.DURAS_DATA_KEY:
      return {
        ...inputs,
        [KEYS.S_DATE]: inputs[KEYS.S_DATE].replaceAll("-", ""),
        [KEYS.E_DATE]: inputs[KEYS.E_DATE].replaceAll("-", ""),
      };
    case KEYS.GROUPS_DATA_KEY:
      return {
        ...inputs,
        [KEYS.GROUP_ID]: selectDid[dataKey]?.length + 1 || 1,
      };
    default:
      return inputs;
  }
};

/**
 * 부가서비스 일괄 등록 API 호출 및 반영값 반환
 */
export const bulkAddItem = async ({ key, dataKey, inputs, selectDid }) => {
  const uri = getBulkUri(dataKey, selectDid);
  const body = getAddBulkItem(dataKey, inputs, selectDid);

  await axios.post(uri, body);

  const updatedSelectDid = {
    ...selectDid,
    [dataKey]: [...(selectDid[dataKey] || []), inputs],
  };

  return {
    updatedSelectDid,
    updateTableCallback: (row) =>
      getDidKey(row) === getDidKey(selectDid) ? { ...row, [key]: true } : row,
  };
};


/**
 * 부가서비스 일괄 삭제 API 호출 및 반영값 반환
 */
export const bulkRemoveItem = async ({ dataKey, inputs, selectDid }) => {
  const uri = getBulkUri(dataKey, selectDid);
  const body = getAddBulkItem(dataKey, inputs, selectDid);

  await axios.delete(uri, {
    data: body,
  });
};

/**
 * 일시정지
 */
export const stopRbt = async (inputs, selectDid) => {
  const subNo = selectDid[KEYS.SUB_NO];
  const fromNo = selectDid[KEYS.FROM_NO];
  const toNo = selectDid[KEYS.TO_NO];

  await axios.post(ROUTES.STOP(subNo, fromNo, toNo), inputs);
};
