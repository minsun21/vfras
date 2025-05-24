import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SUBSRIBERS_REGISTER_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import Form from "../components/Form";
import { ROUTES } from "../constants/routes";
import { InfoMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { fieldsValidate } from "../utils/FormValidation";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";

const SubscriberRegister = () => {
  
  const navigate = useNavigate();
  const { showDialog, showAlert, showModal } = useModal();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
    let data = {};
    for (const field of SUBSRIBERS_REGISTER_FIELDS) {
      if (field.type === "radio") {
        data[field.key] = field.options[0].value;
      }
    }
    setFormData({ ...formData, ...data });
  }, []);

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
    formData[KEYS.PASSWORD] = formData[KEYS.SUB_NO].slice(-4)
    console.log("저장할 데이터:", formData);

    // axios.post(ROUTES.SUBSCRIBERS, formData).then(res=>{
    //   showAlert({
    //     message: InfoMessages.successAccountSave,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })

    showAlert({
      message: InfoMessages.successAccountSave,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

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
                options = [],
                required,
                placeholder,
                comment,
                disabled,
                size,
                fields,
              } = field;
              const value = formData[key] || "";

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
                        value={value}
                        options={options}
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
