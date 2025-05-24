import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE_EDIT_FIELDS } from "../config/FieldsConfig";
import Button, { BUTTON_CANCEL, BUTTON_SAVE } from "../components/Button";
import Input from "../components/Input";
import { ROUTES } from "../constants/routes";
import {
  hasEmptyValue,
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../utils/FormValidation";
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
import Form from "../components/Form";
import { resetPasswordFields } from "../features/passwordSlice";
import { store } from "../store";

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
      content: <PasswordChange />,
      header: LABELS.PASSWORD_CHANGE,
      onConfirm: () => changePassword(),
      onClose : () =>  dispatch(resetPasswordFields()),
      size: MODAL_SM,
    });
  };

  const changePassword = () => {
    const passwordData = store.getState().password;
    console.log(passwordData);
    // 1. 빈 값 확인
    if (hasEmptyValue(passwordData)) {
      showAlert({
        message: ErrorMessages.emptyValue,
      });
      return;
    }

    // 2. 현재 비밀번호 확인
    if (passwordData[KEYS.PASSWORD] !== formData[KEYS.PASSWORD]) {
      showAlert({
        message: ErrorMessages.confirmCurrentPassword,
      });
      return;
    }

    // // 3. 변경 비밀번호 validation
    if (!isValidPassword(passwordData[KEYS.NEW_PASSWORD1])) {
      showAlert({
        message: ErrorMessages.invalidPassword,
      });
      return;
    }

    // // 4. 변경 비밀번호 재확인
    if (passwordData[KEYS.NEW_PASSWORD1] !== passwordData[KEYS.NEW_PASSWORD2]) {
      showAlert({
        message: ErrorMessages.confirmPassword,
      });
      return;
    }

    // axios.put(ROUTES.PROFILE_EDIT(adminId), formData).then((res) => {
    //   showAlert({
    //     message: ProfileMessages.successPasswordChange,
    //     onConfirm: () => {
    //       closeModal();
    //       dispatch(logout());
    //     },
    //   });
    // });
    
    closeModal();
    setTimeout(() => {
      showAlert({
        message: ProfileMessages.successPasswordChange,
        onConfirm: () => {
          closeModal();
          dispatch(logout());
        },
      });
    }, 100);

    // 완료 후 초기화
    dispatch(resetPasswordFields());
  };

  return (
    <>
      <span>{ProfileMessages.info1}</span>
      <Form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {PROFILE_EDIT_FIELDS.map((field) => {
              const { key, disabled, type } = field;

              const value = formData[key] || "";

              const handleChange = (e) => {
                setFormData((prev) => ({ ...prev, [key]: e.target.value }));
              };

              return (
                <tr key={key}>
                  <th className="Labels">
                    <label>{field.label}</label>
                  </th>
                  <td className="value">
                    {key === KEYS.PASSWORD ? (
                      <div className="dflex gap10">
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
                      <PhoneNumberInput value={value} onChange={handleChange} />
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
      </Form>
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
