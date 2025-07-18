import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../asset/css/basic.css";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import Layout from "../components/Layout";
import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { MenusConfig, NonMenuConfig } from "../config/MenusConfig";
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
              <Navigate to={ROUTES.SUBSCRIBERS} replace />
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
          {NonMenuConfig.map((item) => (
            <Route
              key={item.path}
              path={`/${item.path}`}
              element={
                <PrivateRoute roles={item.roles}>
                  <item.component />
                </PrivateRoute>
              }
            />
          ))}
          {MenusConfig.map((menu) =>
            menu.items.map((item) => (
              <Route
                key={item.path}
                path={`${item.path}`}
                element={
                  <PrivateRoute roles={item.roles}>
                    <item.component />
                  </PrivateRoute>
                }
              />
            ))
          )}
        </Route>

        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.ALL} element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
