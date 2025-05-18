import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to={ROUTES.SUBSCRIBERS}replace /> : children;
};

export default PublicRoute;
