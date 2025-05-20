import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, {
  BUTTON_CANCEL,
  BUTTON_SAVE,
  BUTTON_SEARCH,
} from "../components/Button";
import Input from "../components/Input";
import RadioGroup from "../components/RadioGroup";
import {
  subscriberEditFields,
  subsriberManageFields,
} from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { fieldsValidate } from "../utils/FormValidation";
import {
  errorMessages,
  infoMessages,
  subsriberMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import DidSetting from "../components/modals/DidSetting";
import { KEYS } from "../constants/Keys";
import axios from "../api/axios";
import Form from "../components/Form";
import PasswordReset from "../components/modals/PasswordReset";

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

    // 초기화
    // axios.get(ROUTES.SUBSCRIBERS_DETAIL(subNo)).then(res=>{
    //   setFormData(res.data);
    // })
    setFormData(() =>
      subscriberEditFields.reduce((acc, field) => {
        if (field.fields && Array.isArray(field.fields)) {
          field.fields.forEach((subField) => {
            acc[subField.key] = subField.value || "";
          });
        } else {
          acc[field.key] = field.value || "";
        }
        return acc;
      }, {})
    );
  }, [state]);

  const search = () => {
    if (!searchSubNo) {
      showAlert({
        message: subsriberMessages.searchPlaceHolder2,
      });
      return;
    }
    setFormData(() =>
      subscriberEditFields.reduce((acc, field) => {
        if (field.fields && Array.isArray(field.fields)) {
          field.fields.forEach((subField) => {
            acc[subField.key] = subField.value || "";
          });
        } else {
          acc[field.key] = field.value || "";
        }
        return acc;
      }, {})
    );
    // axios.get(ROUTES.SUBSCRIBERS_DETAIL(searchSubNo)).then((res) => {
    //   if(!res.data){
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //   }
    //   setFormData(res.data);
    // });
  };

  const handleSave = () => {
    showDialog({
      message: infoMessages.confirmSave,
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          // const errValidate = fieldsValidate(subscriberEditFields, formData);
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
    //     message: infoMessages.successEdit,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })
    showAlert({
      message: infoMessages.successEdit,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: infoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const clickDidSetting = () => {
    showModal({
      content: <DidSetting userInfo={formData} />,
      header: LABELS.DID_TITLE,
    });
  };

  const clickResetPassword = () => {
    showModal({
      content: (
        <PasswordReset
          currentPassword={formData[KEYS.PASSWORD]}
          restPassword={restPassword}
        />
      ),
    });
  };

  const restPassword = () => {
    // 대표번호 뒷자리로 초기화
    setFormData({
      ...formData,
      [KEYS.PASSWORD]: formData[KEYS.SUB_NO].slice(-4),
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
                <div className="form-field dflex wrap gap10">
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
              {subscriberEditFields.map((field) => {
                const {
                  key,
                  label,
                  type = "text",
                  options = [],
                  required,
                  disabled,
                  multi,
                } = field;
                const value = formData[key] || "";

                const handleChange = (val) => {
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
                    </th>
                    <td className="value">
                      {key === KEYS.SUB_NO ? (
                        <div>
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={(e) => handleChange(e.target.value)}
                            disabled={disabled}
                          />
                          <span>{LABELS.LV_NUMBER}</span>
                        </div>
                      ) : key === "password" ? (
                        <>
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={(e) => handleChange(e.target.value)}
                            disabled={disabled}
                            size="nm"
                          />
                          <Button
                            type={BUTTON_CANCEL}
                            label={LABELS.PASSWORD_RESET}
                            onClick={clickResetPassword}
                          />
                        </>
                      ) : type === "radio" ? (
                        <RadioGroup
                          value={value}
                          options={options}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      ) : key === KEYS.DID ? (
                        <div>
                          <label>
                            {LABELS.CURRENT}
                            <span>{value}</span>
                            {LABELS.DID_VALUE}
                          </label>
                          <Button
                            type={BUTTON_CANCEL}
                            label={LABELS.SETTING}
                            onClick={clickDidSetting}
                          />
                        </div>
                      ) : multi ? (
                        <div>
                          {field.fields.map((subField, idx) => (
                            <div key={subField.key}>
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
                              />
                              {idx === 0 && <span>{"-"}</span>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Input size="nm"
                          value={value}
                          type={type}
                          disabled={disabled}
                          onChange={(e) => handleChange(e.target.value)}
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
