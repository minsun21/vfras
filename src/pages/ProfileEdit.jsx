import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileEditFields } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
import {
  errorMessages,
  infoMessages,
  profileMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Label";
import { useModal } from "../contexts/ModalContext";
import PasswordChange from "../components/modals/PasswordChange";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { showDialog, showAlert, showModal } = useModal();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(() =>
      profileEditFields.reduce((acc, field) => {
        acc[field.key] = field.value || "";
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
    console.log("저장할 데이터:", formData);

    showAlert({
      message: profileMessages.successUserEdit,
      onConfirm: () => navigate(ROUTES.PROFILE),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: infoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.PROFILE),
    });
  };

  const clickChangePassword = () => {
    showModal({
      content: <PasswordChange info={formData} onOk={changePassword} />,
    });
  };

  const changePassword = (newPassword) => {
    console.log("newPassword", newPassword);
  };

  return (
    <div>
      <table className="info-table">
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
                        type={field.type}
                        value={LABELS.PASSWORD_PLACEHOLDER}
                        onChange={(e) => handleChange(e.target.value)}
                        disabled={disabled}
                      />
                      <Button
                        type={BUTTON_CANCEL}
                        label={LABELS.PASSWORD_CHANGE}
                        onClick={clickChangePassword}
                      />
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
      <div>
        <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
        <Button type={BUTTON_SAVE} onClick={handleSave} />
      </div>
    </div>
  );
};

export default ProfileEdit;
