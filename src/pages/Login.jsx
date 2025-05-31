import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { KEYS } from "../constants/Keys";
import { LoginMessages } from "../constants/Message";
import axios from "../api/axios";
import { useModal } from "../contexts/ModalContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useModal();

  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({});
  const [checkSaveId, setCheckSaveId] = useState(true);

  const from = location.state?.from?.pathname || ROUTES.SUBSCRIBERS;

  const handleLogin = () => {
    dispatch(login({ userId: "test", username: "testUser", role: "admin" }));
    navigate(from, { replace: true });

    // axios
    //   .put(ROUTES.LOGIN, data)
    //   .then((res) => {
    // if(checkSaveId){
    //   // 아이디 저장은 로컬 스토리지로
    //   localStorage.setItem("userInfo", JSON.stringify(res.data));
    // }
    //     dispatch(
    // login({ userId: res.data.userId, userName: res.data.userName })
    //     );
    //     navigate(from, { replace: true });
    //   })
    //   .catch((err) => {
    //     setErrMsg(LoginMessages.errorId);
    //     setErrMsg(LoginMessages.errorPassword);
    //     setErrMsg(LoginMessages.errorIdConfirm);
    //     setErrMsg(LoginMessages.errorUsing);
    //     setErrMsg(LoginMessages.errorPasswordAgreement);
    // 5회 이상 로그인 실패
    // showAlert({
    //   message: LoginMessages.errorStopUser,
    // });
    //   });
  };

  return (
    <>
      <section className="loginPage">
        <div className="loginCenter">
          <div className="logoTit">
            <div className="logoTxt">{LABELS.HOME_TITLE}</div>
          </div>
          <div className="loginBox">
            <div className="loginMsg">
              {errMsg.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <span>{errMsg}</span>
            </div>
            <div className="loginTit">{LABELS.ADMIN_LOGIN}</div>
            <div className="form-field">
              <input
                type="text"
                id="inputId"
                name={KEYS.ADMIN_ID}
                value={data[KEYS.ADMIN_ID]}
                className="form-input w100p"
                placeholder={LoginMessages.infoId}
              />
              <input
                type="password"
                id="inputPass"
                name={KEYS.PASSWORD}
                value={data[KEYS.PASSWORD]}
                className="form-input w100p"
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
