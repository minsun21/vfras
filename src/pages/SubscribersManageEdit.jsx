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
  ErrorKey,
  ErrorMessages,
  InfoMessages,
  SubsriberMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import DidSetting from "../components/modals/DidSetting";
import { KEYS } from "../constants/Keys";
import axios, { AXIOS_NO_GLOBAL_ERROR } from "../api/axios";
import Form from "../components/Form";
import PasswordReset from "../components/modals/PasswordReset";
import { MODAL_SM } from "../components/modals/ModalRenderer";
import { SERVICE_TYPES, SUBSRIBERS_TYPES } from "../config/OptionConfig";
import { findMappedValue } from "../utils/Util";
import { fieldsValidate } from "../utils/FormValidation";

const SubscriberManageEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
      .get(ROUTES.SUBSCRIBERS_DETAIL(subNo), AXIOS_NO_GLOBAL_ERROR)
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
        let message = err.response.data?.resultData?.message || "";
        if (message.includes(ErrorKey.notFindSubsriberNo)) {
          showAlert({ message: SubsriberMessages.noSearchSubsriber });
          return;
        } else {
          showAlert({ message: ErrorMessages.server });
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
        navigate(ROUTES.SUBSCRIBERS);
      });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  // 회선 및 부가서비스 - 법인
  const clickDidSetting = () => {
    showModal({
      content: <DidSetting userInfo={formData} plusRbtCount={plusRbtCount} />,
      header: LABELS.DID_TITLE,
      isOnlyClose: true,
    });
  };

  // 회선 추가할 경우 개수 +1
  const plusRbtCount = () => {
    setFormData((prev) => ({
      ...prev,
      [KEYS.DID_COUNT]: prev[KEYS.DID_COUNT] + 1,
    }));
  };

  // 회선 및 부가서비스 - 개인
  const clickDidSettingPersonal = () => {
    showModal({
      content: (
        <DidSetting
          userInfo={formData}
          plusRbtCount={plusRbtCount}
          isPersonal={true}
        />
      ),
      header: LABELS.DID_TITLE_PERSONAL,
      isOnlyClose: true,
    });
  };

  // 비밀번호 초기화
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
                  Options = [],
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
                    const itemsOpt = field.Options.filter(
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
                          Options={Options}
                          onChange={handleChange}
                        />
                      ) : key === KEYS.DID_CONFIG ? (
                        <div className="rowBox">
                          <label>
                            {LABELS.CURRENT}
                            <span>{formData[KEYS.DID_COUNT]}</span>
                            {LABELS.DID_VALUE}
                          </label>
                          {formData[KEYS.SERVICE_TYPE] !== SERVICE_TYPES[1].value ? formData[KEYS.SUB_TYPE] ===
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
                          ) : null}
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
