import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const PrivateRoute = ({ children, roles = [] }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const permissions = useSelector((state) => state.auth.user?.permissions);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (roles.length > 0 && !roles.some((required) => permissions.includes(required))) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
};

export default PrivateRoute;
