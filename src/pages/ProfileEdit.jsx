import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE_EDIT_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import { ROUTES } from "../constants/routes";
import { isValidEmail, isValidPhone } from "../utils/FormValidation";
import {
  ErrorMessages,
  InfoMessages,
  ProfileMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";
import PasswordChange from "../components/modals/PasswordChange";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { MODAL_SM } from "../components/modals/ModalRenderer";
import PhoneNumberInput from "../components/PhoneNumberInput";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showDialog, showAlert, showModal, closeModal } = useModal();
  const [formData, setFormData] = useState({});

  const adminId = "";

  useEffect(() => {
    setFormData({
      [KEYS.ADMIN_TYPE]: "Admin",
      [KEYS.DEPARTMENT]: "운영팀",
      [KEYS.ADMIN_ID]: "vFRAS",
      [KEYS.PASSWORD]: "!sdf423",
      [KEYS.NAME]: "홍길동",
      [KEYS.MOBILE]: "010-1234-5678",
      [KEYS.EMAIL]: "test@lguplus.co.kr",
    });

    // axios.get(ROUTES.PROFILE, adminId).then((res) => {
    //   setFormData((prev) => ({ ...prev, ...res.data }));
    // });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData[KEYS.EMAIL])) {
      showAlert({
        message: ErrorMessages.invalidEmail,
      });
      return;
    }

    if (!isValidPhone(formData[KEYS.MOBILE])) {
      showAlert({
        message: ErrorMessages.invalidPhone,
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
    // axios.put(ROUTES.PASSWORD_CHANGE(adminId), formData).then((res) => {
    //   showAlert({
    //     message: ProfileMessages.successUserEdit,
    //     onConfirm: () => navigate(ROUTES.PROFILE),
    //   });
    // });

    showAlert({
      message: ProfileMessages.successUserEdit,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const cancelEdit = () => {
    showDialog({
      message: InfoMessages.confirmCancel,
      onConfirm: () => navigate(ROUTES.SUBSCRIBERS),
    });
  };

  const clickChangePassword = () => {
    showModal({
      content: <PasswordChange info={formData} />,
      header: LABELS.PASSWORD_CHANGE,
      onConfirm: changePassword,
      size: MODAL_SM,
    });
  };

  const changePassword = (newPassword) => {
    console.log("newPassword", newPassword);
    // 1. 빈 값 확인
    // if (hasEmptyValue(formData)) {
    //   showAlert({
    //     message: ErrorMessages.emptyValue,
    //   });
    //   return;
    // }

    // // 2. 현재 비밀번호 확인
    // if (info.password !== formData.currentPassword) {
    //   showAlert({
    //     message: ErrorMessages.confirmCurrentPassword,
    //   });
    //   return;
    // }

    // // 3. 변경 비밀번호 validation
    // if (!isValidPassword(formData.changePassword)) {
    //   showAlert({
    //     message: ErrorMessages.invalidPassword,
    //   });
    //   return;
    // }

    // // 4. 변경 비밀번호 재확인
    // if (formData.changePassword !== formData.changeConfirmPassword) {
    //   showAlert({
    //     message: ErrorMessages.confirmPassword,
    //   });
    //   return;
    // }

    // axios.put(ROUTES.PROFILE_EDIT(adminId), formData).then((res) => {
    //   showAlert({
    //     message: ProfileMessages.successPasswordChange,
    //     onConfirm: () => {
    //       closeModal();
    //       dispatch(logout());
    //     },
    //   });
    // });

    setTimeout(() => {
      showAlert({
        message: ProfileMessages.successPasswordChange,
        onConfirm: () => {
          closeModal();
          dispatch(logout());
        },
      });
    }, 100);
  };

  return (
    <>
      <span className="ft13">{ProfileMessages.info1}</span>
      <form className="tbl-view" onSubmit={(e) => e.preventDefault()}>
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {PROFILE_EDIT_FIELDS.map((field) => {
              const { key, disabled, type, required } = field;

              const value = formData[key] || "";

              const handleChange = (e) => {
                setFormData((prev) => ({ ...prev, [key]: e.target.value }));
              };

              return (
                <tr key={key}>
                  <th className="Labels">
                    <label required={required}>{field.label}</label>
                  </th>
                  <td className="value">
                    {key === KEYS.PASSWORD ? (
                      <div className="rowBox">
                        <Input
                          size="nm"
                          type={type}
                          onChange={handleChange}
                          disabled={disabled}
                        />
                        <Button
                          type={BUTTON_CANCEL}
                          label={LABELS.PASSWORD_CHANGE}
                          onClick={clickChangePassword}
                        />
                      </div>
                    ) : key === KEYS.MOBILE ? (
                      <PhoneNumberInput
                        value={value}
                        onChange={handleChange}
                      />
                    ) : (
                      <>
                        <Input
                          value={value}
                          type={field.type}
                          placeholder={formData[key]}
                          onChange={handleChange}
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
      </form>
      <div className="btn-wrap">
        <div>
          <Button type={BUTTON_CANCEL} onClick={cancelEdit} />
        </div>
        <div>
          <Button type={BUTTON_SAVE} onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
