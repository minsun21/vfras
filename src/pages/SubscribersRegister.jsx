import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SUBSRIBERS_REGISTER_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import RadioGroup from "../components/RadioGroup";
import Form from "../components/Form";
import { ROUTES } from "../constants/routes";
import {
  ErrorKey,
  ErrorMessages,
  InfoMessages,
  SubsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { fieldsValidate } from "../utils/FormValidation";
import axios, { AXIOS_NO_GLOBAL_ERROR } from "../api/axios";
import { KEYS } from "../constants/Keys";
import { SERVICE_TYPES } from "../config/OptionConfig";

const SubscriberRegister = () => {
  const navigate = useNavigate();
  const { showDialog, showAlert } = useModal();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    initFormData();
  }, []);

  // formdata 초기화
  const initFormData = () => {
    let data = {};
    for (const field of SUBSRIBERS_REGISTER_FIELDS) {
      if (field.type === "radio") {
        data[field.key] = field.Options[0].key;
        continue;
      }
      if (field.fields) {
        for (const subField of field.fields) {
          data[subField.key] = "";
        }
      }
      data[field.key] = "";
    }
    setFormData({ ...formData, ...data });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const handleSave = () => {
    const errValidate = fieldsValidate(SUBSRIBERS_REGISTER_FIELDS, formData);
    if (errValidate) {
      showAlert({
        message: errValidate,
      });
      return;
    }

    // 비밀번호 자동 설정
    formData[KEYS.PASSWORD] = formData[KEYS.SUB_NO].slice(-4);

    axios
      .post(ROUTES.SUBSCRIBERS, formData, AXIOS_NO_GLOBAL_ERROR)
      .then((res) => {
        showAlert({
          message: InfoMessages.successAccountSave,
          onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
        });
      })
      .catch((err) => {
        let message = err.response.data.resultData.message;
        if (message.includes(ErrorKey.presentSubsriber)) {
          showAlert({ message: SubsriberMessages.subsriberPresent });
        } else if (message.includes(ErrorKey.notFindRbtInfo)) {
          showAlert({
            message: message.replace(ErrorKey.notFindRbtInfo, ErrorMessages.notFindRbt)
          })
          return;
        } else if (message.includes(ErrorKey.duplicateNumber)) {
          showAlert({
            message: message.replace(ErrorKey.duplicateNumber, ErrorMessages.duplicate)
          })
          return;
        } else {
          showAlert({ message: ErrorMessages.server });
        }
      });
  };

  // 가입자 유형 - 개인이면 서비스 유형에서 기업 선택 불가
  // 가입자 유형 - 법인이면 서비스 유형에서 기업만 선택
  const serviceTypeOptions = useMemo(() => {
    const subType = formData[KEYS.SUB_TYPE];

    return SERVICE_TYPES.map((opt) => {
      if (subType === "0") {
        // 개인: 기업(2) 비활성화
        return opt.key === "2" ? { ...opt, disabled: true } : opt;
      } else if (subType === "1") {
        // 법인: 기업(2)만 활성화
        return opt.key === "2"
          ? { ...opt, disabled: false }
          : { ...opt, disabled: true };
      }
      return opt;
    });
  }, [formData[KEYS.SUB_TYPE]]);

  useEffect(() => {
    const subType = formData[KEYS.SUB_TYPE];

    if (subType === "1") {
      // 법인: 기업(2) 강제 선택
      setFormData((prev) => ({
        ...prev,
        [KEYS.SERVICE_TYPE]: "2",
      }));
    } else if (subType === "0") {
      setFormData((prev) => ({
        ...prev,
        [KEYS.SERVICE_TYPE]: "0",
      }));
    }
  }, [formData[KEYS.SUB_TYPE]]);

  return (
    <>
      <Form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {SUBSRIBERS_REGISTER_FIELDS.map((field, idx) => {
              const {
                key,
                label,
                type = "text",
                Options = [],
                required,
                placeholder,
                comment,
                disabled,
                size,
                fields,
              } = field;
              const value = formData[key] ?? "";

              const handleChange = (e) => {
                setFormData((prev) => ({ ...prev, [key]: e.target.value }));
              };

              return (
                <tr key={idx}>
                  <th className="Labels" required={required}>
                    {label}
                    {required && <em>*</em>}
                  </th>
                  <td className="value">
                    {type === "radio" ? (
                      <RadioGroup
                        name={key}
                        value={value}
                        Options={
                          key === KEYS.SERVICE_TYPE
                            ? serviceTypeOptions
                            : Options
                        }
                        onChange={handleChange}
                      />
                    ) : comment ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <span className="comment">{comment}</span>
                      </div>
                    ) : fields ? (
                      <div className="dflex">
                        {fields.map((subField, idx) => (
                          <div key={subField.key} className="rowBox">
                            <Input
                              size="sm"
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
                            {idx === 0 && (
                              <span className="dashCenter">{"-"}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Input
                        value={value}
                        type={type}
                        placeholder={placeholder}
                        onChange={handleChange}
                        size={size}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
      <div className="btn-wrap">
        <div>
          <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
        </div>
        <div>
          <Button onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default SubscriberRegister;
