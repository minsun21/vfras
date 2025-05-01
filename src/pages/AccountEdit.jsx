import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { accountEditFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import { accountValidate } from "../utils/FormValidation";

const AccountEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // userid로 정보 검색

    const selectedId = state?.selectedId || [];
    // setInitData();
    setFormData(() =>
      accountEditFields.reduce((acc, field) => {
        acc[field.key] = field.placeholder || "";
        return acc;
      }, {})
    );
  }, [state]);

  const handleSave = () => {
    if (!accountValidate(accountEditFields, formData)) {
      return;
    }

    console.log("저장할 데이터:", formData);

    alert("프로필이 성공적으로 저장되었습니다.");
    navigate("/profile");
  };

  return (
    <div>
      <table className="user-info-table">
        <tbody>
          {accountEditFields.map((field) => {
            const {
              key,
              label,
              type = "text",
              options = [],
              required,
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
                    />
                  ) : comment ? (
                    <div>
                      <Input
                        value={value}
                        type={type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <span className="comment">{comment}</span>
                    </div>
                  ) : (
                    <Input
                      value={value}
                      type={type}
                      placeholder={formData[key]}
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
      <div style={{ display: "flex" }}>
        <Button type={BUTTON_CANCEL} onClick={() => navigate(ROUTES.PROFILE)} />
        <Button label="저장" onClick={handleSave} />
      </div>
    </div>
  );
};

export default AccountEdit;
