import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountRegisterFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { accountValidate } from "../utils/FormValidation";

const AccountRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setFormData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  const handleSave = () => {
    if (!accountValidate(accountRegisterFields, formData)) {
      return;
    }

    console.log("저장할 데이터:", formData);

    // alert("가입자 등록이 완료되었습니다.");
    // navigate(ROUTES.SUBSCRIBER);
  };

  return (
    <div>
      <table className="user-info-table">
        <tbody>
          {accountRegisterFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
              placeholder,
              comment,
              disabled,
            } = field;
            const value = formData[key] || "";

            const handleChange = (val) => {
              setFormData((prev) => ({ ...prev, [key]: val }));
            };

            return (
              <tr key={key}>
                <td className="label" required={required}>
                  {label}
                </td>
                <td className="value">
                  {type === "select" ? (
                    <Select
                      value={value}
                      options={options}
                      onChange={(e) => handleChange(e.target.value)}
                      nonEmpty={true}
                    />
                  ) : comment ? (
                    <div>
                      <Input
                        value={value}
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <span className="comment">{comment}</span>
                    </div>
                  ) : (
                    <Input
                      value={value}
                      type={type}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(e.target.value)}
                      disabled={disabled}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button type={BUTTON_CANCEL} onClick={() => navigate(ROUTES.PROFILE)} />
        <Button type={BUTTON_SAVE} onClick={handleSave} />
      </div>
    </div>
  );
};

export default AccountRegister;
