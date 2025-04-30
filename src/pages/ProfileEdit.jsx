import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileFieldsConfig } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL } from "../components/Button";
import Input from "../components/Input";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [initData, setInitData] = useState(() =>
    profileFieldsConfig.reduce((acc, field) => {
      acc[field.key] = field.value || "";
      return acc;
    }, {})
  );
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    profileFieldsConfig.forEach((field) => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label}을(를) 입력해주세요.`;
      }
    });
    setErrors(newErrors);
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
          {profileFieldsConfig.map((field) => (
            <tr key={field.key}>
              <td className="label">{field.label}</td>
              <td className="value">
                {field.key === "password" ? (
                  <>
                    <Input
                      value={formData[field.key] || ""}
                      type={field.type}
                      placeholder={initData[field.key]}
                      onChange={handleChange(field.key)}
                      readOnly={field.readonly}
                    />
                    <Button type={BUTTON_CANCEL} label="비밀번호 변경" />
                  </>
                ) : (
                  <>
                    <Input
                      value={formData[field.key] || ""}
                      type={field.type}
                      placeholder={initData[field.key]}
                      onChange={handleChange(field.key)}
                      readOnly={field.readonly}
                    />
                    {errors[field.key] && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {errors[field.key]}
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <Button type={BUTTON_CANCEL} onClick={() => navigate("/profile")} />
        <Button label="저장" onClick={handleSave} />
      </div>
    </div>
  );
};

export default ProfileEdit;
