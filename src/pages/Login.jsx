import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import { loginMessages } from "../constants/Message";

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
    <div>
      <div>
        <div>로고</div>
        <h4>{LABELS.title}</h4>
      </div>
      <div
        className="div"
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <input type="text" placeholder={LABELS.ID} />
        <input type="text" placeholder={LABELS.PASSWORD}/>
        <button onClick={handleLogin}>{LABELS.LOGIN}</button>
      </div>
      <div
        className="div"
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <div>
          {errMsg.split("\n").map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        <span>{loginMessages.info1}</span>
        <span>{loginMessages.info2}</span>
      </div>
    </div>
  );
};

export default Login;
