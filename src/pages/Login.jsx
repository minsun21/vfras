import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errMsg, setErrMsg] = useState("아이디를 입력해주세요");

  const from = location.state?.from?.pathname || "/home";

  const handleLogin = () => {
    const success = true;
    if (success) {
      dispatch(login({ username: "testUser" }));
      navigate(from, { replace: true });
    } else {
      setErrMsg("올바른 아이디를 입력해주세요");
      setErrMsg("올바른 비밀번호를 입력해주세요");
      setErrMsg("아이디를 확인할 수 없습니다.");
      setErrMsg("이용중지 처리된 계정입니다. 시스템 관리자에게 문의하세요.");
      setErrMsg("일시적인 시스템 장애로 로그인할 수 없습니다.");
      setErrMsg(
        "비밀번호가 일치하지 않습니다.\n비밀번호 검증 5회 실패 시 \n계정이 자동중지 처리되오니 주의하세요."
      );
    }
  };

  return (
    <div>
      <div>
        <div>로고</div>
        <h4>vFRAS 가입자 관리</h4>
      </div>
      <div
        className="div"
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        <input type="text" placeholder="아이디" />
        <input type="text" placeholder="비밀번호" />
        <button onClick={handleLogin}>로그인</button>
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
        <span>로그인이 안될 경우 관리자에게 문의하세요.</span>
        <span>부여받은 아이디가 없으면 로그인 할 수 없습니다.</span>
      </div>
    </div>
  );
};

export default Login;
