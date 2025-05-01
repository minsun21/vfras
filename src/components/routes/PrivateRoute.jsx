import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN}replace state={{ from: location }} />
  );
};


export default PrivateRoute;
