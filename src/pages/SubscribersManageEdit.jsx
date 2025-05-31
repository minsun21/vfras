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
  subsriberMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import DidSetting from "../components/modals/DidSetting";
import { KEYS } from "../constants/Keys";
import axios from "../api/axios";
import Form from "../components/Form";
import PasswordReset from "../components/modals/PasswordReset";
import { SUBSRIBERS_INFO_DUMMY } from "../config/DataConfig";
import DidSettingPersonal from "../components/modals/DidSettingPersonal";
import { MODAL_SM } from "../components/modals/ModalRenderer";
import { SUBSRIBERS_TYPES } from "../config/OPTIONS";
import { store } from "../store";

const SubscriberManageEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showDialog, showAlert, showModal, closeModal } = useModal();
  const [searchSubNo, setSearchSubNo] = useState("");

  const [formData, setFormData] = useState();

  useEffect(() => {
    // userid로 정보 검색
    if (!state) return;
    // const subNo = state[KEYS.SUB_NO];
    // setSearchSubNo(subNo);

    // 초기화
    // axios.get(ROUTES.SUBSCRIBERS_DETAIL(subNo)).then(res=>{
    //   setFormData(res.data);
    // })
    // 임시
    const selectRow = state.selectRow;
    setFormData({
      ...SUBSRIBERS_INFO_DUMMY,
      ...selectRow,
      [KEYS.PASSWORD]: 1234,
      [KEYS.DID_CONFIG]:
        selectRow[KEYS.SUB_TYPE] === SUBSRIBERS_TYPES[0].value
          ? SUBSRIBERS_INFO_DUMMY.did_personal
          : SUBSRIBERS_INFO_DUMMY.dids,
    });
  }, [state]);

  const search = () => {
    if (!searchSubNo) {
      showAlert({
        message: subsriberMessages.searchPlaceHolder2,
      });
      return;
    }
    setFormData(SUBSRIBERS_INFO_DUMMY);
    // axios.get(ROUTES.SUBSCRIBERS_DETAIL(searchSubNo)).then((res) => {
    //   if(!res.data){
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //   }
    //   setFormData(res.data);
    // });
  };

  const handleSave = () => {
    showDialog({
      message: InfoMessages.confirmSave,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          // const errValidate = fieldsValidate(SUBSRIBERS_EDIT_FIELDS, formData);
          // if (errValidate) {
          //   showAlert({
          //     message: errValidate,
          //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
          //   });
          // }

          save();
        }, 50);
      },
    });
  };

  const save = () => {
    // axios.put(ROUTES.SUBSCRIBERS_DETAIL(formData[KEYS.SUB_NO]),formData ).then(res=>{
    //   showAlert({
    //     message: InfoMessages.successEdit,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })
    showAlert({
      message: InfoMessages.successEdit,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const clickDidSetting = () => {
    // if(formData[KEYS.SUB_TYPE] === LABELS.CORPORATION){
    //   showModal({
    //     content: <DidSetting userInfo={formData} />,
    //     header: LABELS.DID_TITLE,
    //   });
    // }else {
    //   showModal({
    //     content: <DidSettingPersonal userInfo={formData} />,
    //     header: LABELS.DID_TITLE_PERSONAL,
    //   });
    // }
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

  // did 회선 설정 - 변경
  const saveDidSetting = () => {
    const didPersonalData = store.getState()[KEYS.DID_CONFIG][KEYS.DID_CONFIG];
    console.log(didPersonalData);

    showAlert({
      message: InfoMessages.successEdit,
      onConfirm: () => {
        closeModal();
      },
    });
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

  const restPassword = () => {
    // 대표번호 뒷자리로 초기화
    setFormData({
      ...formData,
      [KEYS.PASSWORD]: formData[KEYS.SUB_NO].slice(-4),
    });

    closeModal();

    setTimeout(() => {
      showAlert({
        message: subsriberMessages.resetPassword,
      });
    }, 100);
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
                          {/* {LABELS.CURRENT}
                            <span>{value.length}</span>
                            {LABELS.DID_VALUE} */}
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
                              <span>{value.length}</span>
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
