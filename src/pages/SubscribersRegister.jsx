import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subsriberResigerFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import { ROUTES } from "../constants/routes";
import { InfoMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import axios from "../api/axios";

const SubscriberRegister = () => {
  const navigate = useNavigate();
  const { showDialog, showAlert, showModal } = useModal();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
    let data = {};
    for (const field of subsriberResigerFields) {
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

  const save = () => {
    console.log("저장할 데이터:", formData);

    // axios.post(ROUTES.ACCOUNTS, formData).then(res=>{
    //   showAlert({
    //     message: InfoMessages.successAccountSave,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // })

    showAlert({
      message: InfoMessages.successAccountSave,
      onConfirm: () => navigate(ROUTES.ACCOUNTS),
    });
  };

  const handleSave = () => {
    console.log("저장할 데이터:", formData);

    // const errValidate = fieldsValidate(subsriberResigerFields, formData);
    // if (errValidate) {
    //   showAlert({
    //     message: errValidate,
    //     onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    //   });
    // }

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
      <form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {subsriberResigerFields.map((field, idx) => {
              const {
                key,
                label,
                type = "text",
                options = [],
                required,
                placeholder,
                comment,
                disabled,
                multi,
                fields,
              } = field;
              const value = formData[key] || "";

              const handleChange = (val) => {
                setFormData((prev) => ({ ...prev, [key]: val }));
              };

              return (
                <tr key={idx}>
                  <th className="Labels" required={required}>
                    {label}
                  </th>
                  <td className="value">
                    {type === "select" ? (
                      <Select
                        value={value}
                        options={options}
                        onChange={(e) => handleChange(e.target.value)}
                        nonEmpty={true}
                      />
                    ) : type === "radio" ? (
                      <RadioGroup
                        value={value}
                        options={options}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    ) : comment ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={placeholder}
                          onChange={(e) => handleChange(e.target.value)}
                          disabled={disabled}
                        />
                        <span className="comment">{comment}</span>
                      </div>
                    ) : multi ? (
                      <div className="dflex">
                        {fields.map((subField, idx) => (
                          <div key={subField.key} className="rowBox">
                            <Input size="sm"
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
                            {idx === 0 && <span className="dashCenter">{"-"}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Input
                        value={value}
                        type={type}
                        placeholder={placeholder}
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
