import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

// 쿠키에서 accessToken 가져오기
const getTokenFromCookie = () => {
  const match = document.cookie.match(/(^|;) ?accessToken=([^;]*)(;|$)/);
  return match ? match[2] : null;
};

const PrivateRoute = ({ children, roles = [] }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const permissions = useSelector((state) => state.auth.user?.permissions);
  const location = useLocation();

  const token = getTokenFromCookie();

  // 쿠키 또는 Redux 인증 실패 시 로그인 이동
  if (!token || !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  // 권한 부족 시
  if (roles.length > 0 && !roles.some((required) => permissions?.includes(required))) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
};

export default PrivateRoute;
