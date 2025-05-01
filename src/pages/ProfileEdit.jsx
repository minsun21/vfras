import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileEditFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
import { errorMessages } from "../constants/Message";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(() =>
      profileEditFields.reduce((acc, field) => {
        acc[field.key] = field.placeholder || "";
        return acc;
      }, {})
    );
    // axios.get("/api/user/profile").then(res => {
    //   setFormData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData.email)) {
      alert(errorMessages.invalidEmail());
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert(errorMessages.invalidPhone());
      return;
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
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
          {profileEditFields.map((field) => {
            const { key, disabled } = field;
            const handleChange = (val) => {
              setFormData((prev) => ({ ...prev, [key]: val }));
            };
            return (
              <tr key={key}>
                <td className="label">{field.label}</td>
                <td className="value">
                  {key === "password" ? (
                    <>
                      <Input
                        value={formData[key] || ""}
                        type={field.type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <Button type={BUTTON_CANCEL} label="비밀번호 변경" />
                    </>
                  ) : (
                    <>
                      <Input
                        value={formData[key] || ""}
                        type={field.type}
                        placeholder={formData[key]}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                    </>
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

export default ProfileEdit;
