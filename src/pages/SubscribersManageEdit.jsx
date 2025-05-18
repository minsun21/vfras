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
  accountEditFields,
  subscriberEditFields,
  subsriberManageFields,
} from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
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

const SubscriberManageEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showDialog, showAlert, showModal } = useModal();
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
      accountEditFields.reduce((acc, field) => {
        acc[field.key] = field.placeholder || "";
        return acc;
      }, {})
    );
  }, [state]);

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData.email)) {
      showAlert({
        message: errorMessages.invalidEmail,
      });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      showAlert({
        message: errorMessages.invalidPhone,
      });
      return;
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    showAlert({
      message: infoMessages.successEdit,
      onConfirm: () =>
        navigate(ROUTES.SUBSCRIBERS_MANAGE, {
          state: {
            selectedId: state?.selectedId,
          },
        }),
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
      content: <DidSetting />,
    });
  };

  const clickResetPassword = () => {
    showDialog({
      message: subsriberMessages.resetPasswordConfirm,
      onConfirm: restPassword,
    });
  };

  const restPassword = () => {
    console.log("reset");
  };

  const search = () => {
    if (!searchSubNo) {
      showAlert({
        message: subsriberMessages.searchPlaceHolder2,
      });
      return;
    }
    setFormData(() =>
      accountEditFields.reduce((acc, field) => {
        acc[field.key] = field.placeholder || "";
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

  return (
    <>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
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
      </form>
      {formData && (
        <form className="tbl-view">
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
                  placeholder,
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

                const dateChange = (key, val) => {
                  setFormData((prev) => ({ ...prev, [key]: val }));
                };

                return (
                  <tr key={key}>
                    <th className="Labels" required={required}>
                      {label}
                    </th>
                    <td className="value">
                      {key === "mainNumber" ? (
                        <div>
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={(e) => handleChange(e.target.value)}
                            disabled={disabled}
                            className="w400"
                          />
                          {/** <span>{LABELS.LV_NUMBER}</span>  */}
                        </div>
                      ) : key === "password" ? (
                        <>
                          <Input
                            value={formData[key] || ""}
                            type={field.type}
                            onChange={(e) => handleChange(e.target.value)}
                            disabled={disabled}
                          />
                          <Button
                            type={BUTTON_CANCEL}
                            label={LABELS.PASSWORD_RESET}
                            onClick={clickResetPassword}
                          />
                        </>
                      ) : key === "userUseState" ? (
                        <div>
                          <RadioGroup
                            value={value}
                            options={options}
                            onChange={(e) => handleChange(e.target.value)}
                          />
                          {field.options
                            .filter((option) => option.items)[0]
                            .items.map((item, idx) => {
                              return (
                                <div key={idx}>
                                  <Input
                                    type="date"
                                    value={formData[item.key] || ""}
                                    onChange={(e) =>
                                      dateChange(item.key, e.target.value)
                                    }
                                    disabled={
                                      formData[key] !==
                                      field.options.filter(
                                        (option) => option.items
                                      )[0].value
                                    }
                                  />
                                  {idx === 0 && <span>{"~"}</span>}
                                </div>
                              );
                            })}
                        </div>
                      ) : type === "radio" ? (
                        <RadioGroup
                          value={value}
                          options={options}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      ) : key === "did" ? (
                        <div>
                          <span>{value}</span>
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
                        <Input
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
        </form>
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
