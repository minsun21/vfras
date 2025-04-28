import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 전에 왔던 경로를 기억
  const from = location.state?.from?.pathname || '/home';

  const handleLogin = () => {
    dispatch(login({ username: 'testUser' }));
    // ✅ replace: true 를 써야 로그인 페이지가 history에서 사라짐
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
