import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { loginMessages } from "../constants/Message";
import '../asset/css/basic.css'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errMsg, setErrMsg] = useState(loginMessages.infoId);

  const from = location.state?.from?.pathname || ROUTES.SUBSCRIBER;

  const handleLogin = () => {
    const success = true;
    if (success) {
      dispatch(login({ username: "testUser" }));
      navigate(from, { replace: true });
    } else {
      setErrMsg(loginMessages.errorId);
      setErrMsg(loginMessages.errorPassword);
      setErrMsg(loginMessages.errorIdConfirm);
      setErrMsg(loginMessages.errorUsing);
      setErrMsg(loginMessages.errorNetwork);
      setErrMsg(loginMessages.errorPasswordAgreement);
    }
  };

  return (
    <>
      <section class="loginPage">
        <div class="loginCenter">
          <div class="logoTit">
            <div class="logoTxt">{LABELS.HOME_TITLE}</div>
          </div>
          <div class="loginBox">
            <div class="loginMsg">
                {errMsg.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <span>{loginMessages.info1}</span>
              <span>{loginMessages.info2}</span>
            </div>
            <div class="loginTit">관리자 로그인</div>
            <div class="form-field">
              <input type="text" id="inputId" name="inputId" value="" class="form-input" placeholder={LABELS.ID} />
              <input type="password" id="inputPass" name="inputPass" value="" class="form-input" placeholder={LABELS.PASSWORD} />
            </div>
            <div class="check-box loginCheck">
              <input type="checkbox" name="loginIdCheck" id="loginIdCheck" value="아이디 저장" checked/>
              <label for="loginIdCheck"><span class="mark"></span>아이디 저장</label>
            </div>
            <div class="loginBotBox center">
              <button type="button" class="sbtn scolor" onClick={handleLogin}>{LABELS.LOGIN}</button>
            </div>
            <div class="loginBotBox center loginBottom">
              <span><a href="">아이디 찾기</a></span>
              <span class="dline"></span>
              <span><a href="">비밀번호 찾기</a></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
