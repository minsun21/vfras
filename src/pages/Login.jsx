import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { KEYS } from "../constants/Keys";
import { LoginMessages } from "../constants/Message";
import axios, { AXIOS_NO_GLOBAL_ERROR } from "../api/axios";
import { useModal } from "../contexts/ModalContext";
import { persistor } from "../store";
import { deleteCookie, setCookie } from "../utils/cookies";

// persistor.purge().then(() => {
//   window.location.reload(); // ✅ 저장소 비운 후 새로고침
//   deleteCookie();
//    window.location.href = '/login';
// });

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useModal();

  const [formData, setFormData] = useState({});
  const [checkSaveId, setCheckSaveId] = useState(true);

  useEffect(() => {
    const expiredMessage = sessionStorage.getItem("expiredMessage");
    if (expiredMessage) {
      setTimeout(() => {
        showAlert({ message: expiredMessage });
        sessionStorage.removeItem("expiredMessage");
      }, 100);
    }
  }, [location.key]);

  useEffect(() => {
    const savedId = localStorage.getItem(KEYS.SAVED_ID);
    if (savedId) {
      setFormData((prev) => ({
        ...prev,
        [KEYS.ADMIN_ID]: savedId,
      }));
    }
  }, []);

  const from = location.state?.from?.pathname || ROUTES.SUBSCRIBERS;

  const handleLogin = () => {
    deleteCookie();

    if (!formData[KEYS.ADMIN_ID]) {
      showAlert({ message: LoginMessages.errorId });
      return;
    }
    if (!formData[KEYS.PASSWORD]) {
      showAlert({ message: LoginMessages.errorPassword });
      return;
    }

    axios
      .put(ROUTES.LOGIN, {
        [KEYS.ADMIN_ID]: formData[KEYS.ADMIN_ID],
        [KEYS.PASSWORD]: formData[KEYS.PASSWORD],
      }, AXIOS_NO_GLOBAL_ERROR)
      .then((res) => {
        const { adminId, adminType, permissions, token } = res.data.resultData;

        // 1. token저장
        setCookie(token);

        // 2. 리덕스 저장
        dispatch(
          login({
            [KEYS.ADMIN_ID]: adminId,
            [KEYS.ADMIN_TYPE]: adminType,
            [KEYS.PERMISSIONS]: permissions,
          })
        );

        // 3. 아이디 저장
        if (checkSaveId) {
          localStorage.setItem(KEYS.SAVED_ID, formData[KEYS.ADMIN_ID]);
        } else {
          localStorage.removeItem(KEYS.SAVED_ID);
        }

        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.response.data.result === 401) {
          showAlert({ message: err.response.data.resultData.message });
        }
      });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <section className="loginPage">
        <div className="loginCenter">
          <div className="logoTit">
            <div className="logoTxt">{LABELS.HOME_TITLE}</div>
          </div>
          <div className="loginBox">
            {/* <div className="loginMsg">
              {errMsg.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <span>{errMsg}</span>
            </div> */}
            <div className="form-field">
              <input
                type="text"
                id="inputId"
                name={KEYS.ADMIN_ID}
                value={formData[KEYS.ADMIN_ID] || ""}
                className="form-input w100p"
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={LoginMessages.infoId}
              />
              <input
                type="password"
                id="inputPass"
                name={KEYS.PASSWORD}
                value={formData[KEYS.PASSWORD] || ""}
                className="form-input w100p"
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={LoginMessages.infoPassword}
              />
            </div>
            <div className="check-box loginCheck">
              <input
                type="checkbox"
                name="loginIdCheck"
                id="loginIdCheck"
                defaultChecked
                onClick={(e) => setCheckSaveId(e.target.checked)}
              />
              <label htmlFor="loginIdCheck">
                <span className="mark"></span>
                {LABELS.SAVE_ID}
              </label>
            </div>
            <div className="loginBotBox center">
              <button
                type="button"
                className="sbtn scolor"
                onClick={handleLogin}
              >
                {LABELS.LOGIN}
              </button>
            </div>
            <div className="loginBotBox loginMsg">
                <p>비밀번호가 일치하지 않습니다</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
