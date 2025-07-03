import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, {
  BUTTON_CANCEL,
  BUTTON_SAVE,
  BUTTON_SEARCH,
} from "../components/Button";
import Input from "../components/Input";
import RadioGroup from "../components/RadioGroup";
import { SUBSRIBERS_EDIT_FIELDS } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import {
  ErrorMessages,
  InfoMessages,
  SubsriberMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import DidSetting from "../components/modals/DidSetting";
import { KEYS } from "../constants/Keys";
import axios from "../api/axios";
import Form from "../components/Form";
import PasswordReset from "../components/modals/PasswordReset";
import DidSettingPersonal from "../components/modals/DidSettingPersonal";
import { MODAL_SM } from "../components/modals/ModalRenderer";
import { SERVICE_TYPES, SUBSRIBERS_TYPES } from "../config/OPTIONS";
import { store } from "../store";
import { findMappedValue } from "../utils/Util";
import { fieldsValidate } from "../utils/FormValidation";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../features/loadingSlice";

const SubscriberManageEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { showDialog, showAlert, showModal, closeModal } = useModal();
  const [searchSubNo, setSearchSubNo] = useState("");

  const [formData, setFormData] = useState();

  useEffect(() => {
    // userid로 정보 검색
    if (!state) return;
    const subNo = state[KEYS.SUB_NO];
    setSearchSubNo(subNo);

    getData(subNo);
  }, [state]);

  // 가입자 정보 조회
  const getData = (subNo) => {
    axios
      .get(ROUTES.SUBSCRIBERS_DETAIL(subNo))
      .then((res) => {
        const result = res.data.resultData;
        result[KEYS.PASSWORD] = "****";
        result[KEYS.SERVICE_TYPE] = findMappedValue(
          SERVICE_TYPES,
          result[KEYS.SERVICE_TYPE]
        );
        result[KEYS.SUB_TYPE] = findMappedValue(
          SUBSRIBERS_TYPES,
          result[KEYS.SUB_TYPE]
        );
        setFormData(result);
      })
      .catch((err) => {
        if (err) {
          let message = err.response.data.resultData;
          if (message.includes("Subscriber No Not Found")) {
            showAlert({ message: SubsriberMessages.noSearchSubsriber });
            return;
          } else {
            showAlert({ message: ErrorMessages.server });
          }
        }
      });
  };

  const search = () => {
    if (!searchSubNo) {
      showAlert({
        message: SubsriberMessages.searchPlaceHolder2,
      });
      return;
    }
    getData(searchSubNo);
  };

  // 가입자 - 수정
  const handleSave = () => {
    showDialog({
      message: InfoMessages.confirmSave,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          const errValidate = fieldsValidate(SUBSRIBERS_EDIT_FIELDS, formData);
          if (errValidate) {
            showAlert({
              message: errValidate,
            });
            return;
          }

          subsriberSave();
        }, 50);
      },
    });
  };

  // 가입자 - 수정
  const subsriberSave = () => {
    axios
      .put(ROUTES.SUBSCRIBERS_DETAIL(formData[KEYS.SUB_NO]), formData)
      .then((res) => {
        showAlert({
          message: InfoMessages.successEdit,
        });
      });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const clickDidSetting = () => {
    showModal({
      content: <DidSetting userInfo={formData} />,
      header: LABELS.DID_TITLE,
      onConfirm: saveDidSetting,
    });
  };

  const clickDidSettingPersonal = () => {
    showModal({
      content: <DidSettingPersonal userInfo={formData} />,
      header: LABELS.DID_TITLE_PERSONAL,
      onConfirm: saveDidSettingPersonal,
    });
  };

  // did 회선 설정 - 법인 변경
  const saveDidSetting = () => {
    const didStore = store.getState()[KEYS.DID_CONFIG];
    const subNo = formData[KEYS.SUB_NO];
    dispatch(startLoading());

    const addedList = [];
    const addDidList = didStore.addDidList;
    const deleteDidList = didStore.deleteDidList;
    const subChangeList = didStore.subChanges;

    const rollbackAddedItems = async () => {
      if (addedList.length === 0) return;
      const rollbackInputs = addedList.map((row) => ({
        [KEYS.FROM_NO]: row[KEYS.FROM_NO],
        [KEYS.TO_NO]: row[KEYS.TO_NO],
      }));

      try {
        await axios.delete(ROUTES.SUBSCRIBERS_RBT_ADD(subNo), {
          data: rollbackInputs,
        });
        console.log("롤백 완료");
      } catch (rollbackErr) {
        console.error("롤백 실패", rollbackErr?.response?.data || rollbackErr);
      }
    };

    const process = async () => {
      try {
        // ✅ 1. 추가 작업 순차 실행
        for (const row of addDidList) {
          const inputs = {
            [KEYS.FROM_NO]: row[KEYS.FROM_NO],
            [KEYS.TO_NO]: row[KEYS.TO_NO],
            [KEYS.TEL_FROM_NO]: row[KEYS.TEL_FROM_NO],
            [KEYS.TEL_TO_NO]: row[KEYS.TEL_TO_NO],
            [KEYS.RBT_ID]: row[KEYS.RBT_ID],
          };

          await axios.post(ROUTES.SUBSCRIBERS_RBT_ADD(subNo), inputs);
          addedList.push(row); // 롤백을 위해 성공한 항목 저장
        }

        // ✅ 2. 삭제 작업
        if (deleteDidList.length > 0) {
          const deleteInputs = deleteDidList.map((row) => ({
            [KEYS.FROM_NO]: row[KEYS.FROM_NO],
            [KEYS.TO_NO]: row[KEYS.TO_NO],
          }));

          await axios.delete(ROUTES.SUBSCRIBERS_RBT_ADD(subNo), {
            data: deleteInputs,
          });
        }

        // 3. 부가 서비스 추가
        

        // 4. 부가 서비스 삭제

        console.log("추가 및 삭제 작업 완료");
      } catch (error) {
        console.error("에러 발생, 롤백 시작", error?.response?.data || error);
        await rollbackAddedItems();
      } finally {
        dispatch(endLoading());
      }
    };

    process();
  };

  // did 회선 설정 - 개인 변경
  const saveDidSettingPersonal = () => {
    const didData = store.getState()[KEYS.DID_CONFIG][KEYS.DID_CONFIG];
    console.log(didData);

    showAlert({
      message: InfoMessages.successEdit,
      onConfirm: () => {
        closeModal();
      },
    });
  };

  const clickResetPassword = () => {
    showModal({
      content: <PasswordReset currentPassword={formData[KEYS.PASSWORD]} />,
      header: LABELS.PASSWORD_RESET,
      onConfirm: restPassword,
      size: MODAL_SM,
    });
  };

  // 비밀번호 초기화 (대표번호 뒷자리)
  const restPassword = () => {
    axios
      .put(ROUTES.RESET_SUBSCRIBER_PASSWORD(formData[KEYS.SUB_NO]), null, {
        params: {
          [KEYS.SUB_NO]: formData[KEYS.SUB_NO],
          [KEYS.NEW_PASSWORD]: formData[KEYS.SUB_NO].slice(-4),
        },
      })
      .then((res) => {
        closeModal();

        setTimeout(() => {
          showAlert({
            message: SubsriberMessages.resetPassword,
          });
        }, 100);
      });
  };

  return (
    <>
      <Form className="search-box">
        <table className="tbl-input">
          <colgroup></colgroup>
          <thead>
            <tr>
              <th>
                <label className="schTxtL1">{LABELS.MAIN_NUMBER}</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="dflex gap10">
                  <Input
                    value={searchSubNo}
                    type="number"
                    onChange={(e) => setSearchSubNo(e.target.value)}
                  />
                  <Button type={BUTTON_SEARCH} onClick={search} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      {formData && (
        <Form className="tbl-view">
          <table>
            <colgroup>
              <col className="w250"></col>
              <col></col>
            </colgroup>
            <tbody>
              {SUBSRIBERS_EDIT_FIELDS.map((field) => {
                const {
                  key,
                  label,
                  type = "text",
                  options = [],
                  required,
                  disabled,
                  fields,
                  size,
                } = field;
                const value = formData[key] || "";

                const handleChange = (e) => {
                  const val = e.target.value;
                  const newData = {
                    [key]: val,
                  };

                  if (key === "userUseState") {
                    const itemsOpt = field.options.filter(
                      (option) => option.items
                    )[0];
                    if (itemsOpt.value !== val) {
                      itemsOpt.items.map((item) => (newData[item.key] = ""));
                    }
                  }

                  setFormData((prev) => ({ ...prev, ...newData }));
                };

                return (
                  <tr key={key}>
                    <th className="Labels" required={required}>
                      {label}
                      {required && <em>*</em>}
                    </th>
                    <td className="value">
                      {key === KEYS.SUB_NO ? (
                        <div className="rowBox">
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={handleChange}
                            disabled={disabled}
                          />
                          <span>{LABELS.LV_NUMBER}</span>
                        </div>
                      ) : key === "password" ? (
                        <div className="rowBox">
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={handleChange}
                            disabled={disabled}
                            size="nm"
                          />
                          <Button
                            type={BUTTON_CANCEL}
                            label={LABELS.PASSWORD_RESET}
                            onClick={clickResetPassword}
                          />
                        </div>
                      ) : type === "radio" ? (
                        <RadioGroup
                          value={value}
                          options={options}
                          onChange={handleChange}
                        />
                      ) : key === KEYS.DID_CONFIG ? (
                        <div className="rowBox">
                          {formData[KEYS.SUB_TYPE] === // 임시
                          SUBSRIBERS_TYPES[0].value ? (
                            <label>
                              {LABELS.CURRENT}
                              <span>1</span>
                              {LABELS.DID_VALUE}
                            </label>
                          ) : (
                            <label>
                              {LABELS.CURRENT}
                              <span>{formData[KEYS.DID_COUNT]}</span>
                              {LABELS.DID_VALUE}
                            </label>
                          )}
                          {formData[KEYS.SUB_TYPE] ===
                          SUBSRIBERS_TYPES[0].value ? (
                            <Button
                              type={BUTTON_CANCEL}
                              label={LABELS.SETTING}
                              onClick={clickDidSettingPersonal}
                            />
                          ) : (
                            <Button
                              type={BUTTON_CANCEL}
                              label={LABELS.SETTING}
                              onClick={clickDidSetting}
                            />
                          )}
                        </div>
                      ) : fields ? (
                        <div className="dflex">
                          {field.fields.map((subField, idx) => (
                            <div key={subField.key} className="rowBox">
                              <Input
                                type={subField.type}
                                value={formData[subField.key] || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [subField.key]: e.target.value,
                                  }))
                                }
                                disabled={disabled}
                                size={subField.size}
                              />
                              {idx === 0 && (
                                <span className="dashCenter">{"-"}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Input
                          size={size}
                          value={value}
                          type={type}
                          disabled={disabled}
                          onChange={handleChange}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Form>
      )}
      {formData && (
        <div className="btn-wrap">
          <div>
            <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
          </div>
          <div>
            <Button type={BUTTON_SAVE} onClick={handleSave} />
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriberManageEdit;
