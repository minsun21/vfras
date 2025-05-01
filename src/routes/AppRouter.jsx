import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

import Layout from "../components/Layout";
import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { MenusConfigConfig } from "../config/MenusConfig";
import { ROUTES } from "../constants/routes";

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.ROOT}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.SUBSCRIBER} replace />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEdit />} />

          {MenusConfigConfig.map((menu) =>
            menu.items.map((item) => (
              <Route
                key={item.path}
                path={`/${item.path}`}
                element={<item.component />}
              />
            ))
          )}
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
