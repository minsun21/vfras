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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { MODAL_SM } from "../components/modals/ModalRenderer";
import Form from "../components/Form";
import { resetPasswordFields } from "../features/passwordSlice";
import { store } from "../store";

const ProfileEdit = () => {
  const adminId = useSelector((state) => state.auth.user[KEYS.ADMIN_ID]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showDialog, showAlert, showModal, closeModal } = useModal();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    axios.get(`${ROUTES.PROFILE}/${adminId}`).then((res) => {
      const result = res.data.resultData;
      setFormData(result);
    });
  };

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
    const data = {
      [KEYS.EMAIL]: formData[KEYS.EMAIL],
      [KEYS.MOBILE]: formData[KEYS.MOBILE].replaceAll("-", ""),
      [KEYS.OLD_PASSWORD]: formData[KEYS.OLD_PASSWORD]
    };

    axios.put(ROUTES.PROFILE_EDIT(adminId), data).then((res) => {
      showAlert({
        message: ProfileMessages.successUserEdit,
        onConfirm: () => initData(),
      });
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
      onClose: () => dispatch(resetPasswordFields()),
      size: MODAL_SM,
    });
  };

  // 비밀번호 변경
  const changePassword = () => {
    const passwordData = store.getState().changePassword;
    // 1. 빈 값 확인
    if (hasEmptyValue(passwordData)) {
      showAlert({
        message: ErrorMessages.emptyValue,
      });
      return;
    }
    // 2. 변경 비밀번호 validation
    if (!isValidPassword(passwordData[KEYS.NEW_PASSWORD1])) {
      showAlert({
        message: ErrorMessages.invalidPassword,
      });
      return;
    }
    // 3. 변경 비밀번호 재확인
    if (passwordData[KEYS.NEW_PASSWORD1] !== passwordData[KEYS.NEW_PASSWORD2]) {
      showAlert({
        message: ErrorMessages.confirmPassword,
      });
      return;
    }

    axios
      .put(ROUTES.PASSWORD_CHANGE(adminId), formData)
      .then((res) => {
        showAlert({
          message: ProfileMessages.successPasswordChange,
          onConfirm: () => {
            closeModal();
            dispatch(resetPasswordFields());
            dispatch(logout());
          },
        });
      })
      .catch((err) => {
        // const message = err.response.data.resultData;
        // if(message==="rawPassword cannot be null"){
        // }
      });
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
                    ) : (
                      // ) : key === KEYS.MOBILE ? (
                      //   <PhoneNumberInput value={value} onChange={handleChange} />
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
